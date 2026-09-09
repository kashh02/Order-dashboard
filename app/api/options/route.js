import { NextResponse } from "next/server";
import { getOrdersCollection } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const collection = await getOrdersCollection();

    const [statuses, categories] = await Promise.all([
      collection.distinct("status"),
      collection.distinct("category")
    ]);

    return NextResponse.json({
      statuses: statuses.sort(),
      categories: categories.sort()
    });
  } catch (error) {
    console.error("Options query failed:", error);
    return NextResponse.json(
      {message: "Could not load filter options from the database."},
      {status: 500}
    );
  }
}
