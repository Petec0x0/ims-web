import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "pages/Layout";
import Login from "pages/Login";
import Onboard from "pages/Onboard";
import NotFound from "pages/NotFound";
import DashboardLayout from "pages/DashboardLayout";

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
          
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
