import React, { useState } from "react";
import { 
    Canvas
} from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import "../App.scss";
import Switch from "react-switch";
import { Slider } from "@mui/material";
import CurlingVectors from './curl'
import '../style.css'


export const WireWithCurrent = () => {

    const [vectorMultiplier, setVectorMultiplier] = useState(0)
    const [showVectors, setShowVectors] = useState(true);
    const [checked, setChecked] = useState(1);
    const [currentDirection, setCurrentDirection] = useState(1);

    const handleChecked = () => {
        setChecked(!checked)
        setCurrentDirection(-1 * currentDirection)
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

    return (
        <>
            <div className='container'>
                <div className='child-style'> 
                    <div style={{padding: '.4rem', marginLeft: '2rem'}}>Current Direction</div>
                        <Switch onColor='#e76f51' className='switch' onChange={handleChecked} checked={checked}/>
                    <div style={{padding: '.4rem'}}>Show Vectors</div>
                        <Switch onColor='#e76f51' className='switch' onChange={(() => setShowVectors(!showVectors))} checked={showVectors}/>
                    </div>
                <div className='slider-container' style={{width: '35%'}}>
                        <label style={{paddingRight: '1rem'}}>Current Strength</label>
                        <Slider sx={{color: '#e76f51'}} defaultValue={vectorMultiplier} step={1} marks min={0} max={5} onChange={(e) => setVectorMultiplier(e.target.value)}/> 
                </div>
                <div>
                    <ul>
                        <li style={{listStyleType: 'none'}}><span className='legendMag'></span>Mag Field</li>
                        <li style={{listStyleType: 'none'}}><span className='legendCur'></span>Current</li>
                    </ul>
                </div>
            </div>
            <Canvas>
            <Light brightness={10} color={'white'} />
                <mesh>
                    <meshBasicMaterial color="blue" wireframe={true}/>
                    <cylinderGeometry args={[5, 5, 75, 64]}/>
                </mesh>
                <OrbitControls/>
                <gridHelper args={[500, 100]}/>
                <axesHelper args={[30]}/>
                {showVectors ? <CurlingVectors multiplier={vectorMultiplier} current={currentDirection}/> : null}
            </Canvas>
        </>
    )
}

export default WireWithCurrent;

