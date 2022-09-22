import "./containerData.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import _ from "lodash";
import React, { useState, useRef, useEffect } from "react";

const ContainerData = () => {
  const [containerList, setcontainerList] = useState([]);

  const loadcontainer = async () => {
    const response = await axios.get("http://localhost:3001/container");
    setcontainerList(response.data);
    // setPaginated(_(response.data).slice(0).take(pageSize).value()) //Pagecount
  };

  useEffect(() => {
    loadcontainer();
    // setPaginated(_(response.data).slice(0).take(pageSize).value())
  }, []);

  const deleteContact = (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that container ?")
    ) {
      axios.delete(`http://localhost:3001/container/${id}`);
      toast.success("container Deleted Succesfully");
      <ToastContainer />;
      setTimeout(() => loadcontainer(), 500);
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
  const [dataSource, setDataSource] = useState(containerList);
  const [tableFilter, setTableFilter] = useState([]);

  const filterData = (e) => {
    if (e.target.value != "") {
      setValue(e.target.value);
      const filterTable = containerList.filter((o) =>
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
        <h1>Container Data</h1>
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
              <h2 className="accordion-title">Container </h2>
            </button>
            <div className="accordion-content">
              <div className="accordion-text">
                <form>
                  <div class="row">
                    <div class="col">
                      <input
                        type="text"
                        className="form-control buttom1"
                        placeholder="Search..  Container Name"
                        value={value}
                        onChange={filterData}
                      />
                    </div>
                    <div class="col-2">
                      <Link className="buttonAddAccident" to="/addcontainer">
                        <button className="btn btn-content">
                          Add Container
                        </button>
                      </Link>
                    </div>
                  </div>
                </form>
                <table className="table1">
                  <thead>
                    <tr>
                      <th>Container ID</th>
                      <th>Container_name</th>
                      <th>Container_image</th>
                      <th>Container_type</th>
                      <th>height</th>
                      <th>width</th>
                      <th>length</th>
                      <th>Payload</th>
                    </tr>
                  </thead>
                  <tbody>
                    {value.length > 0
                      ? tableFilter.map((item, index) => {
                          return (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.Container_name}</td>
                              <td>
                                <img
                                  src={
                                    "http://localhost:3001/imageuploadcontainer/" +
                                    item.id
                                  }
                                  alt="img"
                                />
                              </td>
                              <td>{item.Container_type}</td>
                              {/* <td className={`${item.status}`}>{item.status}</td> */}
                              <td>{item.height}</td>
                              <td>{item.width} </td>
                              <td>{item.length}</td>
                              <td>{item.Payload}</td>
                              <td>
                                <Link to={`/Editcontainer/${item.id}`}>
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
                      : containerList.map((item, index) => {
                          return (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.Container_name}</td>
                              <td>
                                <img
                                  src={
                                    "http://localhost:3001/imageuploadcontainer/" +
                                    item.id
                                  }
                                  alt="img"
                                />
                              </td>
                              <td>{item.Container_type}</td>
                              {/* <td className={`${item.status}`}>{item.status}</td> */}
                              <td>{item.height}</td>
                              <td>{item.width} </td>
                              <td>{item.length}</td>
                              <td>{item.Payload}</td>
                              <td>
                                <Link to={`/Editcontainer/${item.id}`}>
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
export default ContainerData;
