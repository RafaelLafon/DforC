import Image from 'next/image'
import { Inter } from 'next/font/google'
import {ProfilBar} from '../components/connected'
import { useCookies } from "react-cookie"

const inter = Inter({ subsets: ['latin'] })

type ProfilBarProps = {
  name: string
}

export default function Home() {
  const [cookie, setCookie] = useCookies(["tag"])
  console.log(cookie)
  if (cookie.tag){
    return (
      <main>
        <ProfilBar  tag={cookie.tag}></ProfilBar>
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
