import React from "react";
import service from "../../utils/homePage/service";

const OurServices = () => {
  
  return (
    <div className="max-w-[80rem] px-[1.25rem] mx-auto flex flex-col gap-[2.188rem] py-[3rem] md:py-[5.938rem]">
      <div className="flex flex-col gap-[0.5rem] items-center">
        <h2 className="text-[2.813rem] leading-[3.375rem] font-bold text-secondary ">
          Our <span className="text-primary">Services</span>
        </h2>
        <p className="text-primaryLight leading-[1.5rem] text-[1rem] font-[400]  ">
          Seamlessly drape garments digitally
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 w-full gap-[1.5rem]">
        {service.map((feature, index) => (
          <div
            key={index}
            className=" p-[2rem] hover:shadow-[2px_2px_12px_0px_#CAC2D1] group rounded-lg border hover:border-[#fff] border-[#E1D9E9] transition duration-300 hover:bg-[#EFE8F5] 
             flex flex-col gap-[1rem] items-center"
          >
            <div className="relative z-[0] h-14 w-14">
              <div className="absolute z-[1] top-0 left-0  translate-x-[25%] translate-y-[25%] h-14 w-14 transition ease-in-out duration-500 rounded-[10px_5px_10px_5px] bg-[#EFE8F5] group-hover:rounded-[10px] group-hover:bg-[#8C2A8D3D] group-hover:translate-x-[0%] group-hover:translate-y-[0%]"></div>
              <img
                className="relative z-[2] h-[3rem] w-[3rem] top-0 left-0  translate-x-[-25%] translate-y-[-25%] transition ease-in-out duration-500 group-hover:translate-x-[5%] group-hover:translate-y-[5%]"
                src={feature?.icon}
              />
            </div>

            <h1 className="leading-[.25ren] font-[700] text-[1.375rem] text-center ">
              {feature.title}
            </h1>
            <p className=" text-center leading-[1.25rem] font-[400] text-primaryLight text-[1rem] pb-[1rem]">
              {feature.description}
            </p>
            <a
              href={feature.link}
              className="text-primary text-[1rem] leading-[1.25rem] font-semibold inline-flex items-center mt-auto  underline"
            >
              View More
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14m-7-7l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OurServices;
