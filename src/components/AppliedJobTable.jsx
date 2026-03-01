import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="overflow-x-auto">
      <Table className="table-auto w-full text-sm text-gray-700">
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-left py-2 px-4">Date</TableHead>
            <TableHead className="text-left py-2 px-4">Job Role</TableHead>
            <TableHead className="text-left py-2 px-4">Company</TableHead>
            <TableHead className="text-right py-2 px-4">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                You haven't applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow
                key={appliedJob._id}
                className="hover:bg-gray-50 transition-all"
              >
                <TableCell className="py-3 px-4">
                  {appliedJob?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="py-3 px-4">
                  {appliedJob.job?.title}
                </TableCell>
                <TableCell className="py-3 px-4">
                  {appliedJob.job?.company?.name}
                </TableCell>
                <TableCell className="text-right py-3 px-4">
                  <Badge
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-400"
                        : appliedJob.status === "pending"
                          ? "bg-gray-400"
                          : "bg-green-400"
                    } text-white font-medium`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
