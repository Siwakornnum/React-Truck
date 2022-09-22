import React, { useState, useRef, useEffect } from "react";
import "./truckInformation.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import _ from "lodash";

const TruckInformation = (props) => {
  const [truckList, setTruckList] = useState([]);

  const loadtruck = async () => {
    const response = await axios.get("http://localhost:3001/truck");
    setTruckList(response.data);
    // setPaginated(_(response.data).slice(0).take(pageSize).value()) //Pagecount
  };

  useEffect(() => {
    loadtruck();
    // setPaginated(_(response.data).slice(0).take(pageSize).value())
  }, []);

  const deleteContact = (id) => {
    if (window.confirm("Are you sure that you wanted to delete that truck ?")) {
      axios.delete(`http://localhost:3001/truck/${id}`);
      toast.success("truck Deleted Succesfully");
      <ToastContainer />;
      setTimeout(() => loadtruck(), 500);
    }
  };

  // <===================================== Accordion ==============================>
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");

  const content = useRef(null);

  const toggleAccordion = () => {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(setActive === "active" ? "0px" : `max-content`);
  };
  // <===================================== END Accordion ==============================>

  // <=================== Input Search =====================================>
  const [value, setValue] = useState("");
  const [dataSource, setDataSource] = useState(truckList);
  const [tableFilter, setTableFilter] = useState([]);

  const filterData = (e) => {
    if (e.target.value != "") {
      setValue(e.target.value);
      const filterTable = truckList.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setTableFilter([...filterTable]);
    } else {
      setValue(e.target.value);
      setDataSource([...dataSource]);
    }
  };
  // <=================== END OF Input Search =====================================>

  return (
    <div>
      <main className="main1">
        <h1>Truck Information</h1>
        {/* <------------------------ Body --------------------------> */}
        <br />
        <br />
        <div className="recent-truck">
          {/* <h2>truck brand</h2> */}

          <div className="accordion-section">
            <button
              className={`accordion ${setActive}`}
              onClick={toggleAccordion}
            >
              <h2 className="accordion-title">Truck </h2>
            </button>
            <div className="accordion-content">
              <div className="accordion-text">
                <form>
                  <div class="row">
                    <div class="col">
                      <input
                        type="text"
                        className="form-control buttom1"
                        placeholder="Search.. Brand Truck"
                        value={value}
                        onChange={filterData}
                      />
                    </div>
                    <div class="col-2">
                      <Link className="buttonAddAccident" to="/truckAdd">
                        <button className="btn btn-content">
                          Add Accident
                        </button>
                      </Link>
                    </div>
                  </div>
                </form>
                <table className="table1">
                  <thead>
                    <tr>
                      <th>Truck ID</th>
                      <th>brand truck</th>
                      <th>piture_truck</th>
                      <th>truck_type</th>
                      <th>model_code</th>
                      <th>license_plate </th>
                      <th>total_weight </th>
                    </tr>
                  </thead>
                  <tbody>
                    {value.length > 0
                      ? tableFilter.map((item, index) => {
                          return (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.brand_truck}</td>
                              <td>
                                <img
                                  src={
                                    "http://localhost:3001/imageupload/" +
                                    item.id
                                  }
                                  alt="img"
                                />
                              </td>
                              {/* <td>{item.truck_type}</td> */}
                              {/* <td className={`${item.status}`}>{item.status}</td> */}
                              <td>{item.model_code}</td>
                              <td>{item.license_plate} </td>
                              <td>{item.total_weight}</td>
                              <td>
                                <Link to={`/truckEdit/${item.id}`}>
                                  <button className="btn btn-edit">Edit</button>
                                </Link>
                              </td>

                              <td>
                                <button
                                  className="btn btn-delete"
                                  onClick={() => deleteContact(item.id)}
                                >
                                  Delete
                                </button>
                                <ToastContainer />
                              </td>
                              {/* <td>
                                                        <Link to={`/orderView/${item.id}`}>
                                                            <button className='btn btn-view'>View</button>
                                                        </Link>
                                                    </td> */}
                            </tr>
                          );
                        })
                      : truckList.map((item, index) => {
                          return (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.brand_truck}</td>
                              <td>
                                <img
                                  src={
                                    "http://localhost:3001/imageupload/" +
                                    item.id
                                  }
                                  alt="img"
                                />
                              </td>
                              <td>{item.truck_type}</td>
                              {/* <td className={`${item.status}`}>{item.status}</td> */}
                              <td>{item.model_code}</td>
                              <td>{item.license_plate}</td>
                              <td>{item.total_weight}</td>
                              <td>
                                <Link to={`/truckEdit/${item.id}`}>
                                  <button className="btn btn-edit">Edit</button>
                                </Link>
                              </td>

                              <td>
                                <button
                                  className="btn btn-delete"
                                  onClick={() => deleteContact(item.id)}
                                >
                                  Delete
                                </button>
                                <ToastContainer />
                              </td>
                              {/* <td>
                                                            <Link to={`/orderView/${item.id}`}>
                                                                <button className='btn btn-view'>View</button>
                                                            </Link>
                                                        </td> */}
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/*  <------------------------------ END OF MAIN --------------------------->  */}
    </div>
  );
};
export default TruckInformation;
