import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import rocketBg from "../img/rocket-bg.webp";
import { useFetch } from "../hooks/useFetch";

const Rocket = () => {
  const { loading, data } = useFetch("https://api.spacexdata.com/v3/rockets");
  useEffect(() => {
    window.scroll(0, 0);
  }, [loading]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="headerContainer" style={{ backgroundImage: `url(${rocketBg})`, height: "62.5vh" }}>
        <div className="wrapper" style={{ backgroundColor: "rgba(0, 0, 0, 0.1)", justifyContent: "center" }}>
          <div>
            <div className="container">
              <h1 data-aos="fade-right" data-aos-delay="270" className="headerText">
                ROCKETS
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <AnimatePresence>
          {!loading ? (
            <FlexContainer key="show-data" style={{ marginBottom: 50 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              {data.map((value, index) => (
                <Link key={index} to={{ pathname: `/rocketDetail/${value?.rocket_id}` }} style={{ textDecoration: "none", width: "55vmin" }}>
                  <Card>
                    <h1>{index + 1}</h1>
                    <p>{value.rocket_name}</p>
                  </Card>
                </Link>
              ))}
            </FlexContainer>
          ) : (
            <FlexContainer key="loader">
              <div className="loader"></div>
            </FlexContainer>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Card = styled.div`
  border-radius: 3px;
  background-color: #1f1f1f;
  margin: 20px 10px 0px 0px;
  text-align: center;
  text-decoration: none;
  display: flex;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transition: 0.25s;
  position: relative;
  h1 {
    font-size: 6.5rem;
    padding: 0 0 0 20px;
    margin: 0;
    color: rgba(0, 0, 0, 0.4);
    flex: 0.8;
    position: absolute;
    left: 0;
  }
  p {
    color: #fff;
    font-weight: bold;
    width: 100%;
    font-size: 1.5rem;
    flex: 1;
    z-index: 10;
  }
  :hover {
    background-color: #2a2a2a;
  }
`;
const FlexContainer = styled(motion.div)`
  padding: 50px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
export default Rocket;
