

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import "./assets/css/style.css";
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const apikey = "8293b06965734eb09c991798d6c57095";
  const [category, setCategory] = useState({ value: 'general', label: 'General' });
  const [country, setCountry] = useState({ value: 'in', label: 'India' });
  const [news, setNews] = useState([]);
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 9;

  const fetchNews = async (cat, country, page) => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${cat}&apiKey=${apikey}&page=${page}&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setTotal(parsedData.totalResults);
    setNews(parsedData.articles);
  };

  const fetchmorenews = async (cat, country, page) => {
    setPage(prev => prev + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${cat}&apiKey=${apikey}&page=${page}&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setTotal(parsedData.totalResults);
    setNews(news.concat(parsedData.articles));
  };

  useEffect(() => {
    fetchNews(category.value, country.value, page);
  }, [category, country]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <MainContent
            category={category}
            country={country}
            setCategory={setCategory}
            setCountry={setCountry}
            setDark={setDark}
            dark={dark}
            news={news}
            fetchmorenews={fetchmorenews}
            total={total}
            page={page}
          />
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

const MainContent = ({ category, country, setCategory, setCountry, setDark, dark, news, fetchmorenews, total, page }) => {
  return (
    <div className={dark ? "active main" : "main"}>
      <Navbar
        category={category}
        country={country}
        setCategory={setCategory}
        setCountry={setCountry}
        setDark={setDark}
        dark={dark}
      />
      <News
        news={news}
        dark={dark}
        fetchmorenews={fetchmorenews}
        total={total}
        category={category.value}
        country={country.value}
        page={page}
      />
    </div>
  );
}

export default App;
