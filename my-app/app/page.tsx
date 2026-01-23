
'use client'

import { createDummyItem, pingMongoDB } from './actions'

export default function Home() {

  return (
    <div>
      <h1 className="pl-20 pt-10">Moi</h1>
      <button className="pl-20"onClick={() => console.log("Hello!")}>Click me</button>
      <form className="pl-20"action={pingMongoDB}>
        <button type="submit">Ping MongoDB</button>
      </form>
      <form className="pl-20"action={createDummyItem}>
        <button type="submit">Create Dummy Item</button>
      </form>
    </div>
  );
}
