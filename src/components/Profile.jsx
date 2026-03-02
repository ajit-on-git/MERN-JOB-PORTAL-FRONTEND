import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge, Contact, Mail, Pen } from "lucide-react";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-8 p-8 shadow-lg">
        <div className="flex justify-between">
          {/* Profile Picture and Bio */}
          <div className="flex items-center gap-6">
            <Avatar className="h-32 w-32 border-2 border-gray-300 shadow-lg">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="Profile Picture"
                className="rounded-full"
              />
            </Avatar>
            <div>
              <h1 className="font-semibold text-2xl text-[#333333]">
                {user?.fullname}
              </h1>
              <p className="text-md text-gray-600">{user?.profile?.bio}</p>
            </div>
          </div>

          {/* Edit Button */}
          <Button
            onClick={() => setOpen(true)}
            className="text-right text-blue-700 border border-blue-700 rounded-md px-4 py-2 hover:bg-blue-50 transition-all"
          >
            <Pen className="mr-2" /> Edit Profile
          </Button>
        </div>

        {/* Contact Information */}
        <div className="my-6">
          <div className="flex items-center gap-3 my-3">
            <Mail className="text-blue-700" />
            <span className="text-gray-700">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-3">
            <Contact className="text-blue-700" />
            <span className="text-gray-700">{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="my-6">
          <h2 className="font-semibold text-xl text-[#333333] mb-3">Skills</h2>
          <div className="flex items-center gap-3 flex-wrap">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <span
                  key={index}
                  className="text-white font-bold py-1 px-4 rounded-full bg-blue-600"
                >
                  {item}
                </span>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="my-6">
          <div className="grid w-full max-w-sm">
            <Label className="text-md font-bold text-[#333333]">Resume</Label>
            {isResume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={user?.profile?.resume}
                className="text-blue-600 hover:underline"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl my-8 p-8 shadow-lg">
        <h1 className="font-semibold text-xl text-[#333333] mb-5">
          Applied Jobs
        </h1>
        <AppliedJobTable />
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
