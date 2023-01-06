import { useAuthContext } from "./useAuthcontext";
import { useDeadlinesContext } from "./useDeadlinesContext";
export const useLogOut = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: deadlineDispatch } = useDeadlinesContext();
  const logout = () => {
    // removing the token from the local storage
    localStorage.removeItem("user");
    // dispatching the action to the reducer
    dispatch({ type: "LOGOUT" });
    deadlineDispatch({ type: "GET_DEADLINES", payload: null });
  };

  return { logout };
};
