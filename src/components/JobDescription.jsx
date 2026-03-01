import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { setSingleJob } from '../redux/jobSlice';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';
import Navbar from './shared/Navbar';
import { toast } from 'sonner';

const JobDescription = () => {
    const params = useParams();
    const jobId = params.id;
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const dispatch = useDispatch();
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            console.log(res.data);

            if (res.data.success) {
                setIsApplied(true); // update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob)); // helps to real-time UI update
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });

                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) // sync state with fresh data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 p-6 bg-white shadow-xl rounded-lg'>
                {/* Job Header */}
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-semibold text-2xl text-[#333333]'>{singleJob?.title}</h1>
                        <div className='flex items-center gap-3 mt-4'>
                            <Badge className="text-[#0073b1] font-bold py-1 px-3 rounded-full bg-[#e6f4ff] text-sm">{singleJob?.position} Positions</Badge>
                            <Badge className="text-[#0073b1] font-bold py-1 px-3 rounded-full bg-[#e6f4ff] text-sm">{singleJob?.jobType}</Badge>
                            <Badge className="text-[#0073b1] font-bold py-1 px-3 rounded-full bg-[#e6f4ff] text-sm">{singleJob?.salary} LPA</Badge>
                        </div>
                    </div>
                    <Button 
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied} 
                        className={`rounded-lg text-white ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#0066cc] hover:bg-[#005d8e]'}`}>
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>

                {/* Job Description */}
                <h1 className='border-b-2 border-b-gray-200 font-medium py-4 text-lg text-[#333333]'>Job Description</h1>
                <div className='my-4'>
                    <h1 className='font-semibold text-[#333333] my-2'>Role: <span className='font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-semibold text-[#333333] my-2'>Location: <span className='font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-semibold text-[#333333] my-2'>Description: <span className='font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    <h1 className='font-semibold text-[#333333] my-2'>Experience: <span className='font-normal text-gray-800'>{singleJob?.experienceLevel}</span></h1>
                    <h1 className='font-semibold text-[#333333] my-2'>Salary: <span className='font-normal text-gray-800'>{singleJob?.salary}</span></h1>
                    <h1 className='font-semibold text-[#333333] my-2'>Total Applicants: <span className='font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                    <h1 className='font-semibold text-[#333333] my-2'>Posted On: <span className='font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
                </div>
            </div>
        </div>
    )
}

export default JobDescription;
