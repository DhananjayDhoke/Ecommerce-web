
import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"
import "./product.css"



const Product = ({product}) => {
  const options ={
    size: 30,
    activeColor: "red",
    value: product.ratings,
    isHalf: true,
}
  return (
    <div id='maindiv'>
      <Link to={`products/${product._id}`}>
        <div id='productdiv'>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options}/>
                <span>{product.numofReviews} reviews</span>
            </div>
            <span>Price Rs.{product.price}</span>
        </div>
      </Link>
    </div>
  )
}

export default Product