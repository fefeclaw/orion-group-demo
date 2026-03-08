export const initialKPIs = {
  onTimeRate: 94,        // % de livraisons à l'heure
  avgTransitHours: 18,   // durée moyenne de transit en heures
  activeConvoys: 6,      // nombre de convois actifs
  incidentsResolved: 3,  // incidents résolus aujourd'hui
  costSavings: 12,       // % d'économies réalisées vs baseline
};

export const incidentScenarios = [
  {
    id: 'INC-001',
    type: 'road_block',
    corridor: 'hope',
    location: 'Bouaké',
    message: 'Barrage routier signalé à l\'entrée de Bouaké. Retard estimé : 2h.',
    aiAction: 'Recalcul d\'itinéraire via la N7 en cours. Notification envoyée au convoi CVY-002.',
    severity: 'high',
  },
  {
    id: 'INC-002',
    type: 'weather',
    corridor: 'coastal',
    location: 'Accra',
    message: 'Pluies torrentielles sur l\'axe Abidjan–Accra. Visibilité réduite.',
    aiAction: 'Vitesse réduite recommandée. Convoy CVY-005 placé en alerte. ETA révisé à +3h.',
    severity: 'medium',
  },
  {
    id: 'INC-003',
    type: 'customs_delay',
    corridor: 'growth',
    location: 'Odienné',
    message: 'Contrôle douanier prolongé au poste d\'Odienné. File d\'attente importante.',
    aiAction: 'Documents pré-validés transmis aux autorités. Corridor alternatif identifié en stand-by.',
    severity: 'low',
  },
];
