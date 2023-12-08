import React, { useState } from "react"
import { RedirectType, redirect } from 'next/navigation'
import {login} from "../auth/cookie"

import { json } from "stream/consumers";


export default function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  


  const [formSuccess, setFormSuccess] = useState(false)
  const [formSuccessMessage, setFormSuccessMessage] = useState("")

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
    console.log(formData)
  }
    async function submitForm(e) {
    // We don't want the page to refresh
    e.preventDefault()
    const response=await fetch("/api/loginHandler", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'type': 'application/json',
      },
    })
    if (response.status === 200) {
      const { tag,token } = await response.json()
      if (token=="true"){
      await login({ tag })
      }
  } 
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
    </main>
  )
}
