import logo from '../img/spXlogo.png'
import styled from 'styled-components'
import starlinkImg from '../img/starlink-wall.jpg'
import starlinkLogo from '../img/starlink-logo.png'
import { Fragment, useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
const Home = () => {
    const [info, setInfo] = useState({"headquarters":"Test"})
    useEffect(
        () => {
            const fetchLaunches = async () => {
                const response = await fetch('https://api.spacexdata.com/v3/info')
                const data = await response.json()
                setInfo(data)
            }
            fetchLaunches()
        }, []
    );
    return (
        <Fragment>
            <Navbar/>
            <DivContainer className="content-flex" style={{backgroundImage: `url(${"https://farm9.staticflickr.com/8691/28353012603_ab83b6f5aa_o.jpg"})`, justifyContent: "flex-start"}}>
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
            <DivContainer className="content-flex" style={{backgroundImage: `url(${"https://farm2.staticflickr.com/1610/25486858116_9c06dfea59_o.jpg"})`}}>
                <FlexDiv className="container" style={{justifyContent: "space-around", alignItems: "center"}}>
                    <div style={{width: 320}}>
                        <h1>About SpaceX</h1>
                        <ul>
                            <li><b>Founder : </b> {info.founder}</li>
                            <li><b>Founded : </b>{info.founded}</li>
                            <li><b>Employees : </b>{info.employees}</li>
                            <li><b>Valuation : </b>{info.valuation}</li>
                            <li><b>Headquarters : </b>{info.headquarters.address} {info.headquarters.city} {info.headquarters.state}</li>
                        </ul>
                    </div>   
                    <div style={{width: 500}}>
                        <img src={"https://farm5.staticflickr.com/4166/34005999880_77684dba4b_o.jpg"} alt="logo" style={{maxWidth: "100%"}}/>  
                    </div>                  
                </FlexDiv>  
            </DivContainer>
            
        </Fragment>
    )
}

const DivContainer = styled.div`
    padding: 42vmin 20px;
    background-size: cover;
`
const FlexDiv = styled.div`
    display: flex;
    flex-wrap: wrap-reverse;
`
export default Home