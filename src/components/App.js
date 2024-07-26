import React from "react"
import SignUp from "./SignUp"
import Dashboard from "./Dashboard"
import LogIn from "./LogIn"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import UploadReceipt from "./UploadReceipt"
import {Container} from "react-bootstrap"
import {AuthProvider} from "../context/AuthContext"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
    <AuthProvider>
      <Container className = "d-flex align-items-center justify-content-center"
      style = {{minHeight: "100vh"}} >
        <div className = "w-100" style={{maxWidth:"400px"}}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
                <Route path="/upload-receipt" element={<PrivateRoute><UploadReceipt /></PrivateRoute>} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
