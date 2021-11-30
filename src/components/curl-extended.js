import * as THREE from 'three'

export const CurlingVectorsExtended = ({currentStrength, currentDirection1, currentDirection2, wireDistance}) => {

    const pi = Math.PI;
    
    let vectorArray = [];
    let vectors = [];

    const dir = new THREE.Vector3(0,0,1);
    dir.multiplyScalar(currentDirection1);

    for (let d = 0; d < 9; d++) {
        const x = 30 + d*10;
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
            const x = rad * Math.cos(theta) ;
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
            const len = (8) ;
            const color = 0xff00ee;
            
            curlVecs.push(<arrowHelper args={[curlingDir, origin, len, color, 1.5 + currentStrength/(i+7), .5 + currentStrength/(i+7)]}/>); 
        }
        vectorArray.push(curlVecs)
    }

    const curDir = new THREE.Vector3(0,1,0);

    const currentVector = () => {
        const origin = new THREE.Vector3(0,0,0);
        
        curDir.multiplyScalar(-currentDirection1)

        return (
            <arrowHelper args={[curDir, origin, 60, 0x10e810, 15, 5]} />
        )
    }

    const inducedCurrentVector = () => {
        const origin = new THREE.Vector3(wireDistance,0,0);
        const indCurDir = new THREE.Vector3(0,1,0);
        indCurDir.multiplyScalar(-currentDirection2)

        return (
            <arrowHelper args={[indCurDir, origin, 60, 0x2aaa2, 15, 5]} />
        )
    }

    const inducedMagVector = () => {

    }

    const inducedForceVector = () => {

        const origin = new THREE.Vector3(wireDistance,15,0);

        const cur = new THREE.Vector3(0,1,0);

        const mag = new THREE.Vector3().copy(dir);

        const f = new THREE.Vector3()

        f.crossVectors(cur, mag)

        return (
            <arrowHelper args={[f, origin, 35, 0xe80be4, 5 + currentStrength/5 - 200/wireDistance, 1.5 + currentStrength/3 - 225/wireDistance]} />
        )
    }

    vectorArray.push(currentVector())
    vectorArray.push(inducedCurrentVector())
    vectorArray.push(inducedForceVector())

    return vectorArray;

}

export default CurlingVectorsExtended;