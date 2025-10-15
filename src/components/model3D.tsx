
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

function Model3D() {



    const Model = () => {
        // const gltf = useLoader(GLTFLoader, "../../public/scene.gltf");
        const gltf = useLoader(GLTFLoader, "/scene.gltf");

        return (
            <>
                <primitive object={gltf.scene} scale={0.4} />
            </>
        );
    };
    return (
        <div>
            <div style={{ width: "100%", height: "100dvh" }}>
                <Canvas camera={{
                    position: [200, 30, 20],  // X, Y, Z position of the camera
                    fov: 70               // field of view (default 75, smaller = zoomed in)
                }} >
                    
                    <Model  />


                    <OrbitControls
                        enableZoom={true}
                        enablePan={false}
                        enableRotate={true}
                        maxPolarAngle={Math.PI / 2}  // Prevent going under the model
                        minDistance={7}              // Zoom limits
                        maxDistance={9}
                    />

                    <Environment preset="night"   />

                </Canvas>

            </div>
        </div>
    );
}

export default Model3D;

