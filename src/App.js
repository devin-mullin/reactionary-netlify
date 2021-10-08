import React from 'react';
import { useState } from 'react';
import Search from './Components/Search';
import WordOfTheDay from './Components/WordOfTheDay';
import FavoriteList from './Components/FavoriteList';
import NavBar from './Components/NavBar';
import NewUserForm from './Components/NewUserForm';
import WordCard from './Components/WordCard';
import ThesaurusCard from './Components/ThesaurusCard';
import { Route, Switch } from 'react-router-dom'


function App() {
  const [searchWord, setSearchWord] = useState('')
  const [loggedInUser, setLoggedInUser] = useState([{}])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [favList, setFavList] = useState([])
  const [thesaurusSearchWord, setThesaurusSearchWord] = useState("")
  const [favoriteArray, setFavoriteArray] = useState([])
 
  
  function getWordDefinition(searchValue) {
    fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${searchValue}?key=818a2b96-1647-4667-8769-8f3de5ad1509`)
    .then(r => r.json())
    .then(data => setSearchWord(data))
  }

  function getWordSynonym(searchValue) {
    fetch(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${searchValue}?key=bf67571a-955e-4874-aa11-d4d40d976166`)
    .then(r => r.json())
    .then(data => setThesaurusSearchWord(data))
  }

  function userLogin(e, creds) {
    e.preventDefault()
    fetch(`/users?username=${creds.username}`)
    .then(r=>r.json())
    .then(users => {
      if(users.length > 0){
        setLoggedInUser(users)
        setIsLoggedIn(true)
        alert('good job brother u logged in')
      } else {
        alert('try again buddy')
      }
    }) 
  }


  const addFavorite = (word) => { 
    fetch('/words', {
      method: 'POST', 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word)
      }
    )
    .then(res=>res.json())
    .then(word=>linkedFavorites(word))
  }

  
  const linkedFavorites = (word) => {
    const userFavObj ={
      userId: loggedInUser[0].id,
      wordId: word.id
        }
      fetch('/favorites', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(userFavObj)
      })
      .then(res=>res.json())
      .then(userFav => grabFavorites())
      
  }

  const grabFavorites = () => {
    setFavList(value => value = [])
    fetch(`/user/${loggedInUser[0].id}/favorites?_expand=words`)
    .then(res=>res.json())
    .then(data => anotherFunction(data))
  }
      

  const anotherFunction = (data) => {
      data.forEach(objs=>{ 
      fetch(`/words/${objs.wordId}`)
      .then(res=>res.json())
      .then(data=> {
        const favObj = {...data, favoriteID: objs.id}
        setFavList(value=>[...value, favObj])})
      })
    }
      

  function handleDeleteFavorite(favID) {
    fetch(`/favorites/${favID}`, {
      method: 'DELETE'
    })
    .then(grabFavorites())
  }
  
  return (
    <div>
      <Switch>
          <Route path="/newuser">
            <NewUserForm />
          </Route>
          <Route path="/randomword">
            <WordOfTheDay />
          </Route>
          <Route path="/">
            <NavBar userLogin={userLogin} loggedInUser={loggedInUser} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            <Search getWordDefinition={getWordDefinition} getWordSynonym={getWordSynonym} setSearchWord={setSearchWord} setThesaurusSearchWord={setThesaurusSearchWord}/> 
            {searchWord? <WordCard searchWord={searchWord[0]} addFavorite={addFavorite} isLoggedIn={isLoggedIn}/> : null}
            {thesaurusSearchWord? <ThesaurusCard thesaurusSearchWord={thesaurusSearchWord[0]} /> : null}
            <FavoriteList handleDeleteFavorite={handleDeleteFavorite} favList={favList} grabFavorites={grabFavorites} isLoggedIn={isLoggedIn} loggedInUser={loggedInUser[0]}/>
          </Route>
        </Switch>
    </div>
  );
}

export default App;

