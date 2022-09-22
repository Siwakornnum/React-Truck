import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./costingEdit.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const initialState = {
    brand_truck: "",
    cost_price: "",
    selling_price: "",
    oil_cost_price: "",

}

const CostEdit = () =>
{
    const [state, setState] = useState(initialState);

    const { brand_truck, cost_price, selling_price, oil_cost_price } = state;

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() =>
    {
        axios
            .get(`http://localhost:3001/calculed/${id}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id])


    const handleSubmit = (e) =>
    {

        e.preventDefault();
        if (!brand_truck || !cost_price || !selling_price || !oil_cost_price) {
            // alert("Please provide value into each input field");
            // toast("Please provide value into each input field");
            toast.warning("Please provide value into each input field");
            console.log("please")
        } else {
            if (!id) {
                console.log("complate")
                axios.post("http://localhost:3001/calculed", {
                    brand_truck,
                    cost_price,
                    selling_price,
                    oil_cost_price
                }).then(() =>
                {
                    setState({ brand_truck: "", cost_price: "", selling_price: "", oil_cost_price: "" })
                }).catch((err) => toast.error(err.response.data));
                toast.success("Contact Added");
            } else {
                console.log("complate")
                axios.put(`http://localhost:3001/calculed/${id}`, {
                    brand_truck,
                    cost_price,
                    selling_price,
                    oil_cost_price
                }).then(() =>
                {
                    setState({ brand_truck: "", cost_price: "", selling_price: "", oil_cost_price: "" })
                }).catch((err) => toast.error(err.response.data));
                toast.success("Contact Updated Successfully");
            }

            setTimeout(() => navigate("/Calculation/Costing"), 5000);
        }
    };

    const handleInputChange = (e) =>
    {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
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
            <div >
                <form style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: "center"
                }}
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="brand_truck">brand truck</label>
                    {/* <input
                        type="text"
                        id="brand_truck"
                        name="brand_truck"
                        placeholder=" brand truck"
                        value={brand_truck || ""}
                        onChange={handleInputChange}
                    /> */}
                    <select class="form-select" aria-label="Default select example" id="brand_truck" type="text" name="brand_truck" value={brand_truck || ""} onChange={handleInputChange} >
                        <option selected>Brand Truck...</option>
                        <option >ISUZU</option>
                        <option >HINO</option>
                        <option >SCANIA</option>
                        <option >VOLVO</option>
                    </select>
                    <label htmlFor="cost_price">cost price</label>
                    <input
                        type="number"
                        // ref={selectFile}
                        id="cost_price"
                        name="cost_price"
                        placeholder="cost_price"
                        value={cost_price || ""}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="selling_price">selling price</label>
                    <input
                        type="number"
                        id="selling_price"
                        name="selling_price"
                        placeholder="selling_price"
                        value={selling_price || ""}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="oil_cost_price">oil cost price</label>
                    <input
                        type="number"
                        id="oil_cost_price"
                        name="oil_cost_price"
                        placeholder="oil_cost_price"
                        value={oil_cost_price || ""}
                        onChange={handleInputChange}
                    />

                    <div>
                        <input type="submit" value={id ? "Update" : "Save"} />
                        < ToastContainer />
                    </div>
                    <Link to="/Calculation/Costing">
                        <input type="button" value="Go Back" />
                    </Link>
                </form>
            </div>
        </main>



    )
}

export default CostEdit;