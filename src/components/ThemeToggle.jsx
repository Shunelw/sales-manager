export default function ThemeToggle() {
    const toggle = () => {
        const current = document.documentElement.dataset.theme;
        document.documentElement.dataset.theme =
            current === "dark" ? "light" : "dark";
    };

    return (
        <button onClick={toggle} style={{ marginLeft: "auto" }}>
            🌙 / ☀️
        </button>
    );
}