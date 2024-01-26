import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import SignIn from './SignIn/SignIn';
import Signup from './SignUp/SignUp'
import Error from './Common/pages/Error';
import VerifyOtp from './Common/pages/VerifyOtp';
import Dashboard from './Dashboard/Dashboard';
import ResetPassword from './SignIn/ResetPassword';
import ForgetPassword from './SignIn/ForgetPassword';
import CreateTicket from './Create-Ticket/CreateTicket';
import TicketForm from './Ticket-Form/TicketForm';
import Settings from './SettingsPage/Settings';
import ProfilePage from './ProfilePage/ProfilePage';
import TicketStatus from './TicketStatus/TicketStatus';
import TicketList from './TicketList/TicketList';
import UserDashboard from './UserDashboard/UserDashboard';
import React from 'react';
import ProtectedRoute from './Common/pages/ProtectedRoute';
import UnderConstruction from './Common/pages/UnderConstruction';


function App() {

  const routes = [
    {
      path: "/",
      Component: <SignIn />,
      isProtected: false
    },
    {
      path: "/signin",
      Component: <SignIn />,
      isProtected: false
    },
    {
      path: "/signup",
      Component: <Signup />,
      isProtected: false
    },
    {
      path: "/forget",
      Component: <ForgetPassword />,
      isProtected: false
    },
    {
      path: "/reset",
      Component: <ResetPassword />,
      isProtected: false
    },
    {
      path: "/verify",
      Component: <VerifyOtp />,
      isProtected: false
    },
    {
      path: "*",
      Component: <Error />,
      isProtected: false
    },
    {
      path: "/construct",
      Component: <UnderConstruction/>,
      isProtected: false
    },
    {
      path: "/dashboard",
      Component: <Dashboard />,
      isProtected: true
    },
    {
      path: "/cticket",
      Component: <CreateTicket />,
      isProtected: true
    },
    {
      path: "/settings",
      Component: <Settings />,
      isProtected: true
    },
    {
      path: "/tform",
      Component: <TicketForm />,
      isProtected: true
    },
    {
      path: "/profile",
      Component: <ProfilePage />,
      isProtected: true
    },
    {
      path: "/tstatus",
      Component: <TicketStatus />,
      isProtected: true
    },
    {
      path: "/tList",
      Component: <TicketList />,
      isProtected: true
    },
    {
      path: "/usrdash",
      Component: <UserDashboard />,
      isProtected: true
    }]
  return (
    <BrowserRouter>
      <Routes>
        {
          routes.map((route) => {
            return <Route path={route.path} element={
              route.isProtected ? <ProtectedRoute>{route.Component}</ProtectedRoute> : route.Component
            } key={route.path} />
          })
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
