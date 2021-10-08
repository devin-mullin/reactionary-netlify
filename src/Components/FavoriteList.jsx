import { useEffect } from "react"
import Card from "../styled/card"
import GrabFavorites from "./GrabFavorites"

function FavoriteList({handleDeleteFavorite, favList, grabFavorites, isLoggedIn, loggedInUser}) {
    

   
        if(isLoggedIn === true){ 
        grabFavorites() }
   
    
    


    let listOfFavorites = 
    favList.map(fav=>
        <>
            <li key={fav.id}>
                {fav.name}
                <button onClick={() => handleDeleteFavorite(fav.favoriteID)}>❌</button>
            </li>
        </>
    )
        
    
    if (isLoggedIn === false){
        listOfFavorites = [null]
        }

    
    return(
        <Card>
            <h2>{isLoggedIn ? `${loggedInUser.username}'s Favorite Words` : 'Favorite Words'}</h2>
            {listOfFavorites}
        </Card>
    )
}

export default FavoriteList