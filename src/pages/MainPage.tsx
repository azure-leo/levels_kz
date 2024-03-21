import React, { useEffect, useState } from 'react'
import { axiosWithAuth } from '../api/interceptors.ts'
import { Link } from 'react-router-dom'

export default function MainPage() {

	const [companies, setCompanies] = useState([])

	useEffect(() => {
		const fetchCompanies = async () => {
			try {
				const response = await axiosWithAuth.get("https://onelab-levels-api.vercel.app/api/companies");
        setCompanies(response.data);
				console.log(response.data)
			} catch(error) {
				console.error('Error fetching companies:', error);
			}
		}

		fetchCompanies()
		// for (let c in companies) {
		// 	console.log(c.name)
		// }
	}, [])

	
	return (
		<div>
			<h1>List of Companies</h1>
      <ul>
        {companies.map((company, index) => (
          <li key={index}>
						<Link to={`/company/${company._id}`}>{company.name} {company.location?.name}
						</Link>
					</li>
        ))}
      </ul>
		</div>
	)
}