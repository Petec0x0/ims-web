import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "pages/Layout";
import Login from "pages/Login";
import Onboard from "pages/Onboard";
import NotFound from "pages/NotFound";
import DashboardLayout from "pages/DashboardLayout";
import Overview from "pages/Overview";
import Brands from "pages/Brands";
import Categories from "pages/Categories";
import Customers from "pages/Customers";
import Inventory from "pages/Inventory";
import Sales from "pages/Sales";
import SubCategories from "pages/SubCategories";
import Suppliers from "pages/Suppliers";
import Invoice from "pages/Invoice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="onboard" element={<Onboard />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="dashboard/" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="brands" element={<Brands />} />
          <Route path="categories" element={<Categories />} />
          <Route path="customers" element={<Customers />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="sales" element={<Sales />} />
          <Route path="sub-categories" element={<SubCategories />} />
          <Route path="suppliers" element={<Suppliers />} />
        </Route>
        <Route path="invoice/:reference" element={<Invoice />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
