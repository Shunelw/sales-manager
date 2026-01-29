import { deleteSale } from "../utils/storage";
import "../styles/theme.css";

export default function TransactionsTable({ sales, refresh }) {
    const handleDelete = (id) => {
        deleteSale(id);
        refresh();
    };

    return (
        <div className="card">
            <h3>Transactions</h3>

            <table width="100%">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Unit Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th />
                    </tr>
                </thead>

                <tbody>
                    {sales.map(s => (
                        <tr key={s.id}>
                            <td>{s.date}</td>
                            <td>{s.product}</td>
                            <td><span className="badge">{s.category}</span></td>
                            <td>THB {s.unitPrice.toFixed(2)}</td>
                            <td>{s.quantity}</td>
                            <td>THB {s.total.toFixed(2)}</td>
                            <td>
                                <button
                                    className="delete"
                                    onClick={() => handleDelete(s.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
