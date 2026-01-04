# RestoPro ERP - Gestion Totale

> Application ERP complète pour la gestion d'un restaurant, incluant inventaire, personnel, fournisseurs, menu et point de vente (POS).

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

*   **Thème :** Gestion de Restaurant
*   **Description :** Système ERP complet pour gérer les opérations d'un restaurant : inventaire des ingrédients, gestion du personnel, fournisseurs, carte du menu, et interface de point de vente (POS).

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
- [ ] **Chart 5 :** [Type]

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
    *   Ouvrez simplement `index.html` dans votre navigateur.
    *   OU utilisez Live Server (VS Code Extension).

---

## 📸 Captures d'écran (Optionnel)
<!-- Vous pouvez ajouter ici 1 ou 2 screenshots de votre interface -->
