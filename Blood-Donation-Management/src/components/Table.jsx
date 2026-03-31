import React from "react";
import Button from "./Button";
import { useSelector } from "react-redux";

export default function Table({ columns, data, onAction, actionLabel = "Action" }) {
  const user = useSelector((state) => state.user);

  // Status color helper
  const getStatusStyle = (status) => {
    if (!status) return "bg-gray-200 text-gray-800";

    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "open":
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
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
            {/* Only show action column if onAction is provided */}
            {onAction && <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Action</th>}
          </tr>
        </thead>

        <tbody className="bg-gray-100 divide-y divide-gray-200">
          {data.map((row, i) => (
            <tr key={i} >
              {columns.map((col, j) => {
                const key = col.toLowerCase();
                // Render status with color
                if (key === "status") {
                  return (
                    <td key={j} className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(row[key])}`}>
                        {row[key]}
                      </span>
                    </td>
                  );
                }
                return (
                  <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {row[key] ?? "-"}
                  </td>
                );
              })}

              {/* Action button */}
              {onAction && (
                <td className="px-6 py-4">
                  {/* Show button only if status is open or no status */}
                  {(!row.status || row.status.toLowerCase() === "open") && (
                    <Button text={actionLabel} onClick={() => onAction(row)} />
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}