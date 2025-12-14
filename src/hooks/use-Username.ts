import { nanoid } from "nanoid";
import { useEffect, useState } from "react"

const ANIMALS = ["wolf", "hawk", "bear", "shark", "lion", "tiger"];
const STORAGE_KEY = "chat_username";
const generateUserName = ()=>{
  const word = ANIMALS[Math.floor(Math.random()*ANIMALS.length)];
  return `anonymous-${word}-${nanoid(5)}`
}

export const useUsername = () => {
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

  return { userName }
}