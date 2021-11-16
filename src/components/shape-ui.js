import { Slider } from '@mui/material'
import React, { useState } from "react";
import { VectorMult } from './vector-multiplier';

export const ShapeUI = (props) => {
    
    const [vectorMultiplier, setVectorMultiplier] = useState(0)
    
    switch(props.uiNum) {
        case '0':
            return (
                <div style={{border: '2px blue solid', display: 'flex', width: '45%', justifyContent: 'space-around', verticalAlign: 'middle'}}>
                    <div style={{border: '2px solid limegreen', padding: '1rem', width: '40%'}}>  
                        Vector Strength
                        <Slider defaultValue={vectorMultiplier} step={1} marks min={0} max={5} onChange={((e) => setVectorMultiplier(e.target.value))}/>
                    </div>
                </div>
                )   
        case '1':
            return (
                <div style={{border: '2px blue solid', display: 'flex', width: '45%', justifyContent: 'space-around', verticalAlign: 'middle'}}>
                    <div style={{border: '2px solid limegreen', padding: '1rem', width: '40%'}}>  
                        Field Strength
                        <Slider defaultValue={vectorMultiplier} step={1} marks min={0} max={5} onChange={((e) => setVectorMultiplier(e.target.value))}/>
                    </div>
                </div>
                )
        case '2':
            return (
                <div style={{border: '2px blue solid', display: 'flex', width: '45%', justifyContent: 'space-around', verticalAlign: 'middle'}}>
                    <div style={{border: '2px solid limegreen', padding: '1rem', width: '40%'}}>  
                        Field Strength
                        <Slider defaultValue={vectorMultiplier} step={1} marks min={0} max={5} onChange={((e) => setVectorMultiplier(e.target.value))}/>
                    </div>
                </div>
                )
        default:
            return (
                <div></div>
            )
    }

}

export default ShapeUI;
