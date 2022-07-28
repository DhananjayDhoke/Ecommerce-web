
import React, { useEffect, useState } from 'react'
import Product from '../Product/product'
import axios from "axios"
import "./home.css"


const Home = () => {

  const [product,setProduct] = useState([])
 
   useEffect(()=>{
     getProduct()
   },[])

   const getProduct = ()=>{
     axios.get("http://localhost:5000/api/v1/products").then(({data})=>setProduct(data.product))
   }
  return (
    <>
      <div id='homeContainer'>
          <h4 >Welcome to Ecomerace </h4>
          <h1>Find amazing product below</h1>
          <a href="#pdiv">
            <button className='sbutton'>Scroll</button>
          </a>
      </div>
      <div id='pdiv'>
        
        {product.map((e)=><Product product={e} />)}
        
        
        

      </div>
    </>
  )
}

export default Home