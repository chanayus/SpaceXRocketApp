import styled from 'styled-components'
import bg1 from '../img/bg1.webp'
import { Link } from "react-router-dom";
const Error = () => {
    return (
        <div>
            <DivContainer className="content-flex" style={{ backgroundImage: `url(${bg1})`}}>
                <FlexDiv className="container">
                    <div style={{width: "80%"}}>
                        <h1 style={{ color: "#FFF" }}>Ooooops!</h1>
                        <p class="text">This page doesn't exist anymore.</p>
                        <Link to="/SpaceXRocketApp"><NavButton>Go to Homepage</NavButton></Link>
                    </div>
                </FlexDiv>
            </DivContainer>
            <div class="emoji">😭</div>
            <p class="title">Ooooops!</p>
            <p class="text">This page doesn't exist anymore.</p>
        </div>
    )
}
const DivContainer = styled.div`
    height: 100vh;
    background-size: cover;
    background-attachment: fixed;
    display: flex;
    align-items: center;
    
`
const FlexDiv = styled.div`
    display: flex;
    flex-wrap: wrap-reverse;
    width: 100%;
    
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