"use client"
import React, { useState } from "react"
import axios from "axios"

export default function Home() {
  const [fetchedFrom,setFetchedFrom] = useState("")

  const fetchUser = async (id: string) => {
    try {
      const response = await axios.get(`/api/fetch/${id}`)
      setFetchedFrom(response.data)
    }
    catch(error) {
      console.log(error)
    }
  }

  return (
    <div id="home">
      <div className="buttons">
        <button onClick={() => fetchUser("clpflwy7v0000c4qvxychse4c")}>fetch sam</button>
        <button onClick={() => fetchUser("clpfm61dl0002c4qvjlobg3s8")}>fetch adam</button>
        <button onClick={() => fetchUser("clpfm77sr0004c4qvlpb6ucfl")}>fetch max</button>
      </div>
      <p>{!fetchedFrom ? "press on a user to fetch data" : fetchedFrom}</p>
    </div>
  )
}
