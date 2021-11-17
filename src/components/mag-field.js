import * as THREE from 'three'

export const MagField = ({fieldDirection, fieldStrength, currentStrength, currentDirection}) => {

    let dir;
    switch (fieldDirection) {
        case '0':
            dir = new THREE.Vector3(-1,0,0);
            break;
        case '1':
            dir = new THREE.Vector3(0,0,-1);
            break;
        case '2': 
            dir = new THREE.Vector3(0,0,1);
            break;
        case '3':
            dir = new THREE.Vector3(1,0,0);
            break;
        default:
            break;
    }

    let vectors = []
    const hex = 0xff0000

    for (let r = 0; r < 11; r++) { //number of rows
        for (let i = 0; i < 11; i++) { //num of elms per row 
            const x = -75 + (i*15);
            const z = -75 + (r*15)
            const origin = new THREE.Vector3(x, 0, z);
            vectors.push(<arrowHelper args={[dir, origin, 10, hex, (3 + fieldStrength), (2 + fieldStrength/2)]}/>)
        }

    }

    const currentVector = () => {
        const origin = new THREE.Vector3(0,0,0);
        const d = new THREE.Vector3(0,1,0);
        d.multiplyScalar(currentDirection)

        return (
            <arrowHelper args={[d, origin, 60 + currentStrength, 0x10e810, 15 + currentStrength, 5 + currentStrength/2]} />
        )
    }

    vectors.push(currentVector())

    const forceVector = () => {
        const origin = new THREE.Vector3(0,15,0);

        const cur = new THREE.Vector3(0,1,0);
        const mag = dir
        mag.multiplyScalar(currentDirection)

        const f = new THREE.Vector3()

        f.crossVectors(cur, mag)

        return (
            <arrowHelper args={[f, origin, 35, 0xe80be4, 10, 5]} />
        )

    }

    vectors.push(forceVector())

    return (
        vectors
    )
}

export default MagField;