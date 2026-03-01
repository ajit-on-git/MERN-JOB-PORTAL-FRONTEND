import React from 'react'
import { Button } from './ui/button'
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <div className="p-6 rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
            {/* Job Date and Bookmark */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button className="rounded-full p-2 hover:bg-gray-100 transition-all" size="icon">
                    <MdBookmarkBorder className="text-gray-600" />
                </Button>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-3 mb-4">
                <Button size="icon" className="p-0">
                    <Avatar className="w-15 h-15 rounded-md border-2 border-gray-100">
                        <AvatarImage className="rounded-full" src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-medium text-lg text-[#333333]">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-600">India</p>
                </div>
            </div>

            {/* Job Title and Description */}
            <div className="mb-4">
                <h1 className="font-semibold text-xl text-[#333333]">{job?.title}</h1>
                <p className="text-sm text-gray-600 mt-2">{job?.description}</p>
            </div>

            {/* Tags (Position, Type, Salary) */}
            <div className="flex items-center gap-3 mb-4">
                <span className="text-[#0073b1] font-bold py-1 px-3 rounded-full bg-[#e6f4ff] text-sm">
                    {job?.position} Positions
                </span>
                <span className="text-[#0073b1] font-bold py-1 px-3 rounded-full bg-[#e6f4ff] text-sm">
                    {job?.jobType}
                </span>
                <span className="text-[#0073b1] font-bold py-1 px-3 rounded-full bg-[#e6f4ff] text-sm">
                    {job?.salary} LPA
                </span>
            </div>

            {/* Buttons for Details and Save */}
            <div className="flex items-center gap-4">
                <Button onClick={() => navigate(`/description/${job?._id}`)} className="px-5 py-2 text-[#333333] border border-gray-300 rounded-md hover:bg-gray-100 transition-all">
                    Details
                </Button>
                <Button className="bg-blue-600 text-white rounded-md px-5 py-2 hover:bg-blue-500 transition-all">
                    Save for later
                </Button>
            </div>
        </div>
    )
}

export default Job;
