import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MyProfile from "../dashboard/MyProfile";
import { myProfile } from "../../services/authService";
import { store } from "../../redux/store";
import { clearAuth } from "../../redux/slice/authSlice";
import { setIsAuthenticated } from "../../redux/slice/globalSlice";
import ChangePassword from "../dashboard/ChangePassword";
import Credit from "../dashboard/Credit";
import { toast } from "react-toastify";
import VisualizerPage from "./VisualizerPage";
import DashboardNavbar from "../dashboard/DashboardNavbar";
import DashboardComponent from "../dashboard/Dashboard";

const links = [
  { name: "Dashboard" },
  { name: "Visualizer" },
  { name: "Credit" },
];

const Dashboard = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [openNotification, SetOpenNotification] = useState(false);
  const [activeLink, setActiveLink] = useState(0);
  const [profileOpen, setProfileOpen] = useState(0);
  const [mobileVeiw, setMobileView] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const profileTriggerRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const toogleTriggerRef = useRef(null);
  const notificationTriggerRef = useRef(null);

  const handleProfile = () => {
    setOpenProfile(!openProfile);
  };

  const myProfileData = async () => {
    let res = await myProfile();
  };
  const profile = useSelector((store) => store.auth.myProfile);

  const handleLogout = () => {
    store.dispatch(clearAuth());
    store.dispatch(setIsAuthenticated(false));
    toast.success("Logout Successful");
    setOpenProfile(false);
  };

  const handleClickOutside = (event) => {
    if (
      profileTriggerRef.current &&
      !profileTriggerRef.current.contains(event.target) &&
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target)
    ) {
      setOpenProfile(false);
    } else if (
      toogleTriggerRef.current &&
      !toogleTriggerRef.current.contains(event.target)
    ) {
      setToggle(false);
    } else if (
      notificationTriggerRef.current &&
      !notificationTriggerRef.current.contains(event.target)
    ) {
      SetOpenNotification(false);
    }
  };

  let naviData = localStorage.getItem("visulizer");

  useEffect(() => {
    if (naviData) {
      setActiveLink(1);
      localStorage.removeItem("visulizer");
    } else {
      setActiveLink(0);
    }
  }, []);

  const renderProfileComponent = () => {
    switch (profileOpen) {
      case 1:
        return <MyProfile profile={profile} title={"My Profile"} />;
      case 2:
        return <ChangePassword title={"Change Password"} />;
      default:
        return null;
    }
  };

  const onClose = () => {
    SetOpenNotification(!openNotification);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    myProfileData();
  }, []);

  useEffect(() => {
    if (activeLink === 2) {
      setProfileOpen(0);
    } else if (activeLink == 1) {
      setProfileOpen(0);
    }
  }, [activeLink]);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      setIsMobile(newWidth <= 768);
      if (newWidth < 768) {
        setMobileView(true);
      } else {
        setMobileView(false);
      }
    };
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);
  const props = {
    handleLogout,
    isMobile,
    onClose,
    links,
    setActiveLink,
    activeLink,
    setIsMobile,
    setProfileOpen,
    setToggle,
    toggle,
    openNotification,
    SetOpenNotification,
    mobileVeiw,
    profile,
    profileTriggerRef,
    openProfile,
    handleProfile,
    profileDropdownRef,
    profileOpen,
    toogleTriggerRef,
    notificationTriggerRef,
    setOpenProfile,
  };

  return (
    <>
      <div className="bg-primaryGrey pb-[3.125rem]">
        <DashboardNavbar {...props} />
        {renderProfileComponent()}
        {activeLink === 2 && <Credit title={"Credit"} />}
        {activeLink === 1 && <VisualizerPage />}
        {activeLink === 0 && <DashboardComponent />}
      </div>
    </>
  );
};

export default Dashboard;
