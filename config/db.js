const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://hamzajoshan:TGHXFM86DCNHTav@moneyexchanger.recgs.mongodb.net/angelUssianTodoDB?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );

    console.log(`Mongodb Connected `);
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
