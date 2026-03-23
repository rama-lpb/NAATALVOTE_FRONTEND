# Chapitre 8 — Interfaces utilisateur (UI/UX)

L'application NAATALVOTE propose quatre interfaces distinctes, chacune adaptée au rôle de l'utilisateur connecté. L'architecture des interfaces repose sur une approche modulaire utilisant React avec Styled Components, garantissant une cohérence visuelle à travers les différents modules tout en respectant les contraintes d'accessibilité et de performance.

---

## 8.1 Interface Citoyen

L'interface citoyen constitue le cœur de l'application. Elle est conçue selon un principe de **clarté maximale** : le citoyen doit pouvoir voter en moins de 3 minutes, sans formation préalable. L'expérience est découpée en flux distincts et linéaires : authentification, exploration des élections, vote, résultats.

### 8.1.1 Page Élections ([`CitizenElections.tsx`](src/pages/CitizenElections.tsx))

La page d'affichage des élections propose deux modes de visualisation : **grille** et **liste**, sélectionnables via un toggle interactif. Le layout s'adapte de manière responsive :

- **Mode grille** : deux colonnes sur écran large (`repeat(auto-fill, minmax(45%, 1fr))`), une colonne sur mobile
- **Mode liste** : affichage horizontal compact avec les mêmes informations

Chaque carte d'élection ([`Card`](src/pages/CitizenElections.tsx:151)) intègre une **barre latérale colorée** selon le statut :
- **Vert** (`rgba(31, 90, 51, 0.6)`) : `EN_COURS` (scrutin actif)
- **Orange** (`rgba(138, 90, 16, 0.5)`) : `PROGRAMMÉE` (à venir)
- **Gris** (`rgba(91, 95, 101, 0.4)`) : `CLÔTURÉE` (terminé)

Chaque carte affiche ([`CardMeta`](src/pages/CitizenElections.tsx:237)) :
- Titre de l'élection
- Type (Présidentielle, Législative, Municipale, Régionale)
- Dates de début et fin
- Nombre de candidats ([`candidateCount`](src/pages/CitizenElections.tsx:432))
- Taux de participation avec barre de progression ([`ProgressFill`](src/pages/CitizenElections.tsx:251))
- Badge de statut personnel : « Déja vote » ou « Pas encore vote » (sans révéler le choix)

Les **filtres combinables** ([`Filters`](src/pages/CitizenElections.tsx:69)) permettent de filtrer par :
- Statut (Tous / En cours / Programmés / Clôturés)
- Type d'élection
- Barre de recherche textuelle (titre, type, région)

La **pagination** ([`Pagination`](src/pages/CitizenElections.tsx:300)) affiche 2 élections par page avec navigation Previous/Suivant.

Les **Summary Cards** ([`SummaryCard`](src/pages/CitizenElections.tsx:23)) en haut de page présentent :
- Nombre de scrutins actifs
- Prochain scrutin à venir
- Total des scrutins disponibles
- Taux de participation moyen national

### 8.1.2 Page Tableau de bord ([`CitizenDashboard.tsx`](src/pages/CitizenDashboard.tsx))

Le tableau de bord citoyen offre une vue d'ensemble consolidée avec :

- **Statistiques rapides** ([`StatCard`](src/pages/CitizenDashboard.tsx:39)) :
  - Elections en cours
  - Statut électeur (Eligible/Inéligible)
  - Participation nationale
  - Scrutins clôturés

- **Liste des scrutins principaux** avec filtres par statut
- **Actions rapides** : boutons « Voir elections » et « Voter maintenant »
- **Badge de vote** : affiche « Déja vote » ou « Pas encore vote » pour chaque election

### 8.1.3 Page Vote ([`CitizenVote.tsx`](src/pages/CitizenVote.tsx))

Le processus de vote est découpé en **4 écrans successifs** (wizard à 4 étapes) pour maximiser la clarté et la sécurité perçue :

**Étape 1 — Sélection du candidat**
- Liste des candidats avec photo, nom, parti politique
- Bouton « Voir programme » pour accéder au détail ([`CandidateCard`](src/pages/CitizenVote.tsx:82))
- Indicateur visuel de l'election active avec badge « EN COURS » et animation de pulsation ([`LiveDot`](src/pages/CitizenVote.tsx:70))

**Étape 2 — Confirmation** ([`CitizenVoteConfirm.tsx`](src/pages/CitizenVoteConfirm.tsx))
- Récapitulatif du choix avec photo, nom et parti
- **Mise en garde sur l'irréversibilité** du vote via message d'avertissement
- Step wizard visuel indiquant les 4 étapes

**Étape 3 — Vote en cours**
- Spinner de chargement animation pendant la transaction (< 1s)
- Message « Traitement en cours... »

**Étape 4 — Confirmation finale** ([`CitizenVoteReceipt.tsx`](src/pages/CitizenVoteReceipt.tsx))
- Message de succès avec animation de coche vérifiée
- **Recu de vote** ([`ReceiptBox`](src/pages/CitizenVoteReceipt.tsx:70)) contenant :
  - Token de reçu anonyme
  - Date et heure du vote
  - Hash de transaction

### 8.1.4 Page Résultats en temps réel ([`CitizenResults.tsx`](src/pages/CitizenResults.tsx))

La page des résultats propose plusieurs visualizations interactives :

- **Sélecteur d'election** avec indicateur de statut (EN COURS/CLÔTURÉE)
- **Graphique en barres horizontales** ([`Candidate`](src/pages/CitizenResults.tsx:17)) pour chaque candidat :
  - Nom et parti
  - Pourcentage de voix
  - Couleur différenciée par candidat
- **Diagramme circulaire** (camembert) pour la répartition en pourcentages
- **Compteurs dynamiques** :
  - Total des votes
  - Taux de participation
  - Nombre d'inscrits
- **Barre de progression globale** avec mise à jour automatique toutes les 2 secondes

### 8.1.5 Page Candidats ([`CitizenCandidates.tsx`](src/pages/CitizenCandidates.tsx))

- Liste des candidats par election
- Informations : photo, nom, parti politique
- Lien vers le détail du candidat ([`CitizenCandidateDetail.tsx`](src/pages/CitizenCandidateDetail.tsx))

### 8.1.6 Page Detail d'une election ([`CitizenElectionDetail.tsx`](src/pages/CitizenElectionDetail.tsx))

- Informations completes de l'election (dates, type, region, statut)
- Liste des candidats avec boutons d'action
- Acces au vote ou aux resultats selon le statut

### 8.1.7 Page Profil ([`CitizenProfile.tsx`](src/pages/CitizenProfile.tsx))

- **En-tête de profil** ([`ProfileHeader`](src/pages/CitizenProfile.tsx:36)) avec avatar génère à partir des initiales
- **Informations utilisateur** :
  - Nom complet
  - Adresse email
  - Numéro CNI
  - Date de naissance
  - Adresse
  - Rôle actuel
- **Badges de statut** : compte actif ou inactif
- **Historique de participation** aux elections

---

## 8.2 Interface Administrateur

L'interface administrateur est orientée **gestion et statistiques**. Elle permet la programmation et le suivi des elections.

### 8.2.1 Page Tableau de bord ([`AdminDashboard.tsx`](src/pages/AdminDashboard.tsx))

Le tableau de bord principal presente ([`StatCard`](src/pages/AdminDashboard.tsx:53)) :

