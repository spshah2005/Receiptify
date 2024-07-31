import React from "react"

//components
import Home from "./Home"
import SignUp from "./SignUp"
import ExpenseDash from "./ExpenseDash"
import AppNav from "./AppNav"
import LogIn from "./LogIn"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import UploadReceipt from "./UploadReceipt"

//other
import {Container} from "react-bootstrap"
import {AuthProvider} from "../context/AuthContext"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"


function App() {
  return (
  <AuthProvider>
    <AppNav />
    <Container className = "d-flex align-items-center justify-content-center"
    style = {{minHeight: "100vh"}} >
      <div className = "w-100" style={{maxWidth:"400px"}}>
          <Router>
              <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/expenses" element={<PrivateRoute> <ExpenseDash/> </PrivateRoute>} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
                <Route path="/upload-receipt" element={<PrivateRoute><UploadReceipt /></PrivateRoute>} />
              </Routes>
          </Router>
        </div>
      </Container> 
    </AuthProvider>
  );
}

export default App;
