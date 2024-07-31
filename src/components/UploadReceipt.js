import React, {useState, useEffect} from "react"
import {Form, Card,Button} from 'react-bootstrap'
import {useAuth} from '../context/AuthContext'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {Link} from "react-router-dom"


export default function UploadReceipt({addExpense}) {
    const {currentUser} = useAuth()
    const [downloadUrl, setDownloadUrl] = useState('');
    const [checkReceipt, setCheckReceipt] = useState(false)
    const storage = getStorage();

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
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("hooray")
        await uploadImage(document.getElementById("receiptImageFile").files[0])
        addExpense({ id: 2, title: 'Rent', amount: 1000 });
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
                    <Button disabled = {!checkReceipt} className="w-100 mt-2" type="button"> Check Receipt </Button>
                </Card.Body>
            </Card>
            <div className = "w-100 text-center mt-2">
                <Link to="/expenses"> Back to Dashboard</Link>
            </div>
        </>
    );
}