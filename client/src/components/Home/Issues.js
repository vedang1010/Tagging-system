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
        <div style={{display:'flex' , justifyContent:'space-between', alignItems:'center', width:'100%'}}>
            <p className={styles.issuesSubHeading}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus, optio nam odit accusantium magnam itaque corrupti, voluptate dolores nostrum officia quo cumque. Architecto ex ut, odit consectetur soluta impedit accusamus.</p>
            <Button className='Button' variant='contained' sx={{marginRight:'2.5rem', backgroundColor:'black', ":hover":{
                backgroundColor:'aliceblue',color:'black'
            }}}  onClick={issuesHandler}>View more</Button>
        </div>

        </div>
        </>
    )

}

export default Issues;