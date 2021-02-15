import logo from '../img/spXlogo.png'
import styled from 'styled-components'
import wallpaper from '../img/spaceX-wall.jpg'
import starlinkImg from '../img/starlink-wall.jpg'
import starlinkLogo from '../img/starlink-logo.png'
const Home = () => {
    return (
        <div>
            <DivContainer className="content-flex" style={{backgroundImage: `url(${wallpaper})`, justifyContent: "flex-start"}}>
                <FlexDiv className="container">
                    <div>
                        <img src={logo} alt="logo" style={{maxWidth: "100%"}}/>
                        <p style={{color: "#FFF"}}> is an American aerospace manufacturer and space transportation services company headquartered in Hawthorne, California.<br/> It was founded in 2002 by Elon Musk with the goal of reducing space transportation costs to enable the colonization of Mars.</p>              
                    </div>
                </FlexDiv>   
            </DivContainer>
            <DivContainer className="content-flex" style={{backgroundImage: `url(${starlinkImg})`}}>
                <FlexDiv className="container">
                    <div>
                        <img src={starlinkLogo} alt="logo" style={{maxWidth: "100%"}}/>
                        <p style={{color: "#FFF"}}>Starlink is a satellite internet constellation being constructed by SpaceX providing satellite Internet access.</p>              
                    </div>
                </FlexDiv>  
            </DivContainer>
            
        </div>
    )
}

const DivContainer = styled.div`
    padding: 340px 20px;
    background-size: cover;
`
const FlexDiv = styled.div`
    display: flex;
`

export default Home