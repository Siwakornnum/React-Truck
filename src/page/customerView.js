import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./customerView.css";

const CustomerView = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);
  return (
    <div>
      <main>
        {/* <h2>Accident View</h2> */}
        <div className="card">
          <div className="card-header">
            <p>Customer Details</p>
          </div>
          <div className="container">
            <strong>ID : </strong>
            <span>{id}</span>
            <br />
            <br />
            <strong>Name : </strong>
            <span>{user.firstName + "  " + user.lastName}</span>
            <br />
            <br />
            <strong>Position : </strong>
            <span>{user.position}</span>
            <br />
            <br />
            <strong>Email : </strong>
            <span>{user.email}</span>
            <br />
            <br />
            <strong>Address : </strong>
            <span>{user.address}</span>
            <br />
            <br />
            <strong>Tel : </strong>
            <span>{user.tel}</span>
            <br />
            <br />
            <strong>Username : </strong>
            <span>{user.userId}</span>
            <br />
            <br />
            <Link to="/Customer">
              <div className="btn btn-edit">Go Back</div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerView;
