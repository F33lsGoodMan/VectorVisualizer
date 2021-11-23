import React, { useState } from "react";
import {WireWithCurrent} from "./components/wire-current";
import {WireMagField} from './components/one-wire-mag-field'
import {TwoWiresMagField} from './components/two-wires-mag-field'
import './style.css'

const App = () => {

    const [environment, setEnvironment] = useState(null)

    const handleClick = (e) => {
        switch(e.target.value) {
          case '0':
              setEnvironment(<WireWithCurrent />)
              break;
          case '1':
              setEnvironment(<WireMagField />)
              break;
          case '2':
              setEnvironment(<TwoWiresMagField/>)
              break;
          default:
              break
        }
  
    }

  return (
    <>
        <div className='button-container'>
            <button className='button' value={0} onClick={handleClick}>Wire w/ Current</button>
            <button className='button' value={1} onClick={handleClick}>1 Wire - Mag Field</button>
            <button className='button' value={2} onClick={handleClick}>2 Wires - Mag Field</button>
        </div>
        {environment}
    </>
  )
}

export default App;


