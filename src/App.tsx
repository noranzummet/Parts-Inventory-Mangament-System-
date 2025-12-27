import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './assets/login/loginForm';
import Layout from './assets/layout/layout';
import ProductTable from './assets/itemsCrud/productTable';
import PartsInquiry from './assets/components/partsInquiry';
import AddNewPart from './assets/components/addNewPart';
import { useEffect } from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.withCredentials = true; // Required for Sanctum


function App() {
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/test')
      .then(res => console.log("Laravel says:", res.data))
      .catch(err => console.error("Connection failed:", err));
  }, []);
  return (

    
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />

        
        <Route element={<Layout />}>
         
          <Route path="/dashboard" element={<ProductTable />} />
          <Route path="/products" element={<ProductTable />} />
          <Route path="/inquiry" element={<PartsInquiry />} />
          <Route path='/AddNewPart' element={<AddNewPart/>}/>
          <Route path="/about" element={<h1 className="text-center mt-20">About Page</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
