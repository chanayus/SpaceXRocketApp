import React,{ useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
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
            fetchRockets()
        }, []
    );
    return (
        <div>
            <Navbar/>
            <div>
            <ul>
                {rockets.map((r) => 
                (
                    <li>{r.rocket_name}</li>
                ))}
            </ul>
            </div>
        </div>
    )
}
export default Rocket