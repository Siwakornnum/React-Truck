import React, { useState, useRef, useEffect } from "react";
import "./workOrder.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import _ from "lodash";

const WorkOrder = () => {
  const [workOrderList, setworkOrderList] = useState([]);

  const reformatDate = (datetime) =>
    datetime.getDate() +
    "-" +
    (datetime.getMonth() + 1) +
    "-" +
    datetime.getFullYear();

  const loadworkOrder = async () => {
    const response = await axios.get("http://localhost:3001/ordercustomer");
    setworkOrderList(response.data);
    // setPaginated(_(response.data).slice(0).take(pageSize).value()) //Pagecount
  };

  useEffect(() => {
    loadworkOrder();
    // setPaginated(_(response.data).slice(0).take(pageSize).value())
  }, []);

  const deleteContact = (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that workorder ?")
    ) {
      axios.delete(`http://localhost:3001/workorder/${id}`);
      toast.success("Accident Deleted Succesfully");
      <ToastContainer />;
      setTimeout(() => loadworkOrder(), 500);
    }
  };

  // <=================== Input Search =====================================>
  const [value, setValue] = useState("");
  const [dataSource, setDataSource] = useState(workOrderList);
  const [tableFilter, setTableFilter] = useState([]);

  const filterData = (e) => {
    if (e.target.value != "") {
      setValue(e.target.value);
      const filterTable = workOrderList.filter((o) =>
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
      <main>
        <h1>Work Order</h1>
        {/* <------------------------ Body --------------------------> */}
        <div className="recent-workorder">
          <h2>Recent Order</h2>
          <form>
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  className="form-control buttom1"
                  placeholder="Search"
                  value={value}
                  onChange={filterData}
                />
              </div>
              <div class="col-2">
                <Link className="buttonworkorder" to="/addWorkorder/">
                  <button className="btn btn-content">Add WorkOrder</button>
                </Link>
              </div>
            </div>
          </form>
          <table className="table3">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Brand Truck</th>
                <th>License Plate</th>
                <th>Container Name</th>
                <th>Container Type</th>
                <th>Date </th>
                <th>Time </th>
              </tr>
            </thead>
            <tbody>
              {value.length > 0
                ? tableFilter.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.names}</td>
                        <td>{item.car_registration}</td>
                        <td>{item.container}</td>
                        <td>{item.container_type}</td>
                        <td>{reformatDate(new Date(item.date))}</td>
                        <td>{item.time}</td>
                        <td>
                          <Link to={`/EditWorkorder/${item.id}`}>
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
                      </tr>
                    );
                  })
                : workOrderList.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.names}</td>
                        <td>{item.car_registration}</td>
                        <td>{item.container}</td>
                        <td>{item.container_type}</td>
                        <td>{reformatDate(new Date(item.date))}</td>
                        <td>{item.time}</td>
                        <td>
                          <Link to={`/EditWorkorder/${item.id}`}>
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
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </main>
      {/*  <------------------------------ END OF MAIN --------------------------->  */}
    </div>
  );
};
export default WorkOrder;
