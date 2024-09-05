import React, { useEffect } from "react";
import Notification from "./Notification";
import { FaRegUser } from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";
import { MdOutlineChangeCircle } from "react-icons/md";
import { TbLogout } from "react-icons/tb";

const DashboardNavbar = ({
  links,
  setActiveLink,
  setIsMobile,
  setProfileOpen,
  setToggle,
  activeLink,
  toggle,
  openNotification,
  SetOpenNotification,
  mobileVeiw,
  profile,
  profileTriggerRef,
  openProfile,
  onClose,
  handleProfile,
  handleLogout,
  profileDropdownRef,
  profileOpen,
  isMobile,
  toogleTriggerRef,
  notificationTriggerRef,
  setOpenProfile,
}) => {
  useEffect(() => {}, [toggle]);

  return (
    <div className="container-custom border-b-[0.063rem] border-primaryInputBorder py-4">
      <div className="flex justify-between items-center z-50 ">
        <a href="#">
          <img className="h-[4rem]" src={"/logo_new.png"} alt="Visualizer" />
        </a>

        <div className="hidden md:flex items-center gap-[2rem] lg:gap-[5.313rem]">
          {links?.map((item, i) => (
            <div
              key={i}
              onClick={(e) => {
                setActiveLink(i);
              }}
              className={` ${
                activeLink == i ? "text-primary" : "text-primaryLight"
              }  text-[1.15rem] leading-[1.35rem] menu-item cursor-pointer ${
                activeLink == i ? "font-[700]" : "font-[500]"
              } `}
            >
              {item?.name}
            </div>
          ))}
        </div>
        {/* <div }> */}
        {toggle && (
          <div
            ref={toogleTriggerRef}
            className="absolute md:hidden z-[10] top-[4.6rem] left-[0px] w-full min-h-[calc(100vh-5rem)] h-full bg-white "
          >
            <div className="p-[1.25rem] h-full flex flex-col gap-[2rem]">
              <div className="flex flex-col items-start gap-[1.5rem]">
                {links.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setActiveLink(i);
                      setIsMobile(!isMobile);
                      setToggle(!toggle);
                    }}
                    className={`navbar-link ${
                      activeLink === i ? "active" : ""
                    }`}
                  >
                    {item?.name}
                  </div>
                ))}
              </div>
              <div className="flex gap-[0.9rem]">
                <button className="btn-outline" onClick={handleLogout}>
                  LogOut
                </button>
              </div>
            </div>
          </div>
        )}
        {/* </div> */}

        <div className="flex justify-center items-center">
          <div
            ref={notificationTriggerRef}
            className="relative w-12 h-12 bg-purpleLight rounded-[0.938rem] flex items-center justify-center"
            onClick={() => SetOpenNotification(!openNotification)}
          >
            <img src="/icn-bell.svg" alt="" className="w-7 h-7" />
            <div className="w-6 h-6 bg-primary text-white !text-xs rounded-full flex items-center justify-center m-auto absolute top-[-.5rem] right-[-.5rem] border-[0.125rem] border-white">
              13
            </div>
            {openNotification && (
              <div className="absolute top-10 sm:right-[-40px] right-[-13rem]">
                <Notification open={openNotification} onClose={onClose} />
              </div>
            )}
          </div>

          <span className="w-px h-14 bg-primaryInputBorder ms-4 me-2 lg:me-10 lg:ms-6"></span>
          <div className="flex justify-center items-center lg:gap-x-5 gap-x-2">
            {mobileVeiw ? (
              ""
            ) : (
              <p className="text-secondary">
                Hello, <span className="font-bold">{profile?.first_name}</span>
              </p>
            )}

            <div className="relative z-50">
              <div
                onClick={() => handleProfile()}
                ref={profileTriggerRef}
                className="bg-white cursor-pointer rounded-full"
              >
                <img
                  src="/img-girl.jpg"
                  alt="User"
                  className="min-w-14 min-h-14 w-14 h-14 rounded-full border-white border-4 object-cover"
                />
              </div>
              {openProfile && (
                <div
                  ref={profileDropdownRef}
                  className="absolute top-16 right-0 gap-[.1rem] w-[12.5rem] m-auto bg-white overflow-hidden flex flex-col rounded-[.75rem] shadow-[2px_2px_12px_0px_#CAC2D1] border-b-4 border-primary"
                >
                  <div
                    className={`flex flex-row cursor-pointer justify-start gap-[.6rem] px-[1.2rem] py-[1rem] ${
                      profileOpen === 1 ? "bg-[#EFE8F5]" : "bg-white"
                    }`}
                    onClick={() => {
                      setActiveLink(0);
                      setProfileOpen(1);
                      setToggle(null);
                      setOpenProfile(null);
                    }}
                  >
                    <FaRegUser size={20} className="text-primary" />
                    <p className="font-[400] text-[1rem] leading-[1.25rem] text-secondary Barlow">
                      My Profile
                    </p>
                  </div>
                  <div
                    className={`flex flex-row cursor-pointer justify-start gap-[.6rem] px-[1.2rem] py-[1rem] ${
                      profileOpen === 2 ? "bg-[#EFE8F5]" : "bg-white"
                    }`}
                    onClick={() => {
                      setActiveLink(0);
                      setProfileOpen(2);
                      setToggle(null);
                      setOpenProfile(null);
                    }}
                  >
                    <MdOutlineChangeCircle size={20} className="text-primary" />
                    <p className="font-[400] text-[1rem] leading-[1.25rem] text-secondary Barlow">
                      Change Password
                    </p>
                  </div>
                  <div
                    className="flex flex-row cursor-pointer justify-start gap-[.6rem] px-[1.2rem] py-[1rem]"
                    onClick={handleLogout}
                  >
                    <TbLogout size={20} className="text-primary" />
                    <p className="font-[400] text-[1rem] leading-[1.25rem] text-secondary Barlow">
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setIsMobile(!isMobile);
                setToggle(!toggle);
              }}
              className="block md:hidden ms-4"
            >
              <RiMenu2Fill size={30} fill="#8c2a8d" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
