import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from "framer-motion"
import launchBg from '../img/launch-bg.webp'
import Aos from "aos";
import SearchBar from "../component/launches/searchBar"
import LaunchCard from"../component/launches/launchCard"

const Launches = () => {
    const [launches, setLaunches] = useState([])
    const [defaultLaunches, setDefaultLaunches] = useState([])
    const [year, setYear] = useState([])
    const [status, setStatus] = useState("Please Wait")
    const [filter, setFilter] = useState({
        success: undefined,
        text: "",
        selectYear: "default"
    })

    useEffect(
        () => {
            const fetchLaunches = async () => {
                const response = await fetch('https://api.spacexdata.com/v3/launches')
                const data = await response.json()

                const set = new Set(data.map((item) => item.launch_year))
                const allYear = Array.from(set)

                setYear(allYear)
                setStatus("No Result")
                setLaunches(data)
                setDefaultLaunches(data)
            }
            window.scroll(0, 0);
            Aos.init({duration: 500, delay: 100})    
            fetchLaunches()
        }, []
    );


    return (
        <motion.div initial={{ opacity:  0 }} animate={{ opacity:  1 }}>
            <div className="headerContainer" style={{ backgroundImage: `url(${launchBg})`, height:"90vh"  }}>
                <div className="wrapper" style={{backgroundColor: "rgba(0, 0, 0, 0.1)",justifyContent: "center"}}>
                    <div>
                        <div className="container">
                            <h1 data-aos="fade-right" data-aos-delay="270" className="headerText">LAUNCHES</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                { defaultLaunches.length === 0 ? null : <SearchBar defaultLaunches={defaultLaunches} setLaunches={setLaunches} launches={launches} filter={filter} setFilter={setFilter} year={year}/> }
                <FlexContainer>
                    { 
                        launches.length == 0 ?
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            {status === "No Result" ? null : <div className="loader"></div>}
                            <NoResult>{status}</NoResult>  
                        </div>      
                        :
                        launches.map((value, index)=>{return <LaunchCard key={index} value={value} index={index} />})
                    }
                </FlexContainer>
            </div>
        </motion.div>
    )
}


const FlexContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    transition: 0.35s;
`
const NoResult = styled.h1`
    font-size: 5vmin;
    font-weight: 200;
    color: #AAA; 
    padding: 70px 0;
`

export default Launches