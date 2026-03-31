import React,{useEffect,useState} from "react";
import Table from "../../components/Table";
import { useSelector } from "react-redux";
export default function HospitalDashboard() {
  const donorColumns = ["Name","Phone", "BloodGroup","CIty" ];
const [donorRequests, setdonorRequests] = useState([]);
useEffect(() => {
  const fetchDonorRequests = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/requests",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setdonorRequests(data);
  }
  fetchDonorRequests();
}, []);
const donors = donorRequests.flatMap(req =>
  req.donors.map(d => ({
    ...d,
    hospital: req.hospital
  }))
);
  return (
    <>
      <div className="mt-15 px-4">
      <h3 className="text-2xl my-5 font-semibold">Available Donors</h3>
        <Table columns={donorColumns} data={donors} />
      </div>
    </>
  );
}