

interface LayoutProps {
    children: React.ReactNode;
}

const Footer: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="footer-container">
            푸터예요
        </div>
    );
};

export default Footer;