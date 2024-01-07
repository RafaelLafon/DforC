import { PrismaClient } from '@prisma/client';
import { useState, useEffect } from 'react';

const prisma = new PrismaClient();

export default function ServerDetails({ server }) {
  const [formData, setFormData] = useState({
    Name: "",
  });
  const [channels, setChannels] = useState([]);

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    fetch("/api/channel", {
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

  useEffect(() => {
    async function fetchChannels() {
      try {
        if (server) {
          const fetchedChannels = await prisma.channel.findMany({
            where: {
              ServerId: server.Id,
            },
          });
          console.log("Fetched Channels:", fetchedChannels);
          setChannels(fetchedChannels);
        }
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    }
  
    fetchChannels();
  }, [server]);
  
  

  return (
    <div>
      <h1>Détails du Serveur {server.Name}</h1>
      <p>Id: {server.Id}</p>
      <p>Membres: {server.Members}</p>
      <p>Admins: {server.Admins}</p>
      <div>
        <form onSubmit={submitForm}>       
          <div>
            <label>Channel Name</label>
            <input type="text" name="Name" onChange={handleInput} value={formData.Name} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <h2>Canaux :</h2>
    <ul>
      {channels.map((channel) => (
        <li key={channel.Id}>
          <p>Channel Name: {channel.Name}</p>
        </li>
      ))}
    </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  const serverId = context.params.id;
  try {
    const server = await prisma.server.findUnique({
      where: {
        Id: serverId,
      },
    });
    return { props: { server } };
  } catch (error) {
    console.error(error);
    return { props: { server: null } };
  }
}
