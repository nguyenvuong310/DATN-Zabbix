import React from "react";
import Button from "../Else/Button";
const TagInput = ({ tag, index, onChange, onRemove }) => (
  <div className="flex space-x-2 items-center">
    <input
      type="text"
      placeholder="tag"
      value={tag.tag}
      onChange={(e) => onChange(index, "tag", e.target.value)}
      className="block w-1/2 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
    />
    <select className="block w-1/4 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500">
      <option value="Contains">Contains</option>
    </select>
    <input
      type="text"
      placeholder="value"
      value={tag.value}
      onChange={(e) => onChange(index, "value", e.target.value)}
      className="block w-1/2 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
    />
    <Button
      label="Remove"
      onClick={() => onRemove(index)}
      className="text-red-500 hover:text-red-700"
    />
  </div>
);
export default TagInput;