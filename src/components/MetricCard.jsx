export default function MetricCard({ title, value, icon, gradient, selector }) {
    const gradientClasses = {
        purple: 'metric-card-purple',
        blue: 'metric-card-blue',
        green: 'metric-card-green',
        orange: 'metric-card-orange'
    };

    return (
        <div className={`metric-card ${gradientClasses[gradient] || 'metric-card-purple'}`}>
            <div className="metric-header">
                <span className="metric-title">{title}</span>
                <span className="metric-icon">{icon}</span>
            </div>
            <div className="metric-value">{value}</div>
            {selector && (
                <div className="metric-selector">
                    {selector}
                </div>
            )}
        </div>
    );
}