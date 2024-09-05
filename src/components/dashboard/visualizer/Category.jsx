import { useState } from "react";

import Tooltip from "./Tooltip";

const Category = ({ items, handleCategory, click, setClick, setItem }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className="w-full">
      <div className="w-full  flex justify-end xl:px-[3.125rem] px-8">
        <Tooltip
          setTooltipVisible={setTooltipVisible}
          tooltipVisible={tooltipVisible}
        />
        {/* <IoInformationCircle size={24} className=" text-primary" /> */}
      </div>
      <div className="flex flex-col justify-center xl:px-[3.125rem] xl:py-[3.130rem] px-8 pt-8">
        <div className="flex flex-wrap gap-[1.5rem] ">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center border rounded-[.5rem] w-full sm:w-[calc(50%-0.75rem)] md:w-[calc((100%/3)-1.125rem)] xl:w-[calc(25%-1.125rem)] ${
                click === index ? "border-primary" : ""
              }`}
              onClick={() => {
                setClick(index);
                setItem(item);
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-[34.438rem] h-[18rem] py-[0.75rem]  object-contain"
              />
              <span className="text-primary font-[600] text-[1.1rem] leading-[1.35rem] Barlow pb-[1.5rem]">
                {item.name}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-end pt-[3.130rem]">
          <button onClick={() => handleCategory(1)} className="btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
