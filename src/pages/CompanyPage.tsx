import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { axiosWithAuth } from '../api/interceptors.ts';

export default function CompanyPage () {
	const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
				console.log(id)
        const response = await axiosWithAuth.get(`https://onelab-levels-api.vercel.app/api/companies/${id}`);
        setCompany(response.data);
      } catch (error) {
        console.error('Error fetching company:', error);
      }
    };

    fetchCompany();
  }, [id]);

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{company.name}</h1>


    </div>
  );
}