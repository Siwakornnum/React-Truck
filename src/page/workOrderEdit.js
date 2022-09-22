import React, { useState, useEffect, } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./orderEdit.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const initialState = {
    brand_truck: "",
    license_plate: "",
    Container_name: "",
    Container_type: "",
    date: "",
    date1: "",
    time: "",
}



const EditOrder = () =>
{
    const [state, setState] = useState(initialState);

    const { brand_truck, license_plate, Container_name, Container_type, date, date1, time } = state;

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() =>
    {
        axios
            .get(`http://localhost:3001/workorder/${id}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id])


    const handleSubmit = (e) =>
    {

        e.preventDefault();
        if (!brand_truck || !license_plate || !Container_name || !Container_type || !date || !date1 || !time) {
            // alert("Please provide value into each input field");
            // toast("Please provide value into each input field");
            toast.warning("Please provide value into each input field");
            console.log("please")
        } else {
            if (!id) {
                console.log("complate")
                axios.post("http://localhost:3001/workorder", {
                    brand_truck,
                    license_plate,
                    Container_name,
                    Container_type,
                    date,
                    date1,
                    time,
                }).then(() =>
                {
                    setState({ brand_truck: "", license_plate: "", Container_name: "", Container_type: "", date: "", date1: "", time: "" })
                }).catch((err) => toast.error(err.response.data));
                toast.success("Contact Added");
            } else {
                console.log("complate")
                axios.put(`http://localhost:3001/workorder/${id}`, {
                    brand_truck,
                    license_plate,
                    Container_name,
                    Container_type,
                    date,
                    date1,
                    time,
                }).then(() =>
                {
                    setState({ brand_truck: "", license_plate: "", Container_name: "", Container_type: "", date: "", date1: "", time: "" })
                }).catch((err) => toast.error(err.response.data));
                toast.success("Contact Updated Successfully");
            }

            setTimeout(() => navigate("/WorkOrder"), 300);
        }
    };

    const handleInputChange = (e) =>
    {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleChange = () =>
    {
        handleInputChange();

    }



    return (
        <main className="main2">
            <h2>Order Edit</h2>
            <div >
                <form style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: "center"
                }}
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="brand_truck">brand_truck</label>
                    <input
                        type="text"
                        id="brand_truck"
                        name="brand_truck"
                        placeholder="brand_truck"
                        value={brand_truck || ""}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="license_plate">license_plate</label>
                    <input
                        type="text"
                        id="license_plate"
                        name="license_plate"
                        placeholder="license_plate"
                        value={license_plate || ""}
                        onChange={handleInputChange}
                    />

                    {/* <label htmlFor="payment">Payment</label>
                    <select class="custom-select" id="payment" type="text" name="payment" value={payment || ""} onChange={handleInputChange}>
                        <option selected>Choose...</option>
                        <option className="padding" value="Due">Due</option>
                        <option className="success" value="waiting for payment">waiting for payment</option>
                        <option className="success" value="paid">paid</option>
                        <option className="cancel" value="refunded">refunded</option>
                    </select> */}
                    {/* <label htmlFor="status">Status</label>
                    <select class="custom-select" id="status" type="text" name="status" value={status || ""} onChange={handleInputChange}>
                        <option selected>Choose...</option>
                        <option className="padding" value="Pending">Pending</option>
                        <option className="success" value="Complate">Complate</option>
                        <option className="cancel" value="Cancel">Cancel</option>
                    </select> */}
                    <label htmlFor="Container_name">Container_name</label>
                    <input
                        type="text"
                        id="Container_name"
                        name="Container_name"
                        placeholder="Container_name"
                        value={Container_name || ""}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="Container_type">Container_type</label>
                    <input
                        type="text"
                        id="Container_type"
                        name="Container_type"
                        placeholder="Container_type"
                        value={Container_type || ""}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="date">date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        placeholder="date"
                        value={date || ""}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="date1">date1</label>
                    <input
                        type="date"
                        id="date1"
                        name="date1"
                        placeholder="date1"
                        value={date1 || ""}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="time">time</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        placeholder="time"
                        value={time || ""}
                        onChange={handleInputChange}
                    />
                    <div>
                        <input type="submit" value={id ? "Update" : "Save"} />
                        < ToastContainer />
                    </div>
                    <Link to="/WorkOrder">
                        <input type="button" value="Go Back" />
                    </Link>
                </form>
            </div>
        </main>
    )
}

export default EditOrder;