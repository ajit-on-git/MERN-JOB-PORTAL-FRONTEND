import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value,
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-full my-10 px-4 md:px-0">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-3xl w-full bg-white shadow-lg rounded-lg border border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Post a New Job
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label>Job Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="Job Title"
                className="my-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Job Description"
                className="my-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="Job Requirements"
                className="my-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <Label>Salary (LPA)</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="Salary"
                className="my-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Job Location"
                className="my-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="Full-time, Part-time, etc."
                className="my-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="Entry-level, Mid, Senior, etc."
                className="my-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <Label>No. of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                placeholder="Number of positions"
                className="my-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            {companies.length > 0 && (
              <div>
                <Label>Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          {loading ? (
            <Button
              className="w-full my-4 flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 rounded-md"
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
            >
              Post New Job
            </Button>
          )}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-semibold text-center mt-3">
              *Please register a company first before posting jobs.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
