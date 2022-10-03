import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import launchBg from "../img/launch-bg.webp";
import Aos from "aos";
import SearchBar from "../component/launches/searchBar";
import LaunchCard from "../component/launches/launchCard";
import { useQuery } from "@apollo/client";
import { GET_LAUNCHES } from "../gql/launchesQuery";

const Launches = () => {
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  const [launches, setLaunches] = useState([]);
  const [year, setYear] = useState([]);
  const [filter, setFilter] = useState({
    success: undefined,
    text: "",
    selectYear: "Oldest",
  });

  useEffect(() => {
    window.scroll(0, 0);
    Aos.init({ duration: 500, delay: 100 });

    const stateHandle = async () => {
      const set = new Set(data?.launches.map((item) => item.launch_year));
      const allYear = Array.from(set).sort((a, b) => a - b);
      setYear(allYear);
      setLaunches(data.launches);
    };
    !loading && stateHandle();
  }, [loading]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="headerContainer" style={{ backgroundImage: `url(${launchBg})`, height: "62.5vh" }}>
        <div className="wrapper" style={{ backgroundColor: "rgba(0, 0, 0, 0.1)", justifyContent: "center" }}>
          <div>
            <div className="container">
              <h1 data-aos="fade-right" data-aos-delay="270" className="headerText">
                LAUNCHES
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {!loading && <SearchBar defaultLaunches={data.launches} setLaunches={setLaunches} filter={filter} setFilter={setFilter} year={year} />}
        <FlexContainer>
          {launches.length === 0 || loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              {loading && <div style={{ marginTop: "50px" }} className="loader"></div>}
              {launches.length === 0 && !loading && <NoResult>No Result</NoResult>}
            </div>
          ) : (
            launches.map((value, index) => {
              return <LaunchCard key={index} value={value} index={index} />;
            })
          )}
        </FlexContainer>
      </div>
    </motion.div>
  );
};

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  transition: 0.35s;
`;
const NoResult = styled.h1`
  font-size: 5vmin;
  font-weight: 200;
  color: #aaa;
  padding: 70px 0;
`;

export default Launches;
