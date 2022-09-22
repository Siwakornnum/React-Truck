import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./truckEdit.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  brand_truck: "",
  piture_truck: "",
  truck_type: "",
  model_code: "",
  license_plate: "",
  total_weight: "",
};

const TruckEdit = () => {
  const [state, setState] = useState(initialState);

  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });
  const [isSucces, setSuccess] = useState(null);

  const {
    brand_truck,
    piture_truck,
    truck_type,
    model_code,
    license_plate,
    total_weight,
  } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/truck/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!piture_truck) {
      // alert("Please provide value into each input field");
      // toast("Please provide value into each input field");
      toast.warning("Please provide value into each input field");
      console.log("please");
    } else {
      const formdata = new FormData();
      formdata.append("avatar", userInfo.file);

      axios
        .post("http://localhost:3001/imageupload", formdata, {
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
          .post("http://localhost:3001/truck", {
            brand_truck,
            piture_truck,
            truck_type,
            model_code,
            license_plate,
            total_weight,
          })
          .then(() => {
            setState({
              brand_truck: "",
              piture_truck: "",
              truck_type: "",
              model_code: "",
              license_plate: "",
              total_weight: "",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Contact Added");
      } else {
        console.log("complate");
        axios
          .put(`http://localhost:3001/truck/${id}`, {
            brand_truck,
            piture_truck,
            truck_type,
            model_code,
            license_plate,
            total_weight,
          })
          .then(() => {
            setState({
              brand_truck: "",
              piture_truck: "",
              truck_type: "",
              model_code: "",
              license_plate: "",
              total_weight: "",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Contact Updated Successfully");
      }

      setTimeout(() => navigate("/CarInformation/TruckInformation"), 5000);
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

  // <====================== Upload =================>
  // const selectFile = useRef();
  // const [name, setname] = useState("");
  // const [response, setresponse] = useState('')
  // const uploader = async () =>
  // {
  //     console.log(name);

  //     if (selectFile.current.files.length === 0) {
  //         setresponse("Please Choose an image")
  //     } else {
  //         const formData = new FormData()
  //         formData.append('piture', selectFile.current.files[0]);

  //         var xhr = new XMLHttpRequest();
  //         xhr.open('POST', 'http://localhost/truckrent/upload.php', true);
  //         xhr.onload = function ()
  //         {
  //             setresponse(this.responseText)
  //         }
  //         xhr.send(formData);
  //     }
  // }
  // <====================== End Upload =================>

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
          <label htmlFor="brand_truck">brand truck</label>
          <input
            type="text"
            id="brand_truck"
            name="brand_truck"
            placeholder=" brand truck"
            value={brand_truck || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="piture_truck">piture truck</label>
          <input
            type="file"
            id="piture_truck"
            name="piture_truck"
            placeholder="piture truck"
            // value={piture_truck || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="truck_type">truck type</label>
          <input
            type="text"
            id="truck_type"
            name="truck_type"
            placeholder="truck type"
            value={truck_type || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="model_code">model code</label>
          <input
            type="text"
            id="model_code"
            name="model_code"
            placeholder="model code"
            value={model_code || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="license_plate">license plate</label>
          <input
            type="text"
            id="license_plate"
            name="license_plate"
            placeholder="license plate"
            value={license_plate || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="total_weight">total weight</label>
          <input
            type="text"
            id="total_weight"
            name="total_weight"
            placeholder="total weight"
            value={total_weight || ""}
            onChange={handleInputChange}
          />
          <div>
            <input type="submit" value={id ? "Update" : "Save"} />
            <ToastContainer />
          </div>
          <Link to="/CarInformation/TruckInformation">
            <input type="button" value="Go Back" />
          </Link>
        </form>
      </div>
    </main>
  );
};

export default TruckEdit;
