import styled from 'styled-components'
import { Link } from "react-router-dom";
const LaunchCard = ({value, index}) => {
    return (
        <Card key={index}>
            <div style={{flex: 0.45}}>
                <img src={value.links.mission_patch_small === null ? "http://ird.rmuti.ac.th/2020/world/upload/post/picture/thumb/IRD110820C00002/noimg.png" : value.links.mission_patch_small} alt=""/>
            </div>    
            <div style={{padding: 20, flex: 1, display:"flex", zIndex: 10}}>
                <div style={{flex: 1}}>
                    <h2 style={{fontSize: "1.38rem"}}>{value.rocket.rocket_name} ({value.mission_name})</h2>
                    <h3>{value.launch_year}</h3>
                    {
                        value.launch_success ? <h3 style={{color: "rgb(128, 214, 117)"}}>Launch Success</h3>      
                        : value.launch_success === null ?
                        <h3 style={{color: "#999"}}>Unknown</h3>
                        :        
                        <h3 style={{color: "rgb(255, 58, 58)"}}>Launch Fail</h3>
                    }
                    <Link to={{pathname: `/SpaceXRocketApp/launchDetail/${value.flight_number}`}}  style={{textDecoration: "none"}}> 
                        <ViewButton>View Detail</ViewButton> 
                    </Link>
                </div>
                <FlightNum>
                    <h1>{index+1}</h1>
                </FlightNum>    
            </div>  
        </Card> 
    )
}


const ViewButton  = styled.button`
    background: transparent;
    border-radius: 3px;
    transition: 0.25s;
    color: #FFF;
    padding: 5px 5%;
    margin: 5px 0;
    width: 100%;
    border: 2px solid #AAA;
    :hover{
        background: #FFF;
        color: #111;

    }
`

const FlightNum = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
    padding-right: 10px;
    h1{
        font-size: 9vmin;
        color: rgba(0,0,0,0.4);
        margin: 0;
    }
`

const Card = styled.div`
    border-radius: 3px;
    background-color: #1f1f1f;
    margin: 20px 10px;
    width: 600px;
    text-decoration: none;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    transition: 0.25s;
    align-items: center;
    display: flex;
    position: relative;
    img{    
        max-width: 100%;
        padding: 5px;
        margin-top: 0px;

    }
    h3{
        color: #FFF;
        margin: 5px 0;
        font-weight: 300;
    }
    h2{
        margin: 5px 0;
    }
`

export default LaunchCard