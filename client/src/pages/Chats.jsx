import React, { useEffect, useState } from "react";



export default function Chats(){

    const [fetchAgain, setFetchAgain] = useState(false);
    const { user } = ChatState();  

    return(
        <div>
            chats over here
        </div>  
    ) 

}