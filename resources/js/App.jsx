import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Dashbord from "./Pages/Dashbord/Dashbord";
import Dialog from "./Layout/Dialog/Dialog";
import Footer from "./Layout/Footer/Footer";
import Nav from "./Layout/Nav";
import Header from "./Layout/Header/Header";
import Home from "./Pages/Home/Home";

import {
    BrowserRouter,
    Route,
    Routes,
    Link,
    Outlet,
    useLocation,
} from "react-router-dom";
import About from "./Pages/About/About";
import Cars from "./Pages/Cars/Cars";
import { ToastContainer } from "react-toastify";
import Contact from "./Pages/ContactUs/Contact";
import ProfileRental from "./Pages/Profile/ProfileRental";
import HomeDashbord from "./Pages/Dashbord/HomeDashbord";
import VehiclesDashbord from "./Pages/Dashbord/VehiclesDashbord";
import EmployeeDashbord from "./Pages/Dashbord/EmployeeDashbord";
import ChatsDashbord from "./Pages/Dashbord/ChatsDashbord";
import AccessDashbord from "./Pages/Dashbord/AccessDashbord";
import ExpensesDashbord from "./Pages/Dashbord/ExpensesDashbord";
import Booking from "./Pages/Profile/Booking";
import Messages from "./Pages/Profile/Messages";
import Faverate from "./Pages/Profile/Faverate";
import NotFound from "./Layout/Errors/NotFound";
import AddCar from "./Pages/Dashbord/CarsOperations/AddCar";
import EditCar from "./Pages/Dashbord/CarsOperations/EditCar";
import RenterNote from "./Pages/Dashbord/RenterNote";
import AllRenterNotes from "./Pages/Dashbord/AllRenterNotes";
import ProtectedRoute from "./Componants/ProtectedRoute";
import Login from "./Auth/Login/Login";
import SignUp from "./Auth/Login/SignUp";
import UserInfo from "./Pages/Profile/UserInfo";
import ProtectedRouteCompany from "./Componants/ProtectedRouteCompany";
import ForgetPassword from "./Auth/Login/ForgetPassword";
import EditProfile from "./Pages/Profile/EditProfile";
import ProtectedRouteRental from "./Componants/ProtectedRouteRental";
import Role from "./Pages/Role/Role";
import ResetPassword from "./Auth/Login/ResetPassword";
import CarDitails from "./Pages/Cars/CarDitails";
import TranslateContextProvider from "./Context/Translate";
import AddImage from "./Pages/Dashbord/CarsOperations/AddImage";
import { useTranslateContext } from "./Context/Translate";
import "../css/app.css";
import SignUpRenter from "./Auth/Login/SignUpRenter";
import UserContextProvider from "./Context/User";
import FavoriteContextProvider from "./Context/Favorite";
import ViewCar from "./Pages/Dashbord/CarsOperations/ViewCar";
import FilteredCars from "./Pages/Cars/FilteredCars";
import CarCard from "./Pages/Cars/CarCard";
import Bill from "./Pages/Bill/Bill";
import CarsCompany from "./Pages/Cars/CarsCompany";
import Reviews from "./Pages/Profile/Reviews";
import Favorites from "./Pages/Profile/Favorites";
import DiscountsDashbord from "./Pages/Dashbord/DiscountsDashbord";
import LocationDashbord from "./Pages/Dashbord/LocationsDashbord";
import Discounts from "./Pages/Discounts/Discounts";
import NotesDashboard from "./Pages/Dashbord/NotesDashboard";
import AllDiscounts from "./Pages/Dashbord/AllDiscounts";
import City from "./Pages/Citys/City";
import AllLocations from "./Pages/Dashbord/AllLocations";
import { MdAddLocation } from "react-icons/md";
import LocationsDashbord from "./Pages/Dashbord/LocationsDashbord";
import Report from "./Pages/Bill/Report";
import Notes from "./Pages/Profile/Notes";
import WorkingHourDashbord from "./Pages/Dashbord/WorkingHourDashbord";
import RentedCars from "./Pages/Dashbord/RentedCars";
import MaintainedCars from "./Pages/Dashbord/MaintainedCars";
import AllWorkingHours from "./Pages/Dashbord/AllWorkingHours";
import EditWorkingHour from "./Pages/Dashbord/EditWorkingHour";
import AddEmployee from "./Pages/Dashbord/AddEmployee";
import EditEmployee from "./Pages/Dashbord/EditEmployee";
import RenterDashbord from "./Pages/Dashbord/RenterDashbord";
import EditLocation from "./Pages/Dashbord/EditLocation";
import ViewDiscount from "./Pages/Dashbord/ViewDiscount";
import EditDiscount from "./Pages/Dashbord/EditDiscount";
import BookingsDashbord from "./Pages/Dashbord/BookingsDashbord";
import PrivacyPolicy from "./Pages/Dashbord/privacyPolicy";
//LocationDashbord
const App = () => {
    const { language } = useTranslateContext();

    const [islogined, setIslogined] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIslogined(true);
        } else {
            setIslogined(false);
        }
    }, []);
    const showHeaderFooter =
        location.pathname !== "/role" &&
        location.pathname !== "/password_reset" &&
        location.pathname !== "/forgetpassword";
    return (
        <div className={language === "ar" ? "rtl " : "ltr"}>
            {showHeaderFooter && <Header />}

            <Routes>
                <Route
                    path={"/"}
                    element={
                        <ProtectedRouteCompany>
                            <Home />
                        </ProtectedRouteCompany>
                    }
                />
                <Route path={"/city"} element={<City />} />

                <Route path={"/role"} element={<Role />} />
                <Route path={"/about"} element={<About />} />
                <Route path={"/bill/:id"} element={<Bill />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/register"} element={<SignUp />} />
                <Route
                    path={"/favoritelist"}
                    element={
                        <FavoriteContextProvider>
                            <Favorites />
                        </FavoriteContextProvider>
                    }
                />
                <Route path={"/registerRenter"} element={<SignUpRenter />} />

                <Route
                    path={"/carofcompany/:id"}
                    element={
                        <FavoriteContextProvider>
                            <CarsCompany />
                        </FavoriteContextProvider>
                    }
                />
                <Route
                    path={"/cars"}
                    element={
                        <FavoriteContextProvider>
                            <Cars />
                        </FavoriteContextProvider>
                    }
                />
                <Route path={"/cars/:id"} element={<CarDitails />} />
                <Route path={"/test"} element={<CarCard />}></Route>
                <Route path={"/contact"} element={<Contact />} />
                <Route path={"/discounts"} element={<Discounts />} />
                <Route
                    path={"/filteredcar"}
                    element={
                        <FavoriteContextProvider>
                            <FilteredCars />
                        </FavoriteContextProvider>
                    }
                ></Route>
                <Route path={"/report"} element={<Report />}></Route>
                <Route
                    path={"/profile"}
                    element={
                        <ProtectedRoute>
                            <ProfileRental />
                        </ProtectedRoute>
                    }
                >
                    <Route path={""} element={<UserInfo />} />

                    <Route path={"information"} element={<UserInfo />} />
                    <Route path={"booking"} element={<Booking />} />
                    <Route path={"reviews"} element={<Reviews />} />
                    <Route path={"Notes"} element={<Notes />} />
                    <Route path={"messages"} element={<Messages />} />
                    <Route
                        path={"Faverate"}
                        element={
                            <faverateContextProvider>
                                <Faverate />
                            </faverateContextProvider>
                        }
                    />
                    <Route path={"editprofile"} element={<EditProfile />} />
                </Route>

                <Route
                    path={"/dashbord"}
                    element={
                        <ProtectedRoute>
                            <Dashbord />
                        </ProtectedRoute>
                    }
                >
                    <Route path={""} element={<HomeDashbord />} />
                    <Route path={"HomeDashbord"} element={<HomeDashbord />} />
                    <Route
                        path={"VehiclesDashbord"}
                        element={<VehiclesDashbord />}
                    ></Route>
                    <Route
                        path={"EmployeeDashbord"}
                        element={<EmployeeDashbord />}
                    />
                    <Route
                        path={"RenterDashbord"}
                        element={<RenterDashbord />}
                    />
                    <Route
                        path="/dashbord/RenterDashbord/bookings/:id"
                        element={<BookingsDashbord />}
                    />
                    <Route path={"ChatsDashbord"} element={<Messages />} />
                    <Route
                        path={"NotesDashboard"}
                        element={<NotesDashboard />}
                    />
                    <Route
                        path={"NotesDashboard/specificrenter"}
                        element={<RenterNote />}
                    />
                    <Route
                        path={"NotesDashboard/allusers"}
                        element={<AllRenterNotes />}
                    />
                    <Route
                        path={"AccessDashbord"}
                        element={<AccessDashbord />}
                    />
                    <Route
                        path={"ExpensesDashbord"}
                        element={<ExpensesDashbord />}
                    />
                    <Route
                        path={"LocationDashbord"}
                        element={<AllLocations />}
                    />
                    <Route
                        path={"EditLocation/:id"}
                        element={<EditLocation />}
                    />
                    <Route
                        path={"WorkingHourDashbord"}
                        element={<WorkingHourDashbord />}
                    />
                    <Route
                        path={"AllWorkingHours"}
                        element={<AllWorkingHours />}
                    />
                    <Route
                        path={"EditWorkingHour/:id"}
                        element={<EditWorkingHour />}
                    />
                    <Route
                        path={"addLocation"}
                        element={<LocationsDashbord />}
                    />{" "}
                    <Route path={"addEmployee"} element={<AddEmployee />} />
                    <Route
                        path={"EditEmployee/:id"}
                        element={<EditEmployee />}
                    />
                    <Route
                        path={"DiscountsDashbord"}
                        element={<AllDiscounts />}
                    />
                    <Route
                        path={"addDiscount"}
                        element={<DiscountsDashbord />}
                    ></Route>
                    <Route
                        path={"editDiscount/:id"}
                        element={<EditDiscount />}
                    ></Route>
                    <Route
                        path={"viewDiscount/:id"}
                        element={<ViewDiscount />}
                    ></Route>
                    <Route path={"addvehical"} element={<AddCar />}></Route>
                    <Route path={"rented"} element={<RentedCars />}></Route>
                    <Route
                        path={"maintend"}
                        element={<MaintainedCars />}
                    ></Route>
                    <Route
                        path={"VehiclesDashbord/editvehical/:id"}
                        element={<EditCar />}
                    />
                    <Route
                        path={"VehiclesDashbord/viewvehical/:id"}
                        element={<ViewCar />}
                    />
                    <Route
                        path={"rented/viewvehical/:id"}
                        element={<ViewCar />}
                    />
                    <Route
                        path={"VehiclesDashbord/maintend/:id"}
                        element={<ViewCar />}
                    />
                </Route>
                <Route path={"/password_reset"} element={<ResetPassword />} />

                <Route path={"/notfound"} element={<NotFound />} />
                <Route path={"/forgetpassword"} element={<ForgetPassword />} />
                <Route path={"/privacyPolicy"} element={<PrivacyPolicy/>} />
            </Routes>
            {showHeaderFooter && <Footer />}
        </div>
    );
};

const contenter = document.getElementById("root");
const root = createRoot(contenter);

root.render(
    <React.StrictMode>
        <ToastContainer />
        <UserContextProvider>
            <TranslateContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </TranslateContextProvider>
        </UserContextProvider>
    </React.StrictMode>
);
