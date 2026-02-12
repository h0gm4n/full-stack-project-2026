'use client';

import { useState } from 'react';
import LoginStatus from './LoginStatus';

type HomeClientProps = {
  username: string | null;
  userData: {
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    residenceId: string | null;
  };
};

export default function HomeClient({ username, userData }: HomeClientProps) {
  const [editForm, setEditForm] = useState(false);

  if (editForm === false) {
    return (
      <div className="p-8">
        <LoginStatus initialUsername={username} initialIsLoggedIn={!!username} />
        <h1 className="text-2xl font-bold">Home</h1>
        <p>
          Welcome to the home page!
        </p>
        <div>
          <p className="pt-3 text-xl font-semibold">Your information:</p>
          <p>Username: {userData.username}</p>
          <p>First name: {userData.firstName !== null ? userData.firstName : <span className="font-bold">Please enter</span>}</p>
          <p>Last name: {userData.lastName !== null ? userData.lastName : <span className="font-bold">Please enter</span>}</p>
          <p>Email: {userData.email !== null ? userData.email : <span className="font-bold">Please enter</span>}</p>
          <p>Current residence: {userData.residenceId !== null ? userData.residenceId : <span className="font-bold">No residence</span>}</p>
          <button id="EditButton" className="my-2 w-45 h-7 bg-lime-200 hover:bg-lime-500 text-lime-700 font-semibold text-sm hover:text-white px-4 border border-lime-500 hover:border-transparent rounded" onClick={() => setEditForm(true)}>Edit</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="p-8">
        <LoginStatus initialUsername={username} initialIsLoggedIn={!!username} />
        <h1 className="text-2xl font-bold">Home</h1>
        <p>
          Welcome to the home page!
        </p>
        <div>
          <p className="pt-3 text-xl font-semibold">Your information:</p>
          <p>Username: {userData.username}</p>
          <form>
            <p>First name: {userData.firstName !== null ? userData.firstName : <input className="my-2 bg-white border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block px-3 py-2.5 shadow-xs placeholder:text-body" type="text" name="firstname" placeholder="First name"></input>}</p>
            <p>Last name: {userData.lastName !== null ? userData.lastName : <input className="my-2 bg-white border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block px-3 py-2.5 shadow-xs placeholder:text-body" type="text" name="lastname" placeholder="Last name"></input>}</p>
            <p>Email: {userData.email !== null ? userData.email : <input className="my-2 bg-white border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block px-3 py-2.5 shadow-xs placeholder:text-body" type="text" name="email" placeholder="Email"></input>}</p>
          </form>
          <p>Current residence: {userData.residenceId !== null ? userData.residenceId : <span className="font-bold">No residence</span>}</p>
          <button id="EditButton" className="my-2 w-45 h-7 bg-lime-200 hover:bg-lime-500 text-lime-700 font-semibold text-sm hover:text-white px-4 border border-lime-500 hover:border-transparent rounded" onClick={() => setEditForm(true)}>Edit</button>
        </div>
      </div>
    )
  }
}