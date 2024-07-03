import styles from '../../styles/UploadIdeaHome.module.css'
import {Button} from '@mui/material'
import { useNavigate } from 'react-router-dom';


const UploadIdeaHome = () =>{
    const navigate = useNavigate();
    const uploadIdeaHomeHandler = () =>{
        navigate('/uploadidea');
      }
    return(
        <>
        <div className={styles.IdeaContainer}>
        <p className={styles.IdeaHeading}>Upload Idea</p>
        <div style={{display:'flex' , justifyContent:'space-between', alignItems:'center', width:'100%'}}>
            <p className={styles.IdeaSubHeading}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus, optio nam odit accusantium magnam itaque corrupti, voluptate dolores nostrum officia quo cumque. Architecto ex ut, odit consectetur soluta impedit accusamus.</p>
            <Button className='Button' variant='contained' sx={{marginRight:'2.5rem', backgroundColor:'black', ":hover":{
                backgroundColor:'aliceblue',color:'black'
            }}} onClick={uploadIdeaHomeHandler}
            >View more</Button>
        </div>

        </div>
        </>
    );
}

export default UploadIdeaHome;