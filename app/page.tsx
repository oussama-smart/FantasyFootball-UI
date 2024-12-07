"use client";

import { useEffect, useState, useCallback } from "react";
import Dropdown from "@/components/Dropdown";
import Header from "@/components/Header";
import {
  fetchPlayers,
  fetchOperators,
  fetchOperatorGameTypes,
  fetchSlateNames,
} from "@/utils/api";
import TableComponent from "@/components/PlayerTable";
import PlayerDetails from "@/components/PlayerDetail";

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

  // Wrap getPlayers in useCallback
  const getPlayers = useCallback(async () => {
    try {
      const response = await fetchPlayers(
        currentPage,
        rowsPerPage,
        operator,
        operatorGameType,
        slateName
      );
      setPlayers(response.players);
      setSelectedPlayer(
        response.players.length > 0 ? response.players[0] : null
      );
      setTotalCount(response.pagination.total_count);
      setTotalPages(response.pagination.total_pages);
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, rowsPerPage, operator, operatorGameType, slateName]);

  useEffect(() => {
    getPlayers();
  }, [getPlayers]);

  const getOperators = useCallback(async () => {
    try {
      const data = await fetchOperators();
      setOperatorList(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getOperators();
  }, [getOperators]);

  const getOperatorGameTypes = useCallback(async () => {
    try {
      const data = await fetchOperatorGameTypes(operator);
      setOperatorGameTypeList(data);
    } catch (error) {
      console.log(error);
    }
  }, [operator]);

  useEffect(() => {
    if (!operator) return;
    setOperatorGameType(null);
    setSlateName(null);
    getOperatorGameTypes();
  }, [operator, getOperatorGameTypes]);

  const getSlateNames = useCallback(async () => {
    try {
      const data = await fetchSlateNames(operator, operatorGameType);
      setSlateNameList(data);
    } catch (error) {
      console.log(error);
    }
  }, [operator, operatorGameType]);

  useEffect(() => {
    if (!operatorGameType || !operator) return;
    setSlateName(null);
    getSlateNames();
  }, [operatorGameType, operator, getSlateNames]);

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

      <div className="flex flex-col md:flex-row gap-8 p-4 w-full justify-center">
        <div className="flex flex-1 rounded-lg md:overflow-hidden overflow-scroll w-full">
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
        <div className="h-full rounded-lg overflow-hidden">
          <PlayerDetails player={selectedPlayer} />
        </div>
      </div>
    </div>
  );
};

export default Home;
