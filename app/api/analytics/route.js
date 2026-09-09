import { NextResponse } from "next/server";
import { getOrdersCollection } from "@/lib/mongodb";

// Reading fresh data instead of serving a cached response.
export const dynamic = "force-dynamic";

export async function GET(request) {
  try{
    const {searchParams} = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const status = searchParams.get("status");
    const category = searchParams.get("category");

    const filter = {};

    if(from || to){
      filter.createdAt = {};

      if(from){
        filter.createdAt.$gte = new Date(`${from}T00:00:00.000Z`);
      }

      if(to){
        filter.createdAt.$lte = new Date(`${to}T23:59:59.999Z`);
      }
    }

    

    if(status && status !== "all") filter.status = status;
    if(category && category !== "all") filter.category = category;

    const collection = await getOrdersCollection();

   
    const [result] = await collection
      .aggregate([
        {$match: filter},
        {
          $facet: {
            //not considering cancelled orders revenue
            totals: [
              {
                $group: {
                  _id: null,
                  totalOrders: {$sum: 1},
                  totalRevenue: { 
                    $sum: {
                      $cond: [
                        { $ne: ["$status", "Cancelled"]}, 
                        "$amount", 
                        0
                      ]
                    } 
                  }
                }
              }
            ],
            ordersByStatus: [
              {$group: {_id: "$status", count: {$sum: 1}}},
              {$sort: {count: -1} }
            ],
            revenueOverTime: [
              {
                $match: {
                  status: {$ne : "Cancelled"}
                }
              },
              {
                $group: {
                  _id: {$dateToString: {format: "%Y-%m-%d", date: "$createdAt"}},
                  revenue: {$sum: "$amount"}
                }
              },
              {$sort: {_id: 1}}
            ],
            topProducts: [
              {
                $match: {
                  status: {$ne: "Cancelled"}
                }
              },
              {
                $group: {
                  _id: "$product",
                  revenue: {$sum: "$amount"},
                  quantity: {$sum: "$quantity"}
                }
              },
              {$sort: {revenue: -1 } },
              {$limit: 5}
            ]
          }
        }
      ])
      .toArray();

    const totals = result.totals[0] || {totalOrders: 0, totalRevenue: 0 };

    return NextResponse.json({
      totalOrders: totals.totalOrders,
      totalRevenue: totals.totalRevenue,
      ordersByStatus: result.ordersByStatus.map((item) => ({
        status: item._id,
        count: item.count
      })),
      revenueOverTime: result.revenueOverTime.map((item) => ({
        date: item._id,
        revenue: item.revenue
      })),
      topProducts: result.topProducts.map((item) => ({
        product: item._id,
        revenue: item.revenue,
        quantity: item.quantity
      }))
    });
  } catch (error) {
    console.error("Analytics query failed:", error);
    return NextResponse.json(
      { message: "Could not load analytics from the database." },
      { status: 500 }
    );
  }
}
