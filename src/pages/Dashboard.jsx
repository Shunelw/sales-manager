import { useState, useMemo } from "react";
import SalesTrendChart from "../components/SalesTrendChart";
import SalesByCategoryPie from "../components/SalesByCategoryPie";
import TopSellingProducts from "../components/TopSellingProducts";
import SalesByProduct from "../components/SalesByProduct";
import MetricCard from "../components/MetricCard";
import "../styles/dashboard.css";

import {
    groupByDay,
    groupByWeek,
    groupByMonth
} from "../utils/salesUtils";

export default function Dashboard({ transactions }) {
    const [mode, setMode] = useState("weekly");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedWeek, setSelectedWeek] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");

    // Get current month in YYYY-MM format
    const getCurrentMonth = () => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    };

    const metrics = useMemo(() => {
        if (!transactions || transactions.length === 0) return null;

        const totalSales = transactions.reduce((sum, t) => sum + t.total, 0);
        const totalTransactions = transactions.length;

        let trendData;
        if (mode === "daily") {
            trendData = groupByDay(transactions);
        } else if (mode === "weekly") {
            trendData = groupByWeek(transactions);
        } else {
            trendData = groupByMonth(transactions);
        }

        // Calculate period-specific sales and transactions
        let periodSales = 0;
        let periodTransactions = 0;

        if (mode === "daily") {
            // Selected date or today
            const targetDate = selectedDate || new Date().toISOString().split('T')[0];
            const dayTrans = transactions.filter(t => t.date === targetDate);
            periodSales = dayTrans.reduce((sum, t) => sum + t.total, 0);
            periodTransactions = dayTrans.length;
        } else if (mode === "weekly") {
            // Selected week or this week (last 7 days)
            let startDate, endDate;

            if (selectedWeek) {
                startDate = new Date(selectedWeek + 'T00:00:00');
                endDate = new Date(selectedWeek + 'T00:00:00');
                endDate.setDate(endDate.getDate() + 6);
            } else {
                endDate = new Date();
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 6);
            }

            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);

            const weekTrans = transactions.filter(t => {
                const transDate = new Date(t.date + 'T00:00:00');
                return transDate >= startDate && transDate <= endDate;
            });
            periodSales = weekTrans.reduce((sum, t) => sum + t.total, 0);
            periodTransactions = weekTrans.length;
        } else if (mode === "monthly") {
            // Selected month or current month
            const targetMonth = selectedMonth || getCurrentMonth();
            const [year, month] = targetMonth.split('-');
            const targetYear = parseInt(year);
            const targetMonthIndex = parseInt(month) - 1;

            const monthTrans = transactions.filter(t => {
                const transDate = new Date(t.date);
                return transDate.getMonth() === targetMonthIndex &&
                    transDate.getFullYear() === targetYear;
            });
            periodSales = monthTrans.reduce((sum, t) => sum + t.total, 0);
            periodTransactions = monthTrans.length;
        }

        return {
            totalSales,
            totalTransactions,
            periodSales,
            periodTransactions,
            trendData
        };
    }, [transactions, mode, selectedDate, selectedWeek, selectedMonth]);

    if (!transactions || transactions.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-card">
                    <div className="empty-icon">📊</div>
                    <h2>No Sales Data Yet</h2>
                    <p>Start adding sales in the Sales Journal to see your dashboard</p>
                </div>
            </div>
        );
    }

    const getPeriodLabel = () => {
        if (mode === "daily") {
            if (selectedDate) {
                const date = new Date(selectedDate + 'T00:00:00');
                return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });
            }
            return "Today";
        } else if (mode === "weekly") {
            if (selectedWeek) {
                const start = new Date(selectedWeek + 'T00:00:00');
                const end = new Date(selectedWeek + 'T00:00:00');
                end.setDate(end.getDate() + 6);
                return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
            }
            return "This Week";
        } else {
            const targetMonth = selectedMonth || getCurrentMonth();
            const [year, month] = targetMonth.split('-');
            const date = new Date(parseInt(year), parseInt(month) - 1, 1);
            return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        }
    };

    const periodLabel = getPeriodLabel();

    return (
        <div className="dashboard-page">
            <h1 className="dashboard-title">Dashboard</h1>

            {/* Metric Cards */}
            <div className="metrics-grid">
                <MetricCard
                    title="TOTAL SALES (ALL TIME)"
                    value={`THB ${metrics.totalSales.toFixed(2)}`}
                    icon="💰"
                    gradient="purple"
                />
                <MetricCard
                    title={`SALES FOR ${periodLabel.toUpperCase()}`}
                    value={`THB ${metrics.periodSales.toFixed(2)}`}
                    icon="📈"
                    gradient="blue"
                    selector={
                        <div className="period-controls">
                            <select
                                value={mode}
                                onChange={(e) => {
                                    setMode(e.target.value);
                                    setSelectedDate("");
                                    setSelectedWeek("");
                                    setSelectedMonth("");
                                }}
                                className="period-selector"
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>

                            {mode === "daily" && (
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="date-picker"
                                />
                            )}

                            {mode === "weekly" && (
                                <input
                                    type="date"
                                    value={selectedWeek}
                                    onChange={(e) => setSelectedWeek(e.target.value)}
                                    className="date-picker"
                                    title="Select week start date"
                                />
                            )}

                            {mode === "monthly" && (
                                <input
                                    type="month"
                                    value={selectedMonth || getCurrentMonth()}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    className="date-picker"
                                />
                            )}
                        </div>
                    }
                />
                <MetricCard
                    title={`TRANSACTIONS IN ${periodLabel.toUpperCase()}`}
                    value={metrics.periodTransactions}
                    icon="🛒"
                    gradient="green"
                />
            </div>

            {/* Sales Trend Chart */}
            <SalesTrendChart data={metrics.trendData} mode={mode} />

            {/* Category Pie & Top Products - ALL TIME */}
            <div className="charts-grid">
                <SalesByCategoryPie transactions={transactions} />
                <TopSellingProducts transactions={transactions} />
            </div>

            {/* Sales by Product Table - ALL TIME */}
            <SalesByProduct transactions={transactions} />
        </div>
    );
}