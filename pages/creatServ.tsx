import React, { useState } from "react";

export default function Server() {
  const [formData, setFormData] = useState({
    Id: "",
    Name: "",
    Members: "",
    Admins: "",
  });

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    fetch("/api/serv", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <main>
      <div>
        <h1>Server form</h1>
        <form onSubmit={submitForm}>       
          <div>
            <label>Server's Name</label>
            <input type="text" name="Name" onChange={handleInput} value={formData.Name} />
          </div>



          <div>
            <label>Members</label>
            <input type="text" name="Members" onChange={handleInput} value={formData.Members} />
          </div>
          <div>
            <label>Admins</label>
            <input type="text" name="Admins" onChange={handleInput} value={formData.Admins} />
          </div>



          <button type="submit">Submit</button>
        </form>
        <a href="serverList">Go to list</a>
      </div>
    </main>
  );
}
