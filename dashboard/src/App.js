import React from 'react';
import './App.css';
import StatusPage from './components/StatusPage'
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>CJ Import Monitor</h1>
            </header>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/status/:type/:name" element={<StatusPage />} />
                </Routes>
            </Router>
            {/*<main>*/}
            {/*    <HomePage />*/}
            {/*</main>*/}
        </div>
    );
}

export default App;