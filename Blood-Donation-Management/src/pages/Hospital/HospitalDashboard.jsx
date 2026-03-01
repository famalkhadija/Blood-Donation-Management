import React from "react";
import Table from "../../components/Table";

export default function HospitalDashboard() {
  const columns = ["ID","Donor", "BloodGroup", "City", "Status"];
//dummy data
  const donorRequests = [
    {
      id: 1,  
      donor: "Ali Khan",
      bloodgroup: "B+",
      city: "Lahore",
      status: "Pending",
    },
    {
      id: 2,
      donor: "Sara Ahmed",
      bloodgroup: "O+",
      city: "Lahore",
      status: "Completed",
    },
  ];


  return (
    <>
      <div className="mt-15 px-4">
      <h2 className="text-2xl mb-5 font-semibold">Hospital Name</h2>
        <Table columns={columns} data={donorRequests} />
      </div>
    </>
  );
}