import React from "react";
import logo from "../img/spXlogo.png";
import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";
import starlinkImg from "../img/starlink-wall.webp";
import starlinkLogo from "../img/starlink-logo.png";
import bg1 from "../img/bg1.webp";
import bg2 from "../img/bg2.webp";
import bg3 from "../img/bg3.webp";
import { useEffect } from "react";
import Navbar from "../component/Navbar";
import { motion } from "framer-motion";
import { useQuery } from "@apollo/client";
import { GET_COMPANY } from "../gql/companyQuery";

const Home = () => {
  const { loading, data } = useQuery(GET_COMPANY);

  useEffect(() => {
    window.scroll(0, 0);
    Aos.init({ duration: 1200, delay: 120 });
  }, []);

  if (loading) {
    return (
      <LoadingScreen>
        <div>
          <img src="/logo192.png" alt="" />
          <div className="loader"></div>
        </div>
      </LoadingScreen>
    );
  } else {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Navbar />
        <DivContainer className="content-flex" style={{ backgroundImage: `url(${bg1})` }}>
          <FlexDiv className="container">
            <div data-aos="fade-up" style={{ width: "80%" }}>
              <img src={logo} alt="logo" width="541" height="88" />
              <p style={{ color: "#FFF" }}>{data?.company?.summary}</p>
            </div>
          </FlexDiv>
        </DivContainer>
        <DivContainer className="content-flex" style={{ backgroundImage: `url(${starlinkImg})` }}>
          <FlexDiv className="container">
            <div data-aos="fade-up" data-aos-delay="50">
              <img src={starlinkLogo} alt="logo" width="500" height="241" />
              <p style={{ color: "#FFF" }}>Starlink is a satellite internet constellation being constructed by SpaceX providing satellite Internet access.</p>
            </div>
          </FlexDiv>
        </DivContainer>
        <DynamicDiv className="content-flex" style={{ backgroundImage: `url(${bg2})`, backgroundPosition: "bottom" }}>
          <div className="container">
            <FlexDiv style={{ justifyContent: "space-around", alignItems: "center" }}>
              <div data-aos="fade-right">
                <h1 className="text-shadow" style={{ fontSize: "7.1vmin", marginBottom: 0 }}>
                  About SpaceX
                </h1>
                <ul className="text-shadow">
                  <li>
                    <b>Founder : </b> {data?.company?.founder}
                  </li>
                  <li>
                    <b>Founded : </b>
                    {data?.company?.founded}
                  </li>
                  <li>
                    <b>Employees : </b>
                    {data?.company?.employees.toLocaleString() ?? "0"}
                  </li>
                  <li>
                    <b>Valuation : </b>
                    {data?.company?.valuation.toLocaleString() ?? "0"}
                  </li>
                  <li>
                    <b>Headquarters : </b>
                    {data?.company?.headquarters.address}, {data?.company?.headquarters.city}, {data?.company?.headquarters.state}
                  </li>
                </ul>
              </div>
              <div data-aos="fade-right">
                <ImgRocket src={bg3} alt="logo" width="500" height="280" />
              </div>
            </FlexDiv>
          </div>
        </DynamicDiv>
        <FlexDiv className="content-flex" style={{ padding: "10px 0", textAlign: "center", justifyContent: "center" }}>
          <A href={data?.company?.links.website}>Website</A>
          <A href={data?.company?.links.flickr}>Flickr</A>
          <A href={data?.company?.links.twitter}>Twitter</A>
          <A href={data?.company?.links.elon_twitter}>Elon Musk</A>
        </FlexDiv>
      </motion.div>
    );
  }
};

const LoadingScreen = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background: #111;
  z-index: 150;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  img {
    border-radius: 25px;
    max-width: 125px;
  }
  .loader {
    margin: 15px auto 0 auto;
  }
`;

const DivContainer = styled.div`
  height: 100vh;
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  align-items: center;
`;
const DynamicDiv = styled.div`
  padding: 16vmin 0 5vmin 0;
  background-size: cover;
  background-attachment: fixed;
`;
const FlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  width: 100%;
`;

const ImgRocket = styled.img`
  max-width: 100%;
  transition: 0.35s;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;
const A = styled.a`
  padding: 10px;
  text-decoration: none;
  color: white;
  :hover {
    opacity: 0.5;
    transition: 0.25s;
  }
`;
export default Home;
