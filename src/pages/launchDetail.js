import React,{ Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from "react-router-dom";
const LaunchDetail = () => {
    const [launch, setLaunch] = useState({"rocket":{"rocket_name": "", "rocket_type": ""}, "links" : {"youtube_id": ""}})
    const { id } = useParams();

    useEffect(
        () => {
            const fetchLaunch = async () => {
                const response = await fetch(`https://api.spacexdata.com/v3/launches/${id}`)
                const data = await response.json()
                setLaunch(data)   
                console.log(data)
            }
            fetchLaunch()
        }, []
    );
    return (
        <Fragment>
            <div className="headerContainer" style={{backgroundImage: `url(${launch.imageUrl === undefined ? "https://farm5.staticflickr.com/4227/34223076793_4abe7e74d6_o.jpg" : launch.imageUrl})`}}>
                <div className="container">
                    <h1 className="headerText" style={{width: "70%"}}>{launch.mission_name}</h1>  
                </div> 
            </div>
            <div className="container" style={{paddingBottom: 150}}>
                <h1 className="headerText">Launch Detail</h1>
                <hr/>
                <P>{launch.details}</P>
                <ul style={{padding: 0}}>
                    <LI><b>Flight Number </b>: {launch.flight_number}</LI>
                    <LI><b>Mission Name :</b> {launch.mission_name}</LI>
                    <LI><b>Launch Year :</b> {launch.launch_year}</LI>        
                    <LI><b>Launch Date :</b> {launch.launch_date_utc}</LI>
                    <LI><b>Rocket Name:</b> {launch.rocket.rocket_name}</LI>
                    <LI><b>Rocket Type:</b> {launch.rocket.rocket_type}</LI>
                    <LI><b>Launch Result :</b> {launch.launch_success ? "Success" : "Fail"}</LI>
                </ul>
                <iframe src={`https://www.youtube.com/embed/${launch.links.youtube_id}/`} width="100%" height="640px" frameBorder='0' allowFullScreen ></iframe>
            </div>
        </Fragment>
    )
}

const LI = styled.li`
    list-style: none;
    color: #CDCDCD;
    font-size: 1.25rem;
    line-height: 2.5;
    font-weight: 200;
`
const P = styled.p`
    font-size: 1.05rem;
    padding: 25px 0;
    color: #FFF;
`
export default LaunchDetail;