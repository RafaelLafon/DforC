import React, { useState } from "react"
import { RedirectType, redirect } from 'next/navigation'
import { Console } from "console";
import { json } from "stream/consumers";


export default function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const add=()=>{

  }

  const [formSuccess, setFormSuccess] = useState(false)
  const [formSuccessMessage, setFormSuccessMessage] = useState("")

  function resetdb(){
    fetch("/api/reset", {
      method: "POST",
      body: "go",
      headers: {
        'accept': 'application/json',
      },
    })
  }

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
    console.log(formData)
  }
  const submitForm = (e) => {
    // We don't want the page to refresh
    e.preventDefault()
    fetch("/api/form", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'accept': 'application/json',
      },
    }).then((response) => response.json())
    .then((data) => {
      setFormData({
        email: "",
        password: "",  
      })
      
   
      // Handle response if necessary
      // ...
      setFormSuccess(true)
    })
  }

  return (
    <main>
    <div>
      <h1>Contact form</h1>
        <form id="form" method="POST" action="https://www.formbackend.com/f/664decaabbf1c319" onSubmit={submitForm}>       
          <div>
            <label>Email</label>
            <input id="email" type="text" name="email" onChange={handleInput} value={formData.email} />
          </div>         
          <div>
            <label>Password</label>
            <input id="password"  type="text" name="password" onChange={handleInput} value={formData.password}/>
          </div>
          <button type="submit">Send message</button>
        </form>
    </div>
    <button onClick={resetdb}>RESET DB </button>
    </main>
  )
}