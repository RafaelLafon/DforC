import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default function ServerList({ servers }) {
  return (
    <div>
      <h1>Liste des Serveurs</h1>
      <ul>
        {servers.map((server) => (
          <li key={server.Id}>
            <h2>{server.Name}</h2>
            <p>Id: {server.Id}</p>
            <p>Membres: {server.Members}</p>
            <p>Admins: {server.Admins}</p>
            <Link href={`/servers/${server.Id}`}>
              <div>Voir ce serveur</div>
            </Link>
          </li>
        ))}
      </ul>
      <a href='/creatServ'>Créer un serveur</a>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const servers = await prisma.server.findMany();
    return { props: { servers } };
  } catch (error) {
    console.error(error);
    return { props: { servers: [] } };
  }
}
