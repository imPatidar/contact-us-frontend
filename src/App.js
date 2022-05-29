import ContactUs from "./components/ContactUs";
import Home from "./components/Home";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Routes} from "react-router";
import Dashboard from "./components/Dashboard";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </div>
    );
}

export default App;
