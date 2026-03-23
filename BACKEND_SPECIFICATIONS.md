# Spécifications Backend - NAATALVOTE

Ce document liste toutes les interfaces, attributs et endpoints API que le backend doit implémenter.

---

## 1. Interfaces / Types Existants (src/data/mockData.ts)

### 1.1 User (Utilisateur)
```typescript
interface User {
  id: string;              // UUID unique
  cni: string;             // Numéro CNI (identifiant principal)
  nom: string;             // Nom de famille
  prenom: string;          // Prénom
  email: string;           // Email (optionnel)
  telephones: string[];    // Liste des numéros de téléphone
  date_naissance: string;  // Date de naissance (YYYY-MM-DD)
  adresse: string;         // Adresse complète
  roles: UserRole[];       // Liste des rôles
  otp: string;            // Code OTP actuel
}

type UserRole = 'CITOYEN' | 'ADMIN' | 'OPERATEUR' | 'SUPERADMIN';
```

### 1.2 Election
```typescript
interface Election {
  id: string;                  // UUID unique
  titre: string;               // Titre de l'élection
  description: string;         // Description
  type: string;                // Type: 'Presidentielle', 'Legislative', 'Regionale'
  date_debut: string;          // Date de début (ISO 8601)
  date_fin: string;           // Date de fin (ISO 8601)
  statut: 'PROGRAMMEE' | 'EN_COURS' | 'CLOTUREE';
  admin_id: string;            // ID de l'admin créateur
  candidat_ids: string[];      // Liste des IDs des candidats
  region: string;              // Région (pour législatives/régionales)
  total_electeurs: number;     // Nombre d'électeurs attendus
  votes_count: number;        // Nombre de votes reçus
}
```

### 1.3 Candidat
```typescript
interface Candidat {
  id: string;              // UUID unique
  nom: string;            // Nom de famille
  prenom: string;         // Prénom
  parti_politique: string; // Nom du parti politique
  biographie: string;      // Biography courte
  photo_url: string;      // URL de la photo
  programme_url: string;   // URL du programme
  election_id: string;    // ID de l'élection
  votes_count: number;    // Nombre de votes
  color: string;          // Couleur thématique (hex)
}
```

### 1.4 Vote
```typescript
interface Vote {
  id: string;              // UUID unique
  token_anonyme: string;   // Token généré (ex: V-2026-0847)
  candidat_id: string;     // ID du candidat choisi
  election_id: string;     // ID de l'élection
  citoyen_id: string;      // ID du citoyen (interne, pas exposé)
  horodatage: string;      // Date/heure du vote (ISO 8601)
}
```

### 1.5 TraceVote (Suivi vote citoyen)
```typescript
interface TraceVote {
  id: string;            // UUID unique
  citoyen_id: string;    // ID du citoyen
  election_id: string;   // ID de l'élection
  a_vote: boolean;      // true si a déjà voted
  horodatage: string | null; // Date du vote si voted
}
```

### 1.6 AlerteFraude
```typescript
interface AlerteFraude {
  id: string;              // UUID unique
  type_fraude: string;     // Type: 'DOUBLE_VOTE', 'IP_SUSPECT', etc.
  citoyen_id: string | null; // ID du citoyen concerné
  election_id: string;     // ID de l'élection
  description: string;     // Description de l'alerte
  statut: 'NOUVELLE' | 'EN_ANALYSE' | 'RESOLUE' | 'FAUSSE_ALERTE';
  date_detection: string;  // Date de détection
  operateur_id: string | null; // ID de l'opérateur traitant
  date_traitement: string | null;
  ip: string | null;      // Adresse IP suspecte
}
```

### 1.7 ActionLog (Journal des actions)
```typescript
interface ActionLog {
  id: string;                      // UUID unique
  type_action: string;             // Type: 'LOGIN', 'VOTE', 'CREATE_ELECTION', etc.
  utilisateur_id: string;          // ID de l'utilisateur
  description: string;            // Description de l'action
  horodatage: string;             // Date/heure
  adresse_ip: string;             // IP de l'utilisateur
  signature_cryptographique: string; // Signature pour audit
}
```

### 1.8 Suspension
```typescript
interface Suspension {
  id: string;              // UUID unique
  citoyen_id: string;      // ID du citoyen suspendu
  motif: string;          // Motif de la suspension
  operateur_id: string;   // ID de l'opérateur qui initie
  superadmin_id: string | null; // ID du superadmin qui valide
  statut: 'EN_ATTENTE' | 'APPROUVEE' | 'REJETEE';
  date_creation: string;  // Date de création
  date_decision: string | null; // Date de décision
  justification: string;  // Justification de la décision
}
```

---

## 2. Endpoints API Requisis

### 2.1 Authentication / Authentification

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/login` | Connexion avec CNI + téléphone |
| POST | `/api/auth/otp/verify` | Vérification du code OTP |
| POST | `/api/auth/otp/send` | Envoyer OTP par SMS |
| POST | `/api/auth/logout` | Déconnexion |

**Request/Response:**
```typescript
// POST /api/auth/login
Request: { cni: string, telephone: string }
Response: { success: boolean, message: string, requiresOtp: boolean }

