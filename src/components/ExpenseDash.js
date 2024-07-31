import React, {useState, useEffect} from "react"
import {Card, Button, Alert,Container} from "react-bootstrap"
import {useAuth} from "../context/AuthContext"
import { useExpense } from '../context/ExpenseContext';

import {Link,useNavigate} from "react-router-dom"
import ExpenseCard from "./ExpenseCard"

//firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default function ExpenseDash() {
    const[error,setError] = useState("")
    const {currentUser,logout} = useAuth()
    const navigate = useNavigate()
    const {expenses,setExpenses, addExpense } = useExpense();

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
                const placeholderDocRef = await subcollectionRef.add({item: "starter", cost: 0 });
                addExpense({item: "starter", cost: 0 })
                console.log('Subcollection created with placeholder document ID: ', placeholderDocRef.id);
            }
        }

        checkIfExists();
        docRef.collection('expenses').get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
                const userData = doc.data()
                addExpense({item: userData.item, cost: userData.cost})
            });
          })
          .catch(error => {
            console.error("Error getting documents: ", error);
          });
      }, [])

    async function handleLogout() {
        setError('')
        try {
            await logout()
            navigate("/login")
        } catch {
            setError("Failed to Log out")
        }
        setExpenses([]);
    }

    return (
        <div >
            <Card>
                <Card.Body className="w-100">
                    <h2 className = "text-center mb-4">Your Expenses</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Container className = "w-100 d-flex flex-wrap align-items-stretch justify-content-left gap-4">
                         {expenses.map(expense => (
                            <ExpenseCard  item={expense.item} cost={expense.cost} addExpense={addExpense}/>
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