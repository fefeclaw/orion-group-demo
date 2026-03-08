export const corridors = [
  {
    id: 'hope',
    name: "Corridor de l'Espoir",
    color: '#F97316',
    cities: [
      { name: 'Abidjan', coords: [5.360, -4.008] },
      { name: 'Yamoussoukro', coords: [6.821, -5.276] },
      { name: 'Bouaké', coords: [7.691, -5.030] },
      { name: 'Ferkessédougou', coords: [9.593, -5.198] },
      { name: 'Ouagadougou', coords: [12.371, -1.520] },
      { name: 'Niamey', coords: [13.514, 2.110] },
    ],
    waypoints: [
      [5.360, -4.008],
      [6.821, -5.276],
      [7.691, -5.030],
      [9.593, -5.198],
      [12.371, -1.520],
      [13.514, 2.110],
    ],
  },
  {
    id: 'growth',
    name: 'Axe de Croissance',
    color: '#22C55E',
    cities: [
      { name: 'Abidjan', coords: [5.360, -4.008] },
      { name: 'Man', coords: [7.412, -7.553] },
      { name: 'Odienné', coords: [9.508, -7.567] },
      { name: 'Bamako', coords: [12.639, -8.003] },
    ],
    waypoints: [
      [5.360, -4.008],
      [7.412, -7.553],
      [9.508, -7.567],
      [12.639, -8.003],
    ],
  },
  {
    id: 'coastal',
    name: 'Transfrontalière Côtière',
    color: '#3B82F6',
    cities: [
      { name: 'Abidjan', coords: [5.360, -4.008] },
      { name: 'Accra', coords: [5.560, -0.206] },
      { name: 'Lomé', coords: [6.138, 1.212] },
      { name: 'Cotonou', coords: [6.365, 2.418] },
      { name: 'Lagos', coords: [6.454, 3.395] },
    ],
    waypoints: [
      [5.360, -4.008],
      [5.560, -0.206],
      [6.138, 1.212],
      [6.365, 2.418],
      [6.454, 3.395],
    ],
  },
];

export const corridorMap = Object.fromEntries(corridors.map((c) => [c.id, c]));
