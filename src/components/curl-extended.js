import * as THREE from 'three'

export const CurlingVectorsExtended = ({currentStrength, currentDirection1, currentDirection2, wireDistance}) => {

    const pi = Math.PI;
    
    let vectorArray = [];
    let vectors = [];

    const dir = new THREE.Vector3(0,0,1);
    dir.multiplyScalar(currentDirection1);

    for (let d = 0; d < 9; d++) {
        const x = 15 + d*10;
        const z = -7.5*currentDirection1;
        const y = 10;

        const origin = new THREE.Vector3(x,y,z); 
    
        const length = (15);
        const hex = 0xff0000;

        vectors.push(<arrowHelper args={[dir, origin, length, hex, 2 + currentStrength/(5+d), 1 + currentStrength/(5+d)]}/>); 
    }
    vectorArray.push(vectors);

    let curlVecs = [];

    for (let i = 0; i < 3; i++) { 

        for (let j = 1; j < 8; j++) { //8 for arbitrary num of vecs in each ring
            const theta = (2*pi / 8) * j;
            const rad = 10 + (10 * i);
            const x = rad * Math.cos(theta) -25 ;
            const z = rad * Math.sin(theta); 
            const y = 10;
            let curlingDir;

            switch (j) {
                case 1:
                    curlingDir = new THREE.Vector3(-1,0,1)
                    break;
                case 2:
                    curlingDir = new THREE.Vector3(-1,0,0)
                    break;
                case 3:
                    curlingDir = new THREE.Vector3(-1,0,-1);
                    break;
                case 4:
                    curlingDir = new THREE.Vector3(0,0,-1);
                    break;
                case 5:
                    curlingDir = new THREE.Vector3(1,0,-1);
                    break;
                case 6:
                    curlingDir = new THREE.Vector3(1,0,0);
                    break;
                case 7:
                    curlingDir = new THREE.Vector3(1,0,1);
                    break;
                default:
                break;
            }  

            curlingDir.multiplyScalar(currentDirection1)
            const origin = new THREE.Vector3(x,y,z); 
            const len = (10) ;
            const color = 0xff00ee;
            
            curlVecs.push(<arrowHelper args={[curlingDir, origin, len, color, 2*currentStrength/(i+7), currentStrength/(i+7)]}/>); 
        }
        vectorArray.push(curlVecs)
    }

    const currentOneVector = () => {
        const origin = new THREE.Vector3(-25,0,0);
        const currentOne = new THREE.Vector3(0,1,0);
        currentOne.multiplyScalar(-currentDirection1)

        return (
            <arrowHelper args={[currentOne, origin, 60, 0x10e810, 15, 5]} />
        )
    }

    const currentTwoVector = () => {
        const origin = new THREE.Vector3(wireDistance,0,0);
        const currentTwo = new THREE.Vector3(0,1,0);
        currentTwo.multiplyScalar(-currentDirection2)

        return (
            <arrowHelper args={[currentTwo, origin, 60, 0x2aaa2, 15, 5]} />
        )
    }

    const inducedForceVector = () => {

        //TODO maybe use var to hold scaling value for force size 
        // const scaleForce = some#usingWireDistance +/- some#usingCurrentStrength
        // 

        const origin = new THREE.Vector3(wireDistance,15,0);

        const cur = new THREE.Vector3(0,1,0);
        cur.multiplyScalar(-currentDirection2)

        const mag = new THREE.Vector3().copy(dir);

        const f = new THREE.Vector3()

        f.crossVectors(cur, mag)

        return (
            <arrowHelper args={[f, origin, 35, 0xecff23, 5, 3]} />
        )
    }

    vectorArray.push(currentOneVector())
    vectorArray.push(currentTwoVector())
    vectorArray.push(inducedForceVector())

    return vectorArray;

}

export default CurlingVectorsExtended;