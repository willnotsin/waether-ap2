import React from "react";
import { useState, useEffect } from "react";

const SearchWeather = () => {
  const [search, setSearch] = useState("Lagos");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  let componentMounted = true;

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q={search}&appid={a4a1323db098bae06ae6914dac7ad18b}`
      );
      if (componentMounted) {
        setData(await response.json());
        console.log(data);
      }
      return () => {
        componentMounted = false;
      };
    };
    fetchWeather();
  }, []);

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div class="card text-white text-center border-0">
              <img
                src="https://images.unsplash.com/photo-1555037015-1498966bcd7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGxhbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                class="card-img"
                alt="..."
              />
              <div class="card-img-overlay">
                <form className="mb-5 mt-3">
                  <div class="input-group mb-4 w-75 mx-auto">
                    <input
                      type="search"
                      class="form-control"
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
                    />
                    <button
                      type="submit"
                      class="input-group-text"
                      id="basic-addon2"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-4">
                  <h2 class="card-title">{data.name}</h2>
                  <p class="card-text lead">Wednesday, September 14, 2022</p>
                  <hr />
                  <i className="fas fa-cloud-rain fa-5x mb-4"></i>
                  <h1 className="fw-bolder mb-5">26 &deg;C</h1>
                  <p className="lead fw-bolder mb-2">Rain</p>
                  <p className="lead">29 &deg;C | 24 &deg;C</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWeather;
