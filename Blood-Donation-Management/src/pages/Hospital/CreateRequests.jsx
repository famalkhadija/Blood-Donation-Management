import React,{useState} from 'react'
import Button from "../../components/Button";
export default function CreateRequests() {
  const hospitalsList = ["City Hospital", "Life Care", "Hope Medical", "General Hospital"];
const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const [formData, setFormData] = useState({
    hospital: "",
    bloodgroup: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Request created:", formData);
    // backend
    alert("Request submitted!");
    setFormData({ hospital: "", bloodgroup: "", date: "" });
  };

  return (
    <>
<div className="max-w-md mx-auto mt-10 bg-white shadow p-6 rounded-md">
      <h1 className="text-2xl font-semibold mb-6">Create Blood Request</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          name="hospital"
          value={formData.hospital}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Hospital</option>
          {hospitalsList.map((hosp, i) => (
            <option key={i} value={hosp}>{hosp}</option>
          ))}
        </select>
        <select
          name="bloodgroup"
          value={formData.bloodgroup}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((bg, i) => (
            <option key={i} value={bg}>{bg}</option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <Button text="Submit Request" type="submit" />
      </form>
    </div>
    </>
  )
}
