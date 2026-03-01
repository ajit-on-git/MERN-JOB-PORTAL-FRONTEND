import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="overflow-hidden bg-white shadow-md rounded-lg p-6">
      <Table>
        <TableCaption className="text-sm text-gray-600">
          A list of your recent posted jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left text-sm font-semibold text-gray-700">
              Company Name
            </TableHead>
            <TableHead className="text-left text-sm font-semibold text-gray-700">
              Role
            </TableHead>
            <TableHead className="text-left text-sm font-semibold text-gray-700">
              Date
            </TableHead>
            <TableHead className="text-right text-sm font-semibold text-gray-700">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow key={job._id} className="hover:bg-gray-50">
              <TableCell className="text-gray-800">
                {job?.company?.name}
              </TableCell>
              <TableCell className="text-gray-800">{job?.title}</TableCell>
              <TableCell className="text-gray-600">
                {job?.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="cursor-pointer text-gray-500 hover:text-blue-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 rounded-lg shadow-lg border border-gray-200 bg-white">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer p-2 hover:bg-gray-100 rounded-md"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span className="text-sm text-gray-700">Edit</span>
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2 p-2 hover:bg-gray-100 rounded-md"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm text-gray-700">Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
