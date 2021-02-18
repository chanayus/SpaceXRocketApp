import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from "react-router-dom";
const RocketDetail = () => {
    const [rocket, setRocket] = useState({
        "height": {}, "diameter": {}, "mass": {}, "landing_legs": {}, "flickr_images": [],"first_stage":{"thrust_sea_level":{}},"second_stage":{"thrust":{}} 
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
        <Fragment>
            <div className="headerContainer" style={{ backgroundImage: `url(${rocket.flickr_images[0]})` }}>
                <div className="container" style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
                    <h1 className="headerText" style={{ width: "70%" }}>{rocket.rocket_name}</h1>
                    <h3>{rocket.description}</h3>
                    <p>{rocket.country}</p>
                </div>
            </div>
            <div className="container">
                <h1 className="headerText">Rocket Specifications</h1>
                <hr />
            </div>
            <DivContainer className="content-flex">
                <FlexDiv className="container" style={{ justifyContent: "space-around" }}>
                    <div style={{ width: 500 }}>
                        <h1 style={{ textAlign: "center" }}>About</h1>
                        <hr />
                        <p>First flight : {rocket.first_flight}</p>
                        <p>Cost per Launch : ${rocket.cost_per_launch}</p>
                        <p>Country of origin : {rocket.country}</p>
                        <p>Manufacturer : {rocket.company}</p>
                        <p>Status : {rocket.active === "true" ? "Active" : "Retired"}</p>
                    </div>
                    <div style={{ width: 500 }}>
                        <h1 style={{ textAlign: "center" }}>Size</h1>
                        <hr />
                        <p>Stages : {rocket.stages}</p>
                        <p>Height : {rocket.height.meters} m ( {rocket.height.feet} ft)</p>
                        <p>Diameter : {rocket.diameter.meters} m ( {rocket.diameter.feet} ft)</p>
                        <p>Mass : {rocket.mass.kg} kg</p>
                        <p>Legs of Rocket : {rocket.landing_legs.number}</p>
                        <p>Material : {rocket.landing_legs.material ? rocket.landing_legs.material : "N/A"}</p>
                    </div>
                    <div style={{ width: 500 }}>
                        <h1 style={{ textAlign: "center" }}>First Stage</h1>
                        <hr />
                        <p>Engines : {rocket.first_stage.engines}</p>
                        <p>Burn time : {rocket.first_stage.burn_time_sec} s</p>
                        <p>Thrust : {rocket.first_stage.thrust_sea_level.kN} kN ({rocket.first_stage.thrust_sea_level.lbf} lbf)</p>
                    </div>
                    <div style={{ width: 500 }}>
                        <h1 style={{ textAlign: "center" }}>Second Stage</h1>
                        <hr />
                        <p>Engines : {rocket.second_stage.engines}</p>
                        <p>Burn time : {rocket.second_stage.burn_time_sec} s</p>
                        <p>Thrust : {rocket.second_stage.thrust.kN} kN ({rocket.second_stage.thrust.lbf} lbf)</p>
                    </div>
                </FlexDiv>
            </DivContainer>
            <div className="container">
                <h2>Gallery</h2>
                <FlexDiv className="" style={{ "alignItems": "center",justifyItems:"center","justifyContent":"space-around"}}>
                    {rocket.flickr_images.map((val) => {
                        return <ImgRocket src={val} alt="img" />
                    })}
                </FlexDiv>
            </div>
        </Fragment>
    )
}
const FlexDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const ImgRocket = styled.img`
    max-width: 70%;
    max-height: 100%;
    transition: 0.35s;
    box-shadow: 0 0px 0px rgba(0,0,0,0.16), 0 0px 0px rgba(0,0,0,0.23);
    padding-bottom: 25px;
`
const DivContainer = styled.div`
    padding: 1vmin 20px;
    background-size: cover;
    background-attachment: fixed;
    
`
export default RocketDetail;