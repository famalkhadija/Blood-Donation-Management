// pages/Donor/DonorProfile.jsx
import React from "react";
import ProfileForm from "../../components/ProfileForm";

export default function DonorProfile() {
  const donorData = {
    name: "John Doe",
    email: "john@example.com",
    bloodgroup: "A+",
    phone: "1234567890",
    address: "Lahore, Pakistan",
  };

  const handleEdit = (updatedData) => {
    console.log("Updated Donor:", updatedData);
//backend
  };

  return <ProfileForm initialData={donorData} type="donor" onEdit={handleEdit} />;
}