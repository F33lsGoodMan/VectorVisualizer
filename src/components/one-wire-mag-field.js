import React, { useEffect, useState } from "react";
import * as THREE from 'three'
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

    const [vectorMultiplier, setVectorMultiplier] = useState(0)
    const [showVectors, setShowVectors] = useState(true);
    const [checked, setChecked] = useState(1);
    const [fieldDirection, setFieldDirection] = useState('0');

    const handleChecked = () => {
        setChecked(!checked)
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
                    <div style={{padding: '.4rem', marginLeft: '2rem'}}>dir</div>
                        <Switch className='slider' onChange={handleChecked} checked={checked}/>
                    <div style={{padding: '.4rem'}}>disp</div>
                        <Switch className='slider' onChange={(() => setShowVectors(!showVectors))} checked={showVectors}/>
                    </div>
                <div style={{border: '2px blue solid', display: 'flex', width: '35%', justifyContent: 'space-around', verticalAlign: 'middle', height: '5rem', paddingTop: '.8rem'}}>
                        <Slider defaultValue={vectorMultiplier} step={1} marks min={0} max={5} onChange={(e) => setVectorMultiplier(e.target.value)}/> 
                </div>
                <div>
                    <button className='arrow-button' value={0} onClick={handleClick}>&larr;</button>
                    <button className='arrow-button' value={1} onClick={handleClick}>&uarr;</button>
                    <button className='arrow-button' value={2} onClick={handleClick}>&darr;</button>
                    <button className='arrow-button' value={3} onClick={handleClick}>&rarr;</button>
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
                <MagField direction={fieldDirection}/>
            </Canvas>
        </>
    )
}

export default WireMagField;