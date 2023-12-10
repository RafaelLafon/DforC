import { Router, useRouter } from 'next/router'
import {verifCookie,getUserInfo} from "../../auth/auth"
import { UserInfo } from '@/struct/struct'
import { useCookies } from "react-cookie"
import E400 from "../../components/400error"
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'





export const getServerSideProps = (async () => {

    const res = await fetch("localhost:3000/api/1");
    const info = await res.json();
    return { props: { info} }

     
  })

export default function User({info}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    var pageContent
    const [cookie] = useCookies(["connectCookie"])
    if(!verifCookie(cookie)){
        pageContent=(
            <div>
        <E400/>
        </div>
        )
    } else{     
        const router = useRouter()
        pageContent=( <div><p>User : {info.tag}</p></div>)
    }
    return pageContent   
}


 
