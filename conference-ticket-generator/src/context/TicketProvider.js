import PropTypes from 'prop-types'; // ✅ Import PropTypes

export const TicketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ticketReducer, initialState);

  return (
    <TicketContext.Provider value={{ state, dispatch }}>
      {children}
    </TicketContext.Provider>
  );
};

// ✅ Add PropTypes validation
TicketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
