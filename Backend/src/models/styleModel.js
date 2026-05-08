import mongoose from "mongoose";
const styleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        enum: ["Date Night",
            "Office",
            "Traditional",
            "Festive",
            "Casual",
            "Brunch",
            "Vacation",
            "Wedding Guest",],
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,

    },
    stock:{
        type:String
    },
    sizes: {
        type: String
    },
    color: {
        type: String
    },
    images: [String],
    price: {
        type: Number,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})
const styleModel = mongoose.model("Style", styleSchema)
export default styleModel;