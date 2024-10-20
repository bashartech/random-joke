"use client"
import { useState, useEffect } from "react"
import {Button} from "@/components/ui/button"

interface JokeResponse {
    setup: string;
    punchline: string
}

export default function RandomJoke() {

    // State hook for managing the current joke
    const [joke, setJoke] = useState<string>("")

    useEffect(()=>{
        fetchJoke();
    },[]);

    async function fetchJoke(): Promise<void> {
        try{
            const response = await fetch("https://official-joke-api.appspot.com/random_joke")

            const data:JokeResponse = await response.json()

            setJoke(`${data.setup} - ${data.punchline}`)
        } catch(error){
           console.error("Error fetching joke", error);
           setJoke("failed to fetch")
        }
    }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-[#1f3a93] via-[#0c2461] to-[#6a89cc] p-6">
    {/* Center the joke card within the screen */}
    <div className="bg-white rounded-lg shadow-xl border-t-4 border-[#3b3b98] p-10 w-full max-w-lg transform hover:scale-105 transition-transform duration-300 ease-out">
      {/* Header with title */}
      <h1 className="text-3xl font-semibold mb-6 text-[#1f3a93] hover:text-[#0c2461] transition-colors duration-300 ease-in-out">
        😂 Random Joke 👈
      </h1>
      {/* Display the joke or a loading message */}
      <div className="bg-[#f0f0f5] rounded-lg p-6 mb-8 text-[#2c3e50] text-lg shadow-inner">
        {joke || "Loading..."}
      </div>
      {/* Button to fetch a new joke */}
      <Button
        onClick={fetchJoke}
        className="bg-[#3498db] hover:bg-[#2980b9] text-white font-medium py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
      >
        😂 Get New Joke 😂
      </Button>
    </div>
  </div>
  )
}
