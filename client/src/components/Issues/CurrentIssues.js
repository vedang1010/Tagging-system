import IssueCard from "./IssueCard";
import { Container } from '@mui/material';
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const CurrentIssues = () => {

    const [issues, setIssues] = useState([]);


    useEffect(() => {
        axios.get(`${SERVER_URL}api/issues/getAllIssues`)
            .then(response => {
                setIssues(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    console.log(issues);
    return (
        <>
            <Container maxWidth="md" >

                <h1>
                    This is current issues page.
                </h1>
                <Container maxWidth="md">
                    {issues.map((issue, index) => (
                        <IssueCard key={index} issue={issue} />
                        ))}
                        
                </Container>
            </Container>


        </>
    );
}

export default CurrentIssues;