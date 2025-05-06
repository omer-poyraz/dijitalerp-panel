import React, { useState, useEffect, useRef } from 'react';
import logo from '../../images/logo2.png';
import logo2 from '../../images/logo3.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes, FaUser, FaCog, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import profile from '../../images/profile.png';

const Header = () => {
    const { t } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [productMenuOpen, setProductMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const profileRef = useRef(null);
    const productRef = useRef(null);
    const auth = JSON.parse(localStorage.getItem("auth"));

    const productSubMenuItems = [
        { path: "/products/list", label: t("product_list") },
        { path: "/products/categories", label: t("product_categories") },
        { path: "/products/inventory", label: t("inventory") },
        { path: "/products/pricing", label: t("pricing") },
    ];

    const isActive = (path) => {
        if (path === "/product") {
            return location.pathname.startsWith(path) || productSubMenuItems.some(item => location.pathname.startsWith(item.path));
        }
        return location.pathname === path;
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("auth");
        navigate("/login");
        window.location.reload();
        setProfileMenuOpen(false);
    };

    const menuItems = [
        { path: "/assembly-manual", label: t("assembly_manual") },
        { path: "/product", label: t("product") },
        { path: "/customers", label: t("customers") },
        { path: "/technical-drawing", label: t("technical_drawing") },
        { path: "/user", label: t("employee") },
        { path: "/settings", label: t("settings") },
    ];

    return (
        <header className={`modern-header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                <div className="logo-container">
                    <Link to="/" onClick={closeMenu}>
                        <img src={logo2} alt="" className="cp" />
                        <img src={logo} alt="Dijital ERP" className="cp" />
                    </Link>
                </div>

                <div className='d-flex justify-content-end align-items-center'>
                    <div className="menu-button" onClick={toggleMenu}>
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </div>

                    <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
                        <ul className="nav-links">
                            {menuItems.map((item, index) => (
                                <li
                                    key={index}
                                    className={`${isActive(item.path) ? 'active' : ''} ${item.hasSubmenu ? 'has-submenu' : ''}`}
                                    ref={item.path === "/product" ? productRef : null}
                                    onMouseEnter={() => item.path === "/product" && setProductMenuOpen(true)}
                                    onMouseLeave={() => item.path === "/product" && setProductMenuOpen(false)}
                                >
                                    <Link
                                        to={item.path}
                                        onClick={closeMenu}
                                        className={isActive(item.path) ? 'active-link' : ''}
                                    >
                                        {item.label}
                                        {item.hasSubmenu && <FaChevronDown className="submenu-icon" />}
                                    </Link>

                                    {item.hasSubmenu && productMenuOpen && (
                                        <div className="product-dropdown">
                                            <div className="product-menu-items">
                                                {productSubMenuItems.map((subItem, subIndex) => (
                                                    <Link
                                                        key={subIndex}
                                                        to={subItem.path}
                                                        className="product-menu-item"
                                                        onClick={closeMenu}
                                                    >
                                                        <span>{subItem.label}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="profile-container" ref={profileRef}>
                        <div className="profile" onClick={toggleProfileMenu}>
                            <img src={profile} alt="Profil" />
                        </div>

                        {profileMenuOpen && (
                            <div className="profile-dropdown">
                                <div className="profile-header">
                                    <img src={profile} alt="Profil" className="profile-dropdown-img" />
                                    <div className="profile-info">
                                        <h6>{auth?.user?.firstName} {auth?.user?.lastName}</h6>
                                        <small>{auth?.user?.email}</small>
                                    </div>
                                </div>
                                <div className="profile-menu-items">
                                    <Link to="/profile" className="profile-menu-item" onClick={() => setProfileMenuOpen(false)}>
                                        <FaUser />
                                        <span>{t('my_profile')}</span>
                                    </Link>
                                    <Link to="/account-settings" className="profile-menu-item" onClick={() => setProfileMenuOpen(false)}>
                                        <FaCog />
                                        <span>{t('account_settings')}</span>
                                    </Link>
                                    <div className="profile-divider"></div>
                                    <div className="profile-menu-item" onClick={handleLogout}>
                                        <FaSignOutAlt />
                                        <span>{t('logout')}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;