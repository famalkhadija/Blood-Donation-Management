import Table from "../../components/Table";

export default function ManageUsers() {
  const columns = ["ID", "Name", "Email", "Blood Group", "Status","City"];
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", "blood group": "A+", status: "Active", city: "New York" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", "blood group": "B-", status: "Inactive", city: "Los Angeles" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", "blood group": "O+", status: "Active", city: "Chicago"  },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl mt-10 mb-5 font-semibold">Donors History</h2>
      <Table columns={columns} data={data} />
    </div>
  );
}