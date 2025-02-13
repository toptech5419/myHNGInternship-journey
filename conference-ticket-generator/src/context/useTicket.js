import { useContext } from "react";
import TicketContext from "./TicketContext"; // ✅ Fixed Import Path

const useTicket = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTicket must be used within a TicketProvider");
  }
  return context;
};

export default useTicket;
