import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";


//  Add to Cart
export const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const qty = quantity || 1  // 👈 fallback fix
        const userId = req.user.id;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const productExists = await Product.findById(productId);
        if (!productExists) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += qty  // 👈 use qty
        } else {
            cart.items.push({ product: productId, quantity: qty })  // 👈 use qty
        }

        await cart.save();
        res.status(200).json({ success: true, cart })  // 👈 match frontend expectation

    } catch (error) {
        next(error);
    }
};


//  Get Cart
export const getCart = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ user: userId })
            .populate("items.product");

        if (!cart) {
            return res.status(200).json({ success: true, cart: [] });
        }

        res.status(200).json({ success: true, cart: cart.items });  // 👈 send cart.items

    } catch (error) {
        next(error);
    }
};


//  Remove Item
export const removeFromCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();
        res.status(200).json({ success: true, cart: cart.items });

    } catch (error) {
        next(error);
    }
};
export const updateQuantity = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
        }

        await cart.save();

        const updated = await Cart.findOne({ user: userId }).populate("items.product");
        res.status(200).json({ success: true, cart: updated.items });

    } catch (error) {
        next(error);
    }
};

//  Clear Cart
export const clearCart = async (req, res,next) => {
    try {
        const userId = req.user.id;

        await Cart.findOneAndUpdate(
            { user: userId },
            { items: [] }
        );

        res.status(200).json({ message: "Cart cleared" });

    } catch (error) {
       next(error);
    }
};
