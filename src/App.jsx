import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products/Products";
import Sidebar from "./components/Sidebar/Sidebar";
import Orders from "./components/Orders/Orders";
import Categories from "./components/Categories/Categories";
import Restaurants from "./components/Restaurants/Restaurants";
import Vendors from "./components/VendorMgmt/Vendors";
import Purchase from "./components/PurchaseMgmt/Purchase";
import Users from "./components/Users/Users";
// import AddProduct from './components/Products/AddProduct';
import { AddProduct } from "./components/Products/ProductRoutes";
import { EditProduct } from "./components/Products/ProductRoutes";
import AddPurchase from "./components/PurchaseMgmt/PurchaseForm";
import Login from "./components/Login/Login";
import AddCategory from "./components/Categories/AddCategory";
import PrivateRoute from "./PrivateRoute";
import AddUser from "./components/Users/AddUser";
// import AddRestaurant from './components/Restaurants/AddRestaurant'
import PurchaseDetails from "./components/PurchaseMgmt/PurchaseDetails";
import { AddRestaurant } from "./components/Restaurants/RestaurantRoutes";
import { EditRestaurant } from "./components/Restaurants/RestaurantRoutes";
import AddOutlet from "./components/Restaurants/AddOutlet";
import EditOrder from "./components/Orders/EditOrder";
import PoolOrders from "./components/Orders/PoolOrders";
import UpdateChicken from "./components/Products/UpdateChicken";
import OutletBills from "./components/Bills/OutletBills";
import VendorForm from "./components/VendorMgmt/VendorForm";
import Inventory from "./components/Inventory/Inventory";
import Expenses from "./components/Expenses/Expenses";
import InventoryDetails from "./components/Inventory/InventoryDetails";
import Expense from "./components/Expenses/Expense";

function App() {
  return (
    <div>
      <Router>
        {
          <PrivateRoute>
            <Sidebar />
          </PrivateRoute>
        }
        <div className="justify-center items-center">
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Products />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/categories"
              element={
                <PrivateRoute>
                  <Categories />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/restaurants"
              element={
                <PrivateRoute>
                  <Restaurants />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/vendors"
              element={
                <PrivateRoute>
                  <Vendors />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/purchase"
              element={
                <PrivateRoute>
                  <Purchase />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/users"
              element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/addproduct"
              element={
                <PrivateRoute>
                  <AddProduct />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/editproduct/:id"
              element={
                <PrivateRoute>
                  <EditProduct />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/updatechicken"
              element={
                <PrivateRoute>
                  <UpdateChicken />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/addcategory"
              element={
                <PrivateRoute>
                  <AddCategory />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/adduser"
              element={
                <PrivateRoute>
                  <AddUser />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/addrestaurant"
              element={
                <PrivateRoute>
                  <AddRestaurant />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/addpurchase"
              element={
                <PrivateRoute>
                  <AddPurchase />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/editrestaurant"
              element={
                <PrivateRoute>
                  <EditRestaurant />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/addoutlet"
              element={
                <PrivateRoute>
                  <AddOutlet />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/editorder/:id"
              element={
                <PrivateRoute>
                  <EditOrder />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/addvendor"
              element={
                <PrivateRoute>
                  <VendorForm />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/poolorders"
              element={
                <PrivateRoute>
                  <PoolOrders />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/outletbills"
              element={
                <PrivateRoute>
                  <OutletBills />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/purchasedetails"
              element={
                <PrivateRoute>
                  <PurchaseDetails />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/inventory"
              element={
                <PrivateRoute>
                  <Inventory />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/expenses"
              element={
                <PrivateRoute>
                  <Expenses />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/inventorydetails"
              element={
                <PrivateRoute>
                  <InventoryDetails />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/addexpense"
              element={
                <PrivateRoute>
                  <Expense />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
