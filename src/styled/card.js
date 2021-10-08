import styled from 'styled-components'

const Card = styled.div `
text-align: center;
background-color: #ffffff;
font-family: Helvetica, sans-serif;
padding: 20px;
display: center;
margin: 80px 100px;
box-shadow: 0 0 20px rgba(0, 0, 0, .5), 0 0 40px rgba(0, 0, 0, 0.3);
border-radius: 15px;

& button {
    background-color: ##5CD64C;
        font-family: Helvetica
        color: black;
        border-radius: 10px;
        text-decoration: none;
}

& button:hover {
    color: white;
    background-color: #3165a5;
}

& li {
    margin: 5px;
    padding: 5px;
}
`

export default Card