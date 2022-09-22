import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./containerEdit.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  Container_name: "",
  Container_image: "",
  Container_type: "",
  height: "",
  width: "",
  length: "",
  Payload: "",
};

const ContainerEdit = () => {
  const [state, setState] = useState(initialState);

  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });
  const [isSucces, setSuccess] = useState(null);

  const {
    Container_name,
    Container_image,
    Container_type,
    height,
    width,
    length,
    Payload,
  } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/container/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !Container_name ||
      !Container_image ||
      !Container_type ||
      !height ||
      !width ||
      !length ||
      !Payload
    ) {
      // alert("Please provide value into each input field");
      // toast("Please provide value into each input field");
      toast.warning("Please provide value into each input field");
      console.log("please");
    } else {
      const formdata = new FormData();
      formdata.append("avatar", userInfo.file);

      axios
        .post("http://localhost:3001/imageuploadcontainer", formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          // then print response status
          console.warn(res);
          if (res.data.success === 1) {
            setSuccess("Image upload successfully");
            console.log("Image upload successfully");
          }
        });
      if (!id) {
        console.log("complate");
        axios
          .post("http://localhost:3001/container", {
            Container_name,
            Container_image,
            Container_type,
            height,
            width,
            length,
            Payload,
          })
          .then(() => {
            setState({
              Container_name: "",
              Container_image: "",
              Container_type: "",
              height: "",
              width: "",
              length: "",
              Payload: "",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Contact Added");
      } else {
        console.log("complate");
        axios
          .put(`http://localhost:3001/container/${id}`, {
            Container_name,
            Container_image,
            Container_type,
            height,
            width,
            length,
            Payload,
          })
          .then(() => {
            setState({
              Container_name: "",
              Container_image: "",
              Container_type: "",
              height: "",
              width: "",
              length: "",
              Payload: "",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Contact Updated Successfully");
      }

      setTimeout(() => navigate("/CarInformation/ContainerData"), 5000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    setuserInfo({
      ...userInfo,
      file: e.target.files[0],
      filepreview: URL.createObjectURL(e.target.files[0]),
    });
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
          <label htmlFor="Container_name">Container name</label>
          <input
            type="text"
            id="Container_name"
            name="Container_name"
            placeholder=" Container_name"
            value={Container_name || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="Container_image">Container_image</label>
          <input
            type="file"
            id="Container_image"
            name="Container_image"
            placeholder="Container_image"
            // value={Container_image || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="Container_type">Container_type</label>
          <select
            class="form-select"
            aria-label="Default select example"
            id="Container_type"
            type="text"
            name="Container_type"
            value={Container_type || ""}
            onChange={handleInputChange}
          >
            <option selected>Choose...</option>
            <option>20'feet</option>
            <option>40'feet</option>
            <option>40'HC </option>
          </select>

          <label htmlFor="height">height</label>
          <input
            type="float"
            id="height"
            name="height"
            placeholder="height"
            value={height || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="width">width</label>
          <input
            type="float"
            id="width"
            name="width"
            placeholder="width"
            value={width || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="length">length</label>
          <input
            type="float"
            id="length"
            name="length"
            placeholder="length"
            value={length || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="Payload">Payload</label>
          <input
            type="float"
            id="Payload"
            name="Payload"
            placeholder="Payload"
            value={Payload || ""}
            onChange={handleInputChange}
          />
          <div>
            <input type="submit" value={id ? "Update" : "Save"} />
            <ToastContainer />
          </div>
          <Link to="/CarInformation/ContainerData">
            <input type="button" value="Go Back" />
          </Link>
        </form>
      </div>
    </main>
  );
};

export default ContainerEdit;
