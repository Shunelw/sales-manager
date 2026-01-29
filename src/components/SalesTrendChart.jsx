import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

export default function SalesTrendChart({ data, mode }) {
    const title = mode === "daily" ? "Daily Trend (Day-by-Day)" :
        mode === "weekly" ? "Weekly Trend (Week-by-Week)" :
            "Monthly Trend (Month-by-Month)";

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-label">{payload[0].payload.label}</p>
                    <p className="tooltip-value">THB {payload[0].value.toFixed(2)}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="chart-card trend-chart">
            <h3 className="chart-title">{title}</h3>
            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                    <XAxis
                        dataKey="label"
                        stroke="#6b7280"
                        tick={{ fontSize: 12 }}
                        angle={-15}
                        textAnchor="end"
                        height={60}
                    />
                    <YAxis
                        stroke="#6b7280"
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="total"
                        stroke="url(#lineGradient)"
                        strokeWidth={3}
                        dot={{ fill: '#6366f1', r: 5 }}
                        activeDot={{ r: 7, fill: '#8b5cf6' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}