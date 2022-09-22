import "./costing.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import _ from "lodash";

const Costing = () => {
  var formatter = new Intl.NumberFormat({
    style: "currency",
    currency: "THB",
  });
  const [calculedList, setcalculedrList] = useState([]);

  const loadcalculed = async () => {
    const response = await axios.get("http://localhost:3001/calculed");
    setcalculedrList(response.data);
    // setPaginated(_(response.data).slice(0).take(pageSize).value()) //Pagecount
  };

  useEffect(() => {
    loadcalculed();
    // setPaginated(_(response.data).slice(0).take(pageSize).value())
  }, []);

  const deleteContact = (id) => {
    if (
      window.confirm(
        "Are you sure that you wanted to delete that ordercustomer ?"
      )
    ) {
      axios.delete(`http://localhost:3001/calculed/${id}`);
      toast.success("Cost Deleted Succesfully");
      <ToastContainer />;
      setTimeout(() => loadcalculed(), 500);
    }
  };

  // <=================== Input Search =====================================>
  const [value, setValue] = useState("");
  const [dataSource, setDataSource] = useState(calculedList);
  const [tableFilter, setTableFilter] = useState([]);

  const filterData = (e) => {
    if (e.target.value != "") {
      setValue(e.target.value);
      const filterTable = calculedList.filter((o) =>
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
        <h1>Order</h1>

        {/* <------------------------ Body --------------------------> */}

        <div className="recent-orders">
          <h2>Recent Order</h2>
          <form>
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  className="form-control buttom1"
                  placeholder="Search.. Brand Truck "
                  value={value}
                  onChange={filterData}
                />
              </div>
              <div class="col-2">
                <Link className="buttonAddAccident" to="/addCost">
                  <button className="btn btn-content">Add Cost</button>
                </Link>
              </div>
            </div>
          </form>
          <table className="table1">
            <thead>
              <tr>
                <th>ID</th>
                <th>brand truck</th>
                <th>cost price</th>
                <th>selling price</th>
                <th>oil cost price</th>
              </tr>
            </thead>
            <tbody>
              {value.length > 0
                ? tableFilter.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.brand_truck}</td>
                        <td>{formatter.format(item.cost_price)} THB</td>
                        <td>{formatter.format(item.selling_price)} THB</td>
                        <td>{formatter.format(item.oil_cost_price)} THB/L</td>
                        <td>
                          <Link to={`/EditCost/${item.id}`}>
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
                : calculedList.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.brand_truck}</td>
                        <td>{formatter.format(item.cost_price)} THB</td>
                        <td>{formatter.format(item.selling_price)} THB</td>
                        <td>{formatter.format(item.oil_cost_price)} THB/L</td>
                        <td>
                          <Link to={`/EditCost/${item.id}`}>
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
export default Costing;
