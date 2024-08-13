import { useContext, useEffect, useState } from "react";
import Pattern from "../assets/images/pattern.jpg";
import { MdEmail } from "react-icons/md";
import { MyContext } from "../App";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import googleIcon from "../assets/images/googleicon.webp";
const Login = () => {
  const [inputIndex, setInputIndex] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const focusInput = (index) => {
    setInputIndex(index);
  };
  const context = useContext(MyContext);
  useEffect(() => {
    context.setisHideSidebarAndHeader(true);
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <img src={Pattern} className="login-pattern"></img>
      <section className="login-section">
        <div className="login-box">
          <div className="logo text-center">
            <h2>E-Com</h2>
            <h5 className="font-weight-bold">Login to E-Com</h5>
          </div>
          <div className="wrapper mt-3 card border">
            <form>
              <div
                className={`form-group position-relative ${inputIndex === 0 && "focus"}`}
              >
                <span className="icon">
                  <MdEmail />
                </span>
                <input
                  type="text"
                  autoFocus
                  className="form-control"
                  placeholder="Enter your email"
                  onFocus={() => focusInput(0)}
                  onBlur={() => {
                    setInputIndex(null);
                  }}
                />
              </div>
              <div
                className={`form-group position-relative ${inputIndex === 1 && "focus"}`}
              >
                <span className="icon">
                  <RiLockPasswordFill />
                </span>
                <input
                  type={`${isShowPassword === true ? "true" : "password"}`}
                  className="form-control"
                  placeholder="Enter your password"
                  onFocus={() => focusInput(1)}
                  onBlur={() => {
                    setInputIndex(null);
                  }}
                />
                <span
                  className="toggle-show-password"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword === true ? <IoMdEyeOff /> : <IoMdEye />}
                </span>
              </div>

              <div className="form-group">
                <Button className="btn-blue btn-big w-100">Sign In</Button>
              </div>
              <div className="form-group text-center mb-0">
                <Link to={"/forgot-passowrd"} className="link">
                  Forgot Password
                </Link>

                <div className="d-flex align-items-center justify-content-center or mt-3 mb-3">
                  <span className="line"></span>
                  <span className="txt">or</span>
                  <span className="line"></span>
                </div>
                <Button
                  variant="outlined"
                  className="w-100 btn-big login-with-google"
                >
                  <img src={googleIcon} width="30" height="30" /> &nbsp; Sign In
                  With Google
                </Button>
              </div>
            </form>
          </div>
          <div className="wrapper mt-3 card border footer p-3">
            <span className="text-center signup-text">
              Don't have an account?
              <Link to={"/signup"} className="link color ml-2">
                Register
              </Link>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
