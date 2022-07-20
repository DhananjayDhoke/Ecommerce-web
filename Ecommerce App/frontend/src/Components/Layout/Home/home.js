
import React from 'react'
import Product from '../Product/product'
import "./home.css"

const product={
    name:"T-Shit",
    images:[{url:"https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHQlMjBzaGl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"}],
    price:100,
    _id:"dj"
}
const Home = () => {
  return (
    <>
      <div id='homeContainer'>
          <p className='homep'>Welcome to ecomerace </p>
          <h1 className=''>Find amazing product below</h1>
          <a href="#pdiv">
            <button className='sbutton'>Scroll</button>
          </a>
      </div>
      <div id='pdiv'>
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        

      </div>
    </>
  )
}

export default Home