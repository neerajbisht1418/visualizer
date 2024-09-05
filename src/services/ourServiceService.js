import { setInquiry, setPackage, setPackageUser } from "../redux/slice/ourServiceSlice";
import { store } from "../redux/store";
import { ROUTES } from "../utils/apiRoutes";
import baseService from "./baseService";

export const inquiryService = async (userData) => {
    try {
        const res = await baseService.post(ROUTES.SERVICES.INQUIRY, userData);
        store.dispatch(setInquiry(res.data.data))
        return res.data;
    } catch (err) {
        return err;
    }
};
export const packageService = async () => {
    try {
        const res = await baseService.get(ROUTES.SERVICES.PACKAGES);
        store.dispatch(setPackage(res.data.data))
        return res.data;
    } catch (err) {
        return err;
    }
};
export const purchasePackage = async (data) => {
    const token = store.getState().auth.token;
    try {
        const res = await baseService.post(ROUTES.SERVICES.PURCHASEPACKAGE, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
};

export const purchasePackageUser = async () => {
    const token = store.getState().auth.token;
    try {
        const res = await baseService.get(ROUTES.SERVICES.GETPURCHASEPACKAGE, {
            headers: { Authorization: `Bearer ${token}` }
        });
        store.dispatch(setPackageUser(res.data.data))
        return res.data;
    } catch (err) {
        return err;
    }
};