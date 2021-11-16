import * as THREE from 'three'

export const MagField = ({direction}) => {
    console.log(typeof(direction))

    let dir;
    switch (direction) {
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

    for (let i = 0; i < 9; i++) {
        const origin = new THREE.Vector3(10, 0, 5*i);
        vectors.push(<arrowHelper args={[dir, origin, 10, hex, 4, 2]}/>)
    }

    return (
        vectors
    )
}

export default MagField;