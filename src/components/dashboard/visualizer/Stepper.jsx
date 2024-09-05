import React from "react";

const Stepper = ({ currentStep, setCurrentStep }) => {
  return (
    <>
      <div className="mx-auto mb-20">
        <ul className="steps steps-vertical lg:steps-horizontal">
          <li
            className={`step ${currentStep >= 0 ? "!step-primary" : ""}  ${
              currentStep >= 0 ? "!text-primary" : "text-secondary"
            } text-[1rem] leading-[1.15rem]  Barlow `}
            data-content={`${currentStep >= 0 ? `✓` : "1"}`}
            onClick={() => {
              if (currentStep >= 0) {
                setCurrentStep(0);
              }
            }}
          >
            Category selection
          </li>
          <li
            className={`step ${currentStep >= 1 ? "!step-primary" : ""}  ${
              currentStep >= 1 ? "!text-primary" : "text-secondary"
            } text-[1rem] leading-[1.15rem] Barlow`}
            data-content={`${currentStep >= 1 ? `✓` : "2"}`}
            onClick={() => {
              if (currentStep >= 1) {
                setCurrentStep(1);
              }
            }}
          >
            Upload Image
          </li>
          <li
            className={`step ${currentStep >= 2 ? "!step-primary" : ""}   ${
              currentStep >= 2 ? "!text-primary" : "text-secondary"
            } text-[1rem] leading-[1.15rem] Barlow`}
            data-content={`${currentStep >= 2 ? `✓` : "3"}`}
            onClick={() => {
              if (currentStep >= 2) {
                setCurrentStep(2);
              }
            }}
          >
            Visualizer Image
          </li>
          <li
            className={`step ${currentStep >= 3 ? "!step-primary" : ""}   ${
              currentStep >= 3 ? "!text-primary" : "text-secondary"
            } text-[1rem] leading-[1.15rem] Barlow`}
            data-content={`${currentStep >= 3 ? `✓` : "4"}`}
            onClick={() => {
              if (currentStep >= 3) {
                setCurrentStep(3);
              }
            }}
          >
            Download Image
          </li>
        </ul>
      </div>
    </>
  );
};

export default Stepper;
