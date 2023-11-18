import { ITable } from "@/interface/table/table";
import React, { FC } from "react";

export const Table: FC<ITable> = ({ data, header }) => {
  return (
    <div className="rounded-t-xl overflow-hidden">
      <table className="table-auto min-w-full">
        <thead>
          <tr className="bg-teal-600 border text-white">
            {header.map((item, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                {item}
              </th>
            ))}{" "}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 border">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{item.createdAt}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.task}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
              <td className="px-6 py-4 whitespace-nowrap ">{item.actions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
