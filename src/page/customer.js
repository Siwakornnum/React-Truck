import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./customer.css";
import _ from "lodash";

const Customer = () => {
  // <=================== connect mysql =====================================>
  const [customerList, setcustomerList] = useState([]);
  const loadcustomer = async () => {
    const response = await axios.get("http://localhost:3001/user");
    setcustomerList(response.data);
  };

  useEffect(() => {
    loadcustomer();
  }, []);

  const deleteContact = (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that Accident ?")
    ) {
      axios.delete(`http://localhost:3001/user/${id}`);
      toast.success("Accident Deleted Succesfully");
      <ToastContainer />;
      setTimeout(() => loadcustomer(), 500);
    }
  };
  // <=================== END OF connect mysql =====================================>

  // <=================== Input Search =====================================>
  const [value, setValue] = useState("");
  const [dataSource, setDataSource] = useState(customerList);
  const [tableFilter, setTableFilter] = useState([]);

  const filterData = (e) => {
    if (e.target.value != "") {
      setValue(e.target.value);
      const filterTable = customerList.filter((o) =>
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
        <h1>Customer</h1>

        <div className="recent-customer">
          <form>
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  className="form-control buttom1"
                  placeholder="Search.. Customer"
                  value={value}
                  onChange={filterData}
                />
              </div>
              <div class="col-2">
                <Link to="/addCostomer">
                  <button className="btn btn-content">Add Customer</button>
                </Link>
              </div>
            </div>
          </form>

          <table className="table2">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>Position</th>
                <th>Email</th>
                <th>Address</th>
                <th>Tel</th>
              </tr>
            </thead>
            <tbody>
              {value.length > 0
                ? tableFilter.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          {item.firstName}+{item.lastName}
                        </td>
                        <td>{item.position}</td>
                        <td>{item.email}</td>
                        <td>{item.address} </td>
                        <td>{item.tel}</td>
                        <td>
                          <Link to={`/editCostomer/${item.id}`}>
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
                        <td>
                          <Link to={`/viewCosutomer/${item.id}`}>
                            <button className="btn btn-view">View</button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                : customerList.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          {item.firstName} {item.lastName}
                        </td>
                        <td>{item.position}</td>
                        <td>{item.email}</td>
                        <td>{item.address} </td>
                        <td>{item.tel}</td>
                        <td>
                          <Link to={`/editCostomer/${item.id}`}>
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
                        <td>
                          <Link to={`/viewCosutomer/${item.id}`}>
                            <button className="btn btn-view">View</button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </main>

      {/* <------------------------ Body --------------------------> */}

      {/*  <------------------------------ END OF MAIN --------------------------->  */}
    </div>
  );
};
export default Customer;
