import React from "react";
import { IoInformationCircle } from "react-icons/io5";

const Tooltip = ({ setTooltipVisible, tooltipVisible }) => {
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        className="focus:outline-none"
      >
        <IoInformationCircle size={24} className="text-primary" />
      </button>

      {tooltipVisible && (
        <div
          role="tooltip"
          className="absolute w-[25rem] z-10 px-3 py-2 text-sm font-medium  bg-white rounded-lg shadow-lg"
          style={{
            bottom: "100%",
            left: "50%",
            transform: "translateX(-90%)",
            marginBottom: "8px",
          }}
        >
          <p className="text-secondary font-[500] text-[1rem] leading-[1.6rem]">
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. In publishing and
            graphic design, Lorem ipsum is a placeholder text commonly used to
            demonstrate the visual form of a document or a typeface without
            relying on meaningful content.
          </p>

          <div
            className="absolute h-0 border-t-8 border-t-primary border-l-8 border-r-8 border-l-transparent border-r-transparent"
            style={{
              bottom: "-8px",
              transform: "translateX(2100%)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
