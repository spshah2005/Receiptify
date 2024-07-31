import React from "react"
import {Card} from "react-bootstrap"
// import {useAuth} from "../context/AuthContext"


export default function ExpenseCard({ title, amount, addExpense }) {
    return(
        <Card className="w-25 h-50 d-flex flex-column justify-content-center align-items-center"
        style={{padding:"3px"}}>
            <h6> {title} </h6>
            <h6> $ {amount} </h6>
        </Card>
    );
}