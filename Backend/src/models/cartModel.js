import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      default: null,
    },

    style: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Style",
      default: null,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
  },
  { timestamps: true }
);

cartItemSchema.pre("validate", function (next) {
  if (this.product && this.style) {
    return next(new Error("Cart item cannot have both product and style"));
  }

  if (!this.product && !this.style) {
    return next(new Error("Cart item must have either product or style"));
  }

  
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: [cartItemSchema],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;