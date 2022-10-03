import React, { useEffect, useState } from "react";
import styled from "styled-components";

const SearchBar = ({ defaultLaunches, setLaunches, filter, setFilter, year }) => {
  const { success, text, selectYear } = filter;
  const [scrollTop, setScrollTop] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    filterHandle();
  }, [filter]);

  const filterHandle = () => {
    const data = defaultLaunches
      .filter((value) => {
        return success === undefined ? value : value.launch_success === success;
      })
      .filter((value) => {
        const name = value.rocket.rocket_name + value.mission_name;
        return name.toLowerCase().includes(text.toLowerCase());
      });

    setLaunches(
      ["Oldest", "Latest"].includes(selectYear)
        ? data.sort((a, b) => {
            return selectYear === "Oldest" ? a.launch_year - b.launch_year : b.launch_year - a.launch_year;
          })
        : data.filter((value) => value.launch_year == selectYear)
    );
  };

  const successFilter = () => {
    const condition = {
      true: false,
      false: undefined,
      undefined: true,
    };
    setFilter({ ...filter, success: condition[`${success}`] });
  };

  const resetFilter = () => {
    setFilter({ success: undefined, text: "", selectYear: "Oldest" });
    setLaunches(defaultLaunches);
  };

  return (
    <FilterDiv style={{ paddingTop: scrollTop >= window.innerHeight * 0.9 - 75 ? "90px" : "20px" }}>
      <input type="text" placeholder="Search By Name" onChange={(e) => setFilter({ ...filter, text: e.target.value })} value={filter.text} />
      <div>
        <select name="selectYear" onChange={(e) => setFilter({ ...filter, selectYear: e.target.value })} value={selectYear}>
          <option selected defaultValue={"default"} disabled>
            Select Year
          </option>
          <option value={"Latest"}>Latest</option>
          <option value={"Oldest"}>Oldest (default)</option>
          {year.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
        <button onClick={() => successFilter()} style={{ background: success ? "rgb(70, 190, 57)" : success === false ? "rgb(221, 39, 39)" : "#111" }}>
          Launch Result : {success ? "Success" : success === false ? "Fail" : "Any"}
        </button>
        <button onClick={() => resetFilter()}>Clear</button>
      </div>
    </FilterDiv>
  );
};

const FilterDiv = styled.div`
  padding: 20px 0 0 10px;
  color: #ccc;
  background: #0e0e0e;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: sticky;
  transition: 0.25s;
  top: 0;
  z-index: 99;
  button,
  select {
    margin: 5px 10px 5px 0;
    padding: 7px;
    background: none;
    color: #fff;
    border-radius: 5px;
    border: 2px solid #333;
    transition: 0.25s;
  }
  option {
    background: #333;
    font-size: 1.05rem;
    border: none;
  }
  input {
    background: #333;
    padding: 10px;
    margin: 0 10px 0 0;
    border: none;
    color: #fff;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`;

export default SearchBar;
