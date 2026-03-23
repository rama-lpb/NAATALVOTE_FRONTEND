# Diagramme de Classes - NAATALVOTE

## Vue d'Ensemble

L'application NAATALVOTE est un système de vote électronique sécurisé pour le Sénégal. Voici le diagramme de classes complet de conception.

---

## 1. Entités (Modèles de Données)

### 1.1 User (Utilisateur)

```typescript
class User {
    -id: string                    // Identifiant unique
    -cni: string                   // Numéro CNI
    -nom: string                   // Nom de famille
    -prenom: string                // Prénom
    -email: string                 // Adresse email
    -telephones: string[]         // Liste des numéros de téléphone
    -date_naissance: string        // Date de naissance
    -adresse: string               // Adresse complète
    -roles: UserRole[]             // Rôles de l'utilisateur
    -otp: string                   // Code OTP temporaire
}
```

**Énumération UserRole:**
- `CITOYEN` - Citoyen pouvant voter
- `ADMIN` - Administrateur d'élections
- `OPERATEUR` - Opérateur de sécurité
- `SUPERADMIN` - Super Administrateur système

---

### 1.2 Election

```typescript
class Election {
    -id: string                    // Identifiant unique
    -titre: string                 // Titre de l'élection
    -description: string           // Description
    -type: string                 // Type (PRESIDENTIELLE, LEGISLATIVE, MUNICIPALE)
    -date_debut: string            // Date et heure de début
    -date_fin: string             // Date et heure de fin
    -statut: ElectionStatut       // Statut actuel
    -admin_id: string             // ID de l'admin créateur
    -candidat_ids: string[]       // Liste des candidats
    -region: string                // Région (National, Dakar, etc.)
    -total_electeurs: number       // Nombre d'électeurs inscrits
    -votes_count: number           // Nombre de votes exprimés
}
```

**Énumération ElectionStatut:**
- `PROGRAMMEE` - Élection planifiée
- `EN_COURS` - Élection en cours
- `CLOTUREE` - Élection terminée

---

### 1.3 Candidat

```typescript
class Candidat {
    -id: string                    // Identifiant unique
    -nom: string                   // Nom de famille
    -prenom: string                // Prénom
    -parti_politique: string       // Parti politique
    -biographie: string            // Biographie
    -photo_url: string            // URL de la photo
    -programme_url: string        // URL du programme
    -election_id: string         // ID de l'élection
    -votes_count: number          // Nombre de votes
    -color: string                // Couleur pour l'interface
}
```

---

### 1.4 Vote

```typescript
class Vote {
    -id: string                    // Identifiant unique
    -token_anonyme: string        // Token de vote anonyme
    -candidat_id: string          // ID du candidat choisi
    -election_id: string         // ID de l'élection
    -user_id: string              // ID de l'utilisateur votant
    -horodatage: string           // Date/heure du vote
}
```

---

### 1.5 TraceVote

```typescript
class TraceVote {
    -id: string                    // Identifiant unique
    -user_id: string              // ID de l'utilisateur
    -election_id: string         // ID de l'élection
    -a_vote: boolean             // A déjà voted
    -horodatage: string | null   // Date du vote
}
```

---

### 1.6 AlerteFraude

```typescript
class AlerteFraude {
    -id: string                    // Identifiant unique
    -type_fraude: string          // Type de fraude détectée
    -user_id: string | null       // ID de l'utilisateur suspect
    -election_id: string         // ID de l'élection
    -description: string          // Description
    -statut: AlerteStatut        // Statut de l'alerte
    -date_detection: string      // Date de détection
    -operateur_id: string | null // ID de l'opérateur
    -date_traitement: string | null
    -ip: string | null           // Adresse IP suspecte
}
```

**Énumération AlerteStatut:**
- `NOUVELLE` - Nouvelle alerte
- `EN_ANALYSE` - En cours d'analyse
- `RESOLUE` - Résolue
- `FAUSSE_ALERTE` - Fausse alerte

---

### 1.7 ActionLog

```typescript
class ActionLog {
    -id: string                    // Identifiant unique
    -type_action: string          // Type d'action
    -utilisateur_id: string       // ID de l'utilisateur
    -description: string          // Description
    -horodatage: string           // Date/heure
    -adresse_ip: string           // Adresse IP
    -signature_cryptographique: string // Signature pour intégrité
}
```

---

### 1.8 Suspension

```typescript
class Suspension {
    -id: string                    // Identifiant unique
    -user_id: string              // ID de l'utilisateur suspendu
    -motif: string                // Motif de suspension
    -operateur_id: string         // ID de l'opérateur demandeur
    -superadmin_id: string | null // ID du superadmin décideur
    -statut: SuspensionStatut     // Statut
    -date_creation: string        // Date de création
    -date_decision: string | null // Date de décision
    -justification: string        // Justification
}
```

