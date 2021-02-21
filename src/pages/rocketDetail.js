import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from "react-router-dom";
import { motion } from "framer-motion"
import Aos from "aos";
const RocketDetail = () => {
    const [rocket, setRocket] = useState({
        "height": {},
        "diameter": {},
        "mass": {},
        "engines": {},
        "landing_legs": {},
        "flickr_images": [],
        "first_stage": { "thrust_sea_level": {} },
        "second_stage": { "thrust": {} }
    })
    const { rocket_id } = useParams();

    useEffect(
        () => {
            const fetchRocket = async () => {
                const response = await fetch(`https://api.spacexdata.com/v3/rockets/${rocket_id}`)
                const data = await response.json()
                setRocket(data)
            }
            window.scroll(0, 0);
            Aos.init({ duration: 500, delay: 100 })
            fetchRocket()
        }, []
    );
    const rocketBg = {
        "Falcon Heavy": "https://live.staticflickr.com/631/21048044876_bae2435d96_k.jpg",
        "Falcon 9": "https://live.staticflickr.com/3865/32945170225_e5b87acce0_k.jpg",
        "Starship": "https://live.staticflickr.com/65535/50703878421_4c2b6e88c7_k.jpg",
        "Falcon 1": "https://live.staticflickr.com/65535/50241845831_79a60b6066_k.jpg"
    }
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="headerContainer" style={{ backgroundImage: `url(${rocketBg[rocket.rocket_name]})` }}>

                <div className="wrapper" style={{ backgroundColor: "rgba(0, 0, 0, 0.325)" }}>
                    <div />
                    <div>
                        <div data-aos="fade-right" data-aos-delay="270" className="container">
                            <h1 className="headerText" style={{ width: "70%", marginBottom: 20 }}>{rocket.rocket_name}</h1>
                            <p style={{ fontSize: "1.055rem" }} className="text-shadow">{rocket.description}</p>
                            <p style={{ fontSize: "1.2rem" }} className="text-shadow">{rocket.country}</p>
                        </div>
                    </div>
                    <div className="pageNav" >
                        <a href="#content"><NavButton>View Detail</NavButton></a>
                    </div>
                </div>
            </div>
            <div className="container" id="content">
                <h1 className="headerText" style={{ fontSize: "8vmin" }}>Rocket Specifications</h1>
                <hr />
            </div>
            <DivContainer className="content-flex">
                <FlexDiv className="container" style={{ justifyContent: "space-around" }}>
                    <div style={{ width: 500 }}>
                        <h1 style={{ textAlign: "center" }}>About</h1>
                        <hr />
                        <ul>
                            <li><b>Engine name : </b>{rocket.engines.number} {rocket.engines.type} {rocket.engines.version}</li>
                            <li><b>First flight : </b>{rocket.first_flight}</li>
                            <li><b>Cost per Launch : </b>${rocket.cost_per_launch}</li>
                            <li><b>Country of origin : </b>{rocket.country}</li>
                            <li><b>Manufacturer : </b>{rocket.company}</li>
                            <li><b>Status : </b>{rocket.active === "true" ? "Active" : "Retired"}</li>
                        </ul>

                    </div>
                    <div style={{ width: 500 }}>
                        <h1 style={{ textAlign: "center" }}>Size</h1>
                        <hr />
                        <ul>
                            <li><b>Stages : </b>{rocket.stages}</li>
                            <li><b>Height : </b>{rocket.height.meters} m ({rocket.height.feet} ft)</li>
                            <li><b>Diameter : </b>{rocket.diameter.meters} m ({rocket.diameter.feet} ft)</li>
                            <li><b>Mass : </b>{rocket.mass.kg} kg</li>
                            <li><b>Legs of Rocket : </b>{rocket.landing_legs.number}</li>
                            <li><b>Material : </b>{rocket.landing_legs.material ? rocket.landing_legs.material : "N/A"}</li>
                        </ul>

                    </div>
                    <div style={{ width: 500 }}>
                        <h1 style={{ textAlign: "center" }}>First Stage</h1>
                        <hr />
                        <ul>
                            <li><b>Engines : </b>{rocket.first_stage.engines}</li>
                            <li><b>Burn time : </b>{rocket.first_stage.burn_time_sec} s</li>
                            <li><b>Thrust : </b>{rocket.first_stage.thrust_sea_level.kN} kN ({rocket.first_stage.thrust_sea_level.lbf} lbf)</li>
                        </ul>

                    </div>
                    <div style={{ width: 500 }}>
                        <h1 style={{ textAlign: "center" }}>Second Stage</h1>
                        <hr />
                        <ul>
                            <li><b>Engines : </b>{rocket.second_stage.engines}</li>
                            <li><b>Burn time : </b>{rocket.second_stage.burn_time_sec} s</li>
                            <li><b>Thrust : </b>{rocket.second_stage.thrust.kN} kN ({rocket.second_stage.thrust.lbf} lbf)</li>
                        </ul>
                    </div>
                </FlexDiv>
            </DivContainer>
            <div className="container" style={{ marginTop: 50, marginBottom: 20 }}>
                <h1 style={{ fontSize: "5vmin" }}>Gallery</h1>
                <FlexDiv className="" style={{ justifyContent: "center" }}>
                    {rocket.flickr_images.map((val, index) => {
                        return <ImgRocket key={index} src={val} alt="img" width="406" height="406" />
                    })}
                </FlexDiv>
            </div>
            <div style={{paddingBottom:"20px",display:"flex",alignItems:"center",justifyContent:"center"}} >
                <a href={rocket.wikipedia}><NavButton>Read more in Wikipedia</NavButton></a>
            </div>
        </motion.div>
    )
}
const FlexDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const ImgRocket = styled.img`
    width: 406px;
    transition: 0.35s;
    margin: 0 5px;
    padding-bottom: 25px;
`
const DivContainer = styled.div`
    padding: 1vmin 20px;
    background-size: cover;
    background-attachment: fixed;
    
`

const NavButton = styled.button`
    background: #FFF;
    border: 2px solid transparent;
    padding: 1.25vmin 2.5vmin;
    margin: 0 15px;
    transition: 0.25s;
    font-size: 1.1rem;
    border-radius: 100px;
    :hover{
        background: transparent;
        color: #FFF;
        border: 2px solid #FFF;
    }
    b{
        font-size: 1.25rem;
    }
`
export default RocketDetail;