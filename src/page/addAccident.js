import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./addAccident.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  Accident_Name: "",
  Accident_Details: "",
  Old_Car_Registration: "",
  New_Car_Registration: "",
  date: "",
  time: "",
  village_name: "",
  road: "",
  district: "",
  sub_district: "",
  province: "",
  zip_code: "",
  country: "",
};

const AddAccident = () => {
  const [state, setState] = useState(initialState);

  const {
    Accident_Name,
    Accident_Details,
    Old_Car_Registration,
    New_Car_Registration,
    village_name,
    road,
    district,
    sub_district,
    province,
    zip_code,
    country,
    date,
    time,
  } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/Accident/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !Accident_Name ||
      !Accident_Details ||
      !Old_Car_Registration ||
      !New_Car_Registration ||
      !village_name ||
      !road ||
      !district ||
      !sub_district ||
      !province ||
      !zip_code ||
      !country ||
      !date ||
      !time
    ) {
      // alert("Please provide value into each input field");
      // toast("Please provide value into each input field");
      toast.warning("Please provide value into each input field");
      console.log("please");
    } else {
      if (!id) {
        console.log("complate");
        axios
          .post("http://localhost:3001/Accident", {
            Accident_Name,
            Accident_Details,
            Old_Car_Registration,
            New_Car_Registration,
            village_name,
            road,
            district,
            sub_district,
            province,
            zip_code,
            country,
            date,
            time,
          })
          .then(() => {
            setState({
              Accident_Name: "",
              Accident_Details: "",
              Old_Car_Registration: "",
              New_Car_Registration: "",
              village_name: "",
              road: "",
              district: "",
              sub_district: "",
              province: "",
              zip_code: "",
              country: "",
              date: "",
              time: "",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Contact Added");
      } else {
        console.log("complate");
        axios
          .put(`http://localhost:3001/Accident/${id}`, {
            Accident_Name,
            Accident_Details,
            Old_Car_Registration,
            New_Car_Registration,
            village_name,
            road,
            district,
            sub_district,
            province,
            zip_code,
            country,
            date,
            time,
          })
          .then(() => {
            setState({
              Accident_Name: "",
              Accident_Details: "",
              Old_Car_Registration: "",
              New_Car_Registration: "",
              village_name: "",
              road: "",
              district: "",
              sub_district: "",
              province: "",
              zip_code: "",
              country: "",
              date: "",
              time: "",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Contact Updated Successfully");
      }

      setTimeout(() => navigate("/Accident"), 5000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <main className="main2">
      <h2>Accident Edit</h2>
      <div>
        <form
          style={{
            margin: "auto",
            padding: "0px",
            alignContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <div className="container">
            <div class="row">
              <div class="col">
                <h2>NAME / DETAILS ACCIDENT</h2>
                <label htmlFor="Accident_Name">Accident Name</label>
                <input
                  type="text"
                  id="Accident_Name"
                  name="Accident_Name"
                  placeholder="Accident Name"
                  value={Accident_Name || ""}
                  onChange={handleInputChange}
                />
                <br />
                <br />
                <h2>OLD / NEW REGISTRATION</h2>
                <label htmlFor="Old_Car_Registration">
                  Old Car Registration
                </label>
                <input
                  type="text"
                  id="Old_Car_Registration"
                  name="Old_Car_Registration"
                  placeholder="old Car Registration"
                  value={Old_Car_Registration || ""}
                  onChange={handleInputChange}
                />
                <br />
                <br />
                <h2>DATE / TIME</h2>
                <label htmlFor="date">date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  placeholder="date"
                  value={date || ""}
                  onChange={handleInputChange}
                />
                <br />
                <br />
                <h2>LOCATION</h2>
                <label htmlFor="village_name">village name</label>
                <input
                  type="text"
                  id="village_name"
                  name="village_name"
                  placeholder="Name of place/house number, village name"
                  value={village_name || ""}
                  onChange={handleInputChange}
                />
                <label htmlFor="district">District</label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  placeholder="district"
                  value={district || ""}
                  onChange={handleInputChange}
                />
                <label htmlFor="province">Province</label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  placeholder="province"
                  value={province || ""}
                  onChange={handleInputChange}
                />
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="country"
                  value={country || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div class="col">
                <div className="qq1">
                  <label htmlFor="Accident_Details">Accident Details</label>
                  <input
                    type="text"
                    id="Accident_Details"
                    name="Accident_Details"
                    placeholder="Accident Details"
                    value={Accident_Details || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="qq2">
                  <label htmlFor="New_Car_Registration">
                    New Car Registration
                  </label>
                  <input
                    type="text"
                    id="New_Car_Registration"
                    name="New_Car_Registration"
                    placeholder="New Car Registration"
                    value={New_Car_Registration || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="qq2">
                  <label htmlFor="time">time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    placeholder="time"
                    value={time || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="qq2">
                  <label htmlFor="road">Road</label>
                  <input
                    type="text"
                    id="road"
                    name="road"
                    placeholder="road"
                    value={road || ""}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="sub_district">Sub district</label>
                  <input
                    type="text"
                    id="sub_district"
                    name="sub_district"
                    placeholder="sub district"
                    value={sub_district || ""}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="zip_code">ZIP code</label>
                  <input
                    type="text"
                    id="zip_code"
                    name="zip_code"
                    placeholder="ZIP code"
                    value={zip_code || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <input type="submit" value={id ? "Update" : "Save"} />
                <ToastContainer />
              </div>
              <Link to="/Accident">
                <input type="button" value="Go Back" />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddAccident;
