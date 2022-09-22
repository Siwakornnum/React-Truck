import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./orderView.css";

const OrderView = () => {
  const [user, setUser] = useState({});

  const reformatDate = (datetime) =>
    datetime.getDate() +
    "-" +
    (datetime.getMonth() + 1) +
    "-" +
    datetime.getFullYear();

  var formatter = new Intl.NumberFormat({
    style: "currency",
    currency: "THB",
  });

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/ordercustomer/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);

  return (
    <div>
      <main>
        {/* <h2>Accident View</h2> */}
        <div className="card">
          <div className="card-header">
            <p>Order Details</p>
          </div>
          <div class="container">
            <div class="row">
              <div class="col">
                <span>ID </span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={id}
                />
                <span>TEL </span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.tel}
                />
                <br />
                <br />
                <h2>PAYMENT / STATUS</h2>
                <span>Payment </span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.payment}
                />
                <br />
                <br />
                <h2>DISTANCE / PRICE</h2>
                <span>DISTANCE </span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.distance}
                />
                <br />
                <br />
                <h2>DATE / TIME</h2>
                <span>DATE </span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={reformatDate(new Date(user.date))}
                />

                <br />
                <br />
                <h2>BRAND / CAR REGISTRATION </h2>
                <span>BRAND TRUCK </span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.names}
                />
                <span>TYPE TRUCK </span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.typetruck}
                />
                <br />
                <br />
                <h2>CONTAINER / TYPE </h2>
                <span>CONTAINER NAME </span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.container}
                />

                <br />
                <br />
              </div>
              <div class="col">
                <span>Customer Name</span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.firstName}
                />
                <span>Quantity</span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.quantity}
                />

                <br />
                <br />
                <br />
                <div className="tt1">
                  <span>STATUS </span>
                  <input
                    disabled="true"
                    type="text"
                    className="form-control "
                    placeholder={user.status}
                  />
                </div>

                <br />
                <br />
                <div className="tt2">
                  <span>PRICE </span>
                  <input
                    disabled="true"
                    type="text"
                    className="form-control "
                    placeholder={formatter.format(user.price)}
                  />
                  <br />
                  <br />
                  <br />
                  <h2></h2>
                  <span>TIME </span>
                  <input
                    disabled="true"
                    type="text"
                    className="form-control "
                    placeholder={user.time}
                  />
                </div>

                <h2></h2>
                <div className="tt3">
                  <span>CAR REGISTRATION</span>
                  <input
                    disabled="true"
                    type="text"
                    className="form-control "
                    placeholder={user.car_registration}
                  />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <h2></h2>
                  <span>TYPE CONTAINER</span>
                  <input
                    disabled="true"
                    type="text"
                    className="form-control "
                    placeholder={user.container_type}
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <h2>START ROUTE</h2>
                <span>VILLAGE NAME</span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.village_name}
                />
                <span>ROAD</span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.road}
                />
                <span>DISTRICT </span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.district}
                />
                <span>SUB DISTRICT </span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.sub_district}
                />
                <span>PROVINCE</span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.province}
                />
                <span>POSTCODE</span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.zip_code}
                />
                <span>COUNTRY</span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.country}
                />
              </div>
              <div class="col">
                <h2>END ROUTE</h2>
                <span>VILLAGE NAME</span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.village_name1}
                />
                <span>ROAD</span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.road1}
                />
                <span>DISTRICT </span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.district1}
                />
                <span>SUB DISTRICT </span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.sub_district1}
                />
                <span>PROVINCE</span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.province1}
                />
                <span>POSTCODE</span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.zip_code1}
                />
                <span>COUNTRY</span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control "
                  placeholder={user.country1}
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <br />
                <h2>TRANSFER RECEIPT</h2>
                <br />

                <img
                  src={"http://localhost:3001/imgpayment/" + user.id}
                  width="400"
                  height="250"
                ></img>
              </div>
            </div>
          </div>
          <div className="buuton10">
            <Link to="/Order">
              <div className="btn btn-edit">Go Back</div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderView;
