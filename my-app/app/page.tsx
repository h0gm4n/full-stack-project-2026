
'use client'

import { consoleLog, createDummyItem, pingMongoDB } from './actions'

export default function Home() {

  return (
    <div>
      <h1 className="pl-20 pt-10">Name Of App</h1>
      <form className="pl-20"action={consoleLog}>
        <button className="my-3 bg-transparent hover:bg-lime-500 text-lime-700 font-semibold hover:text-white py-2 px-4 border border-lime-500 hover:border-transparent rounded" type="submit">Console Log</button>
      </form>
      <form className="pl-20"action={pingMongoDB}>
        <button className="bg-transparent hover:bg-lime-500 text-lime-700 font-semibold hover:text-white py-2 px-4 border border-lime-500 hover:border-transparent rounded" type="submit">Ping MongoDB</button>
      </form>
      <form className="fixed inset-0 flex items-center justify-center" action={createDummyItem}>
        <div className="w-60 my-4 flex flex-col justify-center items-center outline-2 outline-offset-2 bg-white p-4 rounded">
          <h1>Login</h1>
          <input className="my-2 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block px-3 py-2.5 shadow-xs placeholder:text-body" type="text" name="username" placeholder="Username"></input>
          <input className="my-2 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block px-3 py-2.5 shadow-xs placeholder:text-body" type="password" name="password" placeholder="Password"></input>
          <button className="my-2 w-45 h-7 bg-transparent hover:bg-lime-500 text-lime-700 font-semibold text-sm hover:text-white px-4 border border-lime-500 hover:border-transparent rounded"type="submit">Create Dummy Item</button>
        </div>
      </form>
    </div>
  );
}
