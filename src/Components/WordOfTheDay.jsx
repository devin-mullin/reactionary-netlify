
import Card from "../styled/card"
import {useEffect, useState} from 'react'
import { generateSlug } from "random-word-slugs"
import styled from "styled-components"

function WordOfTheDay() {
    const [randomWord, setRandomWord] = useState(
        [
          { art: { 
            artid: ''},
            hwi: 
            {hw: '', 
              prs: [ {mw: '',
                        sound: {
                          audio: ""
                        }} ],},
            shortdef: [] },
        ])
    const slug = generateSlug(1)
    
    useEffect(() => {
        fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${slug}?key=818a2b96-1647-4667-8769-8f3de5ad1509`)
        .then(r => r.json())
        .then(data => {
        setRandomWord(data)
        })
    }, [])
    
    const subdirectory = randomWord[0].hwi.prs[0].sound.audio[0]
    const soundFile = randomWord[0].hwi.prs[0].sound.audio 
    const audioElement = new Audio(`https://media.merriam-webster.com/audio/prons/en/us/mp3/${subdirectory}/${soundFile}.mp3`)

    let isImage = true
    let image

    const randomWordOrg = randomWord[0].hwi.hw
    const randomWordName = randomWordOrg.replace('*', '')

    if(randomWord[0].art?.artid) {
     isImage = true
     const imageDirectory = randomWord[0].art.artid 
     image = `https://www.merriam-webster.com/assets/mw/static/art/dict/${imageDirectory}.gif`
    } else {
        isImage = false
    }

    const playAudio = () => {
        audioElement.play()
    }
    
  

     return(
         <Card>
             <h1>Your Random Word!</h1>
             <h2>{randomWordName}</h2>
             <h3>{randomWord[0].hwi.prs[0].mw}</h3>
             <PlayButton onClick={playAudio}>Say Word</PlayButton>
             {randomWord[0].shortdef.map((word, index) => <p key={index}>{word}</p>)}
             {isImage ? <img src={image}/> : null}
         </Card>
     )
}

export default WordOfTheDay

const PlayButton = styled.button`
    background-image: linear-gradient(to right, #2BC0E4 0%, #EAECC6  51%, #2BC0E4  100%)}  
    padding: 15px 45px;
    text-align: center;
    text-transform: uppercase;
    font-family: Helvetica; sans-serif;
    transition: 0.5s;
    background-size: 200% auto;
    color: black;            
    box-shadow: 0 0 20px #eee;
    border-radius: 10px;
    display: center;
          }

          &:hover {
            background-position: right center; 
            color: #fff;
            text-decoration: none;
          
         
`