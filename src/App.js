import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Header from "./components/header";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/sidebar";
import { createContext, useState } from "react";
const MyContext = createContext();
function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
  };
  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <Header />
        <div className="main d-flex">
          <div
            className={`sidebar-wrapper ${isToggleSidebar === true ? "toggle" : ""}`}
          >
            <Sidebar />
          </div>
          <div
            className={`content  ${isToggleSidebar === true ? "toggle" : ""} `}
          >
            <Routes>
              <Route path="/" exact={true} element={<Dashboard />} />
              <Route path="/dashboard" exact={true} element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
