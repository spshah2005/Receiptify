import React from "react"
import {Card} from "react-bootstrap"
// import {useAuth} from "../context/AuthContext"


export default function ExpenseCard({ item, cost, receiptUrl, addExpense }) {
    return(
        <Card className=" h-50 d-flex flex-column justify-content-center align-items-center"
        style={{border:"2px solid black", width:"18%", padding:"10px", minWidth:"100px",
        backgroundImage: "url(https://m.media-amazon.com/images/I/71+EFMjZRBL._AC_UF894,1000_QL80_.jpg)"}}>
            <h6> {item} </h6>
            <h6> $ {cost} </h6>
            <img src={receiptUrl} style={{border:"2px solid black", width: "100%", height: "200px", objectFit: "cover"}} />
        </Card>
    );
}