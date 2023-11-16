import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import UserContextProvider from "./context/UserContextProvider";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import ViewPage from "./pages/ViewPage";
import BookingPage from "./pages/BookingPage";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:4000";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account/profile" element={<ProfilePage />} />
            <Route path="/account/places" element={<PlacesPage />} />
            <Route path="/account/bookings" element={<BookingPage />} />
            <Route path="/account/places/new" element={<PlacesFormPage />} /> 
            <Route path="/account/places/:id" element={<PlacesFormPage />} />
            <Route path="/view/:id" element={<ViewPage />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
