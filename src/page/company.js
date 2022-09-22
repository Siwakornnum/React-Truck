import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import _ from "lodash";
import "./company.css";

const Company = () => {
  const reformatDate = (datetime) =>
    datetime.getDate() +
    "-" +
    (datetime.getMonth() + 1) +
    "-" +
    datetime.getFullYear();
  const [companyList, setCompanyList] = useState([]);

  const loadCompany = async () => {
    const response = await axios.get("http://localhost:3001/company");
    setCompanyList(response.data);
    // setPaginated(_(response.data).slice(0).take(pageSize).value()) //Pagecount
  };

  useEffect(() => {
    loadCompany();
    // setPaginated(_(response.data).slice(0).take(pageSize).value())
  }, []);

  const deleteContact = (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that company ?")
    ) {
      axios.delete(`http://localhost:3001/company/${id}`);
      toast.success("Accident Deleted Succesfully");
      <ToastContainer />;
      setTimeout(() => loadCompany(), 500);
    }
  };

  return (
    <div>
      <main className="main1">
        <h1>Company</h1>
        {/* <------------------------ Body --------------------------> */}
        {companyList.map((item, index) => {
          return (
            <form className="recent-company">
              <Link to={`/companyEdit/${item.id}`}>
                <button className="btn btn-edit">Edit Company</button>
              </Link>
              <br />
              <h2>General Information</h2>

              <div class="row">
                <div class="col">
                  <span>Company Name</span>
                  <input
                    disabled="true"
                    type="text"
                    class="form-control"
                    placeholder={item.company_name}
                  />
                  <br />
                  <br />
                  <span>Business type</span>
                  <input
                    disabled="true"
                    type="text"
                    class="form-control"
                    placeholder={item.subsidiary}
                  />
                  <br />
                  <br />
                  <span>Telephone Number</span>
                  <input
                    disabled="true"
                    type="text"
                    class="form-control"
                    placeholder={item.telephone_number}
                  />
                  <br />
                  <br />
                  <br />
                  <h2>Address</h2>
                  <span>Village name</span>
                  <input
                    disabled="true"
                    type="text"
                    class="form-control"
                    placeholder={item.village_name}
                  />
                  <br />
                  <br />
                  <span>District</span>
                  <input
                    disabled="true"
                    type="text"
                    class="form-control"
                    placeholder={item.district}
                  />
                  <br />
                  <br />
                  <span>Province</span>
                  <input
                    disabled="true"
                    type="text"
                    class="form-control"
                    placeholder={item.province}
                  />
                  <br />
                  <br />
                  <span>Country</span>
                  <input
                    disabled="true"
                    type="text"
                    class="form-control"
                    placeholder={item.country}
                  />
                </div>
                <div class="col">
                  <span>Website</span>
                  <input
                    disabled="true"
                    type="text"
                    class="form-control"
                    placeholder={item.website}
                  />
                  <br />
                  <br />
                  <span>Founding Date</span>
                  <input
                    disabled="true"
                    type="text"
                    class="form-control"
                    placeholder={reformatDate(
                      new Date(item.year_of_establishment)
                    )}
                  />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <span>Road</span>
                  <input
                    disabled="true"
                    type="text"
                    class="form-control"
                    placeholder={item.road}
                  />
                  <br />
                  <br />
                  <span>Sub District</span>
                  <input
                    disabled="true"
                    type="text"
                    class="form-control"
                    placeholder={item.sub_district}
                  />
                  <br />
                  <br />
                  <span>ZIP Code</span>
                  <input
                    disabled="true"
                    type="text"
                    class="form-control"
                    placeholder={item.zip_code}
                  />
                </div>
              </div>
            </form>
          );
        })}
      </main>
      {/*  <------------------------------ END OF MAIN --------------------------->  */}
    </div>
  );
};
export default Company;
