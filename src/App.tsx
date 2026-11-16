import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RequireRole } from './auth/RequireRole';
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

        <Route path="/citoyen/dashboard" element={<RequireRole role="CITOYEN"><CitizenDashboard /></RequireRole>} />
        <Route path="/citoyen/elections" element={<RequireRole role="CITOYEN"><CitizenElections /></RequireRole>} />
        <Route path="/citoyen/elections/:id/detail" element={<RequireRole role="CITOYEN"><CitizenElectionDetail /></RequireRole>} />
        <Route path="/citoyen/candidats" element={<RequireRole role="CITOYEN"><CitizenCandidates /></RequireRole>} />
        <Route path="/citoyen/candidats/:id" element={<RequireRole role="CITOYEN"><CitizenCandidateDetail /></RequireRole>} />
        <Route path="/citoyen/vote" element={<RequireRole role="CITOYEN"><CitizenVote /></RequireRole>} />
        <Route path="/citoyen/vote/recu" element={<RequireRole role="CITOYEN"><CitizenVoteReceipt /></RequireRole>} />
        <Route path="/citoyen/resultats" element={<RequireRole role="CITOYEN"><CitizenResults /></RequireRole>} />
        <Route path="/citoyen/profil" element={<RequireRole role="CITOYEN"><CitizenProfile /></RequireRole>} />

        <Route path="/admin/dashboard" element={<RequireRole role="ADMIN"><AdminDashboard /></RequireRole>} />
        <Route path="/admin/elections" element={<RequireRole role="ADMIN"><AdminElections /></RequireRole>} />
        <Route path="/admin/election/create" element={<RequireRole role="ADMIN"><AdminCreateElection /></RequireRole>} />
        <Route path="/admin/candidats" element={<RequireRole role="ADMIN"><AdminCandidates /></RequireRole>} />
        <Route path="/admin/candidats/nouveau" element={<RequireRole role="ADMIN"><AdminCandidateForm /></RequireRole>} />
        <Route path="/admin/statistiques" element={<RequireRole role="ADMIN"><AdminStats /></RequireRole>} />
        <Route path="/admin/rapports" element={<RequireRole role="ADMIN"><AdminReports /></RequireRole>} />

        <Route path="/operateur/dashboard" element={<RequireRole role="OPERATEUR"><OperatorDashboard /></RequireRole>} />
        <Route path="/operateur/mes-alertes" element={<RequireRole role="OPERATEUR"><OperatorAlerts /></RequireRole>} />
        <Route path="/operateur/alerts/detail" element={<RequireRole role="OPERATEUR"><OperatorAlertDetail /></RequireRole>} />
        <Route path="/operateur/historique" element={<RequireRole role="OPERATEUR"><OperatorHistory /></RequireRole>} />
        <Route path="/operateur/rapports" element={<RequireRole role="OPERATEUR"><OperatorReports /></RequireRole>} />
        <Route path="/operateur/recommandation" element={<RequireRole role="OPERATEUR"><OperatorRecommendSuspension /></RequireRole>} />

        <Route path="/superadmin/console" element={<RequireRole role="SUPERADMIN"><SuperAdminConsole /></RequireRole>} />
        <Route path="/superadmin/logs" element={<RequireRole role="SUPERADMIN"><SuperAdminLogs /></RequireRole>} />
        <Route path="/superadmin/export" element={<RequireRole role="SUPERADMIN"><SuperAdminExport /></RequireRole>} />
        <Route path="/superadmin/utilisateurs" element={<RequireRole role="SUPERADMIN"><SuperAdminUsers /></RequireRole>} />
        <Route path="/superadmin/suspensions" element={<RequireRole role="SUPERADMIN"><SuperAdminSuspensions /></RequireRole>} />
        <Route path="/superadmin/decision" element={<RequireRole role="SUPERADMIN"><SuperAdminDecision /></RequireRole>} />
        <Route path="/superadmin/utilisateurs/:userId/logs" element={<RequireRole role="SUPERADMIN"><SuperAdminUserLogs /></RequireRole>} />
      </Routes>
    </Router>
  );
}

export default App;
