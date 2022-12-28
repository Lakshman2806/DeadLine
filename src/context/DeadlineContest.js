import { createContext,useReducer } from "react";

export const DeadlineContext = createContext();

export const reducer = (state, action) => {
    switch (action.type) {
        case "GET_DEADLINES":
            return {
                deadlines: action.payload
            };
        case "ADD_DEADLINE":
            return {
                deadlines: [action.payload,...state.deadlines]
            };
        case "DELETE_DEADLINE":
            return {
                deadlines: state.deadlines.filter((deadline) => deadline._id !== action.payload._id)
            };
        default:
            return state;
    }
};

export const DeadlineContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, {
        deadlines: null
    });


  return (
    <DeadlineContext.Provider value={{...state,dispatch}}>
        {children}
    </DeadlineContext.Provider>
  );
};
