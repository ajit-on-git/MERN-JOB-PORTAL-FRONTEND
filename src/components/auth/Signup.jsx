import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '../../utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/authSlice';
import { Loader2 } from 'lucide-react';

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });

  const { loading } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
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
      <div className="flex items-center justify-center max-w-7xl mx-auto my-16 px-6">
        <form onSubmit={submitHandler} className="w-full sm:w-4/5 md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-6">
          <h1 className="font-semibold text-2xl text-center mb-6 text-gray-800">Create Your Account</h1>

          <div className="space-y-4">
            {/* Full Name Input */}
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="Abcd Efgh"
                className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email Input */}
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="abcd123@efg.com"
                className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone Number Input */}
            <div>
              <Label>Phone Number</Label>
              <Input
                type="number"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="9876543210"
                className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            {/* File Input for Profile Picture */}
            <div>
              <Label>Profile Picture</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="w-full p-3 border rounded-md cursor-pointer text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div>
              {loading ? (
                <Button className="w-full py-3 bg-gray-500 text-white flex justify-center items-center">
                  <Loader2 className="mr-2 animate-spin h-5 w-5" />
                  Please Wait...
                </Button>
              ) : (
                <Button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">
                  Sign Up
                </Button>
              )}
            </div>

            {/* Link to Login */}
            <div className="text-center">
              <span className="text-sm text-gray-600">Already have an account?</span>
              <Link to="/login" className="text-blue-600 text-sm font-medium hover:underline"> Login</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
