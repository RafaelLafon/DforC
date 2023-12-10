import Image from 'next/image'
import { Inter } from 'next/font/google'
import { ProfilBar } from '../components/connected'
import { useCookies } from "react-cookie"
import Router from 'next/router'
import {verifCookie,getUserInfo} from "../auth/auth"
import { UserInfo } from '@/struct/struct'
import { redirect } from 'next/navigation'
import { userInfo } from 'os'
import { getServerSideProps } from 'next/dist/build/templates/pages'

const inter = Inter({ subsets: ['latin'] })

type ProfilBarProps = {
  name: string
}

type content = {
  tag: string,
  configured: boolean
}



export default function Home() {
  const [cookie] = useCookies(["connectCookie"])
  console.log("index page log : "+cookie.connectCookie)
    return (
      <div>
        <a href="/signin"> S'inscrire</a>
        <a href="/login"> Se connecter</a>
      </div>
    )
} 

