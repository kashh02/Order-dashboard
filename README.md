# MongoDB Analytics Dashboard

A simple orders dashboard built with Next.js and MongoDB. It shows total orders, total revenue, orders by status, revenue over time, and the top 5 products, with filters for date range, status and category. All data is read from MongoDB at request time — nothing is hardcoded.

## Tech used

- **Next.js 14** (App Router) — React frontend and API routes in one project
- **MongoDB Node driver** — database queries and aggregation
- **Recharts** — the line and bar charts
- **Plain CSS** — one stylesheet, no UI framework

## Requirements

- Node.js 18 or newer
- A MongoDB database (MongoDB Atlas free tier or a local MongoDB server)

## Setup

**1. Install dependencies**

```bash
npm install
```

**2. Add your environment variables**

Copy the example file and fill in your own connection string:

```bash
cp .env.example .env.local
```

```
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority"
MONGODB_DB="analytics"
```

`.env.local` is ignored by git, so credentials never get committed.

**3. Seed the database**

```bash
npm run seed
```

This clears the `orders` collection and inserts 25 sample orders.

**4. Run the app**

```bash
npm run dev
```

Open http://localhost:3000

## MongoDB setup

If you are using **MongoDB Atlas**:

1. Create a free cluster at https://cloud.mongodb.com
2. Under **Database Access**, create a database user with a password.
3. Under **Network Access**, allow access from anywhere (`0.0.0.0/0`) so your deployed app can connect.
4. Click **Connect → Drivers** and copy the connection string into `MONGODB_URI`.
5. Run `npm run seed`. The `analytics` database and `orders` collection are created automatically.

If you are running **MongoDB locally**, use:

```
MONGODB_URI="mongodb://localhost:27017"
MONGODB_DB="analytics"
```

### Order document shape

```js
{
  orderId: "ORD-1001",
  customer: "Aarav Sharma",
  product: "Wireless Headphones",
  category: "Electronics",
  status: "Delivered",
  quantity: 1,
  amount: 4999,
  createdAt: ISODate("2026-06-03T10:15:00Z")
}
```

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import the repository at https://vercel.com/new
3. Add the environment variables `MONGODB_URI` and `MONGODB_DB` in **Settings → Environment Variables**.
4. Deploy. Make sure Atlas Network Access allows `0.0.0.0/0`, otherwise the deployed app cannot reach the database.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm start` | Run the production build |
| `npm run seed` | Insert the 25 sample orders |

## Project structure

```
app/
  api/analytics/route.js   Aggregates orders and returns all dashboard data
  api/options/route.js     Returns the values for the filter dropdowns
  globals.css              All styling
  layout.js                Page shell
  page.js                  Dashboard page: state, fetching, loading and error states
components/
  Filters.js               Date range, status and category filters
  SummaryCards.js          Total orders, total revenue, orders by status
  RevenueChart.js          Revenue over time (line chart)
  StatusChart.js           Orders by status (bar chart)
  TopProducts.js           Top 5 products by revenue
lib/
  mongodb.js               Database connection
  format.js                Currency, date and colour helpers
scripts/
  seed.js                  Sample data
```
