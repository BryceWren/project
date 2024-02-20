import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { Login } from './pages/Login';
import Register  from './pages/Register';  //remove curly braces
import { HomePage } from './pages/HomePage';
import { Events } from './pages/Events';

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/events" element={<Events />} />
            </Routes>
        </Router>
    )
}