- **Scrutins actifs** (indicateur visuel avec point coloré)
- **Taux de participation** actuel
- **Alertes en cours** (nombre d'alertes fraude)
- **Rapports publiés** (nombre de rapports générés)

- **Graphique d'activité récente** : courbe SVG representant la participation dans le temps
- **Tableau des scrutins programmes** avec :
  - Titre de l'election
  - Dates (debut/fin)
  - Région
  - Statut (En cours / Programmee / Cloturee)

### 8.2.2 Page Creation d'election ([`AdminCreateElection.tsx`](src/pages/AdminCreateElection.tsx))

Formulaire de creation d'une nouvelle election ([`Form`](src/pages/AdminCreateElection.tsx:6)) avec :

- **Section Information generale** :
  - Titre de l'election
  - Type (Presidentielle, Legislative, Municipale, Regionale)
  - Région
- **Section Dates** :
  - Date de debut
  - Date de fin
- **Validation** avec messages d'erreur et helper text

### 8.2.3 Page Gestion des candidats ([`AdminCandidates.tsx`](src/pages/AdminCandidates.tsx), [`AdminCandidateForm.tsx`](src/pages/AdminCandidateForm.tsx))

- Liste des candidats avec statistiques
- Formulaire d'ajout/modification de candidat :
  - Nom complet
  - Parti politique
  - Photo
  - Programme electoral (bio)
- Association à une election spécifique

### 8.2.4 Page Statistiques ([`AdminStats.tsx`](src/pages/AdminStats.tsx))

Module d'analyses statistiques approfondies ([`ElectionStats`](src/pages/AdminStats.tsx:7)) :

- **Graphique temporel de participation** par mois (graphique linéaire)
- **Repartition par age** ([`ageGroups`](src/pages/AdminStats.tsx:27)) :
  - 18-24 ans, 25-34 ans, 35-44 ans, 45-54 ans, 55+ ans
- **Repartition par genre** ([`sexDistribution`](src/pages/AdminStats.tsx:34)) : femme/homme en pourcentages
- **Cartographie régionale** ([`regions`](src/pages/AdminStats.tsx:35)) :
  - Dakar (68%)
  - Thies (57%)
  - Saint-Louis (49%)
  - Ziguinchor (53%)
- **Heure de pointe** ([`hourlyPeaks`](src/pages/AdminStats.tsx:41)) : nombre de votes par heure

### 8.2.5 Page Rapports ([`AdminReports.tsx`](src/pages/AdminReports.tsx))

- **Statistiques globales** ([`StatCard`](src/pages/AdminReports.tsx:17)) :
  - Nombre de rapports
  - Elections couvertes
  - Dernière publication
- **Generation de rapports** avec filtres par election et periode
- **Export** des rapports en un clic

---

## 8.3 Interface Operateur de Securite

L'interface operateur est centrée sur la **reactívite** et la surveillance des activites frauduleuses.

### 8.3.1 Page Tableau de bord ([`OperatorDashboard.tsx`](src/pages/OperatorDashboard.tsx))

Le tableau de bord affiche en temps reel ([`StatCard`](src/pages/OperatorDashboard.tsx:60)) :

- **Nombre d'alertes NOUVELLES** en attente (avec code couleur d'urgence)
- **Alertes en cours de review**
- **Alertes résolues**

- **Tableau d'alertes** ([`Table`](src/pages/OperatorDashboard.tsx:101)) avec :
  - Titre de l'alerte
  - Type d'alerte
  - Statut (NOUVELLE, EN_REVIEW, RESOLUE)
  - Date de creation
- **Filtres** par periode (Aujourd'hui, 7 derniers jours, 30 jours)

### 8.3.2 Page Detail d'une alerte ([`OperatorAlertDetail.tsx`](src/pages/OperatorAlertDetail.tsx))

Vue détailcomplete d'une alerte avec ([`AlertHeader`](src/pages/OperatorAlertDetail.tsx:26)) :

- **Niveau de severite** ([`SeverityBadge`](src/pages/OperatorAlertDetail.tsx:61)) :
  - **CRITIQUE** (rouge) : activité frauduleuse confirmée
  - **MOYENNE** (orange) : suspicion nécessitant investigation
  - **FAIBLE** (gris) : anomalie mineure
- **Timeline des evenements** associes
- **Historique du compte** concerne
- **Formulaire de recommendation de suspension** avec champs obligatoires pour les preuves et la justification

### 8.3.3 Page Historique ([`OperatorHistory.tsx`](src/pages/OperatorHistory.tsx))

- **Historique complet** des alertes traitées
- **Filtres** par type, statut, date
- **Export** des données

### 8.3.4 Page Rapports operateur ([`OperatorReports.tsx`](src/pages/OperatorReports.tsx))

- Generation de rapports synthétiques ou detailles en un clic
- Statistiques sur les alertes traitees

---

## 8.4 Interface Super Administrateur

L'interface Super Administrateur est une **console d'administration systeme**. Elle est sobre et fonctionnelle, conçue pour des utilisateurs techniques.

### 8.4.1 Page Console systeme ([`SuperAdminConsole.tsx`](src/pages/SuperAdminConsole.tsx))

Vue d'ensemble du systeme ([`StatCard`](src/pages/SuperAdminConsole.tsx:51)) :

- Statistiques globales sur les utilisateurs
- Statut des services
- Activité récente

### 8.4.2 Page Gestion des utilisateurs ([`SuperAdminUsers.tsx`](src/pages/SuperAdminUsers.tsx))

- **Tableau complet** ([`TabRow`](src/pages/SuperAdminUsers.tsx:11)) de tous les administrateurs et operateurs
- Onglets separes par rôle (Admin / Operateur / Tous)
- **Informations** :
  - Nom et email
  - Statut du compte (Actif/Inactif)
  - Derniere connexion
  - Historique d'actions
- **Recherche** et filtres avances

### 8.4.3 Page Logs immuables ([`SuperAdminLogs.tsx`](src/pages/SuperAdminLogs.tsx))

Console de logs avec ([`ControlBar`](src/pages/SuperAdminLogs.tsx:10)) :

- **Recherche full-text** ([`SearchInput`](src/pages/SuperAdminLogs.tsx:25))
- **Filtres avances** par type d'evenement, date, severity
- **Badges** d'immutabilité ([`ImmutableBadge`](src/pages/SuperAdminLogs.tsx:67))
- **Visualisation des signatures HMAC** pour vérification d'intégrité
- Export des logs

### 8.4.4 Page Suspensions ([`SuperAdminSuspensions.tsx`](src/pages/SuperAdminSuspensions.tsx))

- **Liste des recommandations** en attente ([`StatCard`](src/pages/SuperAdminSuspensions.tsx:17))
- **Statistiques** : total recommandations, en attente, approuvees, rejetees
- **Details des preuves** et justifications
- **Formulaire de decision** ([`SuperAdminDecision.tsx`](src/pages/SuperAdminDecision.tsx)) obligatoire avec :
  - Decision (Approuver/Rejeter)
  - Justification de la decision

### 8.4.5 Page Export audit ([`SuperAdminExport.tsx`](src/pages/SuperAdminExport.tsx))

- **Selection de la plage de dates**
- **Choix du format** (PDF, CSV, JSON)
- **Chiffrement de l'export** avec clé AES-256
- **Génération de rapport d'audit** complet

---

## 8.5 Composants transversaux

### 8.5.1 Authentification ([`Login.tsx`](src/pages/Login.tsx))

Page de connexion avec :

- **Authentification par CNI** : saisie du numéro CNI et mot de passe
- **Gestion des rôles multiples** : si un utilisateur possede plusieurs rôles, sélection du rôle desire pour la session
- **Redirection automatique** vers le tableau de bord approprié selon le rôle
- Animations fluides (fadeUp, fadeScale, slideIn)

### 8.5.2 Navigation ([`AppLayout.tsx`](src/components/AppLayout.tsx))

Layout principal avec :

- **Header** avec logo, titre de la page, sous-titre
- **Barre de navigation** laterales avec items de menu specifiques au rôle
- **Actions contextuelles** dans le header
- **Design adaptatif** avec degrade et effets de profondeur (backdrop-filter, box-shadow)

---

## 8.6 Synthese des correspondances

| Fonctionnalite frontend | Reference code | Statut |
|------------------------|----------------|--------|
| Grille/liste elections | [`CitizenElections.tsx`](src/pages/CitizenElections.tsx) | ✅ Implemente |
| Barre colorée par statut | [`CitizenElections.tsx:151`](src/pages/CitizenElections.tsx:151) | ✅ Implemente |
| Filtres combinables | [`CitizenElections.tsx:69`](src/pages/CitizenElections.tsx:69) | ✅ Implemente |
| Pagination | [`CitizenElections.tsx:300`](src/pages/CitizenElections.tsx:300) | ✅ Implemente (2 par page) |
| Summary Cards | [`CitizenElections.tsx:23`](src/pages/CitizenElections.tsx:23) | ✅ Implemente |
| Wizard 4 etapes vote | [`CitizenVote.tsx:144`](src/pages/CitizenVote.tsx:144) | ✅ Implemente |
| Warning irreversibilite | [`CitizenVoteConfirm.tsx`](src/pages/CitizenVoteConfirm.tsx) | ✅ Implemente |
| Recu de vote anonyme | [`CitizenVoteReceipt.tsx:70`](src/pages/CitizenVoteReceipt.tsx:70) | ✅ Implemente |
| Resultats temps reel (polling 2s) | [`CitizenResults.tsx`](src/pages/CitizenResults.tsx) | ✅ Implemente |
| Graphiques resultats | [`CitizenResults.tsx:17`](src/pages/CitizenResults.tsx:17) | ✅ Implemente |
| Cartographie regionales | [`AdminStats.tsx:35`](src/pages/AdminStats.tsx:35) | ✅ Implemente |
| Graphiques participation (age/genre) | [`AdminStats.tsx:27`](src/pages/AdminStats.tsx:27) | ✅ Implemente |
| Code couleur urgences | [`OperatorAlertDetail.tsx:61`](src/pages/OperatorAlertDetail.tsx:61) | ✅ Implemente |
| Console logs HMAC | [`SuperAdminLogs.tsx`](src/pages/SuperAdminLogs.tsx) | ✅ Implemente |
| Export chiffre AES | [`SuperAdminExport.tsx`](src/pages/SuperAdminExport.tsx) | ✅ Implemente |

---

### Pages supplementaires implementees

En plus des pages decrites ci-dessus, les fichiers suivants sont egalement implementes :

| Fichier | Description | Reference |
|---------|-------------|-----------|
| [`CitizenOTP.tsx`](src/pages/CitizenOTP.tsx) | Page de verification OTP | ✅ Implemente |
| [`Register.tsx`](src/pages/Register.tsx) | Page d'inscription nouveau citoyen | ✅ Implemente |
| [`Portal.tsx`](src/pages/Portal.tsx) | Page d'accueil du portail NAATALVOTE | ✅ Implemente |
| [`Home.tsx`](src/pages/Home.tsx) | Page d'accueil simple | ✅ Implemente |

---

# Chapitre 9 — Backend et Services

Ce chapitre décrit l'architecture backend, les API REST, les connexions temps réel et les mesures de sécurité implémentées dans NAATALVOTE.

---

## 9.1 Architecture backend

Le backend NAATALVOTE est développé avec **Spring Boot** (Java) et communique avec le frontend via des protocoles standardisés.

### 9.1.1 Stack technique

- **Framework** : Spring Boot 3.x
- **Base de données** : PostgreSQL
- **Serveur d'application** : Apache Tomcat / Jetty
- **API** : RESTful JSON
- **Temps réel** : WebSocket (STOMP)

### 9.1.2 Structure des modules

```
src/main/java/com/naatalvote/
├── controller/          # Contrôleurs REST
├── service/            # Logique métier
├── repository/         # Accès données
├── model/              # Entités JPA
├── dto/                # Data Transfer Objects
├── security/           # Configuration sécurité
└── config/             # Configuration applicative
```

---

## 9.2 API REST

Le frontend communique avec le backend via les endpoints REST suivants :

### 9.2.1 Authentification

| Endpoint | Methode | Description |
|----------|---------|-------------|
| `/api/auth/login` | POST | Authentification par CNI/mot de passe |
| `/api/auth/choose-role` | POST | Sélection de rôle (utilisateurs multi-rôles) |
| `/api/auth/refresh` | POST | Rafraîchissement du token JWT |

**Corps de la requête login** :
```json
{
  "cni": "1234567890",
  "password": "motdepasse"
}
```

**Réponse** :
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "nom": "Fall",
    "prenom": "Aicha",
    "roles": ["CITOYEN", "ADMIN"],
    "hasMultipleRoles": true
  }
}
```

### 9.2.2 Elections

| Endpoint | Methode | Description |
|----------|---------|-------------|
| `/api/elections` | GET | Liste toutes les elections |
| `/api/elections/{id}` | GET | Détail d'une election |
| `/api/elections` | POST | Créer une election (Admin) |
| `/api/elections/{id}` | PUT | Modifier une election (Admin) |
| `/api/elections/{id}/candidates` | GET | Liste des candidats |

### 9.2.3 Votes

| Endpoint | Methode | Description |
|----------|---------|-------------|
| `/api/votes` | POST | Soumettre un vote |
| `/api/votes/{token}` | GET | Vérifier le statut d'un vote |

**Corps de la requête vote** :
```json
{
  "electionId": "elec-001",
  "candidateId": "cand-001",
  "voterToken": "jwt-token"
}
```

**Réponse** :
```json
{
  "receiptToken": "VOTE-2025-ABC123",
  "timestamp": "2025-03-10T14:30:00Z",
  "transactionHash": "sha256-hash"
}
```

### 9.2.4 Résultats

| Endpoint | Methode | Description |
|----------|---------|-------------|
| `/api/elections/{id}/results` | GET | Résultats en temps réel |
| `/api/elections/{id}/statistics` | GET | Statistiques détaillées |

### 9.2.5 Utilisateurs

| Endpoint | Methode | Description |
|----------|---------|-------------|
| `/api/users/me` | GET | Profil utilisateur actuel |
| `/api/users/me` | PUT | Modifier le profil |
| `/api/admin/users` | GET | Liste tous les utilisateurs |
| `/api/admin/users/{id}/status` | PUT | Activer/désactiver un compte |

### 9.2.6 Alertes et sécurité

| Endpoint | Methode | Description |
|----------|---------|-------------|
| `/api/alerts` | GET | Liste des alertes |
| `/api/alerts/{id}` | GET | Détail d'une alerte |
| `/api/alerts/{id}/suspend-recommendation` | POST | Recommander une suspension |
| `/api/admin/suspensions` | GET | Liste des suspensions |
| `/api/admin/suspensions/{id}/decide` | POST | Approuver/rejeter une suspension |

### 9.2.7 Logs et audit

| Endpoint | Methode | Description |
|----------|---------|-------------|
| `/api/admin/logs` | GET | Logs système avec pagination |
| `/api/admin/export` | POST | Export chiffré |

---

## 9.3 WebSocket (Temps réel)

### 9.3.1 Connexions

Le backend expose deux endpoints WebSocket :

| Endpoint | Protocole | Description |
|----------|-----------|-------------|
| `/ws/elections/{id}/results` | STOMP | Résultats temps réel |
| `/ws/alerts` | STOMP | Notifications d'alertes |

### 9.3.2 Résultats election

Le serveur envoie des mises à jour toutes les 2 secondes :

```json
{
  "type": "RESULTS_UPDATE",
  "electionId": "elec-001",
  "data": {
    "totalVotes": 15234,
    "participation": 68.5,
    "candidates": [
      {"id": "cand-001", "name": "Macky SALL", "votes": 8234, "percent": 54.1},
      {"id": "cand-002", "name": "Khalifa SALL", "votes": 4500, "percent": 29.5}
    ]
  }
}
```

### 9.3.3 Alertes

Notification immédiate lors d'une nouvelle alerte :

```json
{
  "type": "NEW_ALERT",
  "data": {
    "id": "alert-123",
    "title": "Tentative de vote multiple",
    "severity": "CRITICAL",
    "timestamp": "2025-03-10T14:35:00Z"
  }
}
```

---

## 9.4 Sécurité

### 9.4.1 Authentification JWT

- **Algorithme** : HS256 (HMAC-SHA256)
- **Durée de vie** : 1 heure (access token), 7 jours (refresh token)
- **Stockage** : LocalStorage côté frontend

### 9.4.2 Autorisations (RBAC)

| Rôle | Permissions |
|------|-------------|
| CITOYEN | Voter, voir résultats, consulter profil |
| ADMIN | Gérer elections, candidats, statistiques, rapports |
| OPERATEUR | Consulter alertes, recommander suspensions |
| SUPER_ADMIN | Gestion utilisateurs, logs, suspensions, exports |

### 9.4.3 Chiffrement

- **HTTPS** : Toutes les communications chiffrées
- **Mots de passe** : BCrypt avec salt
- **Export audit** : AES-256-GCM
- **Logs** : Signature HMAC-SHA256

### 9.4.4 Intégrité des logs

Chaque entrée de log est signée :

```json
{
  "timestamp": "2025-03-10T14:30:00Z",
  "action": "VOTE_SUBMITTED",
  "userId": "uuid",
  "details": "...",
  "hmac": "sha256-signature"
}
```

La clé publique de vérification est stockée en configuration frontend.

---

## 9.5 Base de données

### 9.5.1 Entités principales

- **User** : id, cni, nom, prenom, email, password_hash, roles, created_at
- **Election** : id, titre, type, region, date_debut, date_fin, statut
- **Candidate** : id, election_id, nom, parti, photo_url, programme
- **Vote** : id, election_id, candidate_id, voter_id, timestamp, receipt_token, transaction_hash
- **Alert** : id, type, severity, description, status, created_at
- **Log** : id, timestamp, action, user_id, details, hmac_signature

### 9.5.2 Index et performances

- Index sur `cni` pour l'authentification
- Index sur `election_id` pour les votes et résultats
- Index sur `timestamp` pour les logs

---

## 9.6 Intégration frontend-backend

### 9.6.1 Flux d'authentification

1. Utilisateur saisit CNI + mot de passe
2. Frontend POST vers `/api/auth/login`
3. Backend vérifie credentials, génère JWT
4. Frontend stocke token, redirige selon rôle

### 9.6.2 Flux de vote

1. Frontend affiche wizard 4 étapes
2. Étape 3 : POST vers `/api/votes`
3. Backend :
   - Vérifie token JWT
   - Enregistre vote en base
   - Génère receipt token et hash
4. Frontend affiche reçu final

### 9.6.3 Flux temps réel

1. Frontend connecte WebSocket au démarrage
2. Backend envoie mises à jour régulières (2s pour résultats, immédiat pour alertes)
3. Frontend met à jour l'interface sans rechargement

---

*Ce chapitre presente l'etat actuel de l'implémentation frontend et backend. Les captures d'ecran fig. X a Y illustrent ces interfaces en conditions reelles d'utilisation.*
