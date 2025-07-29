const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const orderSchema = new Schema({
  item: String,
  price: Number,
});

const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId, // this is written to Store the id of child document
      ref: "Order", // in which collection, the id belong, from where do u want to get the id from
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

// const addCustomer = async () => {
//   let cust1 = new Customer({
//     name: "Vasudeva",
//   });

//   let order1 = await Order.findOne({ item: "Ramayanam" });
//   let order2 = await Order.findOne({ item: "Mahabharatham" });

//   cust1.orders.push(order1, order2);

//   let result = await cust1.save();
//   console.log(result);
// };

// addCustomer();

const findCustomer = async () => {
  let result = await Customer.find({}).populate("orders");
  console.log(result[0]);
};

findCustomer();

// const addOrders = async () => {
//   let result = await Order.insertMany([
//     { item: "Bhagavatham", price: 999 },
//     { item: "Mahabharatham", price: 1599 },
//     { item: "Ramayanam", price: 999 },
//   ]);
//   console.log(result);
// };

// addOrders();
