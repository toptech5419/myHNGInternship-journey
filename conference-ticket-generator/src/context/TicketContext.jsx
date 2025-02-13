import { useReducer } from "react";
import PropTypes from "prop-types";
import TicketContext from "./TicketContext"; 

// ✅ Initial state
const initialState = {
  currentStep: 1,
  ticketType: "",  
  formData: { fullName: "", email: "", avatar: "", specialRequests: "" },
  errors: {},
  isLoading: false,
};

// ✅ Reducer function
const ticketReducer = (state, action) => {
  switch (action.type) {
    case "SET_TICKET_TYPE":
      return { ...state, ticketType: action.payload };
    case "UPDATE_FORM":
      return { ...state, formData: { ...state.formData, ...action.payload }};
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "RESET_FORM":
      return initialState;
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

// ✅ Context Provider Component
export const TicketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ticketReducer, initialState);

  return (
    <TicketContext.Provider value={{ state, dispatch }}>
      {children}
    </TicketContext.Provider>
  );
};

// ✅ PropTypes validation
TicketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
