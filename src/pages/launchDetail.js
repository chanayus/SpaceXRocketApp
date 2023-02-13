import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import { useFetch } from "../hooks/useFetch";

const LaunchDetail = () => {
  const { id } = useParams();

  const { loading: launchLoading, data: launchRes } = useFetch(`https://api.spacexdata.com/v3/launches/${id}`);
  const { data: latestRes } = useFetch(`https://api.spacexdata.com/v3/launches/latest`);

  useEffect(() => {
    window.scroll(0, 0);
  }, [id, launchLoading]);

  const disabled = {
    opacity: 0.4,
    pointerEvents: "none",
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div
        className="headerContainer"
        style={{ backgroundImage: `url(${launchRes?.links?.flickr_images[0] === undefined && !launchLoading ? "/launch-null.webp" : launchRes?.links?.flickr_images[0]})` }}
      >
        <div className="wrapper" style={{ overflow: "hidden", backgroundColor: "rgba(0, 0, 0, 0.35)", display: "flex", justifyContent: "center" }}>
          <div className="container" style={{ flex: 1, display: "flex", alignItems: "center", width: "100%" }}>
            <AnimatePresence exitBeforeEnter>
              {launchLoading ? (
                <motion.div key={"loader"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="loader"></motion.div>
              ) : (
                <motion.div key={"content"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="">
                  <h1 className="headerText" style={{ width: "100%", marginBottom: 0 }}>
                    {launchRes?.mission_name}
                  </h1>
                  <h2 className="text-shadow" style={{ marginTop: 10 }}>
                    {launchRes?.rocket?.rocket_name}
                  </h2>
                  <Link to={{ pathname: `/rocketDetail/${launchRes?.rocket?.rocket_id}` }}>
                    <ViewButton>View Rocket Detail</ViewButton>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {!launchLoading && (
              <motion.div className="pageNav" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Link to={{ pathname: `/launchDetail/${parseInt(id) - 1}` }} style={parseInt(id) - 1 <= 0 ? disabled : null}>
                  <NavButton>
                    <b>{"<"}</b>
                  </NavButton>
                </Link>
                <a href="#content">
                  <NavButton style={{ padding: "1.25vmin 2.5vmin" }}>View Detail</NavButton>
                </a>
                <Link to={{ pathname: `/launchDetail/${parseInt(id) + 1}` }} style={parseInt(id) + 1 > Number(latestRes?.launchLatest?.id) + 1 ? disabled : null}>
                  <NavButton>
                    <b>{">"}</b>
                  </NavButton>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="container" id="content" style={{ paddingBottom: 10 }}>
        <h1 className="headerText" style={{ fontSize: "8vmin" }}>
          Launch Detail
        </h1>
        <hr style={{ marginBottom: 40 }} />
        {launchRes?.links?.mission_patch_small === null ? null : (
          <center>
            <img src={launchRes?.links?.mission_patch_small} alt="" width="240" height="240" />
          </center>
        )}
        <P>{launchRes?.details}</P>
        <ul style={{ padding: 0 }}>
          <LI>
            <b>Flight Number :</b> {launchRes?.id}
          </LI>
          <LI>{/* <b>Mission Name :</b> {launchRes?.mission_name} {launchRes?.mission_id[0] === undefined ? null : `(${launchRes?.mission_id[0]})`} */}</LI>
          <LI>
            <b>Launch Year :</b> {launchRes?.launch_year}
          </LI>
          <LI>
            <b>Launch Date :</b> {dayjs(launchRes?.launch_date_utc).format("DD/MM/YYYY HH:MM A")}
          </LI>
          <LI>
            <b>Rocket Name :</b> {launchRes?.rocket?.rocket_name}
          </LI>
          <LI>
            <b>Rocket Type :</b> {launchRes?.rocket?.rocket_type}
          </LI>
          <LI>
            <b>Launch Site :</b> {launchRes?.launch_site?.site_name}
          </LI>
          <LI>
            <b>Launch Result :</b> {launchRes?.launch_success ? "Success" : launchRes?.launch_success === null ? "Unknown" : "Fail"}
          </LI>
        </ul>
        <div style={{ padding: "50px 0" }}>
          <h1 style={{ fontSize: "5vmin" }}>Video</h1>
          <iframe title="SpaceX" src={`https://www.youtube.com/embed/${launchRes?.links?.youtube_id}/`} width="100%" height="640px" frameBorder="0" allowFullScreen></iframe>
        </div>
      </div>
      {launchRes?.links?.flickr_images[0] === undefined ? null : (
        <div className="container" style={{ paddingBottom: 30 }}>
          <h1 style={{ fontSize: "5vmin" }}>Gallery</h1>
          <div className="imageGrid" style={{ justifyContent: "center" }}>
            {launchRes?.links?.flickr_images.map((val, index) => {
              return <img className="imageGallery" key={index} src={val} alt="img" width="300" />;
            })}
          </div>
        </div>
      )}
      <div className="pageNav" style={{ padding: "50px 0" }}>
        <Link to={{ pathname: `/launchDetail/${parseInt(id) - 1}` }} style={parseInt(id) - 1 <= 0 ? disabled : null}>
          <NavButton>
            <b>{"<"}</b>
          </NavButton>
        </Link>
        <h3 style={{ textAlign: "center" }}>{launchRes?.mission_name}</h3>
        <Link to={{ pathname: `/launchDetail/${parseInt(id) + 1}` }} style={parseInt(id) + 1 > Number(latestRes?.launchLatest?.id) ? disabled : null}>
          <NavButton>
            <b>{">"}</b>
          </NavButton>
        </Link>
      </div>
    </motion.div>
  );
};

const LI = styled.li`
  list-style: none;
  color: #ededed;
  font-size: 1.25rem;
  line-height: 2.5;
  font-weight: 200;
`;
const P = styled.p`
  font-size: 1.05rem;
  padding: 25px 0;
  color: #fff;
`;

const ViewButton = styled.button`
  background: transparent;
  padding: 1.25vmin 2.5vmin;
  margin: 20px 0;
  border: 2px solid #fff;
  transition: 0.25s;
  text-decoration: none;
  color: #fff;
  font-size: 1.1rem;
  :hover {
    transform: scale(0.9);
  }
`;

const NavButton = styled.button`
  background: #fff;
  border: 2px solid transparent;
  padding: 7px 17px;
  margin: 0 15px;
  transition: 0.25s;
  font-size: 1.1rem;
  border-radius: 40px;
  :hover {
    transform: scale(0.9);
  }
  b {
    font-size: 1.25rem;
  }
`;
export default LaunchDetail;
