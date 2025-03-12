import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AnimatedPage from "../../AnimatedPage";
import { fetchBanks } from "../../redux/action/bankActions";

import InputField from "./InputField";
import SelectField from "../Home/SelecField";
import Button from "../Else/Button";
import TagInput from "../Home/TagInput";
import TableHeader from "../Home/TableHeader";
import TableRow from "../Home/TableRow";

const mockHosts = [
  {
    name: "Zabbix server",
    items: 115,
    triggers: 67,
    graphs: 1,
    discovery: 6,
    web: "127.0.0.1:10050",
    monitoredBy: "Linux by Zabbix agent, Zabbix server",
    status: "ENABLED",
    agentEncryption: "ZBX",
    tags: "None",
  },
];

const HomePage = () => {
  const [hostGroups, setHostGroups] = useState("");
  const [templates, setTemplates] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [dnsFilter, setDnsFilter] = useState("");
  const [ipFilter, setIpFilter] = useState("");
  const [portFilter, setPortFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("ANY");
  const [monitoredByFilter, setMonitoredByFilter] = useState("ANY");
  const [tagsLogic, setTagsLogic] = useState("And/Or");
  const [tags, setTags] = useState([{ tag: "", value: "" }]);

  const handleAddTag = () => {
    setTags([...tags, { tag: "", value: "" }]);
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleTagChange = (index, field, value) => {
    const newTags = [...tags];
    newTags[index][field] = value;
    setTags(newTags);
  };

  const handleReset = () => {
    setHostGroups("");
    setTemplates("");
    setNameFilter("");
    setDnsFilter("");
    setIpFilter("");
    setPortFilter("");
    setStatusFilter("ANY");
    setMonitoredByFilter("ANY");
    setTagsLogic("And/Or");
    setTags([{ tag: "", value: "" }]);
  };

  const handleApply = () => {
    console.log("Applying filters:", {
      hostGroups,
      templates,
      nameFilter,
      dnsFilter,
      ipFilter,
      portFilter,
      statusFilter,
      monitoredByFilter,
      tagsLogic,
      tags,
    });
  };

  const statusOptions = [
    { value: "ANY", label: "Any" },
    { value: "ENABLED", label: "Enabled" },
    { value: "DISABLED", label: "Disabled" },
  ];

  const monitoredByOptions = [
    { value: "ANY", label: "Any" },
    { value: "SERVER", label: "Server" },
    { value: "PROXY", label: "Proxy" },
    { value: "PROXY_GROUP", label: "Proxy group" },
  ];

  const tagsLogicOptions = [
    { value: "And/Or", label: "And/Or" },
    { value: "Or", label: "Or" },
  ];

  const tableColumns = [
    "checkbox",
    "Name",
    "Items",
    "Triggers",
    "Graphs",
    "Discovery",
    "Web",
    "Interface",
    "Proxy",
    "Templates",
    "Status",
    "Availability",
    "Agent Encryption",
    "Info",
    "Tags",
  ];

  return (
    <AnimatedPage>
      <div className="p-4 bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">Hosts</h1>
          <div className="space-x-2">
            <Button
              label="Create host"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            />
            <Button
              label="Import"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            />
            <Button
              label="Filter"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            />
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Left Column: Host groups, Templates, Name, DNS, IP, Port */}
            <div className="space-y-4">
              <InputField
                label="Host groups"
                value={hostGroups}
                onChange={(e) => setHostGroups(e.target.value)}
                placeholder="type here to search..."
              />
              <InputField
                label="Templates"
                value={templates}
                onChange={(e) => setTemplates(e.target.value)}
                placeholder="type here to search..."
              />
              <InputField
                label="Name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
              <InputField
                label="DNS"
                value={dnsFilter}
                onChange={(e) => setDnsFilter(e.target.value)}
              />
              <InputField
                label="IP"
                value={ipFilter}
                onChange={(e) => setIpFilter(e.target.value)}
              />
              <InputField
                label="Port"
                value={portFilter}
                onChange={(e) => setPortFilter(e.target.value)}
              />
            </div>

            {/* Middle Column: Status, Monitored by */}
            <div className="space-y-4">
              <SelectField
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={statusOptions}
              />
              <SelectField
                label="Monitored by"
                value={monitoredByFilter}
                onChange={(e) => setMonitoredByFilter(e.target.value)}
                options={monitoredByOptions}
              />
            </div>

            {/* Right Column: Tags */}
            <div className="space-y-4">
              <SelectField
                label="Tags"
                value={tagsLogic}
                onChange={(e) => setTagsLogic(e.target.value)}
                options={tagsLogicOptions}
              />
              {tags.map((tag, index) => (
                <TagInput
                  key={index}
                  tag={tag}
                  index={index}
                  onChange={handleTagChange}
                  onRemove={handleRemoveTag}
                />
              ))}
              <Button
                label="Add"
                onClick={handleAddTag}
                className="text-blue-600 hover:text-blue-800"
              />
            </div>
          </div>

          {/* Apply and Reset Buttons */}
          <div className="mt-4 flex space-x-2">
            <Button
              label="Apply"
              onClick={handleApply}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            />
            <Button
              label="Reset"
              onClick={handleReset}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <TableHeader columns={tableColumns} />
            <tbody className="bg-white divide-y divide-gray-200">
              {mockHosts.map((host, index) => (
                <TableRow key={index} host={host} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Actions */}
        <div className="mt-4 flex space-x-2">
          <Button
            label="Enable"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          />
          <Button
            label="Disable"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          />
          <Button
            label="Export"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          />
          <Button
            label="Mass update"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          />
          <Button
            label="Delete"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          />
        </div>

        {/* Pagination */}
        <div className="mt-4 text-sm text-gray-600">Displaying 1 of 1 found</div>
      </div>
    </AnimatedPage>
  );
};

export default HomePage;