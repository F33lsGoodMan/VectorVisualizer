import * as THREE from 'three'
// import ShapeUI from './shape-ui';

export const CurlingVectors = (props) => {

    const scaleFactor = 5; //arbitrary, could be user input 
    const radius = 10; //radius of cyl, should be variable 
    const pi = Math.PI;
    
    let vectorArray = [];
    let vectors = [];
    let dir;

    const multiplier = props.multiplier;

    for (let i = 0; i < multiplier; i++) { 
        for (let j = 0; j < 8; j++) { //8 for arbitrary num of vecs in each ring
            const theta = (2*pi / 8) * j;
            const rad = radius + (scaleFactor * i);
            const x = rad * Math.cos(theta) ;
            const z = rad * Math.sin(theta); 
            const y = 10;

            switch (j) {
                case 0:
                    dir = new THREE.Vector3(0,0,1);
                    break;
                case 1:
                    dir = new THREE.Vector3(-1,0,1)
                    break;
                case 2:
                    dir = new THREE.Vector3(-1,0,0)
                    break;
                case 3:
                    dir = new THREE.Vector3(-1,0,-1);
                    break;
                case 4:
                    dir = new THREE.Vector3(0,0,-1);
                    break;
                case 5:
                    dir = new THREE.Vector3(1,0,-1);
                    break;
                case 6:
                    dir = new THREE.Vector3(1,0,0);
                    break;
                case 7:
                    dir = new THREE.Vector3(1,0,1);
                    break;
                default:
                break;
            }  

            dir.multiplyScalar(props.current)
            const origin = new THREE.Vector3(x,y,z); 
    
            const length = (8) ;
            const hex = 0xff0000;
            
            vectors.push(<arrowHelper args={[dir, origin, length, hex, 2*multiplier/(i+2), multiplier/(i+2)]}/>); 
        }
        vectorArray.push(vectors)
    }

    const currentVector = () => {
        const origin = new THREE.Vector3(0,0,0);
        const dir = new THREE.Vector3(0,1,0);
        dir.multiplyScalar(-props.current)

        return (
            <arrowHelper args={[dir, origin, 60, 0x10e810, 15, 5]} />
        )
    }

    vectorArray.push(currentVector())

    return vectorArray;

}

export default CurlingVectors;
