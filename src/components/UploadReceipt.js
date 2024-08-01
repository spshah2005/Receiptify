import React, {useState, useEffect, useRef} from "react"
import {Form, Card,Button} from 'react-bootstrap'
import {useAuth} from '../context/AuthContext'

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {Link} from "react-router-dom"

//firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import Tesseract from 'tesseract.js';

export default function UploadReceipt() {
    const {currentUser} = useAuth()
    const [downloadUrl, setDownloadUrl] = useState('');
    const [checkReceipt, setCheckReceipt] = useState(false)
    const storage = getStorage();
    const itemRef = useRef()
    const costRef = useRef()
    const [costValue, setCostValue] = useState('');
    const [titleValue, setTitleValue] = useState('');

    useEffect( () => {
        if(downloadUrl){
            setCheckReceipt(true)
        }
        else {
            setCheckReceipt(false)
        }
    }, [downloadUrl])

    // Function to upload an image
    async function uploadImage(image) {
        if (currentUser) { // Check if a user is logged in
        // Create a unique file name (e.g., using the user's ID and timestamp)
        const fileName = `${currentUser.uid}-${Date.now()}.jpg`; 
        // Create a reference to the file in your Storage bucket
        const storageRef = ref(storage, `receipt_images/${fileName}`);
        try {  // Upload the image
            await uploadBytes(storageRef, image);
            console.log('Image uploaded successfully!');
    
            // Get the download URL for the uploaded image
            const downloadURL = await getDownloadURL(storageRef);
            console.log('Download URL:', downloadURL);
            setDownloadUrl(downloadURL)
            // You can now use the download URL to display the image in your app
        } catch (error) {
            console.error('Error uploading image:', error);
        }
        } else {
        console.error('User is not logged in.');
        }

        Tesseract.recognize(
            image,'eng',
          )
          .catch (err => {
            console.error(err);
          })
          .then(result => {
           console.log(result);
           const text = result.data.text
           

            //title
            const match = text.match(/^[^\n]*/);
            if (match) {
            setTitleValue(match[0]) }
            //price
            const wordsArray = text.split(/\s+/);
            const index = wordsArray.findIndex(word => {
                const lowerCaseWord = word.toLowerCase();
                return lowerCaseWord.includes('total') && !lowerCaseWord.includes('subtotal');
            });
            if (index!==-1){
                let totalPrice = wordsArray[index+1]
                console.log(totalPrice)
                if (totalPrice.includes("$")) { totalPrice = totalPrice.substring(1)}
                setCostValue(parseFloat(totalPrice))
            }
          })      
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await uploadImage(document.getElementById("receiptImageFile").files[0])

    }

    async function handleExpense(e){
        e.preventDefault();
         //add new expense to database
         const db = firebase.firestore();
         const docRef = db.collection('users').doc(currentUser.uid).collection('expenses')
         await docRef.add({ item: itemRef.current.value, cost: costRef.current.value, receiptUrl:downloadUrl })
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Form className="mb-4" onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label> Scan your receipt</Form.Label>
                            <Form.Control id="receiptImageFile" type="file" required/>
                        </Form.Group>
                        <Button  className="w-100 mt-2" type="submit">Upload</Button>
                    </Form>
                    {downloadUrl && <img className="w-100"src={downloadUrl} alt="receipt"/>}


                    {checkReceipt &&
                        <Form >
                            <Form.Group className="mt-4">
                                <Form.Label> Item Name </Form.Label>
                                <Form.Control ref={itemRef} value={titleValue} required/>
                            </Form.Group>

                            <Form.Group className="mt-4">
                                <Form.Label> Cost </Form.Label>
                                <Form.Control type="number" ref={costRef} value={costValue} required/>
                            </Form.Group>
                        </Form>
                    }
                    <Button disabled = {!checkReceipt} className="w-100 mt-2" type="button" onClick={handleExpense}> Verify Receipt </Button>
                </Card.Body>
            </Card>
            <div className = "w-100 text-center mt-2">
                <Link to="/expenses"> Back to Dashboard</Link>
            </div>
        </>
    );
}