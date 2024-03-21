import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthForm } from '../types/auth.types'
import { useMutation } from '@tanstack/react-query'
import { authService } from '../services/auth.service.ts'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components";

export default function SignupPage() {
	
	const navigateTo = useNavigate()

	const { register, handleSubmit, reset } = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const { mutate } = useMutation({
		mutationKey: ['signup'],
		mutationFn: (data: IAuthForm) => authService.main(
			'signup', data
		),
		onSuccess() {
			console.log('User succesfully stored')
			reset()
			navigateTo("/signin")
		}
	})

	const handleBack = () => {
		navigateTo("/signin")
	}
	
	const onSubmit: SubmitHandler<IAuthForm> = data => {
		console.log(data)
		mutate(data)
	 }
	
	return (
		<AuthContainer>
			<Button onClick={handleBack}>Back</Button>
				<Form onSubmit={handleSubmit(onSubmit)}>
				<AuthMessage>Hello Auth page</AuthMessage>
					<Input {...register('email', { required: 'Email is required!' })} type="text" placeholder='Email' />
					<Input {...register('password', { required: 'Password is required!' })} type="password" placeholder='Password' />
					<Button>Register</Button>
				</Form>
				
		</AuthContainer>
			
	)
}

export const AuthContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #333;
`;

export const Form = styled.form`
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    width: 25%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;

	@media (max-width: 768px) {
        width: 75%;
    }
`;


export const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
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

export const AuthMessage = styled.p`
    color: black;
    text-align: center;
    margin-top: 20px;
	font-size: 20px;
	font-weight: bold;
`;