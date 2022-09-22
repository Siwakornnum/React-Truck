import "./accident.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import _ from "lodash";

const pageSize = 10; //Pagecount
const Accident = () => {
  const reformatDate = (datetime) =>
    datetime.getDate() +
    "-" +
    (datetime.getMonth() + 1) +
    "-" +
    datetime.getFullYear();

  const [accidentList, setAccidentList] = useState([]);
  const [paginated, setPaginated] = useState(accidentList); //Pagecount
  const [currentPage, setCurrentPage] = useState(1); //Pagecount
  const loadAccident = async () => {
    const response = await axios.get("http://localhost:3001/Accident");
    setAccidentList(response.data);
    setPaginated(_(response.data).slice(0).take(pageSize).value()); //Pagecount
  };

  useEffect(() => {
    loadAccident();
    // setPaginated(_(response.data).slice(0).take(pageSize).value())
  }, []);

  const deleteContact = (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that Accident ?")
    ) {
      axios.delete(`http://localhost:3001/Accident/${id}`);
      toast.success("Accident Deleted Succesfully");
      <ToastContainer />;
      setTimeout(() => loadAccident(), 500);
    }
  };
  // <=================== Input Search =====================================>
  const [value, setValue] = useState("");
  const [dataSource, setDataSource] = useState(accidentList);
  const [tableFilter, setTableFilter] = useState([]);

  const filterData = (e) => {
    if (e.target.value != "") {
      setValue(e.target.value);
      const filterTable = accidentList.filter((o) =>
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
  const pageCount = accidentList
    ? Math.ceil(accidentList.length / pageSize)
    : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginated = _(accidentList).slice(startIndex).take(pageSize).value();
    setPaginated(paginated);
  };
  // <=================== END OF Page Count =====================================>
  return (
    <div>
      <main>
        <h1>ACCIDENT</h1>
        {/* <------------------------ Body --------------------------> */}
        <div className="recent-accident">
          <form>
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  className="form-control buttom1"
                  placeholder="Search.. Accident Name "
                  value={value}
                  onChange={filterData}
                />
              </div>
              <div class="col-2">
                <Link className="buttonAddAccident" to="/addAccident">
                  <button className="btn btn-content">Add Accident</button>
                </Link>
              </div>
            </div>
          </form>

          <table className="table2">
            <thead>
              <tr>
                <th>Accident ID</th>
                <th>Accident Name</th>
                <th>Accident Details</th>
                <th>Old Car Registration</th>
                <th>New Car Registration</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {value.length > 0
                ? tableFilter.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.Accident_Name}</td>
                        <td>{item.Accident_Details}</td>
                        <td>{item.Old_Car_Registration}</td>
                        <td>{item.New_Car_Registration}</td>
                        <td>{item.village_name}</td>
                        <td>{reformatDate(new Date(item.date))}</td>
                        <td>{item.time} น.</td>
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
                          <Link to={`/view/${item.id}`}>
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
                        <td>{item.Accident_Name}</td>
                        <td>{item.Accident_Details}</td>
                        <td>{item.Old_Car_Registration}</td>
                        <td>{item.New_Car_Registration}</td>
                        <td>{item.village_name}</td>
                        <td>{reformatDate(new Date(item.date))}</td>
                        <td>{item.time} น.</td>
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
                          <Link to={`/view/${item.id}`}>
                            <button className="btn btn-view">View</button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              {pages.map((page) => (
                <li
                  className={
                    page === currentPage ? "page-item active" : "page-item"
                  }
                >
                  <a className="page-link" onClick={() => pagination(page)}>
                    {page}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
      {/*  <------------------------------ END OF MAIN --------------------------->  */}
    </div>
  );
};
export default Accident;
