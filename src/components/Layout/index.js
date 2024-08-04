import Header from "./Header";

const Layout = ({ children, isDark }) => {
    return (
        <div className={`page-content ${isDark ? 'dark': ''}`}>
            <Header />
            {children}
        </div>
    );
};

export default Layout;