import {Card, Button} from '@mui/material'
import styles from '../../styles/Issues.module.css'
import { useNavigate } from 'react-router-dom'
const Issues = () => {
    const navigate = useNavigate();
    const issuesHandler = () =>{
        navigate('/currentissues');
      }
    return (
        <>
        <div className={styles.issuesContainer}>
        <p className={styles.issuesHeading}>Solve Issues</p>
        <div className={styles.resDivIssue} style={{display:'flex' , justifyContent:'space-between', width:'100%'}}>
            <p className={styles.issuesSubHeading}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus, optio nam odit accusantium magnam itaque corrupti, voluptate dolores nostrum officia quo cumque. Architecto ex ut, odit consectetur soluta impedit accusamus.</p>
            <Button variant='contained' sx={{margin:'10px 2.5rem', backgroundColor:'black', ":hover":{
                backgroundColor:'aliceblue',color:'black'
            }}}  onClick={issuesHandler}>View more</Button>
        </div>

        </div>
        </>
    )

}

export default Issues;