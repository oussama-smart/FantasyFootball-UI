import React from "react";

interface DropdownProps {
  items: string[];
  selectedItem: string;
  setSelectedItem: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  selectedItem,
  setSelectedItem,
}) => {
  return (
    <div className="relative inline-block w-full max-w-xs">
      <select
        value={selectedItem}
        onChange={(e) => setSelectedItem(e.target.value)}
        className="w-full inline-flex bg-secondary text-white border border-secondary rounded-lg px-4 py-2 appearance-none focus:outline-none"
      >
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default Dropdown;
