import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { LoginC }  from './Components/LoginC';
import Register  from './Components/Register';  //remove curly braces
import { HomePage } from './pages/HomePage';
import { Events } from './pages/Events';
import { Settings } from './pages/Settings';
//import  IndividualCleanup from './Components/IndividualCleanup';
import  Editinformation from './pages/Editinformation';
import PostUI from './pages/PostUI'
import CleanUpRegisterHost from './pages/CleanUpRegisterHost';
import Participants from './pages/Participants';


export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LoginC />} />
                <Route path='/register' element={<Register />} />
                <Route path="/home/*" element={<HomePage />} />
                <Route path="/events" element={<Events />} />
                <Route path="/settings" element={<Settings />} />
                {/* <Route path="/IndividualCleanup" element={<IndividualCleanup />} /> */}
                <Route path="/Editinformation" element={< Editinformation />} />
                <Route path="/PostUI" element={<PostUI />} />
                <Route path ="/CleanUpRegisterHost/*" element={<CleanUpRegisterHost/>}/>
                <Route path ="/Participants" element={<Participants/>}/>
            

            </Routes>
        </Router>
    )
}