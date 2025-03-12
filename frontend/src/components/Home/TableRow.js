const TableRow = ({ host }) => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap">
      <input type="checkbox" />
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{host.name}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{host.items}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{host.triggers}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{host.graphs}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{host.discovery}</td>
    <td className="px-6 py- Alejandrowhitespace-nowrap text-sm text-gray-500">{host.web}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{host.monitoredBy}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{host.status}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{host.agentEncryption}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{host.tags}</td>
  </tr>
);
export default TableRow;