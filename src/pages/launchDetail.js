import React,{ Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation, useParams } from "react-router-dom";
const LaunchDetail = () => {
    const [launch, setLaunch] = useState({})
    const { id } = useParams();
    let imgUrl
    try{
        imgUrl = launch.imageUrl
    }catch{
        imgUrl = null
    }
    useEffect(
        () => {
            const fetchLaunch = async () => {
                const response = await fetch(`https://api.spacexdata.com/v3/launches/${id}`)
                const data = await response.json()
                setLaunch({
                    "flight_number": data.flight_number,
                    "mission_name": data.mission_name,
                    "launch_year": data.launch_year,
                    "rocket_name":data.rocket.rocket_name,
                    "launch_success":data.launch_success,
                    "imageUrl" : data.links.flickr_images[0],
                    "launch_date_utc" : Date(data.launch_date_utc),
                })
            }
            fetchLaunch()
        }, []
    );
    
    return (
        <Fragment>
            <DivContainer className="content-flex" style={{backgroundImage: `url(${imgUrl})`}}>
                <div className="container">
                    <H1>{launch.mission_name}</H1>
                    
                </div> 
            </DivContainer>
            <div className="container">
                <H1>Launch Detail</H1>
                <hr/>
                <ul>
                    <LI><b>Flight Number </b>: {launch.flight_number}</LI>
                    <LI><b>Mission Name :</b> {launch.mission_name}</LI>
                    <LI><b>Launch Year :</b> {launch.launch_year}</LI>        
                    <LI><b>Launch Date :</b> {launch.launch_date_utc}</LI>
                    <LI><b>Rocket :</b> {launch.rocket_name}</LI>
                    <LI><b>Launch Result :</b> {launch.launch_success ? "Success" : "Fail"}</LI>
                </ul>

            </div>
        </Fragment>
    )
}

const DivContainer = styled.div`
    padding: 300px 0;
    background-size: cover;
`
const H1 = styled.h1`
    font-size: 9vmin;
    color: #FFF;
    padding: 0 0 0 5%;
    
`
const LI = styled.li`
    list-style: none;
    color: #CDCDCD;
    font-size: 1.25rem;
    line-height: 2.5;
    font-weight: 200;
`

const Video = styled.iframe`
    border: none;
    border-radius: 5px
`
export default LaunchDetail;