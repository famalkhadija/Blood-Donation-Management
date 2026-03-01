import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("donor");
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", { email, password, role });
    if (role === "donor" && isLoggedIn == true) navigate("/donor");
    else if (role === "hospital" && isLoggedIn == true)
      navigate("/hospital");
    else {
      alert("You are not registered yet, please register first!");
      navigate("/");
    }
  };

  return (
    <div className="flex">
      <div className="left hidden md:block w-[25vw] bg-gray-100 h-screen">
        <div className="flex justify-center items-center mt-30 gap-2">
          <img className="w-18" src="src/assets/blood-icon.png" alt="logo" />
          <h1 className="font-bold text-2xl text-purple-950 pt-5">BDMS</h1>
        </div>
        <p className="text-center mt-10 text-purple-950 px-5 xl:px-20">
          Rapid Blood Donation Solution for Faster Medical Support.
        </p>
      </div>
      <div className="right w-[75vw] flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="md:w-[45vw] w-full md:ml-[1vw] ml-[10vw]  pb-5 bg-white rounded-lg shadow-sm flex flex-col pt-5 items-center gap-3"
        >
          <h2 className="text-2xl font-bold ">Login</h2>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <span className="flex gap-2 self-start ml-[10%]">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <p className="text-sm">Show Password</p>
          </span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-[80%] p-2 border border-gray-300 rounded"
          >
            <option value="donor">Donor</option>
            <option value="hospital">Hospital</option>
          </select>
          <p className="text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link to="/" className="text-purple-950 font-bold">
              Register
            </Link>
          </p>
          <Button text="Login" onClick={handleSubmit}/>
        </form>
      </div>
    </div>
  );
}
