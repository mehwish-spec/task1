import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home.jsx'));
const LoginSplit = lazy(() => import('./pages/LoginSplit.jsx'));
const SignupSplit = lazy(() => import('./pages/SignupSplit.jsx'));
const SignupTeacher = lazy(() => import('./pages/SignupTeacher.jsx'));
const Onboarding = lazy(() => import('./pages/Onboarding.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const VidTicketNew = lazy(() => import('./pages/VidTicketNew.jsx'));
const VidTicketRecord = lazy(() => import('./pages/VidTicketRecord.jsx'));
const VidTicketAssess = lazy(() => import('./pages/VidTicketAssess.jsx'));
const UpgradePlans = lazy(() => import('./pages/UpgradePlans.jsx'));
const DataPrivacy = lazy(() => import('./pages/DataPrivacy.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSplit />} />
        <Route path="/signup" element={<SignupSplit />} />
        <Route path="/signup/teacher" element={<SignupTeacher />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/new-ticket" element={<VidTicketNew />} />
        <Route path="/app/new-ticket/record" element={<VidTicketRecord />} />
        <Route path="/app/new-ticket/assess" element={<VidTicketAssess />} />
        <Route path="/app/upgrade" element={<UpgradePlans />} />
        <Route path="/data-privacy" element={<DataPrivacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
