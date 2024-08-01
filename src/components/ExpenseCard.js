import React from "react"
import {Card} from "react-bootstrap"
// import {useAuth} from "../context/AuthContext"


export default function ExpenseCard({ item, cost, receiptUrl, addExpense }) {
    return(
        <Card className="w-25 h-50 d-flex flex-column justify-content-center align-items-center"
        style={{padding:"3px", backgroundImage:`url(${receiptUrl})`}}>
            <h6> {item} </h6>
            <h6> $ {cost} </h6>
        </Card>
    );
}