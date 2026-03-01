import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'; // Importing Popover components
import { Avatar, AvatarImage } from '../ui/avatar'; // Importing Avatar components
import { MdPerson, MdExitToApp } from 'react-icons/md';
import { Button } from '../ui/button'; // Replace with your actual button library
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../redux/store';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '../../redux/authSlice';
import axios from 'axios';

function Navbar() {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/"); // Redirect to home page after logout
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className='bg-white shadow-md'>
            <div className='flex items-center justify-between max-w-7xl mx-auto h-16 px-6'>
                {/* Logo Section */}
                <div className='text-2xl font-bold text-gray-800'>
                    <h1>
                        Job<span className='text-blue-600'>Hunt</span>
                    </h1>
                </div>

                {/* Navigation Links */}
                <div className='flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-6'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li><Link to="/admin/companies" className='text-gray-800 hover:text-blue-600 transition duration-200'>Companies</Link></li>
                                <li><Link to="/admin/jobs" className='text-gray-800 hover:text-blue-600 transition duration-200'>Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/" className='text-gray-800 hover:text-blue-600 transition duration-200'>Home</Link></li>
                                <li><Link to="/jobs" className='text-gray-800 hover:text-blue-600 transition duration-200'>Jobs</Link></li>
                                <li><Link to="/browse" className='text-gray-800 hover:text-blue-600 transition duration-200'>Browse</Link></li>
                            </>
                        )}
                    </ul>

                    {/* Authentication / User Profile */}
                    { !user ? (
                        <div className='flex items-center gap-4'>
                            <Link to="/login">
                                <Button variant="outline" className="text-gray-800 hover:text-blue-600 hover:border-blue-600 transition duration-300">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className='bg-blue-600 hover:bg-blue-500 text-white transition duration-300'>SignUp</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="User Profile" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-80 bg-white border rounded-lg shadow-lg p-4'>
                                <div className='flex gap-4'>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="User Profile" />
                                    </Avatar>
                                    <div>
                                        <h4 className='text-lg font-medium text-gray-800'>{user?.fullname}</h4>
                                        <p className='text-sm text-gray-500'>{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className='mt-4 text-gray-700'>
                                    {user.role === 'jobseeker' && (
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <Button variant="link" className='flex items-center text-gray-700 hover:text-blue-600'>
                                                <MdPerson className='mr-2' /> <Link to="/profile">View Profile</Link>
                                            </Button>
                                        </div>
                                    )}
                                    <div className='flex items-center gap-2 cursor-pointer'>
                                        <Button onClick={logoutHandler} variant="link" className='flex items-center text-gray-700 hover:text-blue-600'>
                                            <MdExitToApp className='mr-2' /> Logout
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
