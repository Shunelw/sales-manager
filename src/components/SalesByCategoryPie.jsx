import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export default function SalesByCategoryPie({ transactions }) {
    const map = {};

    transactions.forEach(t => {
        const catName = t.category.replace(/_/g, ' ');
        map[catName] = (map[catName] || 0) + t.total;
    });

    const total = Object.values(map).reduce((sum, val) => sum + val, 0);

    const data = Object.entries(map).map(([name, value]) => ({
        name,
        value,
        percentage: ((value / total) * 100).toFixed(0)
    }));

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-label">{payload[0].name}</p>
                    <p className="tooltip-value">THB {payload[0].value.toFixed(2)}</p>
                    <p className="tooltip-percent">{payload[0].payload.percentage}%</p>
                </div>
            );
        }
        return null;
    };

    const renderLabel = (entry) => {
        return `${entry.name} ${entry.percentage}%`;
    };

    return (
        <div className="chart-card">
            <h3 className="chart-title">Sales by Category</h3>
            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={renderLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}