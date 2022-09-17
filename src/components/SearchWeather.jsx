import React from "react";
import { useState, useEffect } from "react";

const SearchWeather = () => {
  const [search, setSearch] = useState("lagos");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  let componentMounted = true;

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a4a1323db098bae06ae6914dac7ad18b`
      );
      if (componentMounted) {
        setData(await response.json());
        console.log(data);
      }
      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        componentMounted = false;
      };
    };
    fetchWeather();
  }, [setSearch]);

  let emoji = "fa-cloud";

  if (typeof data.main !== "undefined") {
    if (data.weather[0].main === "Clouds") {
      emoji = "fa-cloud";
    } else if (data.weather[0].main === "Thunderstorm") {
      emoji = "fa-cloud-bolt";
    } else if (data.weather[0].main === "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (data.weather[0].main === "Rain") {
      emoji = "fa-cloud-showers-heavy";
    } else if (data.weather[0].main === "Snow") {
      emoji = "fa-snowflake";
    } else {
      emoji = "fa-cloud-sun";
    }
  } else {
    return <div>...Loading</div>;
  }

  let temp = (data.main.temp - 273.14).toFixed(2);
  let temp_max = (data.main.temp_max - 273.14).toFixed(2);
  let temp_min = (data.main.temp_min - 273.14).toFixed(2);

  //date
  let d = new Date();
  let date = d.getDate();
  let month = d.toLocaleString("default", { month: "long" });
  let year = d.getFullYear();
  let day = d.toLocaleString("default", { weekday: "long" });

  // time
  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleSubmit = (e) => {
    console.log(e)
    e.preventDefault();
    setSearch(input);
  };

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
                <form onSubmit={handleSubmit}>
                  <div class="input-group mb-4 w-75 mx-auto">
                    <input
                      type="search"
                      class="form-control"
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
                      name="search"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      required
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
                <div className="bg-dark bg-opacity-50 py-3">
                  {/* <h2 class="card-title">{search}</h2> */}

                  <h2 class="card-title">{data.name}</h2>

                  <p class="card-text lead">
                    {day}, {month} {date}, {year}
                    <br />
                    {time}
                  </p>

                  <hr />
                  <i className={`fas fa-solid ${emoji} fa-4x`}></i>

                  {/* <h1 className="fw-bolder mb-3">11&deg;C</h1>
                  <h2 className="lead fw-bolder mb-0">Rain</h2>
                  <p className="lead">sunny</p>
                  <p className="lead mt-1">22&deg;C | 22&deg;C</p> */}

                  <h1 className="fw-bolder mb-3">{temp}&deg;C</h1>
                  <h2 className="lead fw-bolder mb-0">
                    {data.weather[0].main}
                  </h2>
                  <p className="lead">{data.weather[0].description}</p>
                  <p className="lead mt-1">
                    {temp_max}&deg;C | {temp_min}&deg;C
                  </p>
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
