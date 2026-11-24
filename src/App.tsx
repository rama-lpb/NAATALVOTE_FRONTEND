import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RequireRole } from './auth/RequireRole';
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Portal = lazy(() => import('./pages/Portal'));
const CitizenDashboard = lazy(() => import('./pages/CitizenDashboard'));
const CitizenElections = lazy(() => import('./pages/CitizenElections'));
const CitizenCandidates = lazy(() => import('./pages/CitizenCandidates'));
const CitizenCandidateDetail = lazy(() => import('./pages/CitizenCandidateDetail'));
const CitizenElectionDetail = lazy(() => import('./pages/CitizenElectionDetail'));
const CitizenVote = lazy(() => import('./pages/CitizenVote'));
const CitizenVoteReceipt = lazy(() => import('./pages/CitizenVoteReceipt'));
const CitizenResults = lazy(() => import('./pages/CitizenResults'));
const CitizenProfile = lazy(() => import('./pages/CitizenProfile'));
const CitizenOTP = lazy(() => import('./pages/CitizenOTP'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminElections = lazy(() => import('./pages/AdminElections'));
const AdminCreateElection = lazy(() => import('./pages/AdminCreateElection'));
const AdminCandidates = lazy(() => import('./pages/AdminCandidates'));
const AdminStats = lazy(() => import('./pages/AdminStats'));
const AdminReports = lazy(() => import('./pages/AdminReports'));
const AdminCandidateForm = lazy(() => import('./pages/AdminCandidateForm'));
const OperatorDashboard = lazy(() => import('./pages/OperatorDashboard'));
const OperatorAlerts = lazy(() => import('./pages/OperatorAlerts'));
const OperatorHistory = lazy(() => import('./pages/OperatorHistory'));
const OperatorReports = lazy(() => import('./pages/OperatorReports'));
const OperatorAlertDetail = lazy(() => import('./pages/OperatorAlertDetail'));
const OperatorRecommendSuspension = lazy(() => import('./pages/OperatorRecommendSuspension'));
const SuperAdminConsole = lazy(() => import('./pages/SuperAdminConsole'));
const SuperAdminLogs = lazy(() => import('./pages/SuperAdminLogs'));
const SuperAdminExport = lazy(() => import('./pages/SuperAdminExport'));
const SuperAdminUsers = lazy(() => import('./pages/SuperAdminUsers'));
const SuperAdminSuspensions = lazy(() => import('./pages/SuperAdminSuspensions'));
const SuperAdminDecision = lazy(() => import('./pages/SuperAdminDecision'));
const SuperAdminUserLogs = lazy(() => import('./pages/SuperAdminUserLogs'));
import './index.css';

function App() {
  return (
    <Router>
      {import.meta.env.VITE_DEMO_MODE === 'true' && (
        <aside role="note" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10000, padding: '8px 16px', background: '#fff2cf', color: '#493600', textAlign: 'center', fontSize: 13 }}>
          Démonstration académique — données fictives et codes OTP simulés. Aucun scrutin réel.
        </aside>
      )}
      <Suspense fallback={<p role="status">Chargement de la page…</p>}>
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
      </Suspense>
    </Router>
  );
}

export default App;
