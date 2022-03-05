import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Loader from "../components/Loader";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const login = async () => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("currentUserCommerce", JSON.stringify(result));
      setLoading(false);
      alert("Success");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Failed");
    }
  };

  return (
    <div className="login-parent">
      {loading && <Loader />}
      <div className="row justify-content-center">
        <div className="col-md-4 z1">
          <div className="login-form">
            <h2>Login</h2>
            <hr />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="form-control"
              placeholder="email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              className="form-control"
              placeholder="password"
            />

            <button className="my-3" onClick={login}>
              LOGIN
            </button>
            <hr />
            <Link to="/register">Click here to Register</Link>
          </div>
        </div>
        <div className="col-md-5 z1">
          <lottie-player
            src="https://assets5.lottiefiles.com/packages/lf20_yr6zz3wv.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>

      <div className="login-bottom"></div>
    </div>
  );
}

export default LoginPage;
