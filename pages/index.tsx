import Image from 'next/image'
import { Inter } from 'next/font/google'
import { ProfilBar } from '../components/connected'
import { useCookies } from "react-cookie"
import Router from 'next/router'

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

  if (cookie.connectCookie == undefined) {
    return (
      <div>
        <a href="/signin"> S'inscrire</a>
      </div>
    )
  } else {
    console.log(cookie.connectCookie)
    var cookieContent = cookie.connectCookie

    if (!cookieContent.configured) {
      Router.push("/configuration")
      return
    }

    if (cookieContent.tag) {
      return (
        <div>
          <ProfilBar tag={cookieContent.tag}></ProfilBar>
        </div>
      )
    }

  }
}
