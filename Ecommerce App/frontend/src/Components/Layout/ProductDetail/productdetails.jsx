import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Productdetails = () => {
   
    let {id} = useParams()
    
    const [productDetails,setProductDetails] = useState([])
    
    console.log(productDetails.images[0].url)
    useEffect(()=>{
      getProductDetails()
    },[])
 
    const getProductDetails = ()=>{
      axios.get(`http://localhost:5000/api/v1/products/${id}`).then(({data})=>setProductDetails(data.product))
    }
  return (
    <>
      <div>
          <div>
           <img src={productDetails.images[0].url} alt="Product Img" />
          </div>
          <div>

          </div>
      </div>

    </>
  )
}

export default Productdetails