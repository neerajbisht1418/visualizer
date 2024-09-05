import KurtiModalComponent from "../../modalStructure/kurti/Kurti";
import MenShirtModalComponent from "../../modalStructure/men/MenShirtModalComponent";
import WomenSaree from "../../modalStructure/women/WomenSaree";

const VisualizerImage = ({
  handleCategory,
  item,
  currentStep,
  currentTextures,
}) => {
  return (
    <div className=" ">
      <div className="">
        {item?.name === "Shirt" ? (
          <div>
            <MenShirtModalComponent
              currentStep={currentStep}
              currentTextures={currentTextures}
              item={item}
            />
          </div>
        ) : item?.name === "Sari" ? (
          <div>
            <WomenSaree
              currentStep={currentStep}
              currentTextures={currentTextures}
              item={item}
            />
          </div>
        ) : item?.name === "Kurti" ? (
          <div>
            <KurtiModalComponent
              currentStep={currentStep}
              currentTextures={currentTextures}
              item={item}
            />
          </div>
        ) : (
          <div>Others Component Modals</div>
        )}
      </div>
      {currentStep === 3 ? (
        ""
      ) : (
        <div className="flex justify-end md:pr-20 pt-[3.130rem]">
          <button onClick={() => handleCategory(3)} className="btn-primary">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default VisualizerImage;