**Énumération SuspensionStatut:**
- `EN_ATTENTE` - En attente de décision
- `APPROUVEE` - Approuvée
- `REJETEE` - Rejetée

---

## 2. Services

### 2.1 AuthService
```typescript
class AuthService {
    +findUserByCNI(cni: string): User
    +getPhonesByCNI(cni: string): string[]
    +validateOTP(cni: string, phone: string, otp: string): User
    +hasMultipleRoles(user: User): boolean
    +getUserRoles(user: User): UserRole[]
    +getRoleDashboardPath(role: UserRole): string
    +getRoleDisplayName(role: UserRole): string
    +getRoleColor(role: UserRole): string
}
```

### 2.2 ElectionService
```typescript
class ElectionService {
    +getElectionById(id: string): Election
    +getCandidatById(id: string): Candidat
    +getCandidatsByElection(electionId: string): Candidat[]
    +getOpenElections(): Election[]
    +getUpcomingElections(): Election[]
    +getClosedElections(): Election[]
    +getAllElectionsList(): Election[]
}
```

### 2.3 VoteService
```typescript
class VoteService {
    +castVote(electionId: string, candidatId: string, token: string): Vote
    +verifyVote(citoyenId: string, electionId: string): TraceVote
    +getElectionResults(electionId: string): Resultats
}
```

### 2.4 SecurityService
```typescript
class SecurityService {
    +getAlertesFraude(): AlerteFraude[]
    +detectPatternAnomaly(): void
    +recommendSuspension(citoyenId: string, motif: string): Suspension
}
```

### 2.5 AuditService
```typescript
class AuditService {
    +logAction(type: string, userId: string, description: string): ActionLog
    +getLogs(): ActionLog[]
    +verifyIntegrity(): boolean
}
```

### 2.6 UserManagementService
```typescript
class UserManagementService {
    +createUser(user: User): User
    +updateUser(id: string, user: User): User
    +suspendUser(citoyenId: string, motif: string, operateurId: string): Suspension
    +approveSuspension(suspensionId: string, superadminId: string): void
    +rejectSuspension(suspensionId: string, superadminId: string): void
    +getSuspensions(): Suspension[]
}
```

---

## 3. Contrôleurs

### 3.1 AuthController
- `handleLogin()` - Connexion avec CNI
- `verifyOTP()` - Vérification du code OTP
- `logout()` - Déconnexion
- `selectRole()` - Sélection de rôle (utilisateurs multi-rôles)

### 3.2 CitizenController
- `getDashboard()` - Tableau de bord citoyen
- `listElections()` - Liste des élections
- `listCandidates()` - Liste des candidats
- `viewCandidateDetail()` - Détails d'un candidat
- `castVote()` - Voter pour un candidat
- `confirmVote()` - Confirmer le vote
- `getReceipt()` - Obtenir le reçu de vote
- `getResults()` - Voir les résultats
- `getProfile()` - Voir le profil

### 3.3 AdminController
- `getDashboard()` - Tableau de bord admin
- `createElection()` - Créer une election
- `updateElection()` - Modifier une election
- `listCandidates()` - Gérer les candidats
- `createCandidate()` - Ajouter un candidat
- `updateCandidate()` - Modifier un candidat
- `deleteCandidate()` - Supprimer un candidat
- `getStatistics()` - Voir les statistiques
- `generateReport()` - Générer des rapports

### 3.4 OperatorController
- `getDashboard()` - Tableau de bord opérateur
- `listAlerts()` - Liste des alertes
- `viewAlertDetail()` - Détails d'une alerte
- `analyzeAlert()` - Analyser une alerte
- `recommendSuspension()` - Recommander une suspension
- `getHistory()` - Historique des actions

### 3.5 SuperAdminController
- `getConsole()` - Console principale
- `listUsers()` - Gestion des utilisateurs
- `manageUser()` - Modifier un utilisateur
- `listLogs()` - Journal des actions
- `exportData()` - Exporter les données
- `listSuspensions()` - Liste des suspensions
- `makeDecision()` - Décision sur suspension

---

## 4. Relations entre Entités

### Diagramme de Relations

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                  USER                                        │
│  (Citoyen, Admin, Opérateur, SuperAdmin)                                    │
└─────────────────────────────────────────────────────────────────────────────┘
      │                              │                              │
      │1                            *│                              │1
      ▼                              ▼                              ▼
┌─────────────┐              ┌─────────────────┐              ┌─────────────┐
│  ELECTION  │◄─────────────│                 │──────────────│ ACTION_LOG │
│            │    1..*      │                 │     1..*     │             │
└─────────────┘              └─────────────────┘              └─────────────┘
      │                              │                              ▲
      │1                            *│                              │
      ▼                              ▼                              │
┌─────────────┐              ┌─────────────────┐                    │
│  CANDIDAT  │◄─────────────│                 │                    │
│            │    1..*      │                 │                    │
└─────────────┘              └─────────────────┘                    │
      │                              │                              │
      │1                            *│                              │
      ▼                              ▼                              │
┌─────────────┐              ┌─────────────────┐              ┌─────────────┐
│    VOTE     │──────────────│                 │              │ SUSPENSION │
│             │    1         │                 │      1..*    │             │
└─────────────┘              └─────────────────┘              └─────────────┘
      │                              │                              │
      │1                            *│                              │
      ▼                              ▼                              │
┌─────────────┐              ┌─────────────────┐              ┌─────────────┐
│  TRACE_VOTE │              │  ALERTE_FRAUDE  │              │             │
│             │      1      │                 │      1      │             │
└─────────────┘              └─────────────────┘              └─────────────┘
```

### Détail des Associations

| Entité 1 | Association | Entité 2 | Description |
|----------|-------------|----------|-------------|
| User | crée | Election | Un admin crée des élections |
| Election | contient | Candidat | Une election a plusieurs candidats |
| Election | reçoit | Vote | Une election reçoit des votes |
| Election | trace | TraceVote | Suivi des votants |
| Election | surveille | AlerteFraude | Détection de fraudes |
| User | émet | Vote | Un utilisateur vote |
| User | suivi | TraceVote | Vérification du vote |
| User | impliqué | AlerteFraude | Utilisateur suspect |
| User | génère | ActionLog | Journal d'audit |
| User | subi | Suspension | Compte suspendu |

---

## 5. Architecture des Vues

### 5.1 Vues Publiques
- `Home` - Page d'accueil
- `Login` - Connexion
- `Register` - Inscription
- `Portal` - Portail de sélection de rôle

### 5.2 Vues Citoyen
- `CitizenDashboard` - Tableau de bord
- `CitizenElections` - Liste des élections
- `CitizenElectionDetail` - Détails d'une election
- `CitizenCandidates` - Liste des candidats
- `CitizenCandidateDetail` - Détails d'un candidat
- `CitizenVote` - Page de vote
- `CitizenVoteConfirm` - Confirmation de vote
- `CitizenVoteReceipt` - Reçu de vote
- `CitizenResults` - Résultats
- `CitizenProfile` - Profil utilisateur

### 5.3 Vues Administrateur
- `AdminDashboard` - Tableau de bord
- `AdminCreateElection` - Créer une election
- `AdminCandidates` - Gérer les candidats
- `AdminCandidateForm` - Formulaire candidat
- `AdminStats` - Statistiques
- `AdminReports` - Rapports

### 5.4 Vues Opérateur
- `OperatorDashboard` - Tableau de bord
- `OperatorHistory` - Historique
- `OperatorReports` - Rapports
- `OperatorAlertDetail` - Détails d'alerte
- `OperatorRecommendSuspension` - Recommandation suspension

### 5.5 Vues Super Administrateur
- `SuperAdminConsole` - Console principale
- `SuperAdminLogs` - Journaux
- `SuperAdminExport` - Exportation données
- `SuperAdminUsers` - Gestion utilisateurs
- `SuperAdminSuspensions` - Liste suspensions
- `SuperAdminDecision` - Décision suspension

---

## 6. Flux de Données

### 6.1 Flux d'Authentification
```
Login → AuthController → AuthService → User → TokenSession
```

### 6.2 Flux de Vote
```
CitizenVote → CitizenController → VoteService → Vote + TraceVote + ActionLog
```

### 6.3 Flux de Sécurité
```
AlerteFraude → OperatorController → SecurityService → Suspension → SuperAdminDecision
```

---

## 7. Diagramme de Packages

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           APPLICATION NAATALVOTE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │   ENTITÉS   │  │  SERVICES   │  │CONTRÔLEURS  │  │      VUES       │ │
│  │             │  │             │  │             │  │                 │ │
│  │  • User     │  │• AuthService│  │• Auth      │  │• Login          │ │
│  │  • Election │  │• Election   │  │• Citizen   │  │• Dashboard      │ │
│  │  • Candidat │  │• Vote       │  │• Admin     │  │• Vote           │ │
│  │  • Vote     │  │• Security   │  │• Operator  │  │• Reports        │ │
│  │  • Trace    │  │• Audit      │  │• SuperAdmin│  │• Profile        │ │
│  │  • Alerte   │  │• UserMgmt   │  │             │  │                 │ │
│  │  • Log      │  │             │  │             │  │                 │ │
│  │  •Suspension│  │             │  │             │  │                 │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

*Document généré à partir du code source de l'application NAATALVOTE*
*Date: Mars 2026*
