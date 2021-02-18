import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
const LaunchDetail = () => {
    const [launch, setLaunch] = useState({ "rocket": { "rocket_name": "", "rocket_type": "" }, "links": { "youtube_id": "", "flickr_images": [""] } })
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
        <motion.div initial={{ opacity:  0}} animate={{ opacity:  1}}>
            <div className="headerContainer" style={{ backgroundImage: `url(${launch.links.flickr_images[0] === undefined ? "https://farm5.staticflickr.com/4227/34223076793_4abe7e74d6_o.jpg" : launch.links.flickr_images[0]})` }}>
                <div className="wrapper" style={{backgroundColor: "rgba(0, 0, 0, 0.225)"}}>
                    <div className="container">
                        <h1 className="headerText" style={{ width: "70%", marginBottom: 0 }}>{launch.mission_name}</h1>
                        <h2 className="text-shadow" style={{cursor: "pointer", marginTop: 10}}> {launch.rocket.rocket_name}</h2>
                        <Link to={{ pathname: `/SpaceXRocketApp/rocketDetail/${launch.rocket.rocket_id}` }}><ViewButton>View Rocket Detail</ViewButton></Link>
                    </div>
                </div>
            </div>
            <div className="container" style={{ paddingBottom: 10 }}>
                <h1 className="headerText" style={{fontSize: "8vmin"}}>Launch Detail</h1>
                <hr />
                <P>{launch.details}</P>
                <ul style={{ padding: 0 }}>
                    <LI><b>Flight Number </b>: {launch.flight_number}</LI>
                    <LI><b>Mission Name :</b> {launch.mission_name}</LI>
                    <LI><b>Launch Year :</b> {launch.launch_year}</LI>
                    <LI><b>Launch Date :</b> {launch.launch_date_utc}</LI>
                    <LI><b>Rocket Name:</b> {launch.rocket.rocket_name}</LI>
                    <LI><b>Rocket Type:</b> {launch.rocket.rocket_type}</LI>
                    <LI><b>Launch Result :</b> {launch.launch_success ? "Success" : "Fail"}</LI>
                </ul>
                <div style={{"padding": "50px 0"}}>
                    <h1 style={{fontSize: "5vmin"}}>Video</h1>
                    <iframe src={`https://www.youtube.com/embed/${launch.links.youtube_id}/`} width="100%" height="640px" frameBorder='0' allowFullScreen ></iframe>
                </div>
                
            </div>
            
                {
                    launch.links.flickr_images[0] === undefined ? null
                    :
                    
                    <div className="container">
                        <h1 style={{fontSize: "5vmin"}}>Gallery</h1>
                        <FlexDiv style={{ justifyContent: "center" }}>
                            {launch.links.flickr_images.map((val, index) => {
                            return <ImgLaunch key={index} src={val} alt="img" />
                            })}
                        </FlexDiv>
                    </div>
                }
        </motion.div>
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
const FlexDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const ImgLaunch = styled.img`
    width: 406px;
    transition: 0.35s;
    margin: 0 5px;
    padding-bottom: 25px;
    border-radius: 5px;

`

const ViewButton = styled.button`
    background: transparent;
    padding: 10px 20px;
    margin: 20px 0;
    border: 2px solid #FFF;
    transition: 0.25s;
    text-decoration: none;
    color: #fff;
    font-size: 1.1rem;
    :hover{
        background: #FFF;
        color: #555;
    }
`
export default LaunchDetail;