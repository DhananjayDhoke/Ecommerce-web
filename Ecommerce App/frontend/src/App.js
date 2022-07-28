
import './App.css';
import Footer from './Components/Layout/Footer';
import {Routes,Route} from "react-router-dom"

import Header from './Components/Layout/Header';
import Home from './Components/Layout/Home/home';
import Productdetails from './Components/Layout/ProductDetail/productdetails';
function App() {
  return (
    <div className="App">
      <Header></Header>
         <Routes>
           <Route path='/' element={<Home></Home>}></Route>
           <Route path='/products/:id' element={<Productdetails></Productdetails>}></Route>
         </Routes>
        
        <Footer></Footer>
      
    </div>
  );
}

export default App;
