import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

// Github Complete
const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
                <div className="mb-6">
                    <h1 className="font-bold text-3xl text-gray-800">Your Company Name</h1>
                    <p className="text-gray-600 mt-2">What would you like to give your company name? You can change this later.</p>
                </div>

                <Label className="text-lg font-medium">Company Name</Label>
                <Input
                    type="text"
                    className="my-3 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="JobHunt, Microsoft etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                    value={companyName}
                />

                <div className="flex items-center gap-4 mt-8">
                    <Button
                        variant="outline"
                        onClick={() => navigate("/admin/companies")}
                        className="text-gray-700 border-gray-300 hover:bg-gray-100"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={registerNewCompany}
                        className="bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;
