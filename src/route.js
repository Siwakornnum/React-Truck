import
{
    BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import { useState } from 'react';
import SideMenu from './components/sideMenu';
import Dashboard from './page/dashboard';
import Order from './page/order';
import Customer from './page/customer'
import WorkOrder from './page/workOrder';
import Calculation from './page/calculation';
import CalculateRoute from './calculatePage/calculateRoute';
import Costing from './calculatePage/costing';
import Company from './page/company';
import Accident from './page/accident';
import UserRights from './page/userRights';
import CarInformation from './page/carInformation';
import TruckInformation from './carPage/truckInformation';
import ContainerData from './carPage/containerData';
import Document from './page/document';
import Invoice from './documentPage/invoice';
import Accidentt from './documentPage/accidentt';
import WorkOrderr from './documentPage/workOrderr';
import Setting from './page/setting';
import Login from './page/login';



function Route1()
{
    const [inactive, setInactive] = useState(false)
    return (
        <div className="App">
            <Router>
                <SideMenu onCollapse={(inactive) =>
                {
                    console.log(inactive)
                    setInactive(inactive)
                }} />

                <div className={`container ${inactive ? "inactive" : ""}`}>


                    <Routes>

                        <Route path='/Route1/Dashboard' element={<Dashboard />}>
                        </Route>
                        <Route path='/Order' element={<Order />}>
                        </Route>
                        <Route path='/Customer' element={<Customer />}>
                        </Route>
                        <Route path='/WorkOrder' element={<WorkOrder />}>
                        </Route>
                        <Route path='/Calculation' element={<Calculation />}>
                        </Route>
                        <Route path='/Calculation/CalculateRoute' element={<CalculateRoute />}>
                        </Route>
                        <Route path='/Calculation/Costing' element={<Costing />}>
                        </Route>
                        <Route path='/Company' element={<Company />}>
                        </Route>
                        <Route path='/Accident' element={<Accident />}>
                        </Route>
                        <Route path='/UserRights' element={<UserRights />}>
                        </Route>
                        <Route path='/CarInformation' element={<CarInformation />}>
                        </Route>
                        <Route path='/CarInformation/TruckInformation' element={<TruckInformation />}>
                        </Route>
                        <Route path='/CarInformation/ContainerData' element={<ContainerData />}>
                        </Route>
                        <Route path='/Document' element={<Document />}>
                        </Route>
                        <Route path='/Document/invoice' element={<Invoice />}>
                        </Route>
                        <Route path='/Document/WorkOrder' element={<WorkOrderr />}>
                        </Route>
                        <Route path='/Document/Accident' element={<Accidentt />}>
                        </Route>
                        <Route path='/Setting' element={<Setting />}>
                        </Route>
                    </Routes>
                </div>
            </Router >

        </div >
    );
}

export default Route1;
