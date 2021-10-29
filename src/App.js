import React, { useEffect, useState } from "react";
import * as THREE from 'three'
import { 
    Canvas,
    useThree,
} from "react-three-fiber";
import { Slider } from '@mui/material'
import { OrbitControls } from "@react-three/drei";
import { Vectors } from "./components/construct-vectors";
import Switch from "react-switch";
import "./App.scss";
import { textAlign } from "@mui/system";

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

const NumInput = () => {
  const [input, setInput] = useState(0);  
  const handleSubmit = (e) => {
    console.log(e.target[0].value)
    e.preventDefault();
  }
  return (
    <div>
        <form onSubmit={handleSubmit}>        
            <label>
              Magnetic Field:
                <input type="text" value={input} onInput={e => setInput(e.target.value)}/>        
            </label>
            <input type="submit" value="Submit" />
        </form>
    </div>
    
  )
}

const App = () => {
    const cylinder = <cylinderGeometry args={[5, 5, 75, 64]}/>;
    const cube = <boxGeometry args={[15, 15, 15]}/>;
    const sphere = <sphereGeometry args={[15,32,16]}/>
  
    const [vectorMultiplier, setVectorMultiplier] = useState(0);
    const [currentDirection, setCurrentDirection] = useState(-1);
    const [showVectors, setShowVectors] = useState(true);
    const [checked, setChecked] = useState(1);
    const [shape, setShape] = useState(null);

    const handleClick = (e) => {
        let s;
        switch(e.target.value) {
            case 'cylinder':
                s = cylinder
                break
            case 'sphere':
                s = sphere;
                break
            default:
                break
        }
        // console.log(e.target.value)
        setShape(s)
    }

    const handleChecked = (e) => {
        console.log(e)
        setChecked(!checked)
        setCurrentDirection(-currentDirection)
    }
    
    const style = {
        display: 'flex',
        flexDirection: 'rows',
        border: '2px red solid',
        width: '100%',
        backgroundColor: '#fcd27e',
        alignItems: 'center',
    }

    const childStyle = {
        display: 'flex',
        border: '2px green solid',
        position: 'relative',
        verticalAlign: 'middle',
        width: '25%',
        justifyContent: 'center',
    }

    const sliderStyle = {
        verticalAlign: 'middle',
        marginLeft: '4px',
        border: '2px solid red',
    }

  return (
    <>
      <div style={style}>
          <div style={{width: '15%', padding: '0.5rem', border: '2px solid teal'}}>
              <button id='1' value='cylinder' onClick={handleClick}>Wire</button>
              <button id='2' value='sphere' onClick={handleClick}>Sphere</button>
          </div>

          <div style={{border: '2px solid purple', padding: '1rem', width: '30%'}}>
              <NumInput />
          </div>
          <div style={{border: '2px blue solid', display: 'flex', width: '45%', justifyContent: 'space-around', verticalAlign: 'middle'}}>
              <div style={childStyle}> 
                  <div style={{padding: '.4rem'}}>dir</div>
                  <Switch className={sliderStyle} onChange={handleChecked} checked={checked}/>
                  <div style={{padding: '.4rem'}}>disp</div>
                  <Switch className={sliderStyle} onChange={(() => setShowVectors(!showVectors))} checked={showVectors}/>
              </div>
              <div style={{border: '2px solid limegreen', padding: '1rem', width: '40%'}}>  
                  Vector Strength
                  <Slider defaultValue={0} step={1} marks min={0} max={5} onChange={((e) => setVectorMultiplier(e.target.value))}/>
              </div>
          </div>
          
      </div>
      <Canvas>
        <Light brightness={10} color={'white'} />
        <mesh>
            {shape}
            <meshBasicMaterial color="blue" wireframe={true}/>
        </mesh>
        <OrbitControls/>
        <gridHelper args={[500, 100]}/>
        <axesHelper args={[30]}/>
        {showVectors ? <Vectors multiplier={vectorMultiplier} current={currentDirection}/> : null}
      
      </Canvas>
    </>
  )
}

export default App;