import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./orderEdit.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  firstName: "",
  quantity: "",
  payment: "",
  status: "",
  date: "",
  time: "",
  tel: "",
  car_registration: "",
  container: "",
  container_type: "",
  transfer_receipt: "",
  village_name: "",
  road: "",
  district: "",
  sub_district: "",
  province: "",
  zip_code: "",
  country: "",
  village_name1: "",
  road1: "",
  district1: "",
  sub_district1: "",
  province1: "",
  zip_code1: "",
  country1: "",
  names: "",
  price: "",
  distance: "",
};

const EditWorkOrder = () => {
  const [state, setState] = useState(initialState);
  const [cost, setCost] = useState([]);

  const {
    firstName,
    quantity,
    payment,
    status,
    price,
    date,
    distance,
    time,
    tel,
    names,
    car_registration,
    container,
    container_type,
    transfer_receipt,
    village_name,
    road,
    district,
    sub_district,
    province,
    zip_code,
    country,
    village_name1,
    road1,
    district1,
    sub_district1,
    province1,
    zip_code1,
    country1,
    selling_price,
    oil_cost_price,
    typetruck,
  } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/ordercustomer/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));

    axios.get(`http://localhost:3001/calculed`).then((resp) => {
      setCost(resp.data);
      console.log(resp.data);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !quantity ||
      !payment ||
      !status ||
      !date ||
      !time ||
      !tel ||
      !village_name ||
      !road ||
      !district ||
      !sub_district ||
      !province ||
      !zip_code ||
      !country ||
      !village_name1 ||
      !road1 ||
      !district1 ||
      !sub_district1 ||
      !province1 ||
      !zip_code1 ||
      !country1
    ) {
      // alert("Please provide value into each input field");
      // toast("Please provide value into each input field");
      toast.warning("Please provide value into each input field");
      console.log("please");
    } else {
      if (!id) {
        console.log("complate");
        axios
          .post("http://localhost:3001/ordercustomer", {
            firstName,
            quantity,
            payment,
            status,
            date,
            time,
            tel,
            car_registration,
            container,
            container_type,
            transfer_receipt,
            village_name,
            road,
            district,
            sub_district,
            province,
            zip_code,
            country,
            village_name1,
            road1,
            district1,
            sub_district1,
            province1,
            zip_code1,
            country1,
            names,
            price,
            distance,
            typetruck,
            selling_price: cost,
            oil_cost_price: cost,
          })
          .then(() => {
            setState({
              firstName: "",
              quantity: "",
              payment: "",
              status: "",
              distance: "",
              price: "",
              date: "",
              time: "",
              tel: "",
              names: "",
              car_registration: "",
              container: "",
              container_type: "",
              transfer_receipt: "",
              village_name: "",
              road: "",
              district: "",
              sub_district: "",
              province: "",
              zip_code: "",
              country: "",
              village_name1: "",
              road1: "",
              district1: "",
              sub_district1: "",
              province1: "",
              zip_code1: "",
              country1: "",
              typetruck: "",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Contact Added");
      } else {
        console.log("complate");
        axios
          .put(`http://localhost:3001/ordercustomer/${id}`, {
            firstName,
            quantity,
            payment,
            status,
            date,
            time,
            tel,
            car_registration,
            container,
            transfer_receipt,
            village_name,
            road,
            district,
            sub_district,
            province,
            zip_code,
            country,
            village_name1,
            road1,
            district1,
            sub_district1,
            province1,
            zip_code1,
            country1,
            names,
            price,
            distance,
            container_type,
            selling_price: cost,
            oil_cost_price: cost,
            typetruck,
          })
          .then(() => {
            setState({
              firstName: "",
              quantity: "",
              payment: "",
              status: "",
              distance: "",
              price: "",
              date: "",
              time: "",
              tel: "",
              names: "",
              car_registration: "",
              container: "",
              container_type: "",
              transfer_receipt: "",
              village_name: "",
              road: "",
              district: "",
              sub_district: "",
              province: "",
              zip_code: "",
              country: "",
              village_name1: "",
              road1: "",
              district1: "",
              sub_district1: "",
              province1: "",
              zip_code1: "",
              country1: "",
              typetruck: "",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Contact Updated Successfully");
      }

      setTimeout(() => navigate("/Order"), 300);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <main className="main2">
      <h2>Order Edit</h2>
      <br />
      <div>
        <form
          style={{
            margin: "auto",
            padding: "0px",
            alignContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <div>
            <div class="row">
              <div class="col-sm">
                <label htmlFor="firstName">Customer Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Customer Name"
                  value={firstName || ""}
                  onChange={handleInputChange}
                />

                <label htmlFor="status">Status</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  id="status"
                  type="text"
                  name="status"
                  value={status || ""}
                  onChange={handleInputChange}
                >
                  <option selected>Choose...</option>
                  <option className="padding" value="Pending">
                    Pending
                  </option>
                  <option className="success" value="Complete">
                    Complate
                  </option>
                  <option className="cancel" value="Cancel">
                    Cancel
                  </option>
                </select>

                <label htmlFor="distance">distance</label>
                <input
                  type="number"
                  id="distance"
                  name="distance"
                  placeholder="distance"
                  value={distance || ""}
                  onChange={handleInputChange}
                />

                <label htmlFor="date">date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  placeholder="Date"
                  value={date || ""}
                  onChange={handleInputChange}
                />

                <label htmlFor="tel">Tel</label>
                <input
                  className="tel1"
                  type="text"
                  id="tel"
                  name="tel"
                  placeholder="tel"
                  value={tel || ""}
                  onChange={handleInputChange}
                />
                <br />
                <br />
                <h2>TRUCK</h2>
                <label htmlFor="names">Brand Truck</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  id="names"
                  type="text"
                  name="names"
                  value={names || ""}
                  onChange={handleInputChange}
                >
                  <option selected>Choose...</option>
                  <option value="ISUZU">ISUZU</option>
                  <option value="HINO">HINO</option>
                  <option value="SCANIA">SCANIA</option>
                  <option value="VOLVO">VOLVO</option>
                </select>
                <label htmlFor="typetruck">Type Truck</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  id="typetruck"
                  type="text"
                  name="typetruck"
                  value={typetruck || ""}
                  onChange={handleInputChange}
                >
                  <option selected>Choose...</option>
                  <option value="รถเทรลเลอร์พื้นเรียบ">
                    รถเทรลเลอร์พื้นเรียบ
                  </option>
                  <option value="พ่วง">พ่วง</option>
                </select>
                <br />
                <br />
                <h2>CONTAINER</h2>
                <label htmlFor="container">container</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  id="container"
                  type="text"
                  name="container"
                  value={container || ""}
                  onChange={handleInputChange}
                >
                  <option selected>Choose...</option>
                  <option value="Dry">Dry</option>
                  <option value="Reefer">Reefer</option>
                  <option value="Open Top">Open Top</option>
                  <option value="Flat Rack">Flat Rack</option>
                </select>
                <br />
                <br />
                <label htmlFor="transfer_receipt">transfer_receipt</label>
                <input
                  type="text"
                  id="transfer_receipt"
                  name="transfer_receipt"
                  placeholder="transfer_receipt"
                  value={transfer_receipt || ""}
                  onChange={handleInputChange}
                />
                <br />
                <br />
                <h2>START</h2>
                <label htmlFor="village_name">
                  Name of place/house number, village name
                </label>
                <input
                  type="text"
                  id="village_name"
                  name="village_name"
                  placeholder="Name of place/house number, village name"
                  value={village_name || ""}
                  onChange={handleInputChange}
                />
                <label htmlFor="road">Road</label>
                <input
                  type="text"
                  id="road"
                  name="road"
                  placeholder="Road"
                  value={road || ""}
                  onChange={handleInputChange}
                />
                <label htmlFor="district">District</label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  placeholder="District"
                  value={district || ""}
                  onChange={handleInputChange}
                />
                <label htmlFor="sub_district">Sub district</label>
                <input
                  type="text"
                  id="sub_district"
                  name="sub_district"
                  placeholder="Sub district"
                  value={sub_district || ""}
                  onChange={handleInputChange}
                />

                <label htmlFor="province">Province</label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  placeholder="Province"
                  value={province || ""}
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
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Country"
                  value={country || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div class="col-sm">
                <label htmlFor="quantity">Quantity Truck</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  placeholder="Quantity"
                  value={quantity || ""}
                  onChange={handleInputChange}
                />

                <label htmlFor="payment">Payment</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  id="payment"
                  type="text"
                  name="payment"
                  value={payment || ""}
                  onChange={handleInputChange}
                >
                  <option selected>Choose...</option>
                  <option className="padding" value="Due">
                    Due
                  </option>
                  <option className="success" value="waiting for payment">
                    waiting for payment
                  </option>
                  <option className="success" value="paid">
                    paid
                  </option>
                  <option className="cancel" value="refunded">
                    refunded
                  </option>
                </select>

                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Price"
                  value={price || ""}
                  onChange={handleInputChange}
                />

                <label htmlFor="time">time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  placeholder="Time"
                  value={time || ""}
                  onChange={handleInputChange}
                />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                <div className="rr1">
                  <label htmlFor="car_registration">car_registration</label>
                  <input
                    type="text"
                    id="car_registration"
                    name="car_registration"
                    placeholder="car_registration"
                    value={car_registration || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <br />
                <br />
                <div className="rr2">
                  <label htmlFor="container_type">container_type</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    id="container_type"
                    type="text"
                    name="container_type"
                    value={container_type || ""}
                    onChange={handleInputChange}
                  >
                    <option selected>Choose...</option>
                    <option value="20'feet">20'feet</option>
                    <option value="40'feet">40'feet</option>
                    <option value="40'HC">40'HC </option>
                  </select>
                </div>
                <br />

                <br />
                <div className="rr3">
                  <h2>End</h2>
                  <label htmlFor="village_name1">
                    Name of place/house number, village name
                  </label>
                  <input
                    type="text"
                    id="village_name1"
                    name="village_name1"
                    placeholder="Name of place/house number, village name"
                    value={village_name1 || ""}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="road1">Road</label>
                  <input
                    type="text"
                    id="road1"
                    name="road1"
                    placeholder="Road"
                    value={road1 || ""}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="district1">District</label>
                  <input
                    type="text"
                    id="district1"
                    name="district1"
                    placeholder="District1"
                    value={district1 || ""}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="sub_district1">Sub district</label>
                  <input
                    type="text"
                    id="sub_district1"
                    name="sub_district1"
                    placeholder="Sub district"
                    value={sub_district1 || ""}
                    onChange={handleInputChange}
                  />

                  <label htmlFor="province1">Province</label>
                  <input
                    type="text"
                    id="province1"
                    name="province1"
                    placeholder="Province1"
                    value={province1 || ""}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="zip_code1">ZIP code</label>
                  <input
                    type="text"
                    id="zip_code1"
                    name="zip_code1"
                    placeholder="ZIP code"
                    value={zip_code1 || ""}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="country1">Country</label>
                  <input
                    type="text"
                    id="country1"
                    name="country1"
                    placeholder="Country"
                    value={country1 || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <input type="submit" value={id ? "Update" : "Save"} />
                <ToastContainer />
              </div>
              <Link to="/Order">
                <input type="button" value="Go Back" />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditWorkOrder;
