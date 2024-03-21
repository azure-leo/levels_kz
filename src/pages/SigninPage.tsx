'use client'

import React, { useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { IAuthForm } from "../types/auth.types.ts";
import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth.service.ts';
import { useNavigate } from 'react-router-dom';

import { Grid, Box, Container, Avatar, Typography, TextField, Button } from '@mui/material';
import { LockPerson } from '@mui/icons-material';
import Popup from '../components/Popup.tsx';


export default function SigninPage() {
		 const { register, handleSubmit, reset } = useForm<IAuthForm>({
			mode: 'onChange'
		 })

		 const [errorMessage, setErrorMessage] = useState('');

		 const navigateTo = useNavigate()

		 const { mutate } = useMutation({
			mutationKey: ['auth'],
			mutationFn: (data: IAuthForm) => authService.main('signin', data),
			onSuccess() {
				reset()
				console.log('SUCCESS')
				navigateTo('/home')
			},
			onError() {
				setErrorMessage('Invalid login. Please try again.')
			}
		 })

		 const onSubmit: SubmitHandler<IAuthForm> = data => {
			console.log(data)
			mutate(data)
		 }

		 const center = {
			position: "relative",
			top: "50%",
			left: "37%",
		 }

		 const boxstyle = {
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			width: "75%",
			height: "75%",
			bgcolor: "background.paper",
			boxShadow: 24,
		 }

		 const handleSubmitSignUp = () => {
			navigateTo("/signup")
		 }

		 const closePopup = () => {
			setErrorMessage('');
		};

		 return (
			<div>
				<Box sx={boxstyle}>
					<Grid container>
						<Grid item xs={12} sm={12} lg={6}>
							<Box style={{ 
								backgroundImage: `url(${process.env.PUBLIC_URL}/../logo.png)`,
								backgroundSize: "cover",
								marginTop: "40px",
								marginLeft: "15px",
								marginRight: "15px",
								height: "63vh",
								color: "f5f5f5",
							 }}>
							</Box>
						</Grid>
						<Grid item xs={12} sm={12} lg={6}>
							<Box style={{ 
								backgroundSize: "cover",
								height: "70vh",
								minHeight: "500px",
								backgroundColor: "#ffffff" 
							}}>
							<Container>
							 <Box height={35} />
							 <Box sx={center}>
							 	<Avatar sx={{ ml: "35px", mb: "4px", bgcolor: "blue"}}>
							 		<LockPerson></LockPerson>
								</Avatar>
								<Typography component="h1" variant="h4">
									Sign In
								</Typography>
							 </Box>
							 <Box height={35}></Box>
							 <Grid container spacing={1}>
							 <form className='w-full m-auto' onSubmit={handleSubmit(onSubmit)}>
								<Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
									<TextField {...register('email', {
 							required: 'Email is required!'
 						})} required
									fullWidth
									id="email"
									label="Email"
									name="email"
									autoComplete='email'
									/>
								</Grid>
								<Box height={25}></Box>
								<Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
									<TextField {...register('password', {
 							required: 'Password is required!'
 						})} required
									fullWidth
									id="password"
									label="Password"
									name="password"
									type="password"
									autoComplete='password'
									/>
								</Grid>
								<Box height={35} />
								<Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
									<Button
										type="submit"
										variant="contained"
										fullWidth="true"
										size="large"
										sx={{ 
											mt: "10px",
											mr: "20px",
											borderRadius: 28,
											color: "#ffffff",
											minWidth: "170px",
											backgroundColor: "blue"			
										 }}								
										>
											Sign in
										</Button>
								</Grid>
								<Box height={15} />
								</form>
								<Grid item xs={12} sx={{ ml: "10em", mr: "10em" }}>
									<Button
										onClick={handleSubmitSignUp}
										type="submit"
										variant="contained"
										fullWidth="true"
										size="large"
										sx={{ 
											mt: "10px",
											mr: "20px",
											borderRadius: 28,
											color: "#ffffff",
											minWidth: "170px",
											backgroundColor: "blue"			
										 }}								
										>
											Sign up
										</Button>
								</Grid>
							 </Grid>
							</Container>
							</Box>
						</Grid>
					</Grid>
				</Box>
				{errorMessage && <Popup message={errorMessage} color="red" onClose={closePopup} />}
			</div>
		)
}
