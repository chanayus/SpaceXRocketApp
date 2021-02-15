import { useEffect, useState } from 'react'
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
        <ul>
            {rockets.map((r) => 
            (
                <li>{r.rocket_name}</li>
            ))}
        </ul>
    )
}
export default Rocket