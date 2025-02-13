import { TicketProvider } from "./context/TicketContext.jsx";
import TicketGenerator from "./components/TicketGenerator.jsx";
import Header from "./components/Layout/Header.jsx";

const App = () => {
  return (
    <TicketProvider>
      <div className="app">
        <Header />
        <TicketGenerator />
      </div>
    </TicketProvider>
  );
};

export default App;
