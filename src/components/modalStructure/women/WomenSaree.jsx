import WomenSareeModalComponent from "./WomenSareeModalComponent";

const WomenSaree = ({ currentStep, item }) => {
  return (
    <div className="w-full h-full flex">
      <WomenSareeModalComponent currentStep={currentStep} item={item} />
    </div>
  );
};

export default WomenSaree;
