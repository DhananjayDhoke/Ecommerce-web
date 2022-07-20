
import './App.css';
import Footer from './Components/Layout/Footer';
import {Routes,Route} from "react-router-dom"

import Header from './Components/Layout/Header';
import Home from './Components/Layout/Home/home';
function App() {
  return (
    <div className="App">
      <Header></Header>
         <Routes>
           <Route path='/' element={<Home></Home>}></Route>
         </Routes>
        
        <Footer></Footer>
      
    </div>
  );
}

export default App;
