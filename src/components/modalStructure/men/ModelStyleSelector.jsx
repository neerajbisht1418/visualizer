import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const ModelStyleSelector = ({ menShirtTemplate, handleChangeModel }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleModelClick = (index) => {
    if (index === 9) {
      setShowPopup(true);
    } else {
      handleChangeModel(index);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="w-full ">
      <div className="max-w-[677px] m-auto flex flex-col">
        <div className="font-semibold text-xl  font-barlow">Modal Style</div>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          {menShirtTemplate?.slice(0, 10).map((item, index) => (
            <div
              key={index}
              className={`relative w-[120px] h-[120px] flex items-center justify-center shadow-lg rounded-lg transition-all duration-300 transform hover:scale-110 ${
                index === 9 ? "bg-purple-100 " : ""
              }`}
            >
              <button
                className="text-white p-[5px] w-full h-full flex items-center justify-center"
                onClick={() => handleModelClick(index)}
              >
                <img
                  src={item?.shirt_img}
                  width="90px"
                  height="90px"
                  className={`object-cover bg-white object-center rounded-lg mix-blend-multiply `}
                />
                {index === 9 && (
                  <p className="text-sm  text-white text-center opacity-1 absolute bottom-5 right-[50%] left-[50%] text-nowrap flex justify-center items-center  font-bold">
                    View All{" "}
                  </p>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg max-w-[40%] max-h-[80%] overflow-y-auto">
            <div className="flex justify-between items-center my-4">
              <p className="text-xl font-semibold text-nowrap">Modal Style</p>
              <button
                className=" text-red-500 underline flex justify-end items-end w-full pr-10 "
                onClick={handlePopupClose}
              >
                <IoMdClose className="bg-primary text-white rounded-full text-xl p-0.5 font-bold" />
              </button>
            </div>

            <div className="flex flex-wrap gap-4 justify-center items-center">
              {menShirtTemplate?.map((item, index) => (
                <div
                  key={index}
                  className="w-[120px] h-[120px] flex items-center justify-center shadow-lg rounded-lg transition-all duration-300 transform hover:scale-110"
                >
                  <button
                    className="text-white p-[5px] w-full h-full flex items-center justify-center"
                    onClick={() => {
                      handleChangeModel(index);
                      handlePopupClose();
                    }}
                  >
                    <img
                      src={item?.shirt_img}
                      width="90px"
                      height="90px"
                      className="object-cover object-center rounded-lg bg-[#f9fafc]"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelStyleSelector;