// POST /api/auth/otp/verify
Request: { cni: string, telephone: string, otp: string }
Response: { success: boolean, token: string, user: User }
```

### 2.2 Elections

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/elections` | Liste toutes les élections |
| GET | `/api/elections/:id` | Détails d'une election |
| GET | `/api/elections/:id/candidats` | Liste des candidats |
| POST | `/api/elections` | Créer une election (ADMIN) |
| PUT | `/api/elections/:id` | Modifier une election (ADMIN) |
| POST | `/api/elections/:id/publish` | Publier une election (ADMIN) |

### 2.3 Candidats

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/candidats` | Liste tous les candidats |
| GET | `/api/candidats/:id` | Détails d'un candidat |
| POST | `/api/candidats` | Créer un candidat (ADMIN) |
| PUT | `/api/candidats/:id` | Modifier un candidat (ADMIN) |
| DELETE | `/api/candidats/:id` | Supprimer un candidat (ADMIN) |

### 2.4 Votes

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/votes` | Soumettre un vote |
| GET | `/api/votes/verify/:token` | Vérifier un token de vote |
| GET | `/api/votes/election/:id/results` | Résultats en temps réel |

**Request/Response:**
```typescript
// POST /api/votes
Request: { 
  election_id: string, 
  candidat_id: string, 
  token_anonyme: string 
}
Response: { 
  success: boolean, 
  confirmation_number: string, // ex: V-2026-0847
  horodatage: string 
}
```

### 2.5 Citoyen / Electeur

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/citoyen/:id/vote-status` | Vérifie si a déjà voted |
| GET | `/api/citoyen/:id/history` | Historique des votes |
| GET | `/api/citoyen/:id/profile` | Profil du citoyen |

### 2.6 Admin

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/admin/elections` | Elections de l'admin |
| GET | `/api/admin/elections/:id/stats` | Statistiques d'une election |
| POST | `/api/admin/elections/:id/close` | Clôturer une election |

### 2.7 Opérateur

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/operateur/alertes` | Liste des alertes |
| PUT | `/api/operateur/alertes/:id` | Traiter une alerte |
| GET | `/api/operateur/suspensions` | Liste des suspensions |

### 2.8 Super Admin

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/superadmin/users` | Liste des utilisateurs |
| PUT | `/api/superadmin/users/:id/roles` | Modifier les rôles |
| GET | `/api/superadmin/logs` | Journal des actions |
| GET | `/api/superadmin/suspensions` | Suspensions en attente |

---

## 3. Flux de Vote (Workflow)

### 3.1流程 simplifié (2 étapes)

1. **Sélection candidat** → Confirmation avec avertissement "irréversible"
2. **Traitement** → Enregistrement → Redirection vers reçu

### 3.2 Données requises pour un vote

```typescript
interface VoteSubmission {
  election_id: string;      // ID de l'élection
  candidat_id: string;     // ID du candidat choisi
  // Généré côté frontend ou backend:
  token_anonyme: string;   // ex: V-2026-0847
}
```

### 3.3 Vérification post-vote

Le backend doit:
1. Vérifier que le citoyen n'a pas déjà voted pour cette election
2. Vérifier que l'élection est en cours
3. Enregistrer le vote avec horodatage
4. Générer un numéro de confirmation
5. Mettre à jour trace_votes.a_vote = true

---

## 4. Attributs CSS Utilisés (Frontend)

### 4.1 Classes principales
- `.naatal-swal` - Popup de confirmation
- `.swal-confirm` - Bouton confirmer
- `.swal-cancel` - Bouton annuler
- `.swal2-title` - Titre du popup
- `.swal2-html-container` - Contenu du popup

### 4.2 Couleurs thématiques
```css
--color-primary: rgba(31, 90, 51, 0.8);  /* Vert NaatalVote */
--color-primary-light: rgba(31, 90, 51, 0.1);
--color-primary-dark: #1f5a33;
--color-danger: rgba(176, 58, 46, 0.95);  /* Rouge alerte */
--color-warning: rgba(210, 140, 30, 0.9); /* Orange warning */
```

---

## 5. NOTES IMPORTANTES

### 5.1 Numéros de confirmation
- Format recommandé: `V-YYYY-NNNN` (ex: V-2026-0847)
- Généré par le backend
- Unique par election

### 5.2 Anonymat
- Le vote ne doit pas révéler l'identité du candidat
- Utiliser un token anonymisé
- TraceVote permet de savoir SI un citoyen a voted, mais pas POUR QUI

### 5.3 Sécurité
- Toutes les mutations (POST, PUT, DELETE) nécessitent authentification
- Logger toutes les actions avec IP + timestamp
- Détecter les votes multiples (même CNI, même election)

---

## 6. Services/fonctions helper à implémenter

```typescript
// Auth
findUserByCNI(cni: string): User | null
validateOTP(cni: string, phone: string, otp: string): boolean

// Election
getElectionById(id: string): Election
getOpenElections(): Election[]
getCandidatsByElection(electionId: string): Candidat[]

// Vote
submitVote(electionId: string, candidatId: string, token: string): VoteResult
hasAlreadyVoted(citoyenId: string, electionId: string): boolean
getElectionResults(electionId: string): Resultats

// Admin
createElection(data: CreateElectionDTO): Election
updateElection(id: string, data: UpdateElectionDTO): Election
closeElection(id: string): Election
```

---

Document généré depuis le frontend NAATALVOTE
Pour support backend: voir `src/data/mockData.ts` pour les types exacts
