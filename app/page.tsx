"use client";

import { useEffect, useState } from "react";
import Dropdown from "@/components/Dropdown";
import Header from "@/components/Header";
import {
  fetchPlayers,
  fetchOperators,
  fetchOperatorGameTypes,
  fetchSlateNames,
} from "@/utils/api";
import TableComponent from "../components/datatable";
import PlayerDetails from "@/components/playerDetails";

const Home = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [operator, setOperator] = useState<string | null>(null);
  const [operatorGameType, setOperatorGameType] = useState<string | null>(null);
  const [slateName, setSlateName] = useState<string | null>(null);
  const [operatorList, setOperatorList] = useState<string[]>([]);
  const [operatorGameTypeList, setOperatorGameTypeList] = useState<string[]>(
    []
  );
  const [slateNameList, setSlateNameList] = useState<string[]>([]);

  const getPlayers = async () => {
    try {
      const response = await fetchPlayers(currentPage, rowsPerPage, operator, operatorGameType, slateName);
      setPlayers(response.players);
      setSelectedPlayer(response.players.length > 0 ? response.players[0] : null);
      setTotalCount(response.pagination.total_count);
      setTotalPages(response.pagination.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlayers();
  }, [currentPage, rowsPerPage, operator, operatorGameType, slateName]);

  const getOperators = async () => {
    try {
      const data = await fetchOperators();
      setOperatorList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOperatorGameTypes = async () => {
    try {
      const data = await fetchOperatorGameTypes(operator);
      setOperatorGameTypeList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSlateNames = async () => {
    try {
      const data = await fetchSlateNames(operator, operatorGameType);
      setSlateNameList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOperators();
  }, []);

  useEffect(() => {
    if (!operator) return;
    setOperatorGameType(null);
    setSlateName(null);
    getOperatorGameTypes();
  }, [operator]);

  useEffect(() => {
    if (!operatorGameType || !operator) return;
    setSlateName(null);
    getSlateNames();
  }, [operatorGameType]);

  return (
    <div className="bg-black bg-opacity-90 text-white min-h-screen max-w-[1200px] mx-auto">
      <Header />
      {/* Operator Filters */}
      <div className="flex justify-center my-16 px-4">
        <div className="flex flex-wrap justify-center gap-6 p-6 bg-primary rounded-lg w-full max-w-4xl">
          <div className="w-full sm:w-auto sm:flex-1">
            <Dropdown
              items={["Select Operator", ...operatorList]}
              selectedItem={operator || "Select Operator"}
              setSelectedItem={setOperator}
            />
          </div>
          <div className="w-full sm:w-auto sm:flex-1">
            <Dropdown
              items={["Select Game Type", ...operatorGameTypeList]}
              selectedItem={operatorGameType || "Select Game Type"}
              setSelectedItem={setOperatorGameType}
            />
          </div>
          <div className="w-full sm:w-auto sm:flex-1">
            <Dropdown
              items={["Select Slate Name", ...slateNameList]}
              selectedItem={slateName || "Select Slate Name"}
              setSelectedItem={setSlateName}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-8 p-4">
        <div className="flex-1 rounded-lg overflow-hidden">
          <TableComponent
            data={players}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            totalCount={totalCount}
            totalPages={totalPages}
            selectedPlayer={selectedPlayer}
            setSelectedPlayer={setSelectedPlayer}
          />
        </div>

        {/* Selected Player Section */}
        <div className="w-[400px] h-full rounded-lg overflow-hidden">
          <PlayerDetails player={selectedPlayer} />
        </div>
      </div>
    </div>
  );
};

export default Home;
