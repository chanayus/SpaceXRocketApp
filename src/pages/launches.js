import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { motion } from "framer-motion"
const Launches = () => {
    const [launches, setLaunches] = useState([])
    const [defaultLaunches, setDefaultLaunches] = useState([])
    const [success, setSuccess] = useState(undefined)
    const [text, setText] = useState("")
    const [year, setYear] = useState(false)
    const [status, setStatus] = useState("Please Wait")

    useEffect(
        () => {
            const fetchLaunches = async () => {
                const response = await fetch('https://api.spacexdata.com/v3/launches')
                const data = await response.json()
                setStatus("No Result")
                setLaunches(data)
                setDefaultLaunches(data)
            }
            fetchLaunches()
        }, []
    );

    useEffect(() =>{
        setLaunches(defaultLaunches.filter(value =>{
            return value.rocket.rocket_name.toLowerCase().includes(text.toLowerCase())
        }))
    }, [text])

    const yearFilter = () =>{
        resetFilter() 
        if(year){
            const yearSorted = defaultLaunches.sort((a, b) => {return a.launch_year-b.launch_year})
            setLaunches([...yearSorted])
            setYear(false)
        }
        else{
            const yearSorted = defaultLaunches.sort((a, b) => {return b.launch_year-a.launch_year})
            setLaunches([...yearSorted])
            setYear(true)
        }
    }

    const successFilter = () =>{
        resetFilter()
        if(success){
            const successSort = defaultLaunches.filter((value) => !value.launch_success)
            setLaunches(successSort)
            setSuccess(false)
        }
        else if(success === false){
            const successSort = defaultLaunches
            setLaunches(successSort)
            setSuccess(undefined)
        }
        else{
            const successSort = defaultLaunches.filter((value) => value.launch_success)
            setLaunches(successSort)
            setSuccess(true)
        }
    }

    const resetFilter = () =>{
        setSuccess(undefined)
        setYear(false)
    }
    return (
        <motion.div initial={{ opacity:  0}} animate={{ opacity:  1}}>
            <div className="headerContainer" style={{backgroundImage: `url(https://farm5.staticflickr.com/4891/39745614053_43855205bc_o.jpg`}}>
                <div className="wrapper" style={{backgroundColor: "rgba(0, 0, 0, 0.1)"}}>
                    <div className="container">
                    <h1 className="headerText">LAUNCHES</h1>
                    </div>
                </div>
            </div>
            <div className="container">
                <FilterDiv>
                    <input type="text" placeholder="Search Rocket Name" onChange={e => setText(e.target.value)} value={text}/>
                    <div>
                        Sort By :            
                        <button onClick={() => yearFilter()} style={{ background: year ? "#EEE" : "transparent", color: year ? "#111" : "#EEE"}}>Launch Year</button>
                        <button onClick={() => successFilter()} style={{background: success ? "rgb(102, 173, 93)" : success === false ? "rgb(199, 38, 38)" : "#111"}}>Launch Result : {success ? "Success" : success === false ? "Fail" : "Any"}</button>
                    </div>       
                </FilterDiv>
                <FlexContainer>
                    { launches.length == 0 ?
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <div class="loader"></div>
                            <NoResult>{status}</NoResult>  
                        </div>      
                        :
                        launches.map((value, index)=>{
                            return(
                                <Card key={index}>
                                    <div >
                                        <img src={value.links.mission_patch_small === null ? "http://ird.rmuti.ac.th/2020/world/upload/post/picture/thumb/IRD110820C00002/noimg.png" : value.links.mission_patch_small} alt=""/>
                                    </div>    
                                    <div style={{display: "flex", justifyContent: "center", flexDirection: "column", padding: 10, flex: 1}}>
                                        <h2>{value.rocket.rocket_name}</h2>
                                        <h3>{value.launch_year}</h3>
                                        {value.launch_success ? <h3 style={{color: "rgb(128, 214, 117)"}}>Launch Success</h3> : <h3 style={{color: "rgb(251, 46, 46)"}}>Launch Fail</h3>}
                                        <Link to={{pathname: `/SpaceXRocketApp/launchDetail/${value.flight_number}`}} style={{textDecoration: "none"}}> 
                                            <ViewButton>View Detail</ViewButton> 
                                        </Link>
                                    </div>
                                </Card>    
                            )
                        })
                    }
                </FlexContainer>
            </div>
        </motion.div>
    )


}
const Card = styled.div`
    border-radius: 3px;
    background-color: #191919;
    margin: 20px 10px;
    width: 600px;
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
    h2{
        margin: 5px 0;
    }
`

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

const FlexContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    transition: 0.35s;
`

const FilterDiv = styled.div`
    padding: 20px 0 0 10px;
    color: #CCC;
    display: flex;
    flex-wrap: wrap;
    button{
        margin: 5px 10px;
        padding: 7px;
        background: none;
        color: #FFF;
        border-radius: 5px;
        border: 2px solid #333;
        transition:0.25s;
    }
    input{
        background: #333;
        padding: 10px;
        margin: 0 10px 10px 10px;
        border: none;
        color: #fff;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }
`

const NoResult = styled.h1`
    font-size: 5vmin;
    font-weight: 200;
    color: #AAA; 
    padding: 70px 0;
`

export default Launches