import { useState } from "react";
import { getSales } from "../utils/storage";
import SalesForm from "../components/SalesForm";
import TransactionsTable from "../components/TransactionsTable";
import "../styles/sales.css";

export default function SalesJournal() {
    const [sales, setSales] = useState(getSales());

    const refresh = () => {
        setSales(getSales());
    };

    return (
        <div className="page">
            <h2>Sales Journal</h2>
            <SalesForm refresh={refresh} />
            <TransactionsTable sales={sales} refresh={refresh} />
        </div>
    );
}