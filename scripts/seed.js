require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "analytics";

const orders = [
  { orderId: "ORD-1001", customer: "Aarav Sharma",   product: "Wireless Headphones", category: "Electronics", status: "Delivered", quantity: 1, amount: 4999,  createdAt: new Date("2026-06-03T10:15:00Z") },
  { orderId: "ORD-1002", customer: "Neha Verma",     product: "Running Shoes",       category: "Footwear",    status: "Delivered", quantity: 2, amount: 6398,  createdAt: new Date("2026-06-08T14:40:00Z") },
  { orderId: "ORD-1003", customer: "Rohan Mehta",    product: "Coffee Maker",        category: "Home",        status: "Cancelled", quantity: 1, amount: 3499,  createdAt: new Date("2026-06-12T09:05:00Z") },
  { orderId: "ORD-1004", customer: "Ishita Nair",    product: "Yoga Mat",            category: "Fitness",     status: "Delivered", quantity: 1, amount: 1299,  createdAt: new Date("2026-06-19T17:20:00Z") },
  { orderId: "ORD-1005", customer: "Karan Malhotra", product: "Smart Watch",         category: "Electronics", status: "Shipped",   quantity: 1, amount: 8999,  createdAt: new Date("2026-06-25T11:00:00Z") },
  { orderId: "ORD-1006", customer: "Priya Iyer",     product: "Cotton T-Shirt",      category: "Clothing",    status: "Delivered", quantity: 3, amount: 2097,  createdAt: new Date("2026-07-02T08:30:00Z") },
  { orderId: "ORD-1007", customer: "Aditya Rao",     product: "Wireless Headphones", category: "Electronics", status: "Pending",   quantity: 1, amount: 4999,  createdAt: new Date("2026-07-05T19:45:00Z") },
  { orderId: "ORD-1008", customer: "Sana Khan",      product: "Table Lamp",          category: "Home",        status: "Delivered", quantity: 2, amount: 2598,  createdAt: new Date("2026-07-09T13:10:00Z") },
  { orderId: "ORD-1009", customer: "Vikram Singh",   product: "Laptop Backpack",     category: "Accessories", status: "Shipped",   quantity: 1, amount: 2799,  createdAt: new Date("2026-07-14T16:25:00Z") },
  { orderId: "ORD-1010", customer: "Meera Joshi",    product: "Smart Watch",         category: "Electronics", status: "Delivered", quantity: 1, amount: 8999,  createdAt: new Date("2026-07-18T10:50:00Z") },
  { orderId: "ORD-1011", customer: "Dev Patel",      product: "Running Shoes",       category: "Footwear",    status: "Cancelled", quantity: 1, amount: 3199,  createdAt: new Date("2026-07-21T12:05:00Z") },
  { orderId: "ORD-1012", customer: "Ananya Bose",    product: "Ceramic Dinner Set",  category: "Home",        status: "Delivered", quantity: 1, amount: 5499,  createdAt: new Date("2026-07-27T15:35:00Z") },
  { orderId: "ORD-1013", customer: "Rahul Gupta",    product: "Bluetooth Speaker",   category: "Electronics", status: "Delivered", quantity: 2, amount: 5198,  createdAt: new Date("2026-08-01T09:15:00Z") },
  { orderId: "ORD-1014", customer: "Tanvi Desai",    product: "Cotton T-Shirt",      category: "Clothing",    status: "Pending",   quantity: 4, amount: 2796,  createdAt: new Date("2026-08-04T18:00:00Z") },
  { orderId: "ORD-1015", customer: "Arjun Kapoor",   product: "Laptop Backpack",     category: "Accessories", status: "Delivered", quantity: 1, amount: 2799,  createdAt: new Date("2026-08-07T11:40:00Z") },
  { orderId: "ORD-1016", customer: "Zoya Ahmed",     product: "Yoga Mat",            category: "Fitness",     status: "Shipped",   quantity: 2, amount: 2598,  createdAt: new Date("2026-08-11T14:20:00Z") },
  { orderId: "ORD-1017", customer: "Nikhil Reddy",   product: "Wireless Headphones", category: "Electronics", status: "Delivered", quantity: 1, amount: 4999,  createdAt: new Date("2026-08-13T20:10:00Z") },
  { orderId: "ORD-1018", customer: "Simran Kaur",    product: "Coffee Maker",        category: "Home",        status: "Delivered", quantity: 1, amount: 3499,  createdAt: new Date("2026-08-16T08:55:00Z") },
  { orderId: "ORD-1019", customer: "Harsh Vardhan",  product: "Smart Watch",         category: "Electronics", status: "Pending",   quantity: 1, amount: 8999,  createdAt: new Date("2026-08-19T17:05:00Z") },
  { orderId: "ORD-1020", customer: "Pooja Chauhan",  product: "Bluetooth Speaker",   category: "Electronics", status: "Delivered", quantity: 1, amount: 2599,  createdAt: new Date("2026-08-22T10:30:00Z") },
  { orderId: "ORD-1021", customer: "Manav Bhatt",    product: "Denim Jacket",        category: "Clothing",    status: "Shipped",   quantity: 1, amount: 3999,  createdAt: new Date("2026-08-25T13:45:00Z") },
  { orderId: "ORD-1022", customer: "Riya Sethi",     product: "Table Lamp",          category: "Home",        status: "Cancelled", quantity: 1, amount: 1299,  createdAt: new Date("2026-08-28T16:15:00Z") },
  { orderId: "ORD-1023", customer: "Yash Agarwal",   product: "Running Shoes",       category: "Footwear",    status: "Delivered", quantity: 1, amount: 3199,  createdAt: new Date("2026-09-01T09:25:00Z") },
  { orderId: "ORD-1024", customer: "Kavya Menon",    product: "Denim Jacket",        category: "Clothing",    status: "Delivered", quantity: 2, amount: 7998,  createdAt: new Date("2026-09-03T12:35:00Z") },
  { orderId: "ORD-1025", customer: "Sahil Chopra",   product: "Ceramic Dinner Set",  category: "Home",        status: "Pending",   quantity: 1, amount: 5499,  createdAt: new Date("2026-09-05T15:50:00Z") }
];

async function seed() {
  if (!uri) {
    console.error("MONGODB_URI is missing. Copy .env.example to .env.local and fill it in.");
    process.exit(1);
  }

  const client = new MongoClient(uri);
  await client.connect();

  const collection = client.db(dbName).collection("orders");
  await collection.deleteMany({});
  await collection.insertMany(orders);

  console.log(`Seeded ${orders.length} orders into "${dbName}.orders".`);
  await client.close();
}

seed().catch((error) => {
  console.error("Seeding failed:", error.message);
  process.exit(1);
});
