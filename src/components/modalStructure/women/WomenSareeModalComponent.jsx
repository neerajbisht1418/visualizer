import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import modalProperties from "../../../utils/modalProperties.json";
import { CiBrightnessDown } from "react-icons/ci";

function initializeRenderer(refContainer) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    preserveDrawingBuffer: true,
  });
  renderer.setSize(700, 850);
  renderer.setClearColor(new THREE.Color(0xffffff));
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 6;

  if (refContainer.current) {
    refContainer.current.appendChild(renderer.domElement);
  }

  return renderer;
}

function initializeCamera() {
  const aspect = 1;
  const camera = new THREE.OrthographicCamera(
    -aspect,
    aspect,
    1,
    -1,
    0.1,
    1000
  );
  camera.position.set(0, 0, 1);
  camera.lookAt(0, 0, 0);

  return camera;
}

function initializeLights(scene) {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(2, 2, 2).normalize();
  scene.add(directionalLight);
}

function useThreeScene(refContainer) {
  const modelRefs = useRef([]);
  const [scene, setScene] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    const sceneInit = new THREE.Scene();
    const rendererInit = initializeRenderer(refContainer);
    const cameraInit = initializeCamera();

    initializeLights(sceneInit);

    setScene(sceneInit);
    setCamera(cameraInit);
    setRenderer(rendererInit);

    return () => {
      if (refContainer.current) {
        refContainer.current.removeChild(rendererInit.domElement);
      }
      rendererInit.dispose();
    };
  }, [refContainer]);

  const loadModel = (modelConfig) => {
    const { modelUrl, textureUrl, position, scale } = modelConfig;
    const loader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    const texture = textureLoader.load(textureUrl, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(1, -1);
    });

    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        model.traverse((child) => {
          if (child.isMesh) {
            child.material.dispose();

            child.material = new THREE.MeshStandardMaterial({
              map: texture,
              color: 0xffffff,
              metalness: 0,
              roughness: 0.6,
              transparent: true,
              opacity: 1,
            });
          }
        });

        model.position.set(position.x, position.y, position.z);
        model.scale.set(scale.x, scale.y, scale.z);

        scene.add(model);
        modelRefs.current.push(model);
      },
      undefined,
      (error) => {
        console.error(
          `An error occurred while loading the model (${modelUrl}):`,
          error
        );
      }
    );
  };

  const loadModels = (modelConfigs) => {
    modelConfigs.forEach(loadModel);
  };

  const updateTextures = (textures) => {
    modelRefs.current.forEach((model, index) => {
      const textureLoader = new THREE.TextureLoader();
      const newTexture = textureLoader.load(textures[index], (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
      });

      model.traverse((child) => {
        if (child.isMesh) {
          child.material.map = newTexture;
          child.material.needsUpdate = true;
        }
      });
    });
  };

  useEffect(() => {
    if (scene && renderer && camera) {
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        const aspect = window.innerWidth / window.innerHeight;
        camera.left = -aspect;
        camera.right = aspect;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth / 2, window.innerHeight);
      };

      const debounceResize = debounce(handleResize, 100);
      window.addEventListener("resize", debounceResize);

      return () => {
        window.removeEventListener("resize", debounceResize);
      };
    }
  }, [scene, renderer, camera]);

  return { loadModels, updateTextures, renderer };
}

function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

function WomenSareeModalComponent({ currentStep, item }) {
  const refContainer = useRef(null);

  const blouseFabric = item?.uploadOptions[0]?.image;
  const palluFabric = item?.uploadOptions[1]?.image;
  const sariFabric = item?.uploadOptions[2]?.image;

  const { loadModels, renderer } = useThreeScene(refContainer);

  useEffect(() => {
    const modelConfigs = [
      {
        modelUrl: "/saree/templete/DSC_0159_SAREE.glb",
        textureUrl: sariFabric,
        position: { x: 0, y: -0.8, z: 0 },
        scale: { x: 3.5, y: 3.5, z: 0.5 },
      },
      {
        modelUrl: "/saree/templete/DSC_0159_SAREE.glb",
        textureUrl: palluFabric,
        position: { x: 0, y: -0.8, z: -10 },
        scale: { x: 3.5, y: 3.5, z: -10 },
      },
      {
        modelUrl: "/saree/templete/DSC_0159_BLOUSE.glb",
        textureUrl: blouseFabric,
        position: { x: 0, y: -0.8, z: 0 },
        scale: { x: 3.5, y: 3.5, z: 0.5 },
      },
      {
        modelUrl: "/saree/templete/DSC_0159_FRONT.glb",
        textureUrl: "/saree/templete/DSC_01595.png",
        position: { x: 0, y: -0.8, z: 0 },
        scale: { x: 3.5, y: 3.5, z: 1 },
      },
    ];

    loadModels(modelConfigs);
  }, [loadModels]);

  const downloadImage = () => {
    if (renderer) {
      const canvas = renderer.domElement;
      const imageUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "model-image.png";
      link.href = imageUrl;
      link.click();
    }
  };

  return (
    <div
      className={`flex ${
        currentStep === 3 && "flex-col"
      } justify-center items-center gap-10 w-full`}
    >
      <div
        ref={refContainer}
        style={{
          position: "relative",
          height: "100%",
          backgroundColor: "lightgray",
        }}
      >
        {currentStep !== 3 ? (
          <img
            className="absolute top-0 left-0 h-[100%] w-[100%] object-cover"
            src={"/watermark.png"}
          />
        ) : null}
      </div>

      <div className="w-full h-full flex flex-col gap-[43px]">
        {currentStep !== 3 ? (
          <div className="min-w-[679px] max-h-[650px] flex-col justify-center items-center m-auto gap-[36px]">
            {modalProperties.map((ele, index) => (
              <div key={index} className="w-[679px] h-[63.61px]">
                <div className="flex justify-between items-center w-full">
                  <p className="pl-12">{ele?.name}</p>
                  <p>{"100%"}</p>
                </div>
                <div className="flex justify-start items-center gap-5">
                  <CiBrightnessDown className="ml-2 text-2xl" />
                  <input
                    id={`range-${index}`}
                    type="range"
                    min={-100}
                    max={100}
                    defaultValue={0}
                    className="block w-full rounded-md focus:border-[#8c2a8d] bg-[#8c2a8d] "
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {currentStep === 3 && (
          <div className="w-full flex justify-center item-center bg-white pt-10">
            <button
              key={"index"}
              onClick={() => downloadImage()}
              style={{ margin: "5px" }}
              className=" border border-primary px-3 py-2 text-primary  font-semibold rounded-xl"
            >
              Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WomenSareeModalComponent;
