const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ["todo", "in-progress", "done"], 
    default: "todo" 
  }
});

module.exports = mongoose.model("Todo", TodoSchema);
