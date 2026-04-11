import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "./Button";
import { setUser, updateProfile } from "../store/userSlice";

export default function ProfileForm() {
  const { user, role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:5000/api/users/me", {
        credentials: "include",
      });
      const data = await res.json();
      dispatch(setUser(data.user));
      setFormData(data.user);
    };
    fetchUser();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/users/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
      return;
    }
    dispatch(updateProfile(data.user));
    alert("Profile updated!");
  };

  // fields based on role
  const donorFields = ["name", "email", "bloodgroup", "phone", "city"];
  const hospitalFields = ["name", "email", "city", "phone", "licenseNumber"];

  const fields = role === "donor" ? donorFields : hospitalFields;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-sm p-6 rounded-md">
      <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>

            <input
              type="text"
              name={key}
              value={formData[key] || ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2 text-sm"
            />
          </div>
        ))}

        <div className="mt-6">
          <Button text="Save Changes" type="submit" />
        </div>
      </form>
    </div>
  );
}
