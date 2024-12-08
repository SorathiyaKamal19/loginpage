import Signin from './components/Signin';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes, } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import  {AuthProvider}  from './components/AuthContext';
import Dashboard from './components/Dashboard';
function App() {

  return (
    <AuthProvider>
    <Router>
        <Routes>
          <Route path='/' element={<Signin/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
          />

        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
