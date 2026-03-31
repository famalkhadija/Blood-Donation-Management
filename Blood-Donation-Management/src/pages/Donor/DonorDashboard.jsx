import React,{useEffect,useState} from "react";
import Table from "../../components/Table";
import { addDonor } from "../../store/donorRequestsSlice";
import { useSelector, useDispatch } from "react-redux";
export default function DonorDashboard() {
  const columns = ["ID", "Hospital", "BloodGroup", "City", "Date", "Status"];
  const user = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
const [requests, setRequests] = useState([]);

useEffect(() => {
  const fetchRequests = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/requests",{
        headers: {
    Authorization: `Bearer ${token}`,
  },
    });
    const data = await res.json();
    setRequests(data);
  };

  fetchRequests();
}, []);
const handleDonate = async (row) => {
  await fetch(`http://localhost:5000/api/requests/${row.id}/donate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      donor: {
        name: user.name,
        bloodgroup: user.bloodgroup,
        phone: user.phone,
        city: user.city,
      },
    }),
  });

  alert("Donation sent!");
};

  return (
    <>
      <div className="mt-15 px-4 ">
        <h2 className="text-xl  mb-5 font-semibold">Blood Requests</h2>
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
