import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './assets/login/loginForm';
import Layout from './assets/layout/layout';
import ProductTable from './assets/itemsCrud/productTable';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* صفحة تسجيل الدخول منفصلة تماماً عن الـ Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} /> {/* اجعل صفحة البداية هي اللوجن */}

        {/* الصفحات التي تحتوي على Navbar (Layout) */}
        <Route element={<Layout />}>
          {/* هذا هو الجدول، سيظهر الآن عند الدخول لـ /products */}
          <Route path="/products" element={<ProductTable />} />
          
          <Route path="/dashboard" element={<h1 className="text-center mt-20 text-3xl">Dashboard</h1>} />
          <Route path="/about" element={<h1 className="text-center mt-20 text-3xl">About</h1>} />
          
          {/* إذا كنت تريد الجدول أن يظهر مباشرة بعد تسجيل الدخول كصفحة رئيسية داخل الـ Layout */}
          {/* <Route index element={<ProductTable />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
