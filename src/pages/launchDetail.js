import React, {  useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import launchNull from '../img/launch-null.webp'

const LaunchDetail = () => {
    const [latest, setLatest] = useState()
    const [launch, setLaunch] = useState({ 
        "rocket": { "rocket_name": "", "rocket_type": "" }, 
        "mission_id": [""],
        "links": { 
            "youtube_id": "",
            "flickr_images": [""] 
        },
        "launch_site": {},
        "launch_failure_details":{"time":"", "reason": ""},
    })
    const [refresh, setRefresh] = useState(false)
    const { id } = useParams();
    useEffect(
        () => {
            const fetchLaunch = async () => {
                const response = await fetch(`https://api.spacexdata.com/v3/launches/${id}`)
                const data = await response.json()
                const d = new Date(data.launch_date_utc)
                data.launch_date_utc = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()+"  "+d.getUTCHours()+":"+d.getUTCMinutes()
                setLaunch(data)

                
                const latestRes = await fetch('https://api.spacexdata.com/v3/launches/latest')
                const dataRes = await latestRes.json()
                setLatest(parseInt(dataRes.flight_number)+1)
            }
            window.scroll(0, 0); 
            fetchLaunch()  
        }, [refresh]
    );

    const changePage = (e) =>{
        setRefresh(!refresh)
    }

    const disabled = {
        opacity: 0.4,
        pointerEvents: "none"
    }

    return (
        <motion.div initial={{ opacity:  0 }} animate={{ opacity:  1 }}>
            <div className="headerContainer" style={{ backgroundImage: `url(${launch.links.flickr_images[0] === undefined ? launchNull : launch.links.flickr_images[0]})` }}>
                <div className="wrapper" style={{backgroundColor: "rgba(0, 0, 0, 0.3)"}}>
                    <div/>
                    <div> 
                        <div className="container">
                            <h1 className="headerText" style={{ width: "80%", marginBottom: 0 }}>{launch.mission_name}</h1>
                            <h2 className="text-shadow" style={{ marginTop: 10 }}> {launch.rocket.rocket_name}</h2>
                            <Link to={{ pathname: `/SpaceXRocketApp/rocketDetail/${launch.rocket.rocket_id}` }}><ViewButton>View Rocket Detail</ViewButton></Link>
                        </div>
                    </div> 
                      
                    <div className="pageNav" >
                        <Link to={{ pathname: `/SpaceXRocketApp/launchDetail/${parseInt(id)-1}` }} style={parseInt(id)-1 <= 0 ? disabled: null } onClick={() => changePage()}><NavButton><b>{"<"}</b></NavButton></Link>
                        <a href="#content"><NavButton style={{padding: "1.25vmin 2.5vmin"}}>View Detail</NavButton></a>
                        <Link to={{ pathname: `/SpaceXRocketApp/launchDetail/${parseInt(id)+1}` }} style={parseInt(id)+1 > latest ? disabled: null } onClick={() => changePage()}><NavButton> <b>{">"}</b></NavButton></Link>
                    </div>    
                </div>
                
            </div>
            <div className="container" id="content" style={{ paddingBottom: 10 }}>
                <h1 className="headerText" style={{fontSize: "8vmin"}}>Launch Detail</h1>
                <hr style={{marginBottom: 40}} />
                {
                    launch.links.mission_patch_small === null ?
                    null
                    :
                    <center>
                        <img src={launch.links.mission_patch_small} alt="" width="240" height="240"/>
                    </center>

                }
                <P>{launch.details}</P>
                <ul style={{ padding: 0 }}>
                    <LI><b>Flight Number :</b> {launch.flight_number}</LI>
                    <LI><b>Mission Name :</b> {launch.mission_name} {launch.mission_id[0] === undefined ? null : `(${launch.mission_id[0]})`}</LI>
                    <LI><b>Launch Year :</b> {launch.launch_year}</LI>
                    <LI><b>Launch Date :</b> {launch.launch_date_utc}</LI>
                    <LI><b>Rocket Name :</b> {launch.rocket.rocket_name}</LI>
                    <LI><b>Rocket Type :</b> {launch.rocket.rocket_type}</LI>
                    <LI><b>Launch Site :</b> {launch.launch_site.site_name}</LI>
                    <LI><b>Launch Result :</b> {launch.launch_success ? "Success" : launch.launch_success === null ? "Unknown" : "Fail"}</LI>
                    {
                        launch.launch_success === true ? null : launch.launch_success === null ? null
                        :
                        <ul>
                            <LI><h2>Launch Failure Details</h2></LI>
                            <LI><b>Time :</b> {launch.launch_failure_details.time}</LI>
                            <LI><b>Reason :</b> {launch.launch_failure_details.reason}</LI>
                        </ul>
                    }
                </ul>
                <div style={{"padding": "50px 0"}}>
                    <h1 style={{fontSize: "5vmin"}}>Video</h1>
                    <iframe title="SpaceX" src={`https://www.youtube.com/embed/${launch.links.youtube_id}/`} width="100%" height="640px" frameBorder='0' allowFullScreen ></iframe>
                </div>      
            </div>
                {
                    launch.links.flickr_images[0] === undefined ? null
                    :
                    <div className="container" style={{paddingBottom: 30}}>
                        <h1 style={{fontSize: "5vmin"}}>Gallery</h1>
                        <div className="imageGrid" style={{ justifyContent: "center" }}>
                            {launch.links.flickr_images.map((val, index) => {
                                return (<img className="imageGallery" key={index} src={val} alt="img" width="300"/>)
                            })}
                        </div>
                    </div>
                }
                <div className="pageNav" style={{padding: "50px 0"}}>
                    <Link to={{ pathname: `/SpaceXRocketApp/launchDetail/${parseInt(id)-1}` }} style={parseInt(id)-1 <= 0 ? disabled: null } onClick={() => changePage()}><NavButton><b>{"<"}</b></NavButton></Link>
                    <h3 style={{textAlign: "center"}}>{launch.mission_name}</h3>
                    <Link to={{ pathname: `/SpaceXRocketApp/launchDetail/${parseInt(id)+1}` }} style={parseInt(id)+1 >= latest ? disabled: null } onClick={() => changePage()}><NavButton> <b>{">"}</b></NavButton></Link>
                </div>   
        </motion.div>
    )
}

const LI = styled.li`
    list-style: none;
    color: #EDEDED;
    font-size: 1.25rem;
    line-height: 2.5;
    font-weight: 200;
`
const P = styled.p`
    font-size: 1.05rem;
    padding: 25px 0;
    color: #FFF;
`

const ViewButton = styled.button`
    background: transparent;
    padding: 1.25vmin 2.5vmin;
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

const NavButton = styled.button`
    background: #FFF;
    border: 2px solid transparent;
    padding: 7px 17px;
    margin: 0 15px;
    transition: 0.25s;
    font-size: 1.1rem;
    border-radius: 40px;
    :hover{
        background: transparent;
        color: #FFF;
        border: 2px solid #FFF;
    }
    b{
        font-size: 1.25rem;
    }
`
export default LaunchDetail;