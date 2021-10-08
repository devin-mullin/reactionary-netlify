
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Card from '../styled/card'
import styled from 'styled-components'

function NewUserForm() {
    const [credentials, setCredentials] =useState({
        username: '',
        password: ''
    })
    
    const history = useHistory()

    const routeChange = () => {
        let path = './'
        history.push(path)
    }

    function handleChange(e) {
        setCredentials({
            ...credentials, 
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        addUser(credentials)
        alert('Thank you for signing up to use the dictionary.')
    }

    function addUser(username){
        console.log(username);
        fetch('http://localhost:3001/Users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(username)
        })
        .then(r => r.json())
        .then(newUser => {
        console.log(newUser)
         routeChange()
        })
    }
        


    return(
        <Card>
            <Form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input type="text" name="username" onChange={handleChange} value={credentials.username} />
                <br/>
                <label>Password: </label>
                <input type="text" name="password" onChange={handleChange} value={credentials.password} />
                <br/>
                <input type="submit" name="Submit" value="Create"/>
            </Form>
        </Card>
    )
}

export default NewUserForm

const Form = styled.form `
font-family: Helvetica, sans-serif;
;

& input {
    font-family: Helvetica, sans-serif;
    margin: 10px
    height: 30px;
    border-radius: 15px;
}

& button {
        background-color: ##5CD64C;
        font-family: Helvetica
        color: black;
        padding: 10px;
        border-radius: 10px;
        text-decoration: none;

    }

& button:hover {
        color: white;
        background-color: #3165a5;
    }
`