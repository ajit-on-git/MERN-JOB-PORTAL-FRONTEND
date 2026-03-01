import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Science"]
    },
    {
        filterType: "JobType",
        array: ["Part Time", "Full Time", "Internship"],
    },

];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className='w-full bg-white p-6 rounded-lg shadow-md'>
            <h1 className='font-semibold text-xl text-gray-800 mb-4'>Filter Jobs</h1>
            <hr className='mt-2 mb-4 border-gray-200' />

            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div key={index} className="mb-6">
                            <h2 className='font-semibold text-lg text-gray-700 mb-2'>{data.filterType}</h2>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`;
                                    return (
                                        <div key={idx} className='flex items-center space-x-3 mb-3'>
                                            <RadioGroupItem value={item} id={itemId} className="cursor-pointer transition-all duration-300 hover:bg-blue-50" />
                                            <Label htmlFor={itemId} className="text-gray-600 cursor-pointer hover:text-blue-600">{item}</Label>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
