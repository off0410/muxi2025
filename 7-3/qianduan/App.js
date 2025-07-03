import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import Routes from './routes';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes />
                </Layout>
            </Router>
        </AuthProvider>
    );
}

export default App;