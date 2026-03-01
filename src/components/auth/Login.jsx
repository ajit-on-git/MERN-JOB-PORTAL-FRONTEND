import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '../../utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../../redux/authSlice';
import { Loader2 } from 'lucide-react';

function Login() {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const { loading } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto py-12'>
                <form onSubmit={submitHandler} className='w-full sm:w-4/5 md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-8'>
                    <h1 className='font-semibold text-2xl text-center mb-8 text-gray-800'>Login</h1>

                    <div className='space-y-6'>
                        {/* Email Input */}
                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="abcd123@efg.com"
                                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="abc123!@#.etc"
                                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Role Selection */}
                        <div>
                            <RadioGroup className="flex items-center justify-between space-x-4">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="jobseeker"
                                        checked={input.role === 'jobseeker'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label>Jobseeker</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label>Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        {
                            loading ? (
                                <Button className="w-full py-3 bg-gray-500 text-white flex justify-center items-center">
                                    <Loader2 className="mr-2 animate-spin h-5 w-5" />
                                    Please Wait...
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">
                                    Login
                                </Button>
                            )
                        }
                    </div>

                    {/* Link to Signup */}
                    <div className="text-center mt-4">
                        <span className="text-sm text-gray-600">Don't have an account?</span>
                        <Link to="/signup" className="text-blue-600 text-sm font-medium hover:underline"> SignUp</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
