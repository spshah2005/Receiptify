import React, {useState} from "react"
import Home from "./Home"
import SignUp from "./SignUp"
import ExpenseDash from "./ExpenseDash"
import AppNav from "./AppNav"
import LogIn from "./LogIn"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import UploadReceipt from "./UploadReceipt"
import {Container} from "react-bootstrap"
import {AuthProvider} from "../context/AuthContext"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Groceries', amount: 50 },
    { id: 2, title: 'Rent', amount: 1000 },
    // More expenses
  ]);

  const addExpense = (newExpense) => {
      setExpenses([...expenses, newExpense]);
  };
  
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
                <Route path="/expenses" element={<PrivateRoute> <ExpenseDash expenses={expenses}/> </PrivateRoute>} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
                <Route path="/upload-receipt" element={<PrivateRoute><UploadReceipt addExpense={addExpense}/></PrivateRoute>} />
              </Routes>
          </Router>
        </div>
      </Container> 
    </AuthProvider>
  );
}

export default App;
