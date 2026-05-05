import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
export default function HospitalDashboard() {
  const donorColumns = ["Name", "Phone", "BloodGroup", "CIty"];
  const [donorRequests, setdonorRequests] = useState([]);
  const [bloodFilter, setBloodFilter] = useState("");

  useEffect(() => {
    fetchDonors();
  }, [bloodFilter]);

  const fetchDonors = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/donors?bloodgroup=${encodeURIComponent(bloodFilter)}`,
      {
credentials: "include",
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
