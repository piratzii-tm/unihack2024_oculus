import { Suspense } from 'react';
import { useLoader, Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { createXRStore, XR } from "@react-three/xr";

// Component to create the 360 background with equirectangular texture
function EquirectangularBackground({ imageUrl }) {
    // Load the texture
    const texture = useLoader(THREE.TextureLoader, imageUrl);

    return (
        <mesh scale={[-1, 1, 1]} rotation={[0, Math.PI, 0]}>
            <sphereGeometry args={[600, 50, 40]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
    );
}

const store = createXRStore()

function App() {
    return (
        <>
            <button onClick={() => store.enterAR()}>Enter AR</button>
            <Canvas>
                <Suspense fallback={null}>
                    <XR store={store}>
                        {/* Pass your image URL here */}
                        <EquirectangularBackground imageUrl="https://images.blockadelabs.com/images/imagine/Fantasy_equirectangular-jpg_a_small_but_beautiful_2108588243_12374535.jpg?ver=1" />
                    </XR>
                </Suspense>
            </Canvas>
        </>
    );
}

export default App;