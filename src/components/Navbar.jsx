import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { app } from "../firebase";

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: 'red',
        borderColor: 'transparent',
        borderWidth: '2px',
        boxShadow: state.isFocused ? '0 0 2px 1px darkred' : provided.boxShadow,
        borderRadius: '10px',
        '&:hover': {
            borderColor: 'red'
        }
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : 'red',
        backgroundColor: state.isSelected ? 'darkred' : 'white'
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'white'
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white'
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: 'white'
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        backgroundColor: 'white'
    })
};

const Navbar = ({ category, country, setCategory, setCountry, setDark, dark }) => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const navigate = useNavigate();
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const logout = () => {
        signOut(auth);
        navigate("/Login");
    }

    const categories = [
        { value: 'general', label: 'General' },
        { value: 'health', label: 'Health' },
        { value: 'science', label: 'Science' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'technology', label: 'Technology' },
        { value: 'business', label: 'Business' }
    ];

    const countries = [
        { value: 'ae', label: 'United Arab Emirates' },
        { value: 'ar', label: 'Argentina' },
        { value: 'at', label: 'Austria' },
        { value: 'au', label: 'Australia' },
        { value: 'be', label: 'Belgium' },
        { value: 'bg', label: 'Bulgaria' },
        { value: 'br', label: 'Brazil' },
        { value: 'ca', label: 'Canada' },
        { value: 'ch', label: 'Switzerland' },
        { value: 'cn', label: 'China' },
        { value: 'co', label: 'Colombia' },
        { value: 'cu', label: 'Cuba' },
        { value: 'cz', label: 'Czech Republic' },
        { value: 'de', label: 'Germany' },
        { value: 'eg', label: 'Egypt' },
        { value: 'fr', label: 'France' },
        { value: 'gb', label: 'United Kingdom' },
        { value: 'gr', label: 'Greece' },
        { value: 'hk', label: 'Hong Kong' },
        { value: 'hu', label: 'Hungary' },
        { value: 'id', label: 'Indonesia' },
        { value: 'ie', label: 'Ireland' },
        { value: 'il', label: 'Israel' },
        { value: 'in', label: 'India' },
        { value: 'it', label: 'Italy' },
        { value: 'jp', label: 'Japan' },
        { value: 'kr', label: 'South Korea' },
        { value: 'lt', label: 'Lithuania' },
        { value: 'lv', label: 'Latvia' },
        { value: 'ma', label: 'Morocco' },
        { value: 'mx', label: 'Mexico' },
        { value: 'my', label: 'Malaysia' },
        { value: 'ng', label: 'Nigeria' },
        { value: 'nl', label: 'Netherlands' },
        { value: 'no', label: 'Norway' },
        { value: 'nz', label: 'New Zealand' },
        { value: 'ph', label: 'Philippines' },
        { value: 'pl', label: 'Poland' },
        { value: 'pt', label: 'Portugal' },
        { value: 'ro', label: 'Romania' },
        { value: 'rs', label: 'Serbia' },
        { value: 'ru', label: 'Russia' },
        { value: 'sa', label: 'Saudi Arabia' },
        { value: 'se', label: 'Sweden' },
        { value: 'sg', label: 'Singapore' },
        { value: 'sk', label: 'Slovakia' },
        { value: 'th', label: 'Thailand' },
        { value: 'tr', label: 'Turkey' },
        { value: 'tw', label: 'Taiwan' },
        { value: 'ua', label: 'Ukraine' },
        { value: 'us', label: 'United States' },
        { value: 've', label: 'Venezuela' },
        { value: 'za', label: 'South Africa' }
    ];
    
    
    const [menuActive, setMenuActive] = useState(false);

    const toggleDarkMode = () => {
        setDark(prev => !prev);
    };

    const menuhandler = () => {
        setMenuActive(prev => !prev);
    };

    return (
        <>
            <div className="nav">
                <div className="logo">
                    <img src={logo} alt="newsnexus" />
                    <h1 className={dark ? "active " : ""}>News Nexus</h1>
                </div>
                <FontAwesomeIcon onClick={menuhandler} icon={faBars} inverse={dark ? true : undefined} className='bars' />
                <div className={`other ${menuActive ? 'active' : ''} ${dark ? 'dark' : ''}`}>
                    <Select
                        className='select'
                        onChange={setCategory}
                        options={categories}
                        value={category}
                        placeholder="Select a category"
                        styles={customStyles}
                    />
                    <Select
                        className='select'
                        onChange={setCountry}
                        options={countries}
                        value={country}
                        placeholder="Select a country"
                        styles={customStyles}
                    />
                    {!user && <button className='login' onClick={() => navigate("/Login")}>Login</button>}
                    {user && <button className='login' onClick={logout}>Logout</button>}
                    <button className={dark ? "active dispmode" : "dispmode"} onClick={toggleDarkMode}>{dark ? "Light Mode" : "Dark Mode"}</button>
                </div>
            </div>
        </>
    )
}

export default Navbar;
