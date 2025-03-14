import React from "react";

const GenerateRef = ({ value, onGenerate }) => {
  const generateRefNumber = () => {
    const newRef = `REF-${Math.floor(Math.random() * 100000)}`;
    onGenerate(newRef); // This updates refNumber in Home
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={value}
        readOnly
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
      />
      <button
        type="button"
        onClick={generateRefNumber}
        className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700"
      >
        Generate
      </button>
    </div>
  );
};

export default GenerateRef;
