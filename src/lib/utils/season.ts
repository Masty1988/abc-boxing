/**
 * Calcule automatiquement la saison en cours
 * La saison change le 1er juillet de chaque année
 *
 * Exemples :
 * - Janvier 2026 → "2025-2026"
 * - Juin 2026 → "2025-2026"
 * - Juillet 2026 → "2026-2027"
 * - Décembre 2026 → "2026-2027"
 */
export function getCurrentSeason(): string {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0 = janvier, 6 = juillet

  // Si on est entre juillet (6) et décembre (11), la saison démarre cette année
  // Si on est entre janvier (0) et juin (5), la saison a démarré l'année dernière
  const startYear = currentMonth >= 6 ? currentYear : currentYear - 1;
  const endYear = startYear + 1;

  return `${startYear}-${endYear}`;
}

/**
 * Retourne le libellé complet de la saison
 * Ex: "Saison 2025-2026"
 */
export function getSeasonLabel(season?: string): string {
  const currentSeason = season || getCurrentSeason();
  return `Saison ${currentSeason}`;
}
