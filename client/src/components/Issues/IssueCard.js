import {Card,Button} from '@mui/material';
import './IssueCard.css'
import { Link } from 'react-router-dom';
import React from 'react';

const IssueCard = ({issue}) =>{
    console.log(issue);
    const solveIssueHandler = (e,issue) =>{
        e.preventDefault();
        console.log(issue);
        // alert("Solving issue with id: ", issue._id); 
    }
    return (
        <Card className="issue-card" style={{display:"flex" , flexDirection:"row" , justifyContent:"space-between", alignItems:"center", padding:'40px',margin:'25px 0px', boxShadow:"rgb(219, 218, 218) 3px 2px 17px 3px"}}>
            <div>
            <h3>{issue.component_name} </h3>
            <p>{issue.description}</p>
            </div>
            <Link to={`/component/${issue.component_id}`}>
            <Button  className='issue-solve-btn' variant="contained" color='success'> Solve </Button>
            </Link>
        </Card>
    );
}

export default IssueCard;