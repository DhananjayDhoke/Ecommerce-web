
import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"
import "./product.css"

const options ={
    size: 30,
    activeColor: "red",
    value: 2.5,
    isHalf: true,
}

const Product = ({product}) => {
  return (
    <div id='maindiv'>
      <Link to={product._id}>
        <div id='productdiv'>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options}/>
                <span>(22 Rweviews)</span>
            </div>
            <span>{product.price}</span>
        </div>
      </Link>
    </div>
  )
}

export default Product