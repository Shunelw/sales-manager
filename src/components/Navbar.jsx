import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    return (
        <nav style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            padding: "16px 32px"
        }}>
            <strong>Sales Manager</strong>

            <Link to="/">Dashboard</Link>
            <Link to="/journal">Sales Journal</Link>

            <ThemeToggle />
        </nav>
    );
}