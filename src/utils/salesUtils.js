export const groupByDay = (transactions) => {
    const map = {};
    transactions.forEach(t => {
        map[t.date] = (map[t.date] || 0) + t.total;
    });
    return Object.entries(map)
        .sort((a, b) => new Date(a[0]) - new Date(b[0]))
        .map(([label, total]) => ({ label, total }));
};

export const groupByWeek = (transactions) => {
    const map = {};
    transactions.forEach(t => {
        const d = new Date(t.date);
        const startOfYear = new Date(d.getFullYear(), 0, 1);
        const days = Math.floor((d - startOfYear) / (24 * 60 * 60 * 1000));
        const week = Math.ceil((days + startOfYear.getDay() + 1) / 7);
        const key = `Week of ${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        map[key] = (map[key] || 0) + t.total;
    });
    return Object.entries(map)
        .sort()
        .map(([label, total]) => ({ label, total }));
};

export const groupByMonth = (transactions) => {
    const map = {};
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    transactions.forEach(t => {
        const d = new Date(t.date);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const label = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;

        if (!map[key]) {
            map[key] = { label, total: 0 };
        }
        map[key].total += t.total;
    });

    return Object.entries(map)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([_, data]) => data);
};