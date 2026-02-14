import React from "react";
import { assets } from "../../assets/assets";
import "./Header.css";

const Header = () => {
  return (
    <>
      {/* HEADER / HERO */}
      <div className="header">
        <img src={assets.header} alt="Header" className="header-img" />

        <div className="header-overlay">
          <div className="header-content">
            <p>Made to Be Worn Beautifully</p>
            <span>Effortless elegance, designed just for you.</span>
            <button className="header-btn">Shop the Collection</button>
          </div>
        </div>
      </div>

      {/* ABOUT US */}
      <div className="about-us">
        <div className="about-us-image">
          <h2>Discover Your Perfect Styles</h2>
          <p>
            Nyra helps you explore fashion that suits your personality, body type,
            and mood. Curated outfits, seasonal collections, and personalized
            suggestions all in one app.

<<<<<<< Updated upstream
        </p>
    {/* <img src={assets.classy}/> */}
</div>
=======
          </p>
          <img src={assets.classy} />
        </div>
>>>>>>> Stashed changes

        <section>
          <h2>Our Highlights</h2>

          <div className="highlights">

            <div className="highlight-card">
              <img src={assets.hanger} alt="Personalized Outfits" />
              <p>Personalized Outfits</p>
              <p>Custom styles for you</p>
            </div>

            <div className="highlight-card">
              <img src={assets.love2} alt="Style Inspiration" />
              <p>Style Inspiration</p>
              <p>Trendy looks & tips</p>
            </div>

            <div className="highlight-card">
              <img src={assets.collection} alt="Seasonal Collections" />
              <p>Seasonal Collections</p>
              <p>Curated for every season</p>
            </div>
            
            <div className="highlight-card">
              <img src={assets.gift} alt="Gift Wrapping" />
              <p>Gift Wrapping</p>
              <p>Perfect for your loved ones</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Header;
