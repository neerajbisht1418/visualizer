import { useEffect, useState } from "react";
import VisulaizerModel from "./VisulaizerModel";
import Stepper from "./Stepper";
import Category from "./Category";
import Upload from "./Upload";
import VisualizerImage from "./VisualizerImage";

const categoryDetails = [
  {
    name: "Men",
    items: [
      {
        name: "Shirt",
        imageUrl: "/shirtV.png",
        uploadOptions: [{ id: 1, name: "Shirt-Fabric", image: null }],
      },
      { name: "Trouser", imageUrl: "/trouserV.png" },
      { name: "Suit", imageUrl: "/suitV.png" },
    ],
  },
  {
    name: "Women",
    items: [
      {
        name: "Sari",
        imageUrl: "/sariV.png",
        uploadOptions: [
          { id: 1, name: "Add Blouse", image: null },
          { id: 2, name: "Add Pallu", image: null },
          { id: 3, name: "Add Sari", image: null },
        ],
      },

      {
        name: "Kurti",
        imageUrl: "/kurtiV.png",
        uploadOptions: [
          { id: 1, name: "Suit", image: null },
          { id: 2, name: "Salwar", image: null },
          { id: 3, name: "Chunni", image: null },
        ],
      },
    ],
  },
  {
    name: "Others",
    items: [
      { name: "Sari", imageUrl: "/sariV.png" },
      { name: "Shirt", imageUrl: "/shirtV.png" },
      { name: "Mask", imageUrl: "/maskV.png" },
    ],
  },
];

const Visualizer = ({ title }) => {
  const [click, setClick] = useState();
  const [open, setOpen] = useState(true);
  const [item, setItem] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("Men");
  const [currentIndex, setCurrentIndex] = useState(0);

  const [currentTextures, setCurrentTextures] = useState("");

  const handleCategory = (steps) => {
    setCurrentStep(steps);
  };

  const onClose = () => {
    setOpen(!open);
  };
  useEffect(() => {
    {
      open
        ? document.body.classList.add("overflow-hidden")
        : document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  return (
    <>
      {open && <VisulaizerModel open={open} onClose={onClose} />}
      <div className="container-custom">
        <h1 className="text-secondary text-[2rem] font-semibold my-[3.125rem]">
          {title}
        </h1>
        <div className="flex flex-col bg-white xl:py-[3.125rem] py-12 rounded-[1rem] ">
          <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />

          <div
            className={`${
              currentStep === 0 && "flex sm:flex-row flex-col "
            } ml-10 `}
          >
            {currentStep === 0 && (
              <div className="flex flex-col  gap-12 h-[300px] ">
                <h3 className="font-[700] text-[1.625rem] leading-[1.95rem] text-secondary Barlow text-nowrap">
                  Category Selection
                </h3>
                <div className="border flex flex-col gap-2 p-5 bg-[#f3f2f7] rounded-xl">
                  <p className="font-[700] text-[1.1rem] leading-[1.95rem] text-secondary Barlow text-nowrap">
                    Category
                  </p>
                  <div className="flex flex-col gap-2 justify-start items-start w-full">
                    {categoryDetails &&
                      categoryDetails?.map((ele, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            handleCategoryChange(ele?.name);
                            setCurrentIndex(index);
                          }}
                          className={`border w-full items-start align-text-top rounded-xl p-1 ${
                            currentCategory === ele?.name
                              ? "bg-primary text-white"
                              : "bg-white"
                          }`}
                        >
                          {ele?.name}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            )}

            <div>
              {currentStep === 0 && (
                <Category
                  items={categoryDetails[currentIndex]?.items}
                  handleCategory={handleCategory}
                  click={click}
                  setClick={setClick}
                  setItem={setItem}
                />
              )}
              {currentStep === 1 && (
                <Upload
                  handleCategory={handleCategory}
                  uploadOptions={item}
                  setCurrentTextures={setCurrentTextures}
                  setItem={setItem}
                  item={item}
                />
              )}
              {(currentStep === 2 || currentStep === 3) && (
                <VisualizerImage
                  handleCategory={handleCategory}
                  item={item}
                  currentStep={currentStep}
                  currentTextures={currentTextures}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Visualizer;
