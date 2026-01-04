# RestoPro ERP - Gestion Restaurant Marocain 🇲🇦

> Application ERP complète pour la gestion d'un restaurant marocain, incluant inventaire, personnel, fournisseurs, menu traditionnel et point de vente (POS). Site 100% marocain avec devise MAD, plats traditionnels et éléments culturels.

## 🔗 Liens Importants

- **Repository GitHub :** [gestion-restaurant](https://github.com/fatimaezzahraechaoui/gestion-restaurant.git)

---

## 👥 Membres de l'Équipe

**Nom du Groupe :** Équipe RestoPro

| Prénom & Nom | Rôle Principal | Lien Github |
|--------------|----------------|-------------|
| Fatima Ezzahra Ech-Chaoui | Architecture & Intégration | [@fatimaezzahraechaoui](https://github.com/fatimaezzahraechaoui) |
| Nada El Alaoui | Interface Utilisateur | [@nadaelalaoui](https://github.com/nadaelalaoui) |
| Kenza El Alaoui | Logique Métier | [@kenzaelalaoui](https://github.com/kenzaelalaoui) |

---

## 👥 Répartition des Tâches par Membre

### Fatima Ezzahra Ech-Chaoui - Architecture & Intégration
- **Dashboard** : KPIs (ventes, stock, effectif), graphique Chart.js
- **Authentification** : Système de login avec rôles (Admin/Staff)
- **Structure générale** : Architecture des fichiers, séparation HTML/CSS/JS
- **Navigation** : Sidebar, onglets, gestion des vues

### Nada El Alaoui - Interface Utilisateur
- **Design responsive** : Layout adaptatif avec Tailwind CSS
- **Modals** : Formulaires CRUD pour employés, fournisseurs, menu, stock
- **Animations** : Transitions fluides, effets hover, loading states
- **UX/UI** : Interface utilisateur, ergonomie, accessibilité

### Kenza El Alaoui - Logique Métier
- **CRUD Employés** : Gestion du personnel (ajout, modification, suppression)
- **CRUD Inventaire** : Gestion des ingrédients et alertes de stock
- **CRUD Fournisseurs** : Gestion des partenaires et contacts
- **CRUD Menu** : Gestion de la carte des plats
- **Point de Vente (POS)** : Interface de caisse, panier, paiements
- **Persistance des données** : localStorage, chargement JSON externe

---

## 📝 Thème Choisi

*   **Thème :** Gestion de Restaurant Marocain
*   **Description :** Système ERP complet pour gérer les opérations d'un restaurant marocain : inventaire des ingrédients, gestion du personnel, fournisseurs, carte du menu traditionnel (Tajines, Couscous, Pastilla, etc.), et interface de point de vente (POS).
*   **Caractéristiques Marocaines :**
    - Devise : Dirham Marocain (MAD)
    - Plats traditionnels : Tajines, Couscous Royal, Pastilla, Méchoui, Salade Marocaine, Thé à la Menthe
    - Noms marocains pour le personnel et les fournisseurs
    - Éléments culturels : texte bilingue (Français/Arabe)
    - Fournisseurs marocains avec numéros de téléphone locaux (+212)

---

## ✅ État d'Avancement (Checklist)

### Fonctionnalités Principales
- [x] **CRUD Employés :** Gestion du personnel (Create, Read, Update, Delete)
- [x] **CRUD Inventaire :** Gestion des ingrédients et stock
- [x] **CRUD Fournisseurs :** Gestion des partenaires fournisseurs
- [x] **CRUD Menu :** Gestion de la carte des plats
- [x] **Point de Vente (POS) :** Interface de caisse pour les commandes
- [x] **Recherche & Filtres** dans les tableaux
- [x] **Authentification** avec rôles (Admin/Staff)

### Dashboard & Data
- [x] **KPIs :** Ventes du jour, stock critique, effectif actif, nombre de fournisseurs
- [x] **Chart :** Graphique des ventes hebdomadaires (Line Chart avec Chart.js)
- [x] **Persistance des données** avec localStorage

### Interface & UX
- [x] **Design Responsive** avec Tailwind CSS
- [x] **Animations** et transitions fluides
- [x] **Modals** pour les formulaires CRUD
- [x] **Navigation** par onglets dans la sidebar

### Architecture
- [x] **Séparation des fichiers :** HTML, CSS, JS séparés
- [x] **Structure organisée :** Dossiers css/, js/, assets/
- [x] **Code modulaire** avec fonctions JavaScript organisées
- [x] **Données hardcodées :** Fallback intégré pour fonctionner même sans serveur local
- [x] **Localisation Marocaine :** Interface adaptée au contexte marocain

### Technique & Bonus
- [x] **Données externes :** Chargement des données initiales depuis `data.json`
- [x] **Persistance :** localStorage pour sauvegarder les données
- [x] **Architecture :** Code organisé sans Framework (Vanilla JS)
- [x] **Design :** Interface Responsive (Mobile/Tablette)

---

## 🛠 Stack Technique

*   **HTML5 / CSS3** (Framework CSS utilisé : Tailwind CSS)
*   **JavaScript (ES6+)** (Vanilla JS obligatoire)
*   **Bibliothèques JS utilisées :** Chart.js pour les graphiques

### APIs Utilisées
*   Source des données : Fichier JSON externe (`data.json`) pour les données initiales, localStorage pour la persistance
*   Images : Unsplash API (URLs externes)

---

## ⚙️ Installation Locale

Pour lancer le projet localement :

1.  Cloner le repo :
    ```bash
    git clone https://github.com/fatimaezzahraechaoui/gestion-restaurant.git
    ```
2.  Ouvrir le dossier :
    ```bash
    cd gestion-restaurant
    ```
3.  Lancer l'application :
    
    **⚠️ Important :** Pour éviter les erreurs CORS, utilisez un serveur local :
    
    **Option 1 : Python (Recommandé)**
    ```bash
    python -m http.server 8000
    ```
    Puis ouvrez : http://localhost:8000
    
    **Option 2 : Node.js**
    ```bash
    npx http-server -p 8000
    ```
    Puis ouvrez : http://localhost:8000
    
    **Option 3 : VS Code Live Server**
    - Installez l'extension "Live Server"
    - Clic droit sur `index.html` → "Open with Live Server"
    
    **Option 4 : Ouvrir directement (avec limitations)**
    - Double-cliquez sur `index.html`
    - ⚠️ Les données de secours seront utilisées (CORS bloque data.json)
    - Les données hardcodées dans le JavaScript fonctionneront quand même

## 🔐 Identifiants de Connexion

- **Admin :** `admin` / `admin`
- **Staff :** `staff` / `1234`

---

## 🍽️ Plats Disponibles dans le Menu

Le menu comprend des plats traditionnels marocains :

- **Tajine Poulet aux Olives** - 85 MAD
- **Couscous Royal** - 95 MAD
- **Pastilla au Poulet** - 75 MAD
- **Méchoui d'Agneau** - 120 MAD
- **Salade Marocaine** - 35 MAD
- **Thé à la Menthe** - 15 MAD

## 👥 Personnel par Défaut

- **Ahmed Alami** - Admin
- **Fatima Benali** - Cuisinier
- **Youssef Idrissi** - Serveur
- **Aicha Tazi** - Caissier

## 📦 Inventaire par Défaut

- Poulet Fermier, Tomates Fraîches, Huile d'Olive
- Agneau, Semoule Fine, Safran

## 🏪 Fournisseurs par Défaut

- **Maroc Food Distribution** - Frais (+212 522 123 456)
- **Atlas Boissons** - Liquides (+212 522 789 012)
- **Marché Central Casablanca** - Épicerie (+212 522 456 789)
- **Bio Maroc** - Bio (+212 522 345 678)

## 🛠️ Fonctionnalités Techniques

### Gestion des Données
- **localStorage** : Persistance automatique des données
- **data.json** : Données initiales (chargement via fetch)
- **Fallback** : Données hardcodées en cas d'échec du chargement JSON
- **Réinitialisation** : Bouton pour réinitialiser toutes les données

### Interface
- **Design moderne** avec Tailwind CSS
- **Responsive** : Adapté mobile, tablette et desktop
- **Animations fluides** : Transitions et effets hover
- **Modals** : Formulaires pour CRUD
- **Graphiques** : Chart.js pour les statistiques

## 🐛 Résolution de Problèmes

### Les données ne s'affichent pas
1. Vérifiez que vous utilisez un serveur local (pas file://)
2. Ouvrez la console (F12) pour voir les erreurs
3. Utilisez le bouton "Réinitialiser Données" dans la sidebar
4. Vérifiez que les données sont bien chargées dans localStorage

### Erreur CORS
- Utilisez un serveur local (voir section Installation)
- Les données de secours fonctionneront même avec file://

## 📸 Captures d'écran (Optionnel)
<!-- Vous pouvez ajouter ici 1 ou 2 screenshots de votre interface -->

## 📄 Licence

Ce projet est développé dans le cadre d'un projet académique.

## 👨‍💻 Contribution

Projet développé par l'équipe RestoPro :
- Fatima Ezzahrae Chaoui
- Nada El Alaoui
- Kenza El Alaoui
