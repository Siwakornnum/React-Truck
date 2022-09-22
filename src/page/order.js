import "./order.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import _ from "lodash";

const Order = () => {
  const [orderCustomerList, setOrderCustomerList] = useState([]);

  const reformatDate = (datetime) =>
    datetime.getDate() +
    "-" +
    (datetime.getMonth() + 1) +
    "-" +
    datetime.getFullYear();

  const reformatDateId = (datetime) =>
    datetime.getDate() +
    "" +
    (datetime.getMonth() + 1) +
    "" +
    datetime.getFullYear();

  var formatter = new Intl.NumberFormat({
    style: "currency",
    currency: "THB",
  });

  const loadOrderCustomer = async () => {
    const response = await axios.get("http://localhost:3001/ordercustomer");
    setOrderCustomerList(response.data);

    // setPaginated(_(response.data).slice(0).take(pageSize).value()) //Pagecount
  };

  useEffect(() => {
    loadOrderCustomer();
    // setPaginated(_(response.data).slice(0).take(pageSize).value())
  }, []);

  const deleteContact = (id) => {
    if (
      window.confirm(
        "Are you sure that you wanted to delete that ordercustomer ?"
      )
    ) {
      axios.delete(`http://localhost:3001/ordercustomer/${id}`);
      toast.success("Accident Deleted Succesfully");
      <ToastContainer />;
      setTimeout(() => loadOrderCustomer(), 500);
    }
  };

  // <=================== Input Search =====================================>
  const [value, setValue] = useState("");
  const [dataSource, setDataSource] = useState(orderCustomerList);
  const [tableFilter, setTableFilter] = useState([]);
  let search = orderCustomerList.filter(function (e) {
    return e.customerName;
  });
  const filterData = (e) => {
    if (e.target.value != "") {
      setValue(e.target.value);
      const filterTable = orderCustomerList.filter((o) =>
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
                  placeholder="Search.. Customer / quantity"
                  value={value}
                  onChange={filterData}
                />
              </div>
              <div class="col-2">
                <Link className="buttonAddAccident" to="/addOrder">
                  <button className="btn btn-content">Add Order</button>
                </Link>
              </div>
            </div>
          </form>
          <div class="collapse" id="collapseExample">
            <div class="card card-body">
              Some placeholder content for the collapse component. This panel is
              hidden by default but revealed when the user activates the
              relevant trigger.
            </div>
          </div>
          <table className="table1">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Quantity</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Total Price</th>
                <th>Date </th>
                <th>Time </th>
                <th>Tel </th>
              </tr>
            </thead>
            <tbody>
              {value.length > 0
                ? tableFilter.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          {reformatDateId(new Date(item.date))}
                          {item.id}
                        </td>
                        <td>{item.firstName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.payment}</td>
                        <td className={`${item.status}`}>{item.status}</td>
                        <td>{formatter.format(item.price)} THB</td>
                        <td>{reformatDate(new Date(item.date))}</td>
                        <td>{item.time} น.</td>
                        <td>{item.tel}</td>

                        <td>
                          <Link to={`/updateAccident/${item.id}`}>
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
                          <Link to={`/orderView/${item.id}`}>
                            <button className="btn btn-view">View</button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                : orderCustomerList.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          {reformatDateId(new Date(item.date))}
                          {item.id}
                        </td>
                        <td>{item.firstName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.payment}</td>
                        <td className={`${item.status}`}>{item.status}</td>
                        <td>{formatter.format(item.price)} THB</td>
                        <td>{reformatDate(new Date(item.date))}</td>
                        <td>{item.time} น.</td>
                        <td>{item.tel}</td>

                        <td>
                          <Link to={`/editOrder/${item.id}`}>
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
                          <Link to={`/orderView/${item.id}`}>
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
      {/*  <------------------------------ END OF MAIN --------------------------->  */}
    </div>
  );
};
export default Order;
