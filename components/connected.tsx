type ProfilBarProps = {
    name: string
  }


export function ProfilBar(props:ProfilBarProps){
    return (
        <div>
            You are connected {props.name} !
        </div>

    )
}