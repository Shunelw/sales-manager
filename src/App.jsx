import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import SalesJournal from "./pages/SalesJournal";
import { getSales } from "./utils/storage";

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Load transactions from localStorage on mount
    setTransactions(getSales());

    // Refresh transactions every second to sync across Dashboard and Journal
    const interval = setInterval(() => {
      setTransactions(getSales());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Dashboard transactions={transactions} />}
        />
        <Route
          path="/journal"
          element={<SalesJournal />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;