import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/userSlice";
export default function Register() {
  const [role, setRole] = useState("donor");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bloodgroup: "",
    city: "",
    phone: "",
    hospitalName: "",
    licenseNumber: "",
  });
  const { confirmPassword, ...cleanData } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // handle inputs change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ role, profile: cleanData }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "Registration failed");
      return;
    }
    dispatch(
      registerUser({
        ...data.user,
      }),
    );
    navigate(data.user.role === "donor" ? "/donor" : "/hospital");
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
          className="md:w-[45vw] w-full md:ml-[1vw] ml-[10vw] pb-5 bg-white rounded-lg shadow-sm flex flex-col pt-5 items-center gap-3"
        >
          <h2 className="text-2xl font-bold ">Register</h2>

          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />

          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />

          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-[80%] p-2 border border-gray-300 rounded"
          >
            <option value="donor">Donor</option>
            <option value="hospital">Hospital</option>
          </select>

          {role === "donor" && (
            <>
              <select
                name="bloodgroup"
                value={formData.bloodgroup}
                onChange={handleChange}
                className="w-[80%] p-2 border border-gray-300 rounded"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>

              <Input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
              />

              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </>
          )}

          {role === "hospital" && (
            <>
              <Input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
              />

              <Input
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                placeholder="Hospital Name"
                required
              />

              <Input
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                placeholder="License Number"
                required
              />

              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </>
          )}

          <p className="text-gray-400 text-sm">
            Already registered?
            <Link to="/login" className="text-purple-950 font-bold">
              {" "}
              Login here
            </Link>
          </p>

          <Button text="Register" type="submit" />
        </form>
      </div>
    </div>
  );
}
