import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "../components/Loader";
import { async } from "@firebase/util";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const register = async () => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      alert("Success");
    } catch (error) {
      setLoading(false);
      alert("Failed");
    }
  };

  return (
    <div className="register-parent">
      {loading && <Loader />}
      <div className="register-top"></div>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <lottie-player
            src="https://assets5.lottiefiles.com/packages/lf20_yr6zz3wv.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="col-md-4 z1">
          <div className="register-form">
            <h2>Register</h2>
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
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="text"
              className="form-control"
              placeholder="confirm password"
            />

            <button className="my-3" onClick={register}>
              REGISTER
            </button>
            <hr />
            <Link to="/login">Click here to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
