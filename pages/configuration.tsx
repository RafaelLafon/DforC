import React, { useState } from "react"
import { verifCookie } from "../auth/auth"
import E400 from "../components/400error"
import { useCookies } from "react-cookie"
import {useRouter} from 'next/router'
import { json } from "stream/consumers"



export default function Configuration() {
  const [cookie] = useCookies(["connectCookie"])
  if (!verifCookie(cookie)) {
    return (
      <E400/>
    )
  }

  const [formData, setFormData] = useState({
    name: "",
    image: "",
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
  async function submitForm(e){
    // We don't want the page to refresh
    e.preventDefault()
    console.log(cookie.connectCookie.id)
    var response= await fetch("/api/configurationHandler", {
      method: "POST",
      body: JSON.stringify({"name":formData.name,"image":formData.image,"id":cookie.connectCookie.id}),
      headers: {
        'accept': 'application/json',
      },
    })
    if (response.status===400){
      const {message} = await response.json()
      console.log(message)
    }    
  }

  return (
    <div>
      <h1>Configuration</h1>
        <form id="form" method="POST" onSubmit={submitForm}>       
          <div>
            <label>Enter a name</label>
            <input id="email" type="text" name="name" onChange={handleInput} value={formData.name} />
          </div>         
          <div>
            <label>Image</label>
            <input id="password"  type="file" name="image" onChange={handleInput} value={formData.image}/>
          </div>
          <button type="submit">Send message</button>
        </form>
    </div> 
  )
}
