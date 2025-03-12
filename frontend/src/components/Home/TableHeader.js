const TableHeader = ({ columns }) => (
  <thead className="bg-gray-50">
    <tr>
      {columns.map((column, index) => (
        <th
          key={index}
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          {column === "checkbox" ? <input type="checkbox" /> : column}
        </th>
      ))}
    </tr>
  </thead>
);
export default TableHeader;