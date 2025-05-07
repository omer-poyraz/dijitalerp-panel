import React, { useState, useEffect, useRef } from 'react';
import logo from '../../images/logo2.png';
import logo2 from '../../images/logo3.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes, FaUser, FaCog, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import profile from '../../images/profile.png';
import { BiChevronRight } from 'react-icons/bi';

const Header = () => {
    const { t } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);
    const [openNestedSubMenuIndex, setOpenNestedSubMenuIndex] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const profileRef = useRef(null);
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
        {
            path: "#",
            label: t("resources"),
            hasSubmenu: true,
            submenuItems: [
                {
                    path: "/assembly-manual",
                    label: t("assembly_manual"),
                    hasSubmenu: true,
                    submenuItems: [
                        { path: "/assembly-manual/quality", label: t("quality_management") },
                    ]
                },
                {
                    path: "/technical-drawing",
                    label: t("technical_drawing"),
                    hasSubmenu: true,
                    submenuItems: [
                        { path: "/technical-drawing/quality", label: t("quality_management") },
                    ]
                },
                { path: "/department", label: t("department") },
            ]
        },
        { path: "/product", label: t("product") },
        { path: "/customers", label: t("customers") },
        { path: "/user", label: t("employee") },
    ];

    const renderMenuItems = (items, parentKey = '') =>
        items.map((item, idx) => {
            const key = parentKey + idx;
            return (
                <div
                    key={key}
                    className="product-menu-item d-flex justify-content-between align-items-center"
                    onMouseEnter={() => {
                        if (item.hasSubmenu) setOpenNestedSubMenuIndex(prev => ({ ...prev, [key]: true }));
                    }}
                    onMouseLeave={() => {
                        if (item.hasSubmenu) setOpenNestedSubMenuIndex(prev => ({ ...prev, [key]: false }));
                    }}
                    style={{ position: 'relative' }}
                >
                    <Link
                        to={item.path}
                        onClick={closeMenu}
                        style={{ width: '100%' }}
                    >
                        <span>{item.label}</span>
                    </Link>
                    {item.hasSubmenu && <div><BiChevronRight size={20} /></div>}
                    {item.hasSubmenu && openNestedSubMenuIndex[key] && (
                        <div
                            className="product-dropdown"
                            style={{
                                left: '100%',
                                top: 0,
                                minWidth: 200,
                                position: 'absolute',
                                zIndex: 1002,
                            }}
                        >
                            <div className="product-menu-items">
                                {renderMenuItems(item.submenuItems, key)}
                            </div>
                        </div>
                    )}
                </div>
            );
        });

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
                                    onMouseEnter={() => item.hasSubmenu && setOpenSubMenuIndex(index)}
                                    onMouseLeave={() => item.hasSubmenu && setOpenSubMenuIndex(null)}
                                    style={{ position: 'relative' }}
                                >
                                    <Link
                                        to={item.path}
                                        onClick={closeMenu}
                                        className={isActive(item.path) ? 'active-link' : ''}
                                    >
                                        {item.label}
                                        {item.hasSubmenu && <FaChevronDown className="submenu-icon" />}
                                    </Link>
                                    {item.hasSubmenu && openSubMenuIndex === index && (
                                        <div className="product-dropdown" style={{ left: 0, top: '100%', minWidth: 220, position: 'absolute' }}>
                                            <div className="product-menu-items">
                                                {renderMenuItems(item.submenuItems, `${index}-`)}
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