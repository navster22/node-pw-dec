const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500
    },
    type: {
        type: String,
        enum: ["task", "note", "idea", "bookmark"],
        required: [true, "Type is required"],
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    }
}, {timestamps: true});

itemSchema.index({title: 1});
itemSchema.index({type: 1, priority: 1});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;