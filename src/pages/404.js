import styled from 'styled-components'
import { Link } from "react-router-dom";
const Error = () => {
    return (
        <DivContainer>
            <div>
                <h1>404</h1>
                <p class="title"> 😭Ooooops!</p>
                <p class="text">This page doesn't exist anymore.</p>
                <Link to="/SpaceXRocketApp"><NavButton>Go to Homepage</NavButton></Link>
            </div>
        </DivContainer>
    )
}
const DivContainer = styled.div`
    height: 100vh;
    background-size: cover;
    background-attachment: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align :center;
    p{
        font-size: 2rem;
        margin: 15px 0;
    }
    h1{
        font-size: 22vmin;
        color: rgb(255, 255, 255, 0.35);
        margin: 0;
    }
    
`
const NavButton = styled.button`
    background: #FFF;
    border: 2px solid transparent;
    padding: 1.25vmin 2.5vmin;
    transition: 0.25s;
    font-size: 1.1rem;
    :hover{
        background: transparent;
        color: #FFF;
        border: 2px solid #FFF;
    }
    b{
        font-size: 1.25rem;
    }
`
export default Error;