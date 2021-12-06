import React, { useState } from "react";
import { 
    Canvas
} from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import "../App.scss";
import Switch from "react-switch";
import { Slider } from "@mui/material";
import { MagField } from './mag-field.js'
import '../style.css'

export const WireMagField = () => {

    const [fieldStrength, setFieldStrength] = useState(0)
    const [currentStrength, setCurrentStrength] = useState(0)
    const [showVectors, setShowVectors] = useState(true);
    const [checked, setChecked] = useState(true);
    const [fieldDirection, setFieldDirection] = useState('0');
    const [currentDirection, setCurrentDirection] = useState(1)

    const handleChecked = () => {
        setChecked(!checked);
        setCurrentDirection(-1 * currentDirection);
    }

    const Light = ({ brightness, color }) => {
        return (    
          <rectAreaLight      
              width={300}      
              height={300}      
              color={color}      
              intensity={brightness}      
              position={[0, 0, 50]}      
              lookAt={[0, 0, 0]}      
              penumbra={1}         
          />
        );
    }

    const handleClick = (e) => {
        setFieldDirection(e.target.value)
    }

    return (
        <>
            <div className='container'>
                <div className='child-style'> 
                    <div style={{padding: '.4rem'}}>Show Vectors</div>
                        <Switch onColor='#e76f51' className='switch' onChange={(() => setShowVectors(!showVectors))} checked={showVectors}/>
                    <div style={{padding: '.4rem'}}>Current Direction</div>
                        <Switch onColor='#e76f51' className='switch' onChange={handleChecked} checked={checked}/>
                </div>
                <div className='slider-container' style={{borderRight: '1px solid black', marginRight: '1rem'}}>
                    <div style={{display: 'flex', width: '20rem'}}>
                        <label style={{paddingRight: '1rem'}}>Current Strength</label>    
                        <Slider sx={{color: '#e76f51'}} defaultValue={currentStrength} step={5} marks min={0} max={25} onChange={(e) => setCurrentStrength(e.target.value)}/> 
                    </div>
                    <div style={{display: 'flex', width: '20rem'}}>
                        <label style={{paddingRight: '1rem'}}>Field Strength</label>  
                        <Slider sx={{color: '#e76f51'}} defaultValue={fieldStrength} step={1} marks min={0} max={5} onChange={(e) => setFieldStrength(e.target.value)}/> 
                    </div>
                </div>
                <div style={{width: 'inherit'}}>
                    <label style={{paddingRight: '1rem'}}>Field Direction</label>  
                    <button  className='arrow-button' value={0} onClick={handleClick}>&larr;</button>
                    <button className='arrow-button' value={1} onClick={handleClick}>&uarr;</button>
                    <button className='arrow-button' value={2} onClick={handleClick}>&darr;</button>
                    <button className='arrow-button' value={3} onClick={handleClick}>&rarr;</button>
                </div>
                <div style={{display: 'flex', alignItems: 'horizontal', width: 'inherit'}}>
                    <ul>
                        <li style={{listStyleType: 'none'}}><span className='legendMag'></span>Mag Field</li>
                        <li style={{listStyleType: 'none'}}><span className='legendCur'></span>Current</li>
                        <li style={{listStyleType: 'none'}}><span className='legendF'></span>Force</li>
                    </ul>
                </div>
            </div>
            <Canvas>
                <Light brightness={10} color={'white'} />
                <mesh position={[0, 0, 0]}>
                    <meshBasicMaterial color="blue" wireframe={true}/>
                    <cylinderGeometry args={[5, 5, 75, 64]}/>
                </mesh>
                
                <OrbitControls/>
                <gridHelper args={[500, 100]}/>
                <axesHelper args={[30]}/>
                {showVectors ?
                    <MagField 
                        fieldDirection={fieldDirection} 
                        fieldStrength={fieldStrength} 
                        currentStrength={currentStrength} 
                        currentDirection={currentDirection}
                        shift={0}
                    />
                :
                    null
                }
            </Canvas>
        </>
    )
}

export default WireMagField;

