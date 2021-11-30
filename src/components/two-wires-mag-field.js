import React, { useState } from "react";
import * as THREE from 'three'
import { 
    Canvas
} from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import "../App.scss";
import Switch from "react-switch";
import { Slider } from "@mui/material";
import '../style.css'
import CurlingVectorsExtended from "./curl-extended";

export const TwoWiresMagField = () => {

    const [wireDistance, setWireDistance] = useState(50)
    const [currentStrength, setCurrentStrength] = useState(1)
    const [showVectors, setShowVectors] = useState(true);
    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(true);
    const [currentDirection1, setCurrentDirection1] = useState(1)
    const [currentDirection2, setCurrentDirection2] = useState(1)


    const handleChecked1 = () => {
        setChecked1(!checked1);
        setCurrentDirection1(-1 * currentDirection1);
    }

    const handleChecked2 = () => {
        setChecked2(!checked2);
        setCurrentDirection2(-1 * currentDirection2);
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

    // <mesh position={[25, 0, 0]}>
    //     <meshBasicMaterial color="blue" wireframe={true}/>
    //     <cylinderGeometry args={[5, 5, 75, 64]} />;
    // </mesh>

    // <div style={{display: 'flex', alignItems: 'horizontal'}}>
    //                 <ul>
    //                     <li style={{listStyleType: 'none'}}><span className='legendMag'></span>Mag Field</li>
    //                     <li style={{listStyleType: 'none'}}><span className='legendCur'></span>Current</li>
    //                     <li style={{listStyleType: 'none'}}><span className='legendF'></span>Force</li>
    //                 </ul>
    //             </div>

    const camera2 = new THREE.PerspectiveCamera(
        60,  // fov
        2,   // aspect
        0.1, // near
        500, // far
      );
      camera2.position.set(40, 10, 30);
      camera2.lookAt(0, 5, 0);

    return (
        <>
            <div className='container'>
                <div className='child-style'> 
                    <div style={{padding: '.4rem'}}>Show Vectors</div>
                        <Switch className='slider' onChange={(() => setShowVectors(!showVectors))} checked={showVectors}/>
                    <div style={{padding: '.4rem'}}>Current 1 Direction</div>
                        <Switch className='slider' onChange={handleChecked1} checked={checked1}/>
                    <div style={{padding: '.4rem'}}>Current 2 Direction</div>
                        <Switch className='slider' onChange={handleChecked2} checked={checked2}/>
                </div>
                <div className='slider-container'>
                    <div style={{border: '2px blue solid', display: 'flex', width: '40%', justifyContent: 'space-around', verticalAlign: 'middle', height: '5rem', paddingTop: '.8rem', padding: '1rem'}}>
                        Current Strength    
                        <Slider defaultValue={currentStrength} step={5} marks min={0} max={25} onChange={(e) => setCurrentStrength(e.target.value)}/> 
                    </div>
                    <div style={{border: '2px blue solid', display: 'flex', width: '40%', justifyContent: 'space-around', verticalAlign: 'middle', height: '5rem', paddingTop: '.8rem', padding: '1rem'}}>
                        Wire Distance
                        <Slider defaultValue={wireDistance} step={10} marks min={50} max={100} onChange={(e) => setWireDistance(e.target.value)}/> 
                    </div>
                </div>
            </div>
            <Canvas>
                <Light brightness={10} color={'white'} />
                <mesh position={[0, 0, 0]}>
                    <meshBasicMaterial color="blue" wireframe={true}/>
                    <cylinderGeometry args={[5, 5, 75, 64]}/>
                </mesh>
                <mesh position={[wireDistance, 0, 0]}>
                    <meshBasicMaterial color="green" wireframe={true}/>
                    <cylinderGeometry args={[5, 5, 75, 64]}/>
                </mesh>
                <CurlingVectorsExtended 
                    currentStrength={currentStrength} 
                    currentDirection1={currentDirection1} 
                    currentDirection2={currentDirection2}
                    wireDistance={wireDistance}/>
                <OrbitControls/>
                <gridHelper args={[500, 100]}/>
                <axesHelper args={[30]}/>
            </Canvas>
        </>
    )
}

export default TwoWiresMagField;

