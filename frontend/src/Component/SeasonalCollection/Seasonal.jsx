import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ProductCard from '../ProductCard/ProductCard'
import "./Seasonal.css"

const Seasonal = () => {

    const [product, setProduct] = useState([])
    const [selectedseason, setSelectedSeason] = useState("summer")

    const url = "http://localhost:8000";

    const fetchProduct = async () => {
        try {

            const response = await axios.get(
                `${url}/api/product/getProduct`,
                {withCredentials: true }
            )

            if (response.data) {
                setProduct(response.data.data)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    const filteredProduct = product.filter(
        (item) => item.season === selectedseason
    )

    return (
        <div className='seasonal-container'>

            <div className='seasonal-header'>
                <h1>Seasonal Collection</h1>
                <p>Discover styles made for every season ✨</p>
            </div>

            <div className='season-buttons'>

                <button
                    className={selectedseason === "summer" ? "active-season" : ""}
                    onClick={() => setSelectedSeason("summer")}
                >
                    ☀️ Summer
                </button>

                <button
                    className={selectedseason === "winter" ? "active-season" : ""}
                    onClick={() => setSelectedSeason("winter")}
                >
                    ❄️ Winter
                </button>

                <button
                    className={selectedseason === "spring" ? "active-season" : ""}
                    onClick={() => setSelectedSeason("spring")}
                >
                    🌸 Spring
                </button>

                <button
                    className={selectedseason === "autumn" ? "active-season" : ""}
                    onClick={() => setSelectedSeason("autumn")}
                >
                    🍂 Autumn
                </button>

            </div>

            {filteredProduct.length > 0 ? (

                <div className='seasonal-products'>

                    {filteredProduct.map((item) => (

                        <div key={item._id}>
                            <ProductCard product={item} />
                        </div>

                    ))}

                </div>

            ) : (

                <div className='season-loading'>
                    No Products Found
                </div>

            )}

        </div>
    )
}

export default Seasonal