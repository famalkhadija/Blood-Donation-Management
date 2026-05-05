import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
const API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:5000";
export default function ShowRequests() {
  const [requests, setRequests] = useState([]);
  const columns = ["ID", "Hospital", "BloodGroup", "City", "Date", "Status"];
  const [cityFilter, setCityFilter] = useState("");
  const [bloodFilter, setBloodFilter] = useState("");
  const handleDelete = async (row) => {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
    const res = await fetch(`${API_URL}/api/requests/${row.id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
      return;
    }
    alert("Deleted successfully");
    setRequests((prev) => prev.filter((r) => r.id !== row.id));
  };
  useEffect(() => {
    const fetchRequests = async () => {
      const res = await fetch(
        `${API_URL}/api/requests?city=${encodeURIComponent(cityFilter)}&bloodgroup=${encodeURIComponent(bloodFilter)}`,
        {
credentials: "include",
        },
      );

      const data = await res.json();
      setRequests(data);
    };

    fetchRequests();
  }, [cityFilter, bloodFilter]);

  return (
    <>
      <div className="mt-8 px-2">
        <div className="flex flex-col sm:flex-row gap-2 justify-between items-center mb-5">
          <h2 className="text-xl font-semibold"> Your Blood Requests</h2>
          <div className="flex sm:flex-row flex-col gap-2">
            <input
              className=" p-2 mx-2 border border-gray-300 rounded"
              placeholder="Search city"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            />

            <select
              className="p-2 border border-gray-300 rounded"
              value={bloodFilter}
              onChange={(e) => setBloodFilter(e.target.value)}
            >
              <option value="">All blood groups</option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="O+">O+</option>
              <option value="AB+">AB+</option>
              <option value="A-">A-</option>
              <option value="B-">B-</option>
              <option value="O-">O-</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>{" "}
        <Table
          columns={columns}
          data={requests}
          onAction={handleDelete}
          actionLabel="Delete"
        />
      </div>
    </>
  );
}
