import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";


//  Add to Cart
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const productExists = await Product.findById(productId);
        if (!productExists) {
            return res.status(404).json({ message: "Product not found" });
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//  Get Cart
export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ user: userId })
            .populate("items.product");

        if (!cart) {
            return res.status(200).json({ items: [] });
        }

        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//  Remove Item
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();
        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//  Clear Cart
export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        await Cart.findOneAndUpdate(
            { user: userId },
            { items: [] }
        );

        res.status(200).json({ message: "Cart cleared" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
