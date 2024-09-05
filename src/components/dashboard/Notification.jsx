import React from "react";
import { IoMdClose } from "react-icons/io";
const notification = [
  {
    image: "/notification.png",
    title: "Simply Dummy",
    description: "High fived your workout",
    time: "0 min",
  },
  {
    image: "/notification.png",
    title: "Simply Dummy",
    description: "High fived your workout",
    time: "0 min",
  },
  {
    image: "/notification.png",
    title: "Simply Dummy",
    description: "High fived your workout",
    time: "0 min",
  },
  {
    image: "/notification.png",
    title: "Simply Dummy",
    description: "High fived your workout",
    time: "0 min",
  },
  {
    image: "/notification.png",
    title: "Simply Dummy",
    description: "High fived your workout",
    time: "0 min",
  },
  {
    image: "/notification.png",
    title: "Simply Dummy",
    description: "High fived your workout",
    time: "0 min",
  },
  {
    image: "/notification.png",
    title: "Simply Dummy",
    description: "High fived your workout",
    time: "0 min",
  },
];

const Notification = ({ open, onClose }) => {
  return (
    <>
      {open && (
        <div
          className={`absolute mt-[1rem] right-20 top-50 gap-[.1rem] w-[20.3rem] m-auto bg-white overflow-hidden flex flex-col rounded-[.75rem] shadow-[2px_2px_12px_0px_#CAC2D1] border-b-4 border-primary ${
            open ? "fade-in-slide-in" : "fade-in-slide-out"
          } `}
        >
          <div className="flex justify-between px-[1.25rem] max-w-[320px] py-[1.5rem] border-b-[.06rem]">
            <h3 className="font-bold text-[1.1rem] leading-[1.5rem] text-secondary">
              Notification
            </h3>
            <IoMdClose
              size={20}
              className="text-primary cursor-pointer"
              onClick={onClose}
            />
          </div>
          <div className=" overflow-y-auto scrollbar max-h-[20rem]">
            {notification?.map((item, index) => (
              <div
                key={index}
                className="flex py-[1rem] px-[1.25rem] gap-[.65rem]  hover:bg-[#EFE8F5] transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <div>
                  <img
                    className="w-[2.5rem] h-[2.5rem] transition-transform duration-300 ease-in-out hover:scale-110"
                    src={item?.image}
                    alt=""
                  />
                </div>
                <div>
                  <h3 className="font-medium text-[1rem] leading-[1.25rem] text-secondary transition-colors duration-300 ease-in-out">
                    {item?.title}
                  </h3>
                  <div className="flex justify-between gap-10">
                    <p className="font-medium text-[0.9rem] leading-[1.1rem] text-primaryLight transition-colors duration-300 ease-in-out">
                      {item?.description}
                    </p>
                    <p className="font-normal text-[0.75rem] leading-[1rem] text-primary transition-colors duration-300 ease-in-out">
                      {item?.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
