import logo from '../img/spXlogo.png'
import styled from 'styled-components'
import Aos from "aos";
import "aos/dist/aos.css"
import starlinkImg from '../img/starlink-wall.webp'
import starlinkLogo from '../img/starlink-logo.png'
import bg1 from '../img/bg1.webp'
import bg2 from '../img/bg2.webp'
import bg3 from '../img/bg3.webp'
import { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import { motion } from "framer-motion"
const Home = () => {
    const [info, setInfo] = useState({"headquarters":"Test", employees : 0, valuation: 0,"links":{}})
    useEffect(
        () => {
            const fetchLaunches = async () => {    
                const response = await fetch('https://api.spacexdata.com/v3/info')
                const data = await response.json()
                setInfo(data)
            }
            Aos.init({duration: 1200, delay: 120})
            fetchLaunches()
        }, []
    );
    return (
        <motion.div initial={{ opacity:  0}} animate={{ opacity:  1}} >
            <Navbar />
            <DivContainer className="content-flex" style={{ backgroundImage: `url(${bg1})`, justifyContent: "flex-start" }}>
                <FlexDiv className="container">
                    <div data-aos="fade-up" style={{width: "80%"}}>
                        <img src={logo} alt="logo" width="541" height="88"/>
                        <p style={{ color: "#FFF" }}>{info.summary}</p>
                    </div>
                </FlexDiv>
            </DivContainer>
            <DivContainer className="content-flex" style={{ backgroundImage: `url(${starlinkImg})` }}>
                <FlexDiv className="container">
                    <div data-aos="fade-right" data-aos-delay="270">
                        <img src={starlinkLogo} alt="logo" width="500" height="241"/>
                        <p style={{ color: "#FFF" }}>Starlink is a satellite internet constellation being constructed by SpaceX providing satellite Internet access.</p>
                    </div>
                </FlexDiv>
            </DivContainer>
            <DivContainer className="content-flex" style={{backgroundImage: `url(${bg2})`, paddingBottom: "10vmin", paddingTop:"12vmin"}}>
                <FlexDiv className="container" style={{justifyContent: "space-around", alignItems: "center"}} >
                    <div style={{width: 500}} data-aos="fade-right">
                        <h1 className="text-shadow"style={{fontSize: "7.1vmin"}}>About SpaceX</h1>
                        <ul className="text-shadow">
                            <li><b>Founder : </b> {info.founder}</li>
                            <li><b>Founded : </b>{info.founded}</li>
                            <li><b>Employees : </b>{info.employees.toLocaleString()}</li>
                            <li><b>Valuation : </b>{info.valuation.toLocaleString()}</li>
                            <li><b>Headquarters : </b>{info.headquarters.address} {info.headquarters.city} {info.headquarters.state}</li>
                        </ul>
                    </div>   
                    <div style={{width: 470}} data-aos="fade-right">
                        <ImgRocket src={bg3} alt="logo" width="500" height="280"/>  
                    </div>                  
                </FlexDiv>  
            </DivContainer>
            <DivContainer className="content-flex" style={{ "padding": "2vmin",textAlign:"center"}}>
                <A href={info.links.website}>Website</A>
                <A href={info.links.flickr}>Flickr</A>
                <A href={info.links.twitter}>Twitter</A>
                <A href={info.links.elon_twitter}>Elon Musk</A>
            </DivContainer>
        </motion.div>
    )
}

const DivContainer = styled.div`
    padding: 42vmin 20px;
    background-size: cover;
    background-attachment: fixed;
    
`
const FlexDiv = styled.div`
    display: flex;
    flex-wrap: wrap-reverse;
    
`

const ImgRocket = styled.img`
    max-width: 100%;
    transition: 0.35s;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

`
const A = styled.a`
    padding:10px;
    text-decoration: none;
    color: white;
    :hover{
        opacity:0.5;
        transition: 0.25s;
    }
`
export default Home