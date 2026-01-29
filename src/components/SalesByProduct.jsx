export default function SalesByProduct({ transactions }) {
    const productMap = {};
    const qtyMap = {};

    transactions.forEach(t => {
        productMap[t.product] = (productMap[t.product] || 0) + t.total;
        qtyMap[t.product] = (qtyMap[t.product] || 0) + t.quantity;
    });

    const productData = Object.entries(productMap)
        .map(([product, total]) => ({
            product,
            quantity: qtyMap[product],
            total
        }))
        .sort((a, b) => b.total - a.total);

    return (
        <div className="chart-card product-table-card">
            <h3 className="chart-title">Sales by Product</h3>
            <div className="table-wrapper">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>PRODUCT</th>
                            <th>QTY</th>
                            <th>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData.map((item, idx) => (
                            <tr key={idx}>
                                <td className="product-name">{item.product}</td>
                                <td className="product-qty">{item.quantity}</td>
                                <td className="product-total">THB {item.total.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}