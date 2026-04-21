import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Portal from './pages/Portal';
import CitizenDashboard from './pages/CitizenDashboard';
import CitizenElections from './pages/CitizenElections';
import CitizenCandidates from './pages/CitizenCandidates';
import CitizenCandidateDetail from './pages/CitizenCandidateDetail';
import CitizenElectionDetail from './pages/CitizenElectionDetail';
import CitizenVote from './pages/CitizenVote';
import CitizenVoteConfirm from './pages/CitizenVoteConfirm';
import CitizenVoteReceipt from './pages/CitizenVoteReceipt';
import CitizenResults from './pages/CitizenResults';
import CitizenProfile from './pages/CitizenProfile';
import CitizenOTP from './pages/CitizenOTP';
import AdminDashboard from './pages/AdminDashboard';
import AdminElections from './pages/AdminElections';
import AdminCreateElection from './pages/AdminCreateElection';
import AdminCandidates from './pages/AdminCandidates';
import AdminStats from './pages/AdminStats';
import AdminReports from './pages/AdminReports';
import AdminCandidateForm from './pages/AdminCandidateForm';
import OperatorDashboard from './pages/OperatorDashboard';
import OperatorAlerts from './pages/OperatorAlerts';
import OperatorHistory from './pages/OperatorHistory';
import OperatorReports from './pages/OperatorReports';
import OperatorAlertDetail from './pages/OperatorAlertDetail';
import OperatorRecommendSuspension from './pages/OperatorRecommendSuspension';
import SuperAdminConsole from './pages/SuperAdminConsole';
import SuperAdminLogs from './pages/SuperAdminLogs';
import SuperAdminExport from './pages/SuperAdminExport';
import SuperAdminUsers from './pages/SuperAdminUsers';
import SuperAdminSuspensions from './pages/SuperAdminSuspensions';
import SuperAdminDecision from './pages/SuperAdminDecision';
import SuperAdminUserLogs from './pages/SuperAdminUserLogs';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<CitizenOTP />} />
        <Route path="/register" element={<Register />} />
        <Route path="/portal" element={<Portal />} />

        <Route path="/citoyen/dashboard" element={<CitizenDashboard />} />
        <Route path="/citoyen/elections" element={<CitizenElections />} />
        <Route path="/citoyen/elections/:id/detail" element={<CitizenElectionDetail />} />
        <Route path="/citoyen/candidats" element={<CitizenCandidates />} />
        <Route path="/citoyen/candidats/:id" element={<CitizenCandidateDetail />} />
        <Route path="/citoyen/vote" element={<CitizenVote />} />
        <Route path="/citoyen/vote/confirm" element={<CitizenVoteConfirm />} />
        <Route path="/citoyen/vote/recu" element={<CitizenVoteReceipt />} />
        <Route path="/citoyen/resultats" element={<CitizenResults />} />
        <Route path="/citoyen/profil" element={<CitizenProfile />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/elections" element={<AdminElections />} />
        <Route path="/admin/election/create" element={<AdminCreateElection />} />
        <Route path="/admin/candidats" element={<AdminCandidates />} />
        <Route path="/admin/candidats/nouveau" element={<AdminCandidateForm />} />
        <Route path="/admin/statistiques" element={<AdminStats />} />
        <Route path="/admin/rapports" element={<AdminReports />} />

        <Route path="/operateur/dashboard" element={<OperatorDashboard />} />
        <Route path="/operateur/mes-alertes" element={<OperatorAlerts />} />
        <Route path="/operateur/alerts/detail" element={<OperatorAlertDetail />} />
        <Route path="/operateur/historique" element={<OperatorHistory />} />
        <Route path="/operateur/rapports" element={<OperatorReports />} />
        <Route path="/operateur/recommandation" element={<OperatorRecommendSuspension />} />

        <Route path="/superadmin/console" element={<SuperAdminConsole />} />
        <Route path="/superadmin/logs" element={<SuperAdminLogs />} />
        <Route path="/superadmin/export" element={<SuperAdminExport />} />
        <Route path="/superadmin/utilisateurs" element={<SuperAdminUsers />} />
        <Route path="/superadmin/suspensions" element={<SuperAdminSuspensions />} />
        <Route path="/superadmin/decision" element={<SuperAdminDecision />} />
        <Route path="/superadmin/utilisateurs/:userId/logs" element={<SuperAdminUserLogs />} />
      </Routes>
    </Router>
  );
}

export default App;
