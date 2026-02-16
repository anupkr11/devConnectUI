import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("devil@gmail.com");
    const [password, setPassword] = useState("Devil@123");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/login", {
                email: email,
                password: password
            },{withCredentials: true});
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    }
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto mt-10">
      <legend className="fieldset-legend">Login</legend>

      <label className="label">Email</label>
      <input type="email" className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

      <label className="label">Password</label>
      <input type="password" className="input" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button className="btn btn-neutral mt-4" onClick={handleSubmit}>Login</button>
    </fieldset>
  );
};

export default Login;
