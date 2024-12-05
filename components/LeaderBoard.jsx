"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "./ui/table";
import { Button } from "./ui/button";
import LeaderBoardIcons from "./LeaderBoardIcons";
import { getLeaderBoard } from "./LeaderBoard.action";

export default function LeaderBoard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const leaderboardData = await getLeaderBoard();
      setData(leaderboardData ?? []);
    };

    fetchData();
  }, []);

  const leaderboardData = data.data || [];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Pagination
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = leaderboardData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(leaderboardData.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mx-auto w-full max-w-md mb-3 overflow-auto">
      <Table className="table-auto w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Nickname</TableHead>
            <TableHead className="text-right font-bold text-[#6831E1]">
              Points
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.length > 0 ? (
            currentData.map((item, index) => (
              <TableRow key={item.id || index}>
                <TableCell className="font-medium">
                  <LeaderBoardIcons index={startIndex + index + 1} />
                </TableCell>
                <TableCell className="truncate">
                  {item.nickname.substring(0, 25)}
                </TableCell>
                <TableCell className="text-right font-bold text-[#6831E1]">
                  {item.points} pts
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Submit your score !
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between gap-3 flex-wrap md:flex-nowrap">
        <div>
          <p className="text-sm text-gray-600">
            {currentPage} of {totalPages}
          </p>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
