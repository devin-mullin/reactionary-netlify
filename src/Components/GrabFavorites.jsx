import { useCallback } from "react";

const GrabFavorites = useCallback(
    ()=>{
    setFavList(value => value = [])
    fetch(`${process.env.REACT_APP_API_URL}/user/${loggedInUser[0].id}/favorites?_expand=words`, {method: 'GET'})
    .then(res=>res.json())
    .then(data => anotherFunction(data))
})

export default GrabFavorites