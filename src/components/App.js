import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../components/contexts/AuthContext';
import "../styles/App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Result from './pages/Result';
import Signup from "./pages/Signup";
import Quiz from "./pages/Quiz"
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';


function App() {
    return (
        <Router>
            <AuthProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route exact path='/' element={<PublicRoute />}>
                            <Route exact path='/signup' element={<Signup />} />
                        </Route>
                        <Route exact path='/' element={<PublicRoute />}>
                            <Route exact path='/login' element={<Login />} />
                        </Route>
                        <Route exact path='/' element={<PrivateRoute />}>
                            <Route exact path='/Quiz' element={<Quiz />} />
                        </Route>
                        <Route exact path='/' element={<PrivateRoute />}>
                            <Route exact path='/result' element={<Result />} />
                        </Route>
                    </Routes>
                </Layout>
            </AuthProvider>
        </Router>
    );
}

export default App;