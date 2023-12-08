type ProfilBarProps = {
    tag: string
  }


export function ProfilBar(props:ProfilBarProps){
    return (
        <div>
            You are connected {props.tag} !
        </div>

    )
}