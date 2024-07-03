import styles from '../../styles/UploadIdeaHome.module.css'
import {Button} from '@mui/material'

const UploadIdeaHome = () =>{
    return(
        <>
        <div className={styles.IdeaContainer}>
        <p className={styles.IdeaHeading}>Upload Idea</p>
        <div style={{display:'flex' , justifyContent:'center', alignItems:'center', width:'100%'}}>
            <p className={styles.IdeaSubHeading}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus, optio nam odit accusantium magnam itaque corrupti, voluptate dolores nostrum officia quo cumque. Architecto ex ut, odit consectetur soluta impedit accusamus.</p>
            <Button className='Button' variant='contained' sx={{marginRight:'2.5rem', backgroundColor:'black', ":hover":{
                backgroundColor:'grey'
            }}}>View more</Button>
        </div>

        </div>
        </>
    );
}

export default UploadIdeaHome;