import React from 'react'
import Table from "../../components/Table";

export default function DonorDashboard() {
  const columns = ["Hospital", "BloodGroup", "Date", "Status"];
  //dummy data 
  const requests = [
    {
      hospital: "City Hospital",
      bloodgroup: "A+",
      date: "12-02-2026",
      status: "Pending",

    },
    {
      hospital: "Life Care",
      bloodgroup: "O-",
      date: "10-02-2026",
      status: "Pending",
    },
  ];
  const handleAccept = (row) => {
  console.log("Donor accepted:", row);
  // backend 
};
  return (
    <>
            <div className="mt-15 px-4 ">
      <h2 className="text-2xl  mb-5 font-semibold">Donor Name</h2>
        <Table columns={columns} data={requests} onAction={handleAccept} actionLabel='Accept' />
      </div> 
    </>
  )
}
