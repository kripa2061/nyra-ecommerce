import React from 'react'
import ProductCard from '../ProductCard/ProductCard'

const Wishlist = ({ wishlist, setWishlist }) => {
  return (
    <div>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        wishlist.map((item) => (
          <ProductCard
            key={item._id}         
            product={item}
            setWishlist={setWishlist} 
          />
        ))
      )}
    </div>
  )
}

export default Wishlist