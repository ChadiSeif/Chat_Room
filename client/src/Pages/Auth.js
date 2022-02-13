import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../JS/actions/userActions";

import "./Auth.css";

const Auth = ({ socket }) => {
  const error = useSelector((state) => state.userReducer.loginError);
  const isAuth = useSelector((state) => state.userReducer.isAuth);

  const navigate = useNavigate();
  //errors
  const registerErrors = useSelector(
    (state) => state.userReducer.registerErrors
  );

  const dispatch = useDispatch();
  const [signUpActive, setsignUpActive] = useState(false);
  const [userLoginInformations, setUserLoginInformations] = useState({
    username: "",
    password: "",
  });

  const [userRegisterInformations, setUserRegisterInformations] = useState({
    username: "",
    email: "",
    password: "",
  });

  const HandleRegister = (e) => {
    setUserRegisterInformations({
      ...userRegisterInformations,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div>
        <div
          className={
            signUpActive ? "container right-panel-active" : "container"
          }
          id="container"
        >
          <div className="form-container sign-up-container">
            <form action="#">
              <h1>Create Account</h1>

              {registerErrors &&
                registerErrors.map((err) => (
                  <div style={{ fontSize: 12, color: "red" }}>
                    <span>{err.username}</span>
                    <span>{err.email}</span>
                    <span>{err.password}</span>
                  </div>
                ))}

              <input
                type="text"
                placeholder="Name"
                name="username"
                className="form-control mt-4"
                onChange={(e) => HandleRegister(e)}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control"
                onChange={(e) => HandleRegister(e)}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                onChange={(e) => HandleRegister(e)}
              />
              {/* <input
                type="room"
                name="room"
                placeholder="Room_Id"
                className="form-control"
                onChange={(e) => setRoom(e)}
              /> */}
              <button
                className="buttonAuth"
                type="submit"
                onClick={(e) => {
                  dispatch(registerUser(userRegisterInformations));
                  e.preventDefault();
                }}
              >
                Sign Up
              </button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form action="#">
              <h1>Sign in</h1>
              <div className="formsContainer mt-4">
                {error ? <span style={{ color: "red" }}>{error}</span> : null}
                <input
                  className="form-control"
                  type="text"
                  placeholder="Username"
                  onChange={(e) =>
                    setUserLoginInformations({
                      ...userLoginInformations,
                      username: e.target.value,
                    })
                  }
                />
                <input
                  type="password"
                  className="form-control mb-4"
                  placeholder="Password"
                  onChange={(e) =>
                    setUserLoginInformations({
                      ...userLoginInformations,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => alert("Ma3andi mana3melek :)")}
              >
                Forgot your password?
              </p>

              <button
                className="buttonAuth"
                type="submit"
                onClick={(e) => {
                  dispatch(loginUser(userLoginInformations, navigate));
                  e.preventDefault();
                }}
              >
                Sign In
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="buttonAuth ghost"
                  id="signIn"
                  onClick={() => setsignUpActive(false)}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start chatting with us</p>
                <button
                  className="buttonAuth ghost"
                  id="signUp"
                  onClick={() => setsignUpActive(true)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
