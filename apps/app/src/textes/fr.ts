const fr = {
  // Login
  'login.titre': 'Toodoo',
  'login.email': 'Email',
  'login.motDePasse': 'Mot de passe',
  'login.nomEntreprise': "Nom de l'entreprise",
  'login.connexion': 'Se connecter',
  'login.creerCompte': 'Créer mon compte',
  'login.dejaCompte': 'Déjà un compte ? Se connecter',
  'login.pasDeCompte': 'Créer un compte',
  'login.erreur': 'Erreur',

  // Dashboard
  'dashboard.deconnexion': 'Déconnexion',
  'dashboard.bienvenue': 'Bienvenue sur Toodoo. Les vues kanban et liste arrivent bientôt.',
} as const;

export type TexteKey = keyof typeof fr;
export default fr;
