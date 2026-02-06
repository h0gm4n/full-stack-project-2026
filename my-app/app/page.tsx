
'use client'

import { consoleLog, createUser, pingMongoDB, validateLogin } from './actions'
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import LoginStatus from './components/LoginStatus';

export default function Home() {

  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);

    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      e.preventDefault();
    } else if (username.length > 20 || username.length < 8 || password.length > 30 || password.length < 8) {
      alert('Username must be 8-20 characters and password must be 8-30 characters');
      e.preventDefault();
    } else {
      alert('User created successfully!');
      setRegistrationOpen(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        const result = await validateLogin(formData);
        setMessage(result);
        if (result === 'Login successful') {
          router.push('/home');
        }
      } catch (error) {
        setMessage((error as Error).message);
      }
    });
  };

  const LoginBox = () => {
    return (
      <div id="LoginBox" className="pt-30 flex items-center justify-center">
        <div className="w-60 my-4 flex flex-col justify-center items-center outline-2 outline-offset-2 bg-white p-4 rounded">
        <form onSubmit={handleLoginSubmit}>
          <div>
            <h1 className='text-base flex items-center justify-center'>Login</h1>
            <input className="my-2 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block px-3 py-2.5 shadow-xs placeholder:text-body" type="text" name="username" placeholder="Username"></input>
            <input className="my-2 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block px-3 py-2.5 shadow-xs placeholder:text-body" type="password" name="password" placeholder="Password"></input>
          </div>
          <button id="LoginButton" className="my-2 w-45 h-7 mx-auto bg-transparent hover:bg-lime-500 text-lime-700 font-semibold text-sm hover:text-white px-4 border border-lime-500 hover:border-transparent rounded flex items-center justify-center" type="submit" disabled={isPending}>{isPending ? 'Logging in...' : 'Log in'}</button>
        </form>
        {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
        <div id="Register">
          <h3 className='text-sm flex items-center justify-center'>Not registered?</h3>
          <button id="RegisterButton"className="my-2 w-45 h-7 bg-lime-200 hover:bg-lime-500 text-lime-700 font-semibold text-sm hover:text-white px-4 border border-lime-500 hover:border-transparent rounded" onClick={() => setRegistrationOpen(true)}>Register</button>
        </div>
        </div>
      </div>
    )
  }

  const RegistrationForm = () => {
    return (
      <div id="RegisterBox" className="fixed inset-0 flex items-center justify-center">
        <div className="w-60 my-4 flex flex-col justify-center items-center outline-2 bg-lime-100 p-4 rounded">
        <form action={createUser} onSubmit={handleSubmit}>
          <div>
            <h1 className='text-base flex items-center justify-center'>Register</h1>
            <input className="my-2 bg-white border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block px-3 py-2.5 shadow-xs placeholder:text-body" type="text" name="username" placeholder="Username"></input>
            <input className="my-2 bg-white border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block px-3 py-2.5 shadow-xs placeholder:text-body" type="password" name="password" placeholder="Password"></input>
            <input className="my-2 bg-white border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block px-3 py-2.5 shadow-xs placeholder:text-body" type="password" name="confirmPassword" placeholder="Confirm Password"></input>
          </div>
          <button id="RegisterButton"className="my-2 w-45 h-7 mx-auto bg-lime-300 hover:bg-lime-500 text-lime-700 font-semibold text-sm hover:text-white px-4 border border-lime-500 hover:border-transparent rounded flex items-center justify-center"type="submit">Register</button>
        </form>
        <div id="ReturnToLogin">
          <button id="ReturnButton"className="my-2 w-45 h-7 bg-lime-200 hover:bg-lime-500 text-lime-700 font-semibold text-sm hover:text-white px-4 border border-lime-500 hover:border-transparent rounded" onClick={() => setRegistrationOpen(false)}>Return to Login</button>
        </div>
        </div>
      </div>
    )
  }

  if (registrationOpen == false) {
    return (
      <div>
        <LoginStatus />
        <h1 className="pl-20 pt-10">Name Of App</h1>
        <form className="pl-20"action={consoleLog}>
          <button className="my-3 bg-transparent hover:bg-lime-500 text-lime-700 font-semibold hover:text-white py-2 px-4 border border-lime-500 hover:border-transparent rounded" type="submit">Console Log</button>
        </form>
        <form className="pl-20"action={pingMongoDB}>
          <button className="bg-transparent hover:bg-lime-500 text-lime-700 font-semibold hover:text-white py-2 px-4 border border-lime-500 hover:border-transparent rounded" type="submit">Ping MongoDB</button>
        </form>
        <LoginBox />
      </div>
    )
  } else {
    return (
      <div>
        <h1 className="pl-20 pt-10">Name Of App</h1>
        <form id="consoleLog" className="pl-20"action={consoleLog}>
          <button className="my-3 bg-transparent hover:bg-lime-500 text-lime-700 font-semibold hover:text-white py-2 px-4 border border-lime-500 hover:border-transparent rounded" type="submit">Console Log</button>
        </form>
        <form id="pingMongoDB" className="pl-20"action={pingMongoDB}>
          <button className="bg-transparent hover:bg-lime-500 text-lime-700 font-semibold hover:text-white py-2 px-4 border border-lime-500 hover:border-transparent rounded" type="submit">Ping MongoDB</button>
        </form>
        <RegistrationForm />
      </div>
    )
  }
  
}