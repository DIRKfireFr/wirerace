"use client";

import React, { useState } from "react";
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

export default function LeaderBoard({ data }) {
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
    <div className="mx-auto w-96 max-w-[400px] mb-3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Rank</TableHead>
            <TableHead className="">Nickname</TableHead>
            <TableHead className="text-right font-bold text-[#6831E1]">
              Points
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.length > 0 ? (
            currentData.map((item, index) => (
              <TableRow key={item.id || index}>
                <TableCell className=" font-medium">
                  <LeaderBoardIcons index={startIndex + index + 1} />
                </TableCell>
                <TableCell className="">
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
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between gap-3 flex-col md:gap-0 md:flex-row">
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
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
