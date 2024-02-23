import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { Login }  from './Components/Login';
import Register  from './Components/Register';  //remove curly braces
import { HomePage } from './pages/HomePage';
import { Events } from './pages/Events';
import { Settings } from './pages/Settings';

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/events" element={<Events />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </Router>
    )
}