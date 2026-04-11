import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
export default function HospitalDashboard() {
  const donorColumns = ["Name", "Phone", "BloodGroup", "CIty"];
  const [donorRequests, setdonorRequests] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [bloodFilter, setBloodFilter] = useState("");
  useEffect(() => {
    fetchDonors();
  }, [cityFilter, bloodFilter]);

  const fetchDonors = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/donors?city=${encodeURIComponent(cityFilter)}&bloodgroup=${encodeURIComponent(bloodFilter)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();
    setdonorRequests(data);
  };
  return (
    <>
      <div className="mt-8 px-2">
        <div className="flex flex-col sm:flex-row gap-2 justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Available Donors</h2>
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
        <Table columns={donorColumns} data={donorRequests} />
      </div>
    </>
  );
}
