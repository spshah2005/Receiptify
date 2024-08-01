import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import {useAuth} from '../context/AuthContext'
import {Link} from "react-router-dom"

export default function ForgotPassword() {
    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)
    const [message, setMessage] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
        } catch(error) {
            console.log(error)
            setError('Failed to reset password')
        }
        setLoading(false)
    }
    return (
        <>
            <Card style={{maxWidth:"400px", margin:"auto"}}> 
                <Card.Body>
                    <h2 className="text-center mb-4"> Password Reset </h2>
                    {error && <Alert variant = "danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label className="mb-2"> Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>


                        <Button disabled={loading} className="w-100 mt-2" type="submit">Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Log In</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className = "w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    );
}