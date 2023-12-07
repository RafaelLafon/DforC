import Image from 'next/image'
import { Inter } from 'next/font/google'
import {ProfilBar} from '../components/connected'
import { useCookies } from "react-cookie"

const inter = Inter({ subsets: ['latin'] })

type ProfilBarProps = {
  name: string
}

export default function Home() {
  const [cookie, setCookie] = useCookies(["user"])
  if (cookie.user){
    return (
      <main>
        <ProfilBar  name={cookie.user}></ProfilBar>
      </main>
    )
  } else{
    return (
      <main>
        <a href="/signin"> S'inscrire</a>
      </main>
    )
  }
  
}
