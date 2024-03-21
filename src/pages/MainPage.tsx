import React, { useEffect, useState } from 'react'
import { axiosWithAuth } from '../api/interceptors.ts'
import { Link } from 'react-router-dom'
import styled from "styled-components";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function MainPage() {

	const [companies, setCompanies] = useState([])
    const [salaries, setSalaries] = useState([])
    const [specializations, setSpecializations] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredCompanies, setFilteredCompanies] = useState([]);

	useEffect(() => {
		const fetchCompanies = async () => {
			try {
				console.log('I am here')
				const response = await axiosWithAuth.get("https://onelab-levels-api.vercel.app/api/companies");
        setCompanies(response.data);
				console.log(response.data)
			} catch(error) {
				console.error('Error fetching companies:', error);
			}
		}
		const fetchSalaries = async () => {
            try {
                const response = await axiosWithAuth.get("https://onelab-levels-api.vercel.app/api/salaries");
				console.log(response.data)
                setSalaries(response.data);
            } catch (error) {
                console.error('Error fetching salaries:', error);
            }
        };

        const fetchSpecializations = async () => {
            try {
                const response = await axiosWithAuth.get("https://onelab-levels-api.vercel.app/api/specializations");
                setSpecializations(response.data);
            } catch (error) {
                console.error('Error fetching specializations:', error);
            }
        };


		fetchCompanies()
		// for (let c in companies) {
		// 	console.log(c.name)
		// }
		fetchSalaries()
		fetchSpecializations()
	}, [])

	useEffect(() => {
		if (search) {
			const filtered = companies.filter(company =>
				company.name && company.name.toLowerCase().includes(search.toLowerCase())
			);
			setFilteredCompanies(filtered);
		} else {
			setFilteredCompanies([]);
		}
	}, [search, companies]);

	const averageSalariesByCompany = salaries.reduce((acc, curr) => {
		const companyId = curr.company?._id;
		const baseSalary = curr.salary?.base;
	
		if (!companyId || baseSalary === undefined) {
			console.log('Skipping salary due to missing data', curr);
			return acc; 
		}
	
		if (!acc[companyId]) {
			acc[companyId] = { total: 0, count: 0, name: curr.company.name };
		}
	
		acc[companyId].total += baseSalary;
		acc[companyId].count += 1;
		return acc;
	}, {});
	

    const averageSalaries = Object.values(averageSalariesByCompany).map(company => ({
        name: company.name,
        averageSalary: company.total / company.count
    }));
	
	const averageSalaryMap = averageSalaries.reduce((acc, curr) => {
		acc[curr.name] = curr.averageSalary;
		return acc;
	}, {});

	return (
		<div>
			<NavigationMenu>
                <AutocompleteContainer>
                    <Input 
                        type="text"
                        placeholder="Search for companies..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search&& (
                        <SuggestionBox>
                            {filteredCompanies.map(company => (
                                <SuggestionItem key={company._id}>
                                    <Link to={`/company/${company._id}`}>{company.name}</Link>
                                </SuggestionItem>
                            ))}
                        </SuggestionBox>
                    )}
                </AutocompleteContainer>
            </NavigationMenu>
            <ScrollContainer>
                <Table>
                    <thead>
                        <TableRow>
                            <TableHeader>Company Name</TableHeader>
                            <TableHeader>Location</TableHeader>
							<TableHeader>Avg Salary</TableHeader>
                        </TableRow>
                    </thead>
                    <tbody>
						{companies.map((company, index) => {
							const avgSalary = averageSalaryMap[company.name];
							return (
								<TableRow key={company._id || index}>
									<TableColumn>
										<Link to={`/company/${company._id}`}>{company.name}</Link>
									</TableColumn>
									<TableColumn>{company.location?.name}</TableColumn>
									<TableColumn>
										{avgSalary ? `${avgSalary.toFixed(2)}` : 'N/A'}
									</TableColumn>
								</TableRow>
							);
						})}
    				</tbody>
                </Table>
            </ScrollContainer>
			<BarChart
                width={500}
                height={300}
                data={averageSalaries}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="averageSalary" fill="#8884d8" />
            </BarChart>
        </div>
    );
}

export const NavigationMenu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

export const SearchContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 100%;
`;

export const TableMenu = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Input = styled.input`
    padding: 8px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const Button = styled.button`
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    text-transform: uppercase; 
    font-weight: bold;
    &:hover {
        background-color: #0056b3;
    }
`;

export const SaveButton = styled(Button)`
    background-color: #28a745;  
    &:hover {
        background-color: #218838;
    }
    text-transform: uppercase; 
    font-weight: bold;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f8f9fa;
    margin-top: 20px;
`;

export const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
    &:hover {
        background-color: #ddd;
    }
`;

export const TableHeader = styled.td`
    border: 1px solid #ddd;
    padding: 12px 15px;
    text-align: left;
`;


export const TableColumn = styled.td`
    border: 1px solid #ddd;
    padding: 12px 15px;
    text-align: left;
`;

export const ScrollContainer = styled.div`
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const PageRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding: 10px;
    &:last-child {
        border-bottom: none;
    }
`;

export const AutocompleteContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: relative;
`;

export const SuggestionBox = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 100;
    border: 1px solid #ddd;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-height: 300px;
    overflow-y: auto;
`;

export const SuggestionItem = styled.div`
    padding: 8px 12px;
    border-bottom: 1px solid #eee;
    &:last-child {
        border-bottom: none;
    }
    &:hover {
        background-color: #f8f9fa;
    }
`;
