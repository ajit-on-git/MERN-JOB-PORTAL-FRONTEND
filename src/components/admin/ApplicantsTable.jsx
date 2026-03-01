import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="overflow-x-auto">
            <Table className="w-full border-separate border-spacing-y-3">
                <TableCaption>A list of your recent applied users</TableCaption>
                <TableHeader className="bg-gray-100 text-gray-600 font-medium">
                    <TableRow>
                        <TableHead className="px-6 py-3">Full Name</TableHead>
                        <TableHead className="px-6 py-3">Email</TableHead>
                        <TableHead className="px-6 py-3">Contact</TableHead>
                        <TableHead className="px-6 py-3">Resume</TableHead>
                        <TableHead className="px-6 py-3">Date</TableHead>
                        <TableHead className="px-6 py-3 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants?.applications?.map((item) => (
                            <TableRow key={item._id} className="border-b hover:bg-gray-50 transition-all">
                                <TableCell className="px-6 py-4">{item?.applicant?.fullname}</TableCell>
                                <TableCell className="px-6 py-4">{item?.applicant?.email}</TableCell>
                                <TableCell className="px-6 py-4">{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell className="px-6 py-4">
                                    {
                                        item.applicant?.profile?.resume ? 
                                        <a className="text-blue-600 hover:text-blue-700 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> 
                                        : <span className="text-gray-500">NA</span>
                                    }
                                </TableCell>
                                <TableCell className="px-6 py-4">{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="px-6 py-4 text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="text-gray-600 hover:text-gray-800 cursor-pointer" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36 bg-white border border-gray-200 rounded-md shadow-lg p-2">
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div 
                                                            onClick={() => statusHandler(status, item?._id)} 
                                                            key={index} 
                                                            className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 cursor-pointer"
                                                        >
                                                            <span className="text-sm text-gray-700">{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable;
