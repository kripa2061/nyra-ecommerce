import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import Style from "../models/styleModel.js";

export const addToCart = async (req, res, next) => {
  try {
    const { productId, styleId, quantity } = req.body;
    const qty = quantity || 1;
    const userId = req.user.id;

    if (!productId && !styleId) {
      return res.status(400).json({
        success: false,
        message: "Product or Style required",
      });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    if (productId) {
      const productExists = await Product.findById(productId);
      if (!productExists) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
    }

    if (styleId) {
      const styleExists = await Style.findById(styleId);
      if (!styleExists) {
        return res.status(404).json({ success: false, message: "Style not found" });
      }
    }

    const itemIndex = cart.items.findIndex((item) => {
      if (productId) return item.product?.toString() === productId;
      if (styleId) return item.style?.toString() === styleId;
    });

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += qty;
    } else {
      cart.items.push({
        product: productId || null,
        style: styleId || null,
        quantity: qty,
      });
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId })
      .populate("items.product")
      .populate("items.style");

    res.status(200).json({
      success: true,
      cart: updatedCart.items,
    });
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product")
      .populate("items.style");

    if (!cart) {
      return res.status(200).json({ success: true, cart: [] });
    }

    res.status(200).json({
      success: true,
      cart: cart.items,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, styleId } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => {
      if (productId) return item.product?.toString() !== productId;
      if (styleId) return item.style?.toString() !== styleId;
      return true;
    });

    await cart.save();

    const updated = await Cart.findOne({ user: userId })
      .populate("items.product")
      .populate("items.style");

    res.status(200).json({
      success: true,
      cart: updated.items,
    });
  } catch (error) {
    next(error);
  }
};

export const updateQuantity = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, styleId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex((item) => {
      if (productId) return item.product?.toString() === productId;
      if (styleId) return item.style?.toString() === styleId;
    });

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    const updated = await Cart.findOne({ user: userId })
      .populate("items.product")
      .populate("items.style");

    res.status(200).json({
      success: true,
      cart: updated.items,
    });
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const userId = req.user.id;

    await Cart.findOneAndUpdate(
      { user: userId },
      { items: [] }
    );

    res.status(200).json({
      success: true,
      message: "Cart cleared",
    });
  } catch (error) {
    next(error);
  }
};