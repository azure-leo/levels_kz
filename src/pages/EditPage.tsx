import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addPage } from "../actions/Action.tsx";
import { deletePage } from "../actions/Action.tsx";
import styled from "styled-components";
import { axiosWithAuth } from '../api/interceptors.ts';
import axios from 'axios';

export default function Home(){
    const pages = useSelector((state) => state.pages);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const [company, setCompany] = useState("")
    const [location, setLocation] = useState("")
    const [experience, setExperience] = useState("")
    const [annualSalary, setAnnualSalary] = useState("")
    const [date, setDate] = useState("")
    const [specialization, setSpecialization] = useState("")
    
    const handleCompanyChange = (event) => {
        setCompany(event.target.value);
    }
    const handleLoctionChange = (event) => {
        setLocation(event.target.value);
    }
    const handleExperienceChange = (event) => {
        setExperience(event.target.value);
    }
    const handleAnnualSalaryChange = (event) => {
        setAnnualSalary(event.target.value);
    }
    const handleDateChange = (event) => {
        setDate(event.target.value);
    }
    const handleSpecializationChange = (event) => {
        setSpecialization(event.target.value);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData)
    };

    const [formData, setFormData] = useState({
        name: '',
        location: '',
    });
      

  const handleSubmit = async (e) => {
      e.preventDefault();
    //   if (!formData.company || !formData.location || !formData.experience || !formData.annualSalary || !formData.date || !formData.specialization) {
    //       console.error("All fields are required");
    //       return;
    //   }
      const send = {
        name: company,
        location: {
            name: location
        }
      }
      console.log(send)
      console.log("Submitting:", formData);
  
      try {
          const response = await axiosWithAuth.post('https://onelab-levels-api.vercel.app/api/companies', send);
          console.log('Response from server:', response.data);
          
          setFormData({
              name: '',
              location: '',
          });
  
      } catch (error) {
          console.error('Error:', error);
      }
  };
   
    return (
        <NavigationMenu>
            <SearchContainer>
                <Input type="text" placeholder="Search by company..." name="search"/>
                <Button type="submit">
                    Add
                </Button>
        </SearchContainer>
            <TableMenu>
                <Input value={company} onChange={handleCompanyChange} type="text" name="company" placeholder="Company Name" className="myInputs"/>
                <Input value={location} onChange={handleLoctionChange} type="text" name="location" placeholder="Location" className="myInputs"/>
                <Input value={experience} onChange={handleExperienceChange} type="text" name="experience" placeholder="Experience" className="myInputs"/>
                <Input value={annualSalary} onChange={handleAnnualSalaryChange} type="text" name="annualSalary" placeholder="Annual Salary" className="myInputs"/>
                <Input value={date} onChange={handleDateChange} type="text" name="date" placeholder="Date" className="myInputs"/>
                <Input value={specialization} onChange={handleSpecializationChange} type="text" name="specialization" placeholder="Specialization" className="myInputs"/>
                <SaveButton onClick={handleSubmit} className="pgbutton">Save</SaveButton>
                <Table>
                    <thead>
                    <TableRow>  
                        <TableHeader className="columns">Company</TableHeader>
                        <TableHeader className="columns">Location</TableHeader>
                        <TableHeader className="columns">Experience</TableHeader>
                        <TableHeader className="columns">Annual Salary</TableHeader>
                        <TableHeader className="columns">Date</TableHeader>
                        <TableHeader className="columns">Specialization</TableHeader>
                    </TableRow>
                    </thead>
                
                    <tbody>    
                        {pages?.map((page, index) => (
                            <TableRow key={index}>
                                <TableColumn>{page.company}</TableColumn>
                                <TableColumn>{page.location}</TableColumn>
                                <TableColumn>{page.experience}</TableColumn>
                                <TableColumn>{page.annualSalary}</TableColumn>
                                <TableColumn>{page.date}</TableColumn>
                                <TableColumn>{page.specialization}</TableColumn>
                                <TableColumn>
                                    <DeleteButton onClick={() => dispatch(deletePage(page.company))}>Delete</DeleteButton>
                                </TableColumn>
                                
                            </TableRow>
                            ))}
                    </tbody>
                </Table>
            </TableMenu>
        </NavigationMenu>
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
    max-height: 400px;
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

export const DeleteButton = styled(Button)`
    background-color: #dc3545; 
    &:hover {
        background-color: #bd2130;
    }
    text-transform: uppercase; 
    font-weight: bold;
`;