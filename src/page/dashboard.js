import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import _ from "lodash";

const pageSize = 4;
const Dashboard = () => {
  // <=================== Order =====================================>
  const [dashboardList, setdashboardListList] = useState([]);

  const loaddashboardList = async () => {
    const response = await axios.get("http://localhost:3001/ordercustomer");
    setdashboardListList(response.data);
    setPaginated(_(response.data).slice(0).take(pageSize).value()); //Pagecount
  };

  useEffect(() => {
    loaddashboardList();
  }, []);

  const total = dashboardList.length;
  let complate = dashboardList.filter(function (e) {
    return e.status === "Complete";
  });
  const total1 = complate.length;
  let Pending = dashboardList.filter(function (e) {
    return e.status === "Pending";
  });
  const total2 = Pending.length;

  // <=================== End of order =====================================>

  // <===================  truck =====================================>

  const [truckList, settruckList] = useState([]);

  const loadtruck = async () => {
    const response = await axios.get("http://localhost:3001/truck");
    settruckList(response.data);
  };

  useEffect(() => {
    loadtruck();
  }, []);

  const totalTruck = truckList.length;

  // <=================== end of truck =====================================>

  // <===================  customer =====================================>

  const [customerList, setcustomerList] = useState([]);

  const loadcustomer = async () => {
    const response = await axios.get("http://localhost:3001/user");
    setcustomerList(response.data);
  };

  useEffect(() => {
    loadcustomer();
  }, []);

  const totalCustomer = customerList.length;

  // <=================== end of customer =====================================>

  // <===================  accident =====================================>

  const [accidentList, setaccidentList] = useState([]);

  const loadaccident = async () => {
    const response = await axios.get("http://localhost:3001/accident");
    setaccidentList(response.data);
  };

  useEffect(() => {
    loadaccident();
  }, []);

  const totalaccident = accidentList.length;

  // <=================== end of accident =====================================>

  // <=================== Input Search =====================================>
  const [value, setValue] = useState("");
  const [dataSource, setDataSource] = useState(dashboardList);
  const [tableFilter, setTableFilter] = useState([]);

  const filterData = (e) => {
    if (e.target.value != "") {
      setValue(e.target.value);
      const filterTable = dashboardList.filter((o) =>
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

  // <=================== Page Count =====================================>
  const [paginated, setPaginated] = useState(dashboardList); //Pagecount
  const pageCount = dashboardList
    ? Math.ceil(dashboardList.length / pageSize)
    : 0;
  if (pageCount === 1) return null;
  // <=================== END OF Page Count =====================================>

  return (
    <div>
      <main>
        <h1>Dashboard</h1>
        {/* <------------------------ Body --------------------------> */}
        {/* <div className="date">
                    <input type="date" />
                </div> */}
        <div className="insights">
          <div className="order">
            <span class="bi bi-clipboard-data"></span>
            <div className="middle">
              <div className="left">
                <h3>Total Order</h3>
                <h1>{total}</h1>
              </div>
              <div className="chart">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div className="number">
                  <p>100%</p>
                </div>
              </div>
            </div>
            <small className="text-muted"></small>
          </div>
          {/* <------------------------ End of Order --------------------------> */}
          <div className="completeOrder">
            <span class="bi bi-check-lg"></span>
            <div className="middle">
              <div className="left">
                <h3>Complete Order</h3>
                <h1>{total1}</h1>
              </div>
              <div className="chart">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div className="number">
                  <p>80%</p>
                </div>
              </div>
            </div>
            <small className="text-muted"></small>
          </div>
          {/* <------------------------ End of Complete Order --------------------------> */}
          <div className="pendingOrder">
            <span class="bi bi-hourglass-split"></span>
            <div className="middle">
              <div className="left">
                <h3>Pending Order</h3>
                <h1>{total2}</h1>
              </div>
              <div className="chart">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div className="number">
                  <p>20%</p>
                </div>
              </div>
            </div>
            <small className="text-muted"></small>
          </div>
          {/* <------------------------ End of Complete Order --------------------------> */}
        </div>
        {/* <------------------------ End of Insights --------------------------> */}
        <div className="recent-orders">
          <h2>Recent Order</h2>
          <table className="table3">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Quantity</th>
                <th>Payment</th>
                <th>Status</th>
                {/* <th>location</th> */}
              </tr>
            </thead>
            <tbody>
              {value.length > 0
                ? tableFilter.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.firstName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.payment}</td>
                        <td className={`${item.status}`}>{item.status}</td>
                        <td>
                          <Link to={`/orderView/${item.id}`}>
                            <button className="btn btn-view">View</button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                : paginated.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.firstName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.payment}</td>
                        <td className={`${item.status}`}>{item.status}</td>
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
          <a href="/Order">Show All</a>
        </div>
      </main>
      {/*  <------------------------------ END OF MAIN --------------------------->  */}
      <div className="right">
        <div className="top">
          {/* <div className="profile">
                        <div className="info">
                            <p>Hey, <b>Siwa</b></p>
                            <small className="text-muted">Admin</small>
                        </div>
                        <div className="profile-photo">
                            <img src={profile} />
                        </div>
                    </div> */}
        </div>
        {/* <----- END OF TOP ----> */}

        {/* <-------------------------------- END OF UPDATE ------------------> */}
        <div className="analytics">
          <h2>Analytics</h2>
          <div className="item truck">
            <div className="icon">
              <i class="bi bi-truck"></i>
            </div>
            <div className="right2">
              <h3>TRUCK</h3>
              <small className="text-muted">Last 24 Hours</small>
            </div>

            <h3 className="text1">{totalTruck}</h3>
          </div>
          <div className="item employee">
            <div className="icon">
              <i class="bi bi-person"></i>
            </div>
            <div className="right2">
              <h3>CUSTOMER</h3>
              <small className="text-muted">Last 24 Hours</small>
            </div>

            <h3 className="text1">{totalCustomer}</h3>
          </div>
          <div className="item accident">
            <div className="icon">
              <i class="bi bi-heart-pulse"></i>
            </div>
            <div className="right2">
              <h3>ACCIDENT</h3>
              <small className="text-muted">Last 24 Hours</small>
            </div>
            <h3 className="text1">{totalaccident}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
