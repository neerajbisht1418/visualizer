import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import productData from "../../../utils/products.json";
import menShirtTemplate from "../../../utils/menShirtTemplate.json";
import ModelStyleSelector from "./ModelStyleSelector";

const applyMaterialProperties = (material, properties) => {
  if (material) {
    console.log("Applying properties:", properties);
    if (properties.brightness !== undefined) {
      material.color.multiplyScalar(properties.brightness);
    }
    if (properties.contrast !== undefined) {
      material.color.offsetHSL(0, 0, properties.contrast - 1);
    }
    if (properties.saturation !== undefined) {
      material.color.offsetHSL(0, properties.saturation - 1, 0);
    }
    if (properties.exposure !== undefined) {
      material.color.multiplyScalar(properties.exposure);
    }
    if (properties.zoom !== undefined) {
      console.log("Zoom property is set to:", properties.zoom);
    }
    if (properties.shine !== undefined) {
      material.roughness = 1 - properties.shine;
    }
    if (properties.shadow !== undefined) {
      console.log("Shadow property is set to:", properties.shadow);
    }

    material.needsUpdate = true;
  }
};

function useThreeScene(
  refContainer,
  initialTextures,
  index = 0,
  position,
  scale,
  backgroundPosition,
  backgroundScale,
  properties,
  currentTextures
) {
  const modelRefs = useRef([]);
  const [scene, setScene] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    const sceneInit = new THREE.Scene();
    const aspect = 777 / 1000;

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
    rendererInit.toneMappingExposure = 5;

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
    currentTextures,
  ]);

  const loadModel = (modelUrl, textureUrl, position, scale, shadow) => {
    const loader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(textureUrl, (tex) => {
      tex.colorSpace = !shadow ? THREE.SRGBColorSpace : THREE.SRGBColorSpace;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.x = 1;
      tex.repeat.y = -1;
      // tex.anisotropy = maxAnisotropy;
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
              metalness: shadow ? -20 : 0,
              roughness: 0,
              transparent: true,
              opacity: shadow ? 1 : 1,
              blending: shadow ? THREE.MultiplyBlending : THREE.NormalBlending,
              reflectivity: 1,
              shininess: 10,
              // emissiveIntensity:-1
            });

            applyMaterialProperties(newMaterial, properties);
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

  useEffect(() => {
    if (scene && renderer && camera) {
      loadModel(
        menShirtTemplate[index]?.shirt_glb,
        initialTextures,
        {
          x: 0,
          y: -0.7,
          z: -10,
        },
        {
          x: 0.4,
          y: 0.4,
          z: 0.5,
        }
        // properties
      );

      loadModel(
        menShirtTemplate[index].shirt_glb,
        initialTextures,
        {
          x: 0,
          y: -0.7,
          z: -12,
        },
        {
          x: 0.4,
          y: 0.4,
          z: -10,
        }
        // properties
      );
      loadModel(
        menShirtTemplate[index].shirt_glb,
        initialTextures,
        {
          x: 0,
          y: -0.7,
          z: -15,
        },
        {
          x: 0.4,
          y: 0.4,
          z: -20,
        }
        // properties
      );
      loadModel(
        menShirtTemplate[index].body_glb,
        menShirtTemplate[index].body_png,
        {
          x: 0,
          y: -0.7,
          z: index === 0 ? -10 : 0,
        },
        {
          x: 0.4,
          y: 0.4,
          z: 10,
        }
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
  }, [scene, renderer, camera, index, properties, currentTextures]);

  return { renderer };
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

function MenShirtModalComponent({ currentStep, item }) {
  let currentTextures =
    item?.uploadOptions[0]?.image || productData[1]?.textures[0].layerImage;
  const refContainer = useRef(null);
  const [index, setIndex] = useState(4);
  const [position, setPosition] = useState(
    menShirtTemplate[index]?.position_01
  );
  const [scale, setScale] = useState(menShirtTemplate[index]?.scale_01);
  const [backgroundPosition, setBackgroundPosition] = useState(
    menShirtTemplate[index]?.background_position
  );
  const [backgroundScale, setBackgroundScale] = useState(
    menShirtTemplate[index]?.background_scale
  );

  const [properties, setProperties] = useState({
    brightness: 1,
    contrast: 1,
    saturation: 1,
    exposure: 1,
    zoom: 1,
    shine: 1,
    shadow: 1,
    reset: 0,
  });

  const handlePropertyChange = (property, value) => {
    setProperties((prevProps) => ({
      ...prevProps,
      [property]: value,
    }));
  };

  const { renderer } = useThreeScene(
    refContainer,
    currentTextures,
    index,
    position,
    scale,
    backgroundPosition,
    backgroundScale,
    properties
  );

  useEffect(() => {
    setPosition(menShirtTemplate[index]?.position_01);
    setScale(menShirtTemplate[index]?.scale_01);
    setBackgroundPosition(menShirtTemplate[index]?.background_position);
    setBackgroundScale(menShirtTemplate[index]?.background_scale);
  }, []);

  const handleChangeModel = (value) => {
    setIndex(value);
  };

  function changeFirstLetter(word) {
    const firstWord = word[0];
    const upperCaseFirstWord = firstWord.toUpperCase();
    const remainingLetters = word.slice(1);
    const newWord = upperCaseFirstWord + remainingLetters;
    return newWord;
  }

  const updateBackground = (val, min, max) => {
    const percentage = ((val - min) / (max - min)) * 100;
    const slider = document.querySelector(".range-custom");
    slider.style.background = `linear-gradient(to right, #8c2a8d ${percentage}%, #e1d8e9 ${percentage}%)`;
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

  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     console.log("reader", reader);
  //     reader.onloadend = () => {
  //       setCurrentTextures(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <div className="bg-[#f3f2f7]">
      <div className=" flex flex-row justify-around items-center bg-white  rounded-2xl ">
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
        {currentStep !== 3 && (
          <div className="flex flex-col gap-[43px] justify-around items-center  bg-white ">
            <div className="min-w-[679px] max-h-[650px] flex-col justify-start items-start gap-[36px]">
              {Object.keys(properties).map((property) => {
                let min, max;

                switch (property) {
                  case "brightness":
                  case "contrast":
                  case "saturation":
                  case "exposure":
                    min = 0;
                    max = 2;
                    break;
                  case "zoom":
                    min = 0.5;
                    max = 2;
                    break;
                  case "shine":
                  case "shadow":
                    min = 0;
                    max = 1;
                    break;
                  default:
                    min = 0;
                    max = 1;
                }

                return (
                  <div key={property}>
                    {property === "reset" ? (
                      <div className="w-full  flex justify-center items-center font-barlow mt-5">
                        <button className="w-[140px] h-[48px] rounded-md    bg-[#E1D9E9] text-md font-bold text-primary">
                          Reset
                        </button>
                      </div>
                    ) : (
                      <div>
                        <label className="text-sm font-[700]  font-barlow flex justify-between ">
                          <p>{changeFirstLetter(property)}</p>
                          <p>{(properties[property] * 100).toFixed(0)}%</p>
                        </label>
                        <input
                          type="range"
                          min={min}
                          max={max}
                          step="0.01"
                          value={properties[property]}
                          onChange={(e) => {
                            handlePropertyChange(
                              property,
                              parseFloat(e.target.value)
                            );
                            updateBackground(e.target.value, min, max);
                          }}
                          className=""
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <ModelStyleSelector
              menShirtTemplate={menShirtTemplate}
              handleChangeModel={handleChangeModel}
            />
            {/* <div className="w-full  flex justify-end items-end font-barlow">
              <button className="w-[140px] h-[48px] rounded-md    bg-primary text-md font-bold text-white">
                Save
              </button>
            </div> */}
          </div>
        )}
      </div>
      {currentStep === 3 && (
        <div className="w-full flex justify-center item-center bg-white pt-10">
          <button
            key={index}
            onClick={() => downloadImage()}
            style={{ margin: "5px" }}
            className=" border border-primary px-3 py-2 text-primary  font-semibold rounded-xl"
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
}

export default MenShirtModalComponent;
