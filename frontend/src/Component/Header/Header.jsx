import React from "react";
import { assets } from "../../assets/assets";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="header">
        <img src={assets.header} alt="Header" className="header-img" />
        <div className="header-overlay">
          <div className="header-content">
            <p>Made to Be Worn Beautifully</p>
            <span>Effortless elegance, designed just for you.</span>
            <Link to={`/product`}> <button className="header-btn">Shop the Collection</button></Link>
          </div>
        </div>
      </div>

      <div className="about-us">
        <div className="about-us-image">
          <div className="about-us-text-container">
            <h2>Discover Your Perfect Styles</h2>
            <p>
              Nyra helps you explore fashion that suits your personality, body type,
              and mood. Curated outfits, seasonal collections, and personalized
              suggestions all in one app.
            </p>
         <Link to="/style-inspiration">  <button className="find-style-btn">Find My Style</button></Link> 
          </div>
          <img src={assets.classy} alt="Classy Style" />
        </div>

        <section className="heighlight">
          <div className="heighlight">
            <h2>Our Highlights</h2>
          </div>



          <div className="highlights">
            <div className="highlight-card">
              <img src={assets.hanger} alt="Personalized Outfits" />
              <p>Personalized Outfits</p>
              <p>Custom styles for you</p>
            </div>
            <div className="highlight-card" onClick={() => navigate("/style-inspiration")}>
              <img src={assets.love2} alt="Style Inspiration" />
              <p>Style Inspiration</p>
              <p>Trendy looks & tips</p>
            </div>
            <div className="highlight-card" onClick={() => navigate("/seasonal-collection")} >
              <img
                src={assets.collection}
                alt="Seasonal Collections"
               
              />
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