import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./companyEdit.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  company_name: "",
  subsidiary: "",
  website: "",
  year_of_establishment: "",
  telephone_number: "",
  village_name: "",
  road: "",
  district: "",
  sub_district: "",
  province: "",
  zip_code: "",
  country: "",
};

const CompanyEdit = () => {
  const [state, setState] = useState(initialState);
  const reformatDate = (datetime) =>
    datetime.getDate() +
    "-" +
    (datetime.getMonth() + 1) +
    "-" +
    datetime.getFullYear();
  const {
    company_name,
    subsidiary,
    website,
    year_of_establishment,
    telephone_number,
    village_name,
    road,
    district,
    sub_district,
    province,
    zip_code,
    country,
  } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/company/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !company_name ||
      !subsidiary ||
      !website ||
      !year_of_establishment ||
      !telephone_number ||
      !village_name ||
      !road ||
      !district ||
      !sub_district ||
      !province ||
      !zip_code ||
      !country
    ) {
      // alert("Please provide value into each input field");
      // toast("Please provide value into each input field");
      toast.warning("Please provide value into each input field");
      console.log("please");
    } else {
      if (!id) {
        console.log("complate");
        axios
          .post("http://localhost:3001/company", {
            company_name,
            subsidiary,
            website,
            year_of_establishment,
            telephone_number,
            village_name,
            road,
            district,
            sub_district,
            province,
            zip_code,
            country,
          })
          .then(() => {
            setState({
              company_name: "",
              subsidiary: "",
              website: "",
              year_of_establishment: "",
              telephone_number: "",
              village_name: "",
              road: "",
              district: "",
              sub_district: "",
              province: "",
              zip_code: "",
              country: "",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Contact Added");
      } else {
        console.log("complate");
        axios
          .put(`http://localhost:3001/company/${id}`, {
            company_name,
            subsidiary,
            website,
            year_of_establishment,
            telephone_number,
            village_name,
            road,
            district,
            sub_district,
            province,
            zip_code,
            country,
          })
          .then(() => {
            setState({
              company_name: "",
              subsidiary: "",
              website: "",
              year_of_establishment: "",
              telephone_number: "",
              village_name: "",
              road: "",
              district: "",
              sub_district: "",
              province: "",
              zip_code: "",
              country: "",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Contact Updated Successfully");
      }

      setTimeout(() => navigate("/Company"), 2000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <main className="main2">
      <h2>Customer Edit</h2>
      <div>
        <form
          style={{
            margin: "auto",
            padding: "0px",

            alignContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <div class="row">
            <h2>General Information</h2>
            <div class="col">
              <label htmlFor="company_name">Company Name</label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                placeholder=" company_name"
                value={company_name || ""}
                onChange={handleInputChange}
              />
              <br />
              <br />
              <label htmlFor="subsidiary">Subsidiary</label>
              <input
                type="text"
                id="subsidiary"
                name="subsidiary"
                placeholder="subsidiary"
                value={subsidiary || ""}
                onChange={handleInputChange}
              />
              <br />
              <br />
              <label htmlFor="telephone_number">Telephone number</label>
              <input
                type="text"
                id="telephone_number"
                name="telephone_number"
                placeholder="telephone_number"
                value={telephone_number || ""}
                onChange={handleInputChange}
              />
              <br />
              <br />
              <br />
              <h2>Address</h2>
              <label htmlFor="village_name">Village name</label>
              <input
                type="text"
                id="village_name"
                name="village_name"
                placeholder="village_name"
                value={village_name || ""}
                onChange={handleInputChange}
              />
              <br />
              <br />
              <label htmlFor="district">District</label>
              <input
                type="text"
                id="district"
                name="district"
                placeholder="district"
                value={district || ""}
                onChange={handleInputChange}
              />
              <br />
              <br />
              <label htmlFor="province">Province</label>
              <input
                type="text"
                id="province"
                name="province"
                placeholder="province"
                value={province || ""}
                onChange={handleInputChange}
              />
              <br />
              <br />
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
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                placeholder="website"
                value={website || ""}
                onChange={handleInputChange}
              />
              <br />
              <br />
              <label htmlFor="year_of_establishment">Founding date</label>
              <input
                type="date"
                id="year_of_establishment"
                name="year_of_establishment"
                placeholder="year_of_establishment"
                value={year_of_establishment || ""}
                onChange={handleInputChange}
              />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <div className="tt1">
                <label htmlFor="road">Road</label>
                <input
                  type="text"
                  id="road"
                  name="road"
                  placeholder="road"
                  value={road || ""}
                  onChange={handleInputChange}
                />
                <br />
                <br />
                <label htmlFor="sub_district">Sub district</label>
                <input
                  type="text"
                  id="sub_district"
                  name="sub_district"
                  placeholder="sub_district"
                  value={sub_district || ""}
                  onChange={handleInputChange}
                />
                <br />
                <br />
                <label htmlFor="zip_code">ZIP code</label>
                <input
                  type="text"
                  id="zip_code"
                  name="zip_code"
                  placeholder="zip_code"
                  value={zip_code || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <input type="submit" value={id ? "Update" : "Save"} />
              <ToastContainer />
            </div>
            <Link to="/Company">
              <input type="button" value="Go Back" />
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CompanyEdit;
