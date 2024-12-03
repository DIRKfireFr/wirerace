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
    <div className="mx-auto w-96 max-w-[400px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="md:w-[100px]">Rank</TableHead>
            <TableHead className="md:w-[100px]">Nickname</TableHead>
            <TableHead className="text-right font-bold text-[#6831E1]">
              Points
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.length > 0 ? (
            currentData.map((item, index) => (
              <TableRow key={item.id || index}>
                <TableCell className="md:w-[100px] font-medium">
                  {startIndex + index + 1 <= 3 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-medal"
                    >
                      <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
                      <path d="M11 12 5.12 2.2" />
                      <path d="m13 12 5.88-9.8" />
                      <path d="M8 7h8" />
                      <circle cx="12" cy="17" r="5" />
                      <path d="M12 18v-2h-.5" />
                    </svg>
                  ) : (
                    startIndex + index + 1
                  )}
                </TableCell>
                <TableCell className="md:w-[100px]">{item.nickname}</TableCell>
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
