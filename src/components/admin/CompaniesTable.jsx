import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className="overflow-hidden bg-white shadow-md rounded-lg p-6">
            <Table>
                <TableCaption className="text-sm text-gray-600">A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left text-sm font-semibold text-gray-700">Logo</TableHead>
                        <TableHead className="text-left text-sm font-semibold text-gray-700">Name</TableHead>
                        <TableHead className="text-left text-sm font-semibold text-gray-700">Date</TableHead>
                        <TableHead className="text-right text-sm font-semibold text-gray-700">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            <TableRow key={company._id} className="hover:bg-gray-50">
                                <TableCell className="py-2">
                                    <Avatar>
                                        <AvatarImage className="rounded-full" src={company.logo} />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="text-gray-800">{company.name}</TableCell>
                                <TableCell className="text-gray-600">{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger className="text-gray-600 hover:text-blue-600">
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 rounded-lg shadow-lg border border-gray-200 bg-white">
                                            <div onClick={() => navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md">
                                                <Edit2 className="w-4 h-4" />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default CompaniesTable;
