# MongoDB Analytics Dashboard

A simple orders dashboard built with Next.js and MongoDB. It shows total orders, total revenue, orders by status, revenue over time, and the top 5 products, with filters for date range, status and category. All data is read from MongoDB at request time — nothing is hardcoded.

## Tech used

- Next.js
- React
- MongoDB Atlas
- Recharts
- CSS

## Local Setup

### 1. Clone the repository

Clone the project from GitHub and move into the project folder.

git clone <your-github-repository-url>
cd mongodb-analytics-dashboard

Replace <your-github-repository-url> with the actual GitHub repository URL.

### 2. Install dependencies

Make sure Node.js and npm are installed.

Run:

npm install

This installs the dependencies listed in package.json, including Next.js, React, MongoDB, and Recharts.

### 3. Create a MongoDB Atlas database

Create or use a MongoDB Atlas project and cluster.

Then:

Create a database user.

Add your current IP address under Network Access.

Open Connect → Drivers.

Select the Node.js driver.

Copy the MongoDB connection string.

A connection string looks similar to:

mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
Replace <username> and <password> with your MongoDB database-user credentials.

Do not commit your real MongoDB credentials to GitHub.

### 4. Create the environment file

The repository contains .env.example, which shows the environment variables required by the project.

Create a new file named:

.env.local

You can create it manually in VS Code or copy .env.example.

Windows PowerShell

Copy-Item .env.example .env.local

macOS / Linux

cp .env.example .env.local

Now open .env.local and add your MongoDB connection details:

MONGODB_URI="your-mongodb-connection-string"
MONGODB_DB="analytics"

Example:

MONGODB_URI="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority"
MONGODB_DB="analytics"

### 5. Seed the database

Run:

npm run seed

This runs the seed script and inserts the sample order records into:

Database: analytics
Collection: orders

The project includes at least 20 sample order records.

You can verify the data in MongoDB Atlas under:

Database → Browse Collections → analytics → orders

### 6. Start the development server

Run:
npm run dev

Then open:

http://localhost:3000

The dashboard should now fetch analytics data from MongoDB and display it in the browser.



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
