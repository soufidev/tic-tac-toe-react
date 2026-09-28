import { useState } from "react";
export default function Player ({initiaName, symbol , isActive}){
    const [isEditing , setIsEditing] = useState(false);
    const [playername , setPlayername] = useState(initiaName);
    function handlerButtons (){
        setIsEditing((editing)=> !editing);
    }
    function handlechange (event){
        setPlayername(event.target.value);
    }
    let editingPlayername = <span className="player-name">{playername}</span>;
    if (isEditing){
        editingPlayername = isEditing && <input type="text" required value={playername} onChange={handlechange}/>;
    }
    return(
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
              {editingPlayername}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handlerButtons}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}