import Router from 'next/router'
import React, { useState } from "react"


export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


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
  async function submitForm(e){
    // We don't want the page to refresh
    e.preventDefault()
    var response= await fetch("/api/signinHandler", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'accept': 'application/json',
      },
    })
    setFormData({
      email: "",
      password: ""
  })
    if (response.status===400){
      const {message} = await response.json()
      console.log(message)
    } else if (response.status===200){
      Router.push("/login")
    }
      
  }

  return (
    <main>
    <div>
      <h1>Sign in</h1>
        <form id="form" method="POST" onSubmit={submitForm}>       
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