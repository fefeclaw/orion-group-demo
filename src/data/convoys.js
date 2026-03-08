/**
 * Returns the initial list of convoys across all three corridors.
 * @returns {Array} Array of convoy objects
 */
export function initConvoys() {
  return [
    // --- Corridor de l'Espoir (hope) ---
    {
      id: 'CVY-001',
      corridorId: 'hope',
      name: 'Convoy Alpha',
      progress: 0.1,
      status: 'moving',
      cargo: 'Produits agricoles',
      origin: 'Abidjan',
      destination: 'Niamey',
    },
    {
      id: 'CVY-002',
      corridorId: 'hope',
      name: 'Convoy Beta',
      progress: 0.5,
      status: 'delayed',
      cargo: 'Matériaux de construction',
      origin: 'Abidjan',
      destination: 'Ouagadougou',
    },

    // --- Axe de Croissance (growth) ---
    {
      id: 'CVY-003',
      corridorId: 'growth',
      name: 'Convoy Gamma',
      progress: 0.3,
      status: 'moving',
      cargo: 'Équipements électroniques',
      origin: 'Abidjan',
      destination: 'Bamako',
    },
    {
      id: 'CVY-004',
      corridorId: 'growth',
      name: 'Convoy Delta',
      progress: 0.8,
      status: 'moving',
      cargo: 'Produits pharmaceutiques',
      origin: 'Abidjan',
      destination: 'Bamako',
    },

    // --- Transfrontalière Côtière (coastal) ---
    {
      id: 'CVY-005',
      corridorId: 'coastal',
      name: 'Convoy Epsilon',
      progress: 0.6,
      status: 'alert',
      cargo: 'Marchandises périssables',
      origin: 'Abidjan',
      destination: 'Lagos',
    },
    {
      id: 'CVY-006',
      corridorId: 'coastal',
      name: 'Convoy Zeta',
      progress: 0.9,
      status: 'moving',
      cargo: 'Textiles et confection',
      origin: 'Abidjan',
      destination: 'Cotonou',
    },
  ];
}
