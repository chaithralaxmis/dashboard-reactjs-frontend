import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Header from "./components/header";
import ProductDetails from "./pages/productDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/sidebar";
import { createContext, useEffect, useState } from "react";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import ProductUpload from "./pages/productUpload";
const MyContext = createContext();
function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isHideSidebarAndHeader, setisHideSidebarAndHeader] = useState(false);
  const [lightTheme, setLightThemeMode] = useState(true);

  useEffect(() => {
    if (lightTheme === true) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
    localStorage.setItem("lightTheme", lightTheme);
  }, [lightTheme]);

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setisHideSidebarAndHeader,
    lightTheme,
    setLightThemeMode,
  };
  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {isHideSidebarAndHeader !== true && <Header />}
        <div className="main d-flex">
          {isHideSidebarAndHeader !== true && (
            <div
              className={`sidebar-wrapper ${isToggleSidebar === true ? "toggle" : ""}`}
            >
              <Sidebar />
            </div>
          )}

          <div
            className={`content ${isHideSidebarAndHeader === true ? "full" : ""} ${isToggleSidebar === true ? "toggle" : ""} `}
          >
            <Routes>
              <Route path="/" exact={true} element={<Dashboard />} />
              <Route path="/dashboard" exact={true} element={<Dashboard />} />
              <Route path="/login" exact={true} element={<Login />} />
              <Route path="/signup" exact={true} element={<SignUp />} />
              <Route
                path="/product/details"
                exact={true}
                element={<ProductDetails />}
              />
              <Route
                path="/product/upload"
                exact={true}
                element={<ProductUpload />}
              />
            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
