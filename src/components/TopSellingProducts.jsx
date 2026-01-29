import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

const COLORS = ['#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6'];

export default function TopSellingProducts({ transactions }) {
    const map = {};

    transactions.forEach(t => {
        map[t.product] = (map[t.product] || 0) + t.total;
    });

    const top5 = Object.entries(map)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, value]) => ({ name, value }));

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-label">{payload[0].payload.name}</p>
                    <p className="tooltip-value">THB {payload[0].value.toFixed(2)}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="chart-card">
            <h3 className="chart-title">Top 5 Selling Items</h3>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart
                    data={top5}
                    margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                    <XAxis
                        dataKey="name"
                        angle={-25}
                        textAnchor="end"
                        interval={0}
                        tick={{ fontSize: 11 }}
                        stroke="#6b7280"
                    />
                    <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {top5.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}