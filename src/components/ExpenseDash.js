import React, {useState, useEffect} from "react"
import {Container} from "react-bootstrap"
import {useAuth} from "../context/AuthContext"
import { useExpense } from '../context/ExpenseContext';

import {Link} from "react-router-dom"
import ExpenseCard from "./ExpenseCard"

//firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default function ExpenseDash() {
    const {currentUser} = useAuth()
    const {expenses,setExpenses, addExpense } = useExpense();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setExpenses([])
        const db = firebase.firestore();
        const docRef = db.collection('users').doc(currentUser.uid);
        const checkIfExists = async () => {
            const doc = await docRef.get()
            if (!doc.exists) {
                await docRef.set({});
                const subcollectionRef = docRef.collection('expenses');
                // Add a placeholder document to create the subcollection
                const placeholderDocRef = await subcollectionRef.add({item: "starter", cost: 0, receiptUrl: "https://m.media-amazon.com/images/I/71+EFMjZRBL._AC_UF894,1000_QL80_.jpg" });
                addExpense({item: "starter", cost: 0, receiptUrl: "https://m.media-amazon.com/images/I/71+EFMjZRBL._AC_UF894,1000_QL80_.jpg"})
                console.log('Subcollection created with placeholder document ID: ', placeholderDocRef.id);
            }
        }

        checkIfExists();
        docRef.collection('expenses').get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
                const userData = doc.data()
                addExpense({item: userData.item, cost: userData.cost, receiptUrl:userData.receiptUrl})
                setTotal(prevTotal => prevTotal + userData.cost);
            });
          })
          .catch(error => {
            console.error("Error getting documents: ", error);
          });
      }, [])

    return (
        <div className="w-100 ">
            <h1 className = "mb-4" style={{fontSize:"50px", fontFamily: "'Brush Script MT', cursive"}}>your expenses</h1>
            <Container className = "w-100 d-flex flex-wrap align-items-stretch justify-content-left gap-1">
                    {expenses.map(expense => (
                    <ExpenseCard  item={expense.item} cost={expense.cost} receiptUrl={expense.receiptUrl} addExpense={addExpense}/>
                    ))}
                    <Link to="/upload-receipt" 
                    className="btn btn-primary d-flex justify-content-center align-items-center" 
                    style={{width:"18%", backgroundColor:"#add8e6", color:"black", border:"2px solid black"}}> 
                    + </Link>
            </Container>
            
            <Container>
                <h5 className = "mb-4 mt-4" style={{fontSize:"30px", fontFamily: "'Brush Script MT', cursive"}}>total: ${total}</h5>
            </Container>
        </div>
    );
}