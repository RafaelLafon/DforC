import { logout } from "@/auth/cookie"
import { UserInfo } from '@/struct/struct'



export function ProfilBar(props:UserInfo){
    return (
        <>
        <div>
            <img src="" alt="" />
            <h1>You are connected {props.tag} !</h1>
            <button onClick={logout}>Log out</button>
        </div>
        </>
    )
}