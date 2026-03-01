// components/ProfileForm.jsx
import React, { useState } from "react";
import Button from "./Button";

export default function ProfileForm({ initialData, type = "donor", onEdit }) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow p-6 rounded-md">
      <h1 className="text-2xl font-semibold mb-6">
        {type === "donor" ? "Your Profile" : "Hospital Profile"}
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2 text-sm"
            />
          </div>
        ))}

        <div className="mt-6">
          <Button text="Save Changes" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
}