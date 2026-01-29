

export const getSales = () => {
    const stored = localStorage.getItem("sales");
    return stored ? JSON.parse(stored) : [];
};

export const saveSale = (sale) => {
    const sales = getSales();
    const updated = [...sales, sale];
    localStorage.setItem("sales", JSON.stringify(updated));
};

export const deleteSale = (id) => {
    const sales = getSales();
    const filtered = sales.filter((s) => s.id !== id);
    localStorage.setItem("sales", JSON.stringify(filtered));
};
