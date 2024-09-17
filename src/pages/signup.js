import { useContext, useEffect, useState } from "react";
import Pattern from "../assets/images/pattern.jpg";
import { MdEmail } from "react-icons/md";
import { MyContext } from "../App";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff, IoMdHome } from "react-icons/io";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import googleIcon from "../assets/images/googleicon.webp";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { register } from "../utils/apiFunction";
const SignUp = () => {
  const [inputIndex, setInputIndex] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isConfirmShowPassword, setIsConfirmShowPassword] = useState(false);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confPassword, setConfPassword] = useState(null);
  const [errors, setErrors] = useState({});

  const registerUser = async (event) => {
    event.preventDefault();
    console.log(name, email, password, confPassword);
    const errors = validateForm();
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      const res = await register({
        name,
        email,
        password,
      });
    }
  };

  const focusInput = (index) => {
    setInputIndex(index);
  };

  const validateForm = () => {
    var errors = {};
    if (name === null || name.length === 0) {
      errors.name = "Required";
    }
    if (email === null || email.length === 0) {
      errors.email = "Required";
    }
    if (password === null || password.length === 0) {
      errors.password = "Required";
    }
    if (confPassword === null || confPassword.length === 0) {
      errors.confPassword = "Required";
    } else if (password !== confPassword) {
      errors.confPassword = "Password does not match";
    }
    return errors;
  };
  const context = useContext(MyContext);
  useEffect(() => {
    context.setisHideSidebarAndHeader(true);
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <img src={Pattern} className="login-pattern" alt=""></img>
      <section className="login-section signup-section">
        <div className="row">
          <div className="col-md-8 d-flex align-items-center justify-content-center flex-column part1">
            <h1>
              BEST UX/UI fEATURED{" "}
              <span className="text-sky">ECOMMERCE DASHBOARD</span> & ADMIN
              PANEL
            </h1>

            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti
              eaque officia ad praesentium dicta exercitationem! Nemo laboriosam
              ullam officiis quas delectus quisquam eius optio facilis magni
              incidunt quia odit blanditiis dolorem molestiae tempore,
              praesentium perspiciatis accusamus quibusdam ducimus, suscipit
              sequi rem laudantium quo.
            </p>
            <div className="w-100 mt-4">
              <Link to={"/"}>
                <Button className="btn-blue btn-lg btn-big">
                  <IoMdHome />
                  Go To Home
                </Button>
              </Link>
            </div>
          </div>
          <div className="col-md-4 pr-0">
            <div className="login-box">
              <div className="logo text-center">
                <h2>E-Com</h2>
                <h5 className="font-weight-bold">Register a new account</h5>
              </div>
              <div className="wrapper mt-3 card border">
                <form>
                  <div
                    className={`form-group position-relative ${inputIndex === 0 && "focus"}`}
                  >
                    <span className="icon">
                      <FaUserCircle />
                    </span>
                    <input
                      type="text"
                      autoFocus
                      className={`form-control ${errors?.name ? "input-error" : ""}`}
                      placeholder="Enter your name"
                      onFocus={() => focusInput(0)}
                      onBlur={() => {
                        setInputIndex(null);
                      }}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  {errors && errors.name && (
                    <div className="error">{errors.name}</div>
                  )}
                  <div
                    className={`form-group position-relative ${inputIndex === 1 && "focus"}`}
                  >
                    <span className="icon">
                      <MdEmail />
                    </span>
                    <input
                      type="text"
                      className={`form-control ${errors?.email ? "input-error" : ""}`}
                      placeholder="Enter your email"
                      onFocus={() => focusInput(1)}
                      onBlur={() => {
                        setInputIndex(null);
                      }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {errors && errors.email && (
                    <div className="error">{errors.email}</div>
                  )}
                  <div
                    className={`form-group position-relative ${inputIndex === 2 && "focus"}`}
                  >
                    <span className="icon">
                      <RiLockPasswordFill />
                    </span>
                    <input
                      type={`${isShowPassword === true ? "true" : "password"}`}
                      className={`form-control ${errors?.password ? "input-error" : ""}`}
                      placeholder="Enter your password"
                      onFocus={() => focusInput(2)}
                      onChange={(e) => setPassword(e.target.value)}
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
                  <div
                    className={`form-group position-relative ${inputIndex === 3 && "focus"}`}
                  >
                    <span className="icon">
                      <IoShieldCheckmarkSharp />
                    </span>
                    <input
                      type={`${isConfirmShowPassword === true ? "true" : "password"}`}
                      className={`form-control ${errors?.confPassword ? "input-error" : ""}`}
                      placeholder="Confirm your password"
                      onFocus={() => focusInput(3)}
                      onChange={(e) => setConfPassword(e.target.value)}
                    />
                    <span
                      className="toggle-show-password"
                      onClick={() =>
                        setIsConfirmShowPassword(!isConfirmShowPassword)
                      }
                    >
                      {isConfirmShowPassword === true ? (
                        <IoMdEyeOff />
                      ) : (
                        <IoMdEye />
                      )}
                    </span>
                  </div>
                  {errors && errors.confPassword && (
                    <div className="error">{errors.confPassword}</div>
                  )}

                  <FormControlLabel
                    control={<Checkbox />}
                    label="I agree to all the terms & conditions"
                  />

                  <div className="form-group">
                    <Button
                      className="btn-blue btn-big w-100"
                      onClick={registerUser}
                    >
                      Sign UP
                    </Button>
                  </div>
                  <div className="form-group text-center mb-0">
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
                <span className="text-center mt-3 signup-text">
                  Already have an account?
                  <Link to={"/login"} className="link color ml-2">
                    Sign In
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default SignUp;
