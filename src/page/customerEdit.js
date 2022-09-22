import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./customerEdit.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  userId: "",
  position: "",
  tel: "",
  firstName: "",
  lastName: "",
  address: "",
  email: "",
};

const CustomerEdit = () => {
  const [state, setState] = useState(initialState);

  const { userId, position, tel, firstName, lastName, address, email } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId || !tel || !firstName || !lastName || !address || !email) {
      // alert("Please provide value into each input field");
      // toast("Please provide value into each input field");
      toast.warning("Please provide value into each input field");
      console.log("please");
    } else {
      if (!id) {
        console.log("complate");
        axios
          .post("http://localhost:3001/user", {
            userId,
            position,
            tel,
            firstName,
            lastName,
            address,
            email,
          })
          .then(() => {
            setState({
              userId: "",
              position: "",
              tel: "",
              firstname: "",
              lastname: "",
              address: "",
              email: "",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Contact Added");
      } else {
        console.log("complate");
        axios
          .put(`http://localhost:3001/user/${id}`, {
            userId,
            position,
            tel,
            firstName,
            lastName,
            address,
            email,
          })
          .then(() => {
            setState({
              userId: "",
              position: "",
              tel: "",
              firstName: "",
              lastName: "",
              address: "",
              email: "",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Contact Updated Successfully");
      }

      setTimeout(() => navigate("/Customer"), 5000);
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
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="userId">username</label>
          <input
            type="text"
            id="userId"
            name="userId"
            placeholder=" userId"
            value={userId || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="position">position</label>
          <input
            type="text"
            id="position"
            name="position"
            placeholder="position"
            value={position || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="tel">tel</label>
          <input
            type="text"
            id="tel"
            name="tel"
            placeholder="tel"
            value={tel || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="firstName">firstname</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="firstname"
            value={firstName || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="lastName">lastname</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="lastname"
            value={lastName || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="address">address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="address"
            value={address || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={email || ""}
            onChange={handleInputChange}
          />
          <div>
            <input type="submit" value={id ? "Update" : "Save"} />
            <ToastContainer />
          </div>
          <Link to="/Customer">
            <input type="button" value="Go Back" />
          </Link>
        </form>
      </div>
    </main>
  );
};

export default CustomerEdit;
