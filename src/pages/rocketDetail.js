import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from "react-router-dom";
const RocketDetail = () => {
    const [rocket, setRocket] = useState({"height": { "meters": "", "feet": "" },"diameter": { "meters": "", "feet": "" },"mass": { "kg": ""},"landing_legs": { "number": "", "material": "" }})
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
            <div className="headerContainer" style={{ backgroundColor: "blueviolet" }}>
                <div className="container">
                    <h1 className="headerText" style={{ width: "70%" }}>{rocket.rocket_name}</h1>
                    <h3>{rocket.description}</h3>
                    <p>{rocket.country}</p>
                </div>
            </div>
            <div className="container" style={{ paddingBottom: 150 }}>
                <h1 className="headerText">Rocket Detail</h1>
                <hr />
                <p>Cost per Launch : ${rocket.cost_per_launch}</p>
                <p>Height : {rocket.height.meters} meters</p>
                <p>Diameter : {rocket.diameter.meters} meters</p>
                <p>Mass : {rocket.mass.kg} kg</p>
                <p>Legs of Rocket : {rocket.landing_legs.number}</p>
                <p>Material : {rocket.landing_legs.material?rocket.landing_legs.material:"N/A"}</p>
                <a href={rocket.wikipedia} style={{color:'white'}}>Read more in Wikipedia</a>
            </div>
        </Fragment>
    )
}
export default RocketDetail;