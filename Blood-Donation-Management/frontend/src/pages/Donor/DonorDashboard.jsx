import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { addDonor } from "../../store/donorRequestsSlice";
import { useDispatch } from "react-redux";
export default function DonorDashboard() {
  const columns = ["ID", "Hospital", "BloodGroup", "City", "Date", "Status"];
  const [requests, setRequests] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [bloodFilter, setBloodFilter] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchRequests = async () => {
      const res = await fetch(
        `http://localhost:5000/api/requests?city=${encodeURIComponent(cityFilter)}&bloodgroup=${encodeURIComponent(bloodFilter)}`,
        {
credentials: "include",
        },
      );

      const data = await res.json();
      setRequests(data);
    };

    fetchRequests();
  }, [cityFilter, bloodFilter]);
  const handleDonate = async (row) => {
    const resUser = await fetch("http://localhost:5000/api/users/me", {
      credentials: "include",
    });
    const data = await resUser.json();
    const freshUser = data.user;
    if (!freshUser) {
      alert("Please login first to donate.");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:5000/api/requests/${row.id}/donate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            donor: {
              name: freshUser.name,
              bloodgroup: freshUser.bloodgroup,
              phone: freshUser.phone,
              city: freshUser.city,
            },
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to send donation. Please try again.");
        return;
      }
      alert(data.message || "Donation sent successfully!");
      dispatch(
        addDonor({
          ...data.donor,
          RequestId: row.id,
        }),
      );
    } catch (err) {
      console.error("Error donating to request:", err);
      alert("Failed to send donation. Please try again.");
    }
  };

  return (
    <>
      <div className="mt-8 px-2">
        <div className="flex flex-col sm:flex-row gap-2 justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Blood Requests</h2>
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
        </div>
        <Table
          columns={columns}
          data={requests}
          onAction={handleDonate}
          actionLabel="Donate"
        />
      </div>
    </>
  );
}
