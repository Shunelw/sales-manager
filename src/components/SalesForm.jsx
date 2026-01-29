import { useState } from "react";
import products from "../data/products.json";
import { saveSale } from "../utils/storage";
import "../styles/theme.css";

export default function SalesForm({ refresh }) {
    const [i, setI] = useState("");
    const [customCat, setCustomCat] = useState("");
    const [qty, setQty] = useState(1);
    const [date, setDate] = useState("");

    const p = i !== "" ? products[i] : null;
    const category = customCat || p?.category || "";
    const total = p ? p.unitPrice * qty : 0;

    const submit = () => {
        if (!p || !date) return;

        saveSale({
            id: crypto.randomUUID(),
            date,
            product: p.itemName,
            category,
            unitPrice: p.unitPrice,
            quantity: qty,
            total
        });

        // Reset form
        setI("");
        setCustomCat("");
        setQty(1);
        setDate("");

        refresh();
    };

    return (
        <div className="card">
            <h3>Record New Sale</h3>

            <label>Product</label>
            <select value={i} onChange={e => setI(e.target.value)}>
                <option value="">Choose product</option>
                {products.map((x, idx) => (
                    <option key={idx} value={idx}>{x.itemName}</option>
                ))}
            </select>

            {p && (
                <>
                    <div className="form-grid">
                        <div>
                            <label>Category</label>
                            <input value={p.category} disabled />
                        </div>

                        <div>
                            <label>Unit Price (THB)</label>
                            <input value={p.unitPrice.toFixed(2)} disabled />
                        </div>

                        <div>
                            <label>Custom Category</label>
                            <input
                                placeholder="Optional"
                                value={customCat}
                                onChange={e => setCustomCat(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Quantity</label>
                            <input
                                type="number"
                                min="1"
                                value={qty}
                                onChange={e => setQty(+e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <h3 style={{ marginTop: "28px" }}>
                        Total: THB {total.toFixed(2)}
                    </h3>

                    <button className="primary" onClick={submit}>
                        Add Transaction
                    </button>
                </>
            )}
        </div>
    );
}