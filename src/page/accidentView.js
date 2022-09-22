import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./accidentView.css";

const AccidentView = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/Accident/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);
  return (
    <div>
      <main>
        {/* <h2>Accident View</h2> */}
        <div className="card">
          <div className="card-header">
            <p>Accident Details</p>
          </div>
          <div className="container">
            <div class="row">
              <div class="col">
                <strong>ID </strong>
                <input
                  type="text"
                  class="form-control"
                  placeholder={id}
                  disabled={true}
                />
                <br />
                <br />
                <h2>NAME / DETAILS ACCIDENT</h2>
                <strong>Accident Name </strong>
                <input
                  type="text"
                  class="form-control"
                  placeholder={user.Accident_Name}
                  disabled={true}
                />
                <br />
                <br />
                <h2>OLD / NEW REGISTRATION</h2>
                <strong>Old Car Registration </strong>
                <input
                  type="text"
                  class="form-control"
                  placeholder={user.Old_Car_Registration}
                  disabled={true}
                />
                <br />
                <br />
                <h2>DATE / TIME</h2>
                <strong>Date</strong>
                <input
                  type="text"
                  class="form-control"
                  placeholder={user.date}
                  disabled={true}
                />
                <br />
                <br />
                <h2>LOCATION</h2>
                <strong>Village Name</strong>
                <input
                  type="text"
                  class="form-control"
                  placeholder={user.village_name}
                  disabled={true}
                />
                <strong>District</strong>
                <input
                  type="text"
                  class="form-control"
                  placeholder={user.district}
                  disabled={true}
                />
                <strong>Province</strong>
                <input
                  type="text"
                  class="form-control"
                  placeholder={user.province}
                  disabled={true}
                />
                <strong>Country</strong>
                <input
                  type="text"
                  class="form-control"
                  placeholder={user.country}
                  disabled={true}
                />
              </div>
              <div class="col">
                <div className="qq1">
                  <strong>Accident Details </strong>
                  <input
                    type="text"
                    class="form-control"
                    placeholder={user.Accident_Details}
                    disabled={true}
                  />
                </div>
                <div className="qq2">
                  <strong>New Car Registration </strong>
                  <input
                    type="text"
                    class="form-control"
                    placeholder={user.New_Car_Registration}
                    disabled={true}
                  />
                </div>
                <div className="qq2">
                  <strong>Time</strong>
                  <input
                    type="text"
                    class="form-control"
                    placeholder={user.time}
                    disabled={true}
                  />
                </div>
                <div className="qq2">
                  <strong>Road</strong>
                  <input
                    type="text"
                    class="form-control"
                    placeholder={user.road}
                    disabled={true}
                  />
                  <strong>Sub District</strong>
                  <input
                    type="text"
                    class="form-control"
                    placeholder={user.sub_district}
                    disabled={true}
                  />
                  <strong>ZIP Code</strong>
                  <input
                    type="text"
                    class="form-control"
                    placeholder={user.zip_code}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
            <div className="qq3">
              <Link to="/Accident">
                <div className="btn btn-edit">Go Back</div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccidentView;
