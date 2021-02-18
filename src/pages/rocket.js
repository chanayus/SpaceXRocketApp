import { Fragment, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Aos from "aos";
import styled from 'styled-components'
const Rocket = () => {
    const [rockets, setRockets] = useState([])
    useEffect(
        () => {
            const fetchRockets = async () => {
                const response = await fetch('https://api.spacexdata.com/v3/rockets')
                const data = await response.json()
                console.log(data)
                setRockets(data)
            }
            Aos.init({duration: 500, delay: 100})
            fetchRockets()
        }, []
    );
    return (
        <Fragment>
            <div className="headerContainer" style={{ backgroundImage: `url(https://i1.wp.com/bilmediklerimiz.com/storage/2021/02/analist-buyuk-kazanclar-saglayabilecegini-soyledigi-5-kucuk-altcoin-cevherini-siraliyor-CE9SiMLr.jpg)` }}>
                <div className="container">
                    <h1 className="headerText">ROCKETS</h1>
                </div>
            </div>
            <div className="container">
            <FlexContainer data-aos="fade" data-aos-delay="200">
                {rockets.map((value, index) => {
                    return (
                        <Card key={index}>
                            <div style={{ display: "flex", justifyContent: "center", flexDirection: "row", flex: 1 }}>
                                <Link to={{pathname: `/SpaceXRocketApp/rocketDetail/${value.rocket_id}` }} style={{textDecoration: "none",textAlign:"center",color:"white",padding:10}}>
                                    <h3 style={{fontWeight:"bold"}}>{value.rocket_name}</h3>
                                </Link>
                            </div>
                        </Card>
                    )
                })}
                </FlexContainer>
            </div>
        </Fragment>
    )
}

const Card = styled.div`
    border-radius: 3px;
    background-color: #191919;

    margin: 20px 10px 0px 0px;
    width: 50%;
    text-decoration: none;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    transition: 0.25s;

    display: flex;
    img{    
        width: 140px;
        padding: 5px;
        margin-top: 10px;
    }
    h3{
        color: #FFF;
        margin: 5px 0;
        font-weight: 300;
    }
`
const FlexContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`
const ViewButton = styled.button`
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
export default Rocket