import React,{useState} from 'react'
import Table from "../../components/Table";

export default function AdminDashboard() {
  const columns = ["ID", "Name", "Email", "Role", "Status"];
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Donor", status: "Approved" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Hospital", status: "Pending" },
  ];
  return (
    <>
          {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold">Total Hospitals</h2>
          <p className="text-2xl mt-2">3</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold">Pending Approvals</h2>
          <p className="text-2xl mt-2">1</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold">Total Donors</h2>
          <p className="text-2xl mt-2">2</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold">Total Blood Requests</h2>
          <p className="text-2xl mt-2">5</p>
        </div>
      </div>
      <div className="p-6">
        <Table columns={columns} data={data} />
      </div>
    </>
  )
}
