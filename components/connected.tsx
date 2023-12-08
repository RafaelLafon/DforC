import { logout } from "@/auth/cookie"

type ProfilBarProps = {
    tag: string
  }


export function ProfilBar(props:ProfilBarProps){
    return (
        <div>
            You are connected {props.tag} !
            <button onClick={logout}>Log out</button>
        </div>
    )
}