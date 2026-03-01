import React from "react";
import Button from "./Button";

export default function Table({ columns, data, onAction, actionLabel = "Accept" }) {
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "approved":
        case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        case "inactive":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="overflow-x-auto bg-gray-100 shadow rounded-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-100 divide-y divide-gray-200">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-200">
              {columns.map((col, j) => {
                const key = col.toLowerCase();
                if (key === "status") {
                  return (
                    <td key={j} className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                          row[key]
                        )}`}
                      >
                        {row[key]}
                      </span>
                    </td>
                  );
                }
                return (
                  <td
                    key={j}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                  >
                    {row[key]}
                  </td>
                );
              })}
              <td className="px-6 py-4">
                {/* Show button only if status is pending */}
                {row.status.toLowerCase() === "pending" && (
                  <Button text={actionLabel} onClick={() => onAction(row)} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}