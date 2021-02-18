import logo from '../img/spXlogo.png'
import styled from 'styled-components'
import Aos from "aos";
import "aos/dist/aos.css"
import starlinkImg from '../img/starlink-wall.jpg'
import starlinkLogo from '../img/starlink-logo.png'
import { Fragment, useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import { motion } from "framer-motion"
const Home = () => {
    const [info, setInfo] = useState({"headquarters":"Test", employees : 0, valuation: 0})
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
            <DivContainer className="content-flex" style={{ backgroundImage: `url(${"https://farm9.staticflickr.com/8691/28353012603_ab83b6f5aa_o.jpg"})`, justifyContent: "flex-start" }}>
                <FlexDiv className="container">
                    <div data-aos="fade-up" style={{width: "80%"}}>
                        <img src={logo} alt="logo" style={{ maxWidth: "100%" }} />
                        <p style={{ color: "#FFF" }}>{info.summary}</p>
                    </div>
                </FlexDiv>
            </DivContainer>
            <DivContainer className="content-flex" style={{ backgroundImage: `url(${starlinkImg})` }}>
                <FlexDiv className="container">
                    <div data-aos="fade-right" data-aos-delay="270">
                        <img src={starlinkLogo} alt="logo" style={{ maxWidth: "100%" }} />
                        <p style={{ color: "#FFF" }}>Starlink is a satellite internet constellation being constructed by SpaceX providing satellite Internet access.</p>
                    </div>
                </FlexDiv>
            </DivContainer>
            <DivContainer className="content-flex" style={{backgroundImage: `url(${"https://farm2.staticflickr.com/1610/25486858116_9c06dfea59_o.jpg"})`, paddingBottom: "10vmin"}}>
                <FlexDiv className="container" style={{justifyContent: "space-around", alignItems: "center"}} >
                    <div style={{width: 500}} data-aos="fade-right">
                        <h1 style={{fontSize: "7.1vmin"}}>About SpaceX</h1>
                        <ul>
                            <li><b>Founder : </b> {info.founder}</li>
                            <li><b>Founded : </b>{info.founded}</li>
                            <li><b>Employees : </b>{info.employees.toLocaleString()}</li>
                            <li><b>Valuation : </b>{info.valuation.toLocaleString()}</li>
                            <li><b>Headquarters : </b>{info.headquarters.address} {info.headquarters.city} {info.headquarters.state}</li>
                        </ul>
                    </div>   
                    <div style={{width: 500}} data-aos="fade-left">
                        <ImgRocket src={"https://farm5.staticflickr.com/4166/34005999880_77684dba4b_o.jpg"} alt="logo"/>  
                    </div>                  
                </FlexDiv>  
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
export default Home