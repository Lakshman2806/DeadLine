import { useAuthContext } from "./useAuthcontext";

export const useLogOut = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        // removing the token from the local storage
        localStorage.removeItem("user");
        // dispatching the action to the reducer
        dispatch({ type: "LOGOUT" });
    };

    return { logout };
};