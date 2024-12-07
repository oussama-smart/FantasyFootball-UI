import React from "react";

const ROWS_PER_PAGE = [4, 8, 16];

interface TableComponentProps {
  data: Player[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
  totalCount: number;
  totalPages: number;
  selectedPlayer: Player | null;
  setSelectedPlayer: (player: Player) => void;
}

const TableComponent = ({
  data,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  totalCount,
  totalPages,
  selectedPlayer,
  setSelectedPlayer,
}: TableComponentProps) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-primary text-white rounded-md">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-secondary">
            <th>Name</th>
            <th>Team</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={
                "hover:bg-hover " +
                (selectedPlayer?.playerId === item.playerId ? "bg-hover" : "")
              }
              onClick={() => setSelectedPlayer(item)}
            >
              <td>{item.operatorPlayerName}</td>
              <td>{item.team}</td>
              <td>{item.position}</td>
              <td>${item.salary}</td>
              <td>{item.fantasyPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between bg-[#262626] px-8 py-4 text-xl font-normal">
        <div className="flex items-center space-x-2">
          <span>Page</span>
          <select
            className="bg-secondary text-white p-1 rounded-md"
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span>Rows per page</span>
          <select
            className="bg-secondary text-white p-1 rounded-md"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            {ROWS_PER_PAGE.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <span>
          {1 + (currentPage - 1) * rowsPerPage} -{" "}
          {Math.min(currentPage * rowsPerPage, totalCount)} of {totalCount}
        </span>
        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-md"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <button
            className="p-2 rounded-md"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
