import React, { useState } from "react";
import faqData from "../../utils/homePage/faq";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-[80rem] px-[1.25rem] mx-auto py-[3rem] lg:py-[6rem] flex flex-col gap-[2rem]">
      <div className="flex flex-col md:flex-row justify-between gap-[2rem] items-start md:items-center">
        <h2 className="text-secondary leading-[3.375rem] font-[600] text-[2.813rem]">
          Frequently Asked
          <span className="text-primary">&nbsp;Questions</span>
        </h2>
        <button className="btn-outline flex gap-[0.625rem] text-[0.875rem] font-[700] items-center ml-auto">
          <p>View All</p>
          <img src="/right-arrow.png" className="h-full" />
        </button>
      </div>

      <div className="border-t">
        {faqData.map((faq, index) => (
          <div key={index} className="border-b">
            <div className="p-[1.45rem_1.25rem]">
              <button
                className="w-full text-left py-0 flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <span
                  className={`text-[1.25rem] font-[600] leading-[1.25rem] flex flex-row ${
                    activeIndex === index ? "text-primary" : "text-black"
                  }`}
                >
                  <span
                    className={`${
                      activeIndex === index ? "text-primary" : "text-[#CAC2D1]"
                    }`}
                  >
                    {(index + 1).toString().padStart(2, "0") + "."}
                  </span>
                  &nbsp; &nbsp;
                  {faq.question}
                </span>
                <span
                  className={`text-xl ${
                    activeIndex === index ? "text-primary" : "text-primary"
                  }`}
                >
                  {activeIndex === index ? (
                    <img src="/subtract.png" alt="Collapse" />
                  ) : (
                    <img src="/add.png" alt="Expand" />
                  )}
                </span>
              </button>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === index
                  ? "max-h-[31.25rem] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="text-primaryLight text-[1rem] leading-[1.563rem] font-[400] p-[1.45rem_1.25rem] pt-2 pb-6 text-align-start">
                {faq?.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
