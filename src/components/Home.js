import React from "react"
import {Card} from "react-bootstrap"
import {Link} from "react-router-dom"

export default function Home() {
    return (
        <>
            <Card style={{maxWidth:"400px", margin:"auto"}}>
                <Card.Body>
                    <h2> Welcome to <em>Receiptify</em> </h2>
                    <h5 style={{color:"grey"}}> <em> Spend. Scan. Relax.</em> </h5>
                    <div style={{textAlign:"right"}}>
                        <Link to="/login" style={{color:"grey"}}><em>Get Started</em></Link>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}