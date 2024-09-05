import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import productData from "../../../utils/products.json";
import kurtaTemplate from "../../../utils/kurtaTemplate.json";
import { set } from "react-hook-form";

const createBackgroundMesh = (
  textureUrl,
  index,
  backgroundPosition,
  backgroundScale
) => {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(textureUrl);

  const aspect = window.innerWidth / window.innerHeight;
  const geometry = new THREE.PlaneGeometry(2 * aspect, 2);

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 1,
    toneMapped: false,
  });

  const backgroundMesh = new THREE.Mesh(geometry, material);
  backgroundMesh.position.set(
    Number(backgroundPosition?.x),
    Number(backgroundPosition?.y),
    Number(backgroundPosition?.z)
  );
  backgroundMesh.scale.set(
    Number(backgroundScale?.x),
    Number(backgroundScale?.y),
    Number(backgroundScale?.z)
  );

  return backgroundMesh;
};

function useThreeScene(
  refContainer,
  initialTextures,
  index = 0,
  position,
  scale,
  backgroundPosition,
  backgroundScale,
  position2,
  scale2,
  position3,
  scale3,
  position001,
  scale001,
  item
) {
  const modelRefs = useRef([]);
  const [scene, setScene] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    const sceneInit = new THREE.Scene();
    const aspect = 777 / 1000;

    // const backgroundMesh = createBackgroundMesh(
    //   kurtaTemplate[0]?.body_png,
    //   index,
    //   backgroundPosition,
    //   backgroundScale
    // );
    // sceneInit.add(backgroundMesh);

    const cameraInit = new THREE.OrthographicCamera(
      -aspect,
      aspect,
      1,
      -1,
      0.1,
      1000
    );
    cameraInit.position.set(0, 0, 5);
    cameraInit.lookAt(0, 0, 0);

    const rendererInit = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
    });
    rendererInit.setSize(777, 1000);
    rendererInit.setClearColor(new THREE.Color(0xffffff));
    rendererInit.outputColorSpace = THREE.LinearSRGBColorSpace;

    rendererInit.toneMapping = THREE.ACESFilmicToneMapping;
    rendererInit.toneMappingExposure = 6;

    if (refContainer.current) {
      refContainer.current.appendChild(rendererInit.domElement);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    sceneInit.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 2).normalize();
    sceneInit.add(directionalLight);

    setScene(sceneInit);
    setCamera(cameraInit);
    setRenderer(rendererInit);

    return () => {
      if (refContainer.current) {
        refContainer.current.removeChild(rendererInit.domElement);
      }
      rendererInit.dispose();
    };
  }, [
    refContainer,
    index,
    position,
    scale,
    backgroundPosition,
    backgroundScale,
  ]);

  const loadModel = (modelUrl, textureUrl, position, scale, rotate) => {
    const loader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    const texture = textureLoader.load(textureUrl, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace; // Set color space to sRGB
      if (rotate) {
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.x = 1;
        tex.repeat.y = -1;
      }
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

            const newMaterial = new THREE.MeshStandardMaterial({
              map: texture,
              color: 0xffffff,
              metalness: 0,
              roughness: 0.6,
              transparent: true,
              opacity: 1,
            });

            child.material = newMaterial;
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
          `An error occurred while loading the GLB file (${modelUrl}):`,
          error
        );
      }
    );
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

  const suitFabric = item?.uploadOptions[0]?.image;
  const salwarFabric = item?.uploadOptions[1]?.image;
  const chunniFabric = item?.uploadOptions[2]?.image;

  useEffect(() => {
    if (scene && renderer && camera) {
      loadModel(
        kurtaTemplate[index]?.kurti_glb,
        suitFabric,
        { x: 0, y: -0.45, z: 0 },
        { x: 0.4, y: 0.4, z: 0.5 }
      );
      loadModel(
        kurtaTemplate[index]?.kurti_glb,
        suitFabric,
        { x: 0, y: -0.45, z: 2 },
        { x: 0.4, y: 0.4, z: -5 }
      );
      loadModel(
        kurtaTemplate[index]?.bottom_glb,
        salwarFabric,
        { x: 0, y: -0.45, z: 0 },
        { x: 0.4, y: 0.4, z: 0.5 }
      );
      loadModel(
        kurtaTemplate[index]?.dupatta_glb,
        chunniFabric,
        { x: 0, y: -0.45, z: 0 },
        { x: 0.4, y: 0.4, z: 0.5 }
      );
      loadModel(
        kurtaTemplate[index]?.dupatta_glb,
        chunniFabric,
        { x: 0, y: -0.45, z: 2 },
        { x: 0.4, y: 0.4, z: -5 }
      );
      loadModel(
        kurtaTemplate[index]?.body_glb,
        kurtaTemplate[index]?.body_png,
        { x: 0, y: -0.45, z: 0 },
        { x: 0.4, y: 0.4, z: 0.5 },
        true
      );

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        const aspect = window.innerWidth / window.innerHeight;
        camera.left = -aspect;
        camera.right = aspect;
        camera.top = 1;
        camera.bottom = -1;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth / 2, window.innerHeight);
      };

      const debounceResize = debounce(handleResize, 100);
      window.addEventListener("resize", debounceResize);

      return () => {
        window.removeEventListener("resize", debounceResize);
      };
    }
  }, [scene, renderer, camera, index]);

  return { updateTextures, renderer };
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

function KurtiModalComponent({ currentStep, item }) {
  const refContainer = useRef(null);
  const [currentTextures, setCurrentTextures] = useState(
    productData[1]?.textures[0].layerImage || ""
  );
  const [index, setIndex] = useState(0);
  const [position, setPosition] = useState(kurtaTemplate[index]?.position_01);
  const [position2, setPosition2] = useState(kurtaTemplate[index]?.position_02);
  const [position3, setPosition3] = useState(kurtaTemplate[index]?.position_03);
  const [position001, setPosition001] = useState(
    kurtaTemplate[index]?.position_001
  );
  const [scale, setScale] = useState(kurtaTemplate[index]?.scale_01);
  const [scale2, setScale2] = useState(kurtaTemplate[index]?.scale_02);
  const [scale3, setScale3] = useState(kurtaTemplate[index]?.scale_03);
  const [scale001, setScale001] = useState(kurtaTemplate[index]?.scale_001);
  const [backgroundPosition, setBackgroundPosition] = useState(
    kurtaTemplate[index]?.background_position
  );
  const [backgroundScale, setBackgroundScale] = useState(
    kurtaTemplate[index]?.background_scale
  );

  const decimalChangeX = 0.01;
  const decimalChangeY = 0.01;
  const decimalChangeZ = 0.01;

  const { updateTextures, renderer } = useThreeScene(
    refContainer,
    currentTextures,
    index,
    position,
    scale,
    backgroundPosition,
    backgroundScale,
    position2,
    scale2,
    position3,
    scale3,
    position001,
    scale001,
    item
  );

  useEffect(() => {
    // setPosition(kurtaTemplate[index]?.position_01);
    // setScale(kurtaTemplate[index]?.scale_01);
    // setBackgroundPosition(kurtaTemplate[index]?.background_position);
    // setBackgroundScale(kurtaTemplate[index]?.background_scale);
    updateTextures(currentTextures);
  }, [
    currentTextures,
    updateTextures,
    index,
    position,
    scale,
    backgroundPosition,
    backgroundScale,
    item,
  ]);

  const handleChangeModel = (value) => {
    setIndex(value);
  };

  const handlePositionChange = (axis, increment) => {
    setPosition((prev) => ({
      ...prev,
      [axis]: parseFloat((prev[axis] + increment).toFixed(3)),
    }));
  };

  const handleScaleChange = (axis, increment) => {
    setScale((prev) => ({
      ...prev,
      [axis]: parseFloat((prev[axis] + increment).toFixed(3)),
    }));
  };

  const handleBackgroundPositionChange = (axis, increment) => {
    setBackgroundPosition((prev) => ({
      ...prev,
      [axis]: parseFloat((prev[axis] + increment).toFixed(3)),
    }));
  };

  const handleBackgroundScaleChange = (axis, increment) => {
    setBackgroundScale((prev) => ({
      ...prev,
      [axis]: parseFloat((prev[axis] + increment).toFixed(3)),
    }));
  };

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

      <div className="w-full h-full flex flex-col gap-[43px] bg-green-400">
        {currentStep !== 3 ? (
          <div className="min-w-[679px] max-h-[650px] flex-col justify-center items-center m-auto gap-[36px]"></div>
        ) : null}

        {currentStep === 3 && (
          <div className="w-full flex justify-center item-center bg-white pt-10">
            <button
              key={"index"}
              onClick={(e) => {
                downloadImage();
              }}
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

export default KurtiModalComponent;
