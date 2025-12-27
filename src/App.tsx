import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './assets/login/loginForm';
import Layout from './assets/layout/layout';
import ProductTable from './assets/itemsCrud/productTable';
import PartsInquiry from './assets/components/partsInquiry';
import AddNewPart from './assets/components/addNewPart';


function App() {
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
