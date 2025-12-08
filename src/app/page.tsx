"use client";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const ANIMALS = ["wolf", "hawk", "bear", "shark", "lion", "tiger"];
const STORAGE_KEY = "chat_username";
const generateUserName = ()=>{
  const word = ANIMALS[Math.floor(Math.random()*ANIMALS.length)];
  return `anonymous-${word}-${nanoid(5)}`
}
export default function Home() {
  const [userName, setUserName] = useState("")
  useEffect(()=>{
    const main = ()=>{
      const store =localStorage.getItem(STORAGE_KEY);
      if(store){
        setUserName(store);
      }
      const generated = generateUserName();
      localStorage.setItem(STORAGE_KEY, generated);
      setUserName(generated);
    }

    main();
  },[]);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-green-500">{">"}private_chat</h1>
          <p className="text-zinc-500 text-sm">A private, self destructing chat room.</p>
        </div>
        <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="flex items-center text-zinc-500">
              Your Identity
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-zinc-950 border-zinc-800 p-3 text-sm text-zinc-400 font-mono">
                {userName}
              </div>
            </div>
          </div>
          <button className="w-full bg-zinc-100 text-black p-3 text-sm font-bold hover:bg-zinc-400 hover:text-black transition-colors mt-2 cursor-pointer disabled:opacity-50">
            CREATE SECURE ROOM
            </button>
        </div>
        </div>
      </div>
    </main>
  );
}
