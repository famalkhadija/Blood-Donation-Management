import Table from "../../components/Table";

export default function ManageHosp() {
  const columns = ["ID", "Name", "City", "License"];
  const data = [
    { id: 1, "name": "City Hospital", city: "New York", license: "12345" },
    { id: 2, "name": "Mercy Care", city: "Los Angeles", license: "67890" },
    { id: 3, "name": "Hope Clinic", city: "Chicago", license: "54321" },
  ];

  return (
    <>
    <div className="p-6">
      <h2 className="text-2xl mt-10 mb-5 font-semibold">Hospitals</h2>
      <Table columns={columns} data={data} />
    </div>
    </>
  );
}