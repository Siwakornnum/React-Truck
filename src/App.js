import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import SideMenu from "./components/sideMenu";
import Dashboard from "./page/dashboard";
import Order from "./page/order";
import Customer from "./page/customer";
import WorkOrder from "./page/workOrder";
import Calculation from "./page/calculation";
import CalculateRoute from "./calculatePage/calculateRoute";
import Costing from "./calculatePage/costing";
import Company from "./page/company";
import Accident from "./page/accident";
import UserRights from "./page/userRights";
import CarInformation from "./page/carInformation";
import TruckInformation from "./carPage/truckInformation";
import ContainerData from "./carPage/containerData";
import Document from "./page/document";
import Invoice from "./documentPage/invoice";
import Accidentt from "./documentPage/accidentt";
import WorkOrderr from "./documentPage/workOrderr";
import Setting from "./page/setting";
import AddAccident from "./page/addAccident";
import AccidentView from "./page/accidentView";
import CustomerEdit from "./page/customerEdit";
import CustomerView from "./page/customerView";
import EditOrder from "./page/orderEdit";
import OrderView from "./page/orderView";
import CompanyEdit from "./page/companyEdit";
import TruckEdit from "./carPage/truckEdit";
import EditWorkOrder from "./page/orderEdit";
import Login from "./page/login";
import ContainerEdit from "./carPage/containerEdit";
import CostEdit from "./calculatePage/costingEdit";

function App() {
  const adminUser = {
    username: "admin",
    password: "1234",
  };

  const [user, setuser] = useState({ name: "", username: "" });
  const [error, setError] = useState("");

  const Login1 = (details) => {
    console.log(details);
    if (
      details.username == adminUser.username &&
      details.password == adminUser.password
    ) {
      console.log("Login");
      setuser({
        username: details.username,
      });
    } else {
      console.log("Details do not match");
      alert("Please enter your username and password or enter it correctly.");
    }
  };

  const Logout = () => {
    console.log(Logout);
  };

  const [inactive, setInactive] = useState(false);
  return (
    <div className="App">
      {user.username != "" ? (
        <Router>
          <SideMenu
            onCollapse={(inactive) => {
              console.log(inactive);
              setInactive(inactive);
            }}
          />
          <div className={`container ${inactive ? "inactive" : ""}`}>
            <Routes>
              <Route path="/Dashboard" element={<Dashboard />}></Route>
              <Route path="/Order" element={<Order />}></Route>
              <Route path="/Customer" element={<Customer />}></Route>
              <Route path="/WorkOrder" element={<WorkOrder />}></Route>
              <Route path="/Calculation" element={<Calculation />}></Route>
              <Route
                path="/Calculation/CalculateRoute"
                element={<CalculateRoute />}
              ></Route>
              <Route path="/Calculation/Costing" element={<Costing />}></Route>
              <Route path="/Company" element={<Company />}></Route>
              <Route path="/Accident" element={<Accident />}></Route>
              <Route path="/UserRights" element={<UserRights />}></Route>
              <Route
                path="/CarInformation"
                element={<CarInformation />}
              ></Route>
              <Route
                path="/CarInformation/TruckInformation"
                element={<TruckInformation />}
              ></Route>
              <Route
                path="/CarInformation/ContainerData"
                element={<ContainerData />}
              ></Route>
              <Route path="/Document" element={<Document />}></Route>
              <Route path="/Document/invoice" element={<Invoice />}></Route>
              <Route
                path="/Document/WorkOrder"
                element={<WorkOrderr />}
              ></Route>
              <Route path="/Document/Accident" element={<Accidentt />}></Route>
              <Route path="/Setting" element={<Setting />}></Route>
              <Route path="/addAccident" element={<AddAccident />}></Route>
              <Route
                path="/updateAccident/:id"
                element={<AddAccident />}
              ></Route>
              <Route path="/view/:id" element={<AccidentView />}></Route>
              <Route path="/addCostomer" element={<CustomerEdit />}></Route>
              <Route
                path="/editCostomer/:id"
                element={<CustomerEdit />}
              ></Route>
              <Route
                path="/viewCosutomer/:id"
                element={<CustomerView />}
              ></Route>
              <Route path="/addOrder/" element={<EditOrder />}></Route>
              <Route path="/editOrder/:id" element={<EditOrder />}></Route>
              <Route path="/orderView/:id" element={<OrderView />}></Route>
              <Route path="/companyEdit/:id" element={<CompanyEdit />}></Route>
              <Route path="/truckAdd/" element={<TruckEdit />}></Route>
              <Route path="/truckEdit/:id" element={<TruckEdit />}></Route>
              <Route path="/addcontainer/" element={<ContainerEdit />}></Route>
              <Route
                path="/Editcontainer/:id"
                element={<ContainerEdit />}
              ></Route>
              <Route path="/addWorkorder/" element={<EditWorkOrder />}></Route>
              <Route
                path="/EditWorkorder/:id"
                element={<EditWorkOrder />}
              ></Route>
              <Route path="/addCost/" element={<CostEdit />}></Route>
              <Route path="/EditCost/:id" element={<CostEdit />}></Route>
            </Routes>
          </div>
        </Router>
      ) : (
        <Login Login={Login1} error={error} />
      )}

      {/* <Router>
        <Routes>
          <Route path='/' element={<Login />}>
          </Route>
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
