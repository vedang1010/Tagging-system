import {Card, Button} from '@mui/material'
import styles from '../../styles/ComponentStore.module.css'
import { useNavigate } from 'react-router-dom'
const ComponentStore = () => {
    const navigate = useNavigate();
    const componentHandler = () =>{
        navigate('/componentstore');
      }
    return (
        <>
        <div className={styles.componentContainer}>
        <p className={styles.componentHeading}>Component Store</p>
        <div className={styles.resDivComp}  style={{display:'flex' , justifyContent:'space-between', width:'100%'}}>
            <p className={styles.componentSubHeading}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus, optio nam odit accusantium magnam itaque corrupti, voluptate dolores nostrum officia quo cumque. Architecto ex ut, odit consectetur soluta impedit accusamus.</p>
            <Button className='Button' variant='contained' sx={{margin:'10px 2.5rem', backgroundColor:'black', ":hover":{
                backgroundColor:'aliceblue',color:'black'
            }}}  onClick={componentHandler}>View more</Button>
        </div>

        </div>
        </>
    )

}

export default ComponentStore;