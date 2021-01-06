const mongoose = require("mongoose");
const ToDoSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: String,
    default: "active",
    enum: ["completed", "active"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Todo", ToDoSchema);
