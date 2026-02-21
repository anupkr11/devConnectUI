import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("This is about me");
  const [photoURL, setPhotoURL] = useState("");
  const [err, setErr] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "login",
        { email, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setErr(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "signup",
        { firstName, lastName, age, gender, about, email, password, photoURL },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.user));
      return navigate("/");
    } catch (err) {
      setErr(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto mt-10">
      <legend className="fieldset-legend">
        {isLogin ? "Login" : "New User Sign Up"}
      </legend>

      {!isLogin && (
        <>
          <label className="label">First Name</label>
          <input
            type="text"
            className="input"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            className="input"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="label">Age</label>
          <input
            type="number"
            className="input"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label className="label">Gender</label>
          <input
            type="text"
            className="input"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />

          <label className="label">About</label>
          <input
            type="text"
            className="input"
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <label className="label">Photo URL</label>
          <input
            type="text"
            className="input"
            placeholder="Photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </>
      )}

      <label className="label">Email</label>
      <input
        type="email"
        className="input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="label">Password</label>
      <input
        type="password"
        className="input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <p className="text-error mt-2">{err}</p>

      <button
        className="btn btn-neutral mt-4 w-full"
        onClick={isLogin ? handleLogin : handleSignup}
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>

      <p
        className="text-center mt-3 cursor-pointer text-blue-500"
        onClick={() => {
          setIsLogin(!isLogin);
          setErr("");
        }}
      >
        {isLogin ? "New user? Sign Up here" : "Already have an account? Login"}
      </p>
    </fieldset>
  );
};

export default Login;
