import { useContext, useEffect, useState } from "react";
import Pattern from "../assets/images/pattern.jpg";
import { MdEmail } from "react-icons/md";
import { MyContext } from "../App";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import googleIcon from "../assets/images/googleicon.webp";
import { login } from "../utils/apiFunction";
import { addUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [inputIndex, setInputIndex] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [invalidCredential, setInvalidCredential] = useState(false);

  const [errors, setErrors] = useState({});
  const focusInput = (index) => {
    setInputIndex(index);
  };
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    context.setisHideSidebarAndHeader(true);
    window.scrollTo(0, 0);
  }, []);

  const userLogin = async (event) => {
    event.preventDefault();
    try {
      const errors = validateForm();
      setErrors(errors);

      if (Object.keys(errors).length === 0) {
        const res = await login({
          email,
          password,
        });
        const data = await res.data.data;
        console.log(data);
        if (res.data.status === "ok") {
          localStorage.setItem("token", data.token);
          dispatch(addUser(data));
          navigate("/");
        } else {
          setInvalidCredential(true);
        }
      }
    } catch (error) {
      setInvalidCredential(true);

      console.log(error);
    }
  };

  const typeText = () => {
    const errors = validateForm();
    setErrors(errors);
  };

  const validateForm = () => {
    var errors = {};
    if (email === null || email.length === 0) {
      errors.email = "Required";
    }
    if (password === null || password.length === 0) {
      errors.password = "Required";
    }
    return errors;
  };

  return (
    <>
      <img src={Pattern} className="login-pattern" alt="background"></img>
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
                  className={`form-control ${errors?.email ? "input-error" : ""}`}
                  placeholder="Enter your email"
                  onFocus={() => focusInput(0)}
                  onBlur={() => {
                    setInputIndex(null);
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={() => typeText()}
                />
              </div>
              {errors && errors.email && (
                <div className="error">{errors.email}</div>
              )}
              <div
                className={`form-group position-relative ${inputIndex === 1 && "focus"}`}
              >
                <span className="icon">
                  <RiLockPasswordFill />
                </span>
                <input
                  type={isShowPassword ? "text" : "password"}
                  className={`form-control ${errors?.password ? "input-error" : ""}`}
                  placeholder="Enter your password"
                  onFocus={() => focusInput(1)}
                  onBlur={() => setInputIndex(null)}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyUp={() => typeText()}
                />

                <span
                  className="toggle-show-password"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword === true ? <IoMdEyeOff /> : <IoMdEye />}
                </span>
              </div>
              {errors && errors.password && (
                <div className="error">{errors.password}</div>
              )}

              <div className="form-group">
                <Button className="btn-blue btn-big w-100" onClick={userLogin}>
                  Sign In
                </Button>
              </div>
              {invalidCredential && (
                <div className="error text-center">Invalid Credential</div>
              )}
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
                  <img
                    src={googleIcon}
                    width="30"
                    height="30"
                    alt="sign in with google"
                  />{" "}
                  &nbsp; Sign In With Google
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
