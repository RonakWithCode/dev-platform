
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes'
import { AuthProvider } from './utils/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreatePage from './pages/CreatePage'
import AppPostView from './pages/AppPostView'


// const Layout = () => {
//   return (
//     <>
//       <Navbar />
//       <Outlet />
//       <Footer />
//     </>
//   );
// };

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//     ],
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
  
//   {
//     path: "/profile",
//     element:<AuthProvider><PrivateRoutes><Profile /></PrivateRoutes>
//     </AuthProvider>,
//   },
// ]);

function App() {
  return (
    <Router>
    <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/app/:id" element={<AppPostView/>}/>
        <Route path="/" element={<Home/>}/>
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/new" element={<CreatePage/>}/>

        </Route>
      </Routes>
    </AuthProvider>
</Router>

  );
}

export default App;