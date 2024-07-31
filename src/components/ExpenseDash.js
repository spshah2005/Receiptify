import React, {useState} from "react"
import {Card, Button, Alert,Container} from "react-bootstrap"
import {useAuth} from "../context/AuthContext"
import {Link,useNavigate} from "react-router-dom"
import ExpenseCard from "./ExpenseCard"

export default function ExpenseDash({expenses}) {
    const[error,setError] = useState("")
    const { logout} = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        setError('')
        try {
            await logout()
            navigate("/login")
        } catch {
            setError("Failed to Log out")
        }
    }
    return (
        <div >
            <Card>
                <Card.Body className="w-100">
                    <h2 className = "text-center mb-4">Your Expenses</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Container className = "w-100 d-flex flex-wrap align-items-stretch justify-content-left gap-4">
                         {expenses.map(expense => (
                            <ExpenseCard key={expense.id} title={expense.title} amount={expense.amount} />
                         ))}
                         <Link to="/upload-receipt" 
                         className="btn btn-primary w-25 d-flex justify-content-center align-items-center" 
                         style={{backgroundColor:"#add8e6", color:"black", border:"#add8e6"}}> 
                         + </Link>
                    </Container>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </div>
    );
}