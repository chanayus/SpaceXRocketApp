import React, {  useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from "react-router-dom";
import { motion } from "framer-motion"
const RocketDetail = () => {
    const [rocket, setRocket] = useState({
        "height": {},
        "diameter": {},
        "mass": {},
        "landing_legs": {},
        "flickr_images": [],
        "first_stage":{"thrust_sea_level":{}},
        "second_stage":{"thrust":{}} 
    })
    const { rocket_id } = useParams();

    useEffect(
        () => {
            const fetchRocket = async () => {
                const response = await fetch(`https://api.spacexdata.com/v3/rockets/${rocket_id}`)
                const data = await response.json()
                setRocket(data)
                console.log(data)
            }
            fetchRocket()
        }, []
    );

    return (
        <motion.div initial={{ opacity:  0}} animate={{ opacity:  1}}>
            <div className="headerContainer" style={{ backgroundImage: `url(${rocket.flickr_images[0]})` }}>
                <div className="wrapper" style={{backgroundColor: "rgba(0, 0, 0, 0.23)"}}>
                    <div className="container">
                        <h1 className="headerText" style={{ width: "70%", marginBottom: 20 }}>{rocket.rocket_name}</h1>
                        <h3 className="text-shadow">{rocket.description}</h3>
                        <p style={{fontSize: "1.3rem"}} className="text-shadow">{rocket.country}</p>
                    </div>
                </div>
            </div>
            <div className="container">
                <h1 className="headerText" style={{fontSize: "8vmin"}}>Rocket Specifications</h1>
                <hr />
            </div>
            <DivContainer className="content-flex">
                <FlexDiv className="container" style={{ justifyContent: "space-around" }}>
                    <div style={{ width: 500 }}>
                        <h1 style={{ textAlign: "center" }}>About</h1>
                        <hr />
                        <ul>
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
                            <li><b>Height : </b>{rocket.height.meters} m ( {rocket.height.feet} ft)</li>
                            <li><b>Diameter : </b>{rocket.diameter.meters} m ( {rocket.diameter.feet} ft)</li>
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
            <div className="container" style={{marginTop: 50, marginBottom: 50}}>
                <h1 style={{fontSize: "5vmin"}}>Gallery</h1>
                <FlexDiv className="" style={{ justifyContent:"center"}}>
                    {rocket.flickr_images.map((val, index) => {
                        return <ImgRocket key={index} src={val} alt="img" />
                    })}
                </FlexDiv>
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
export default RocketDetail;