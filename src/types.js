export const MAINTENANCE_TYPES = {
  PREVENTATIVE: 'Preventiva',
  PREDICTIVE: 'Preditiva',
  CORRECTIVE: 'Corretiva',
};

export const DEFAULT_PREVENTATIVE_INTERVAL_KM = 10000;

export const INITIAL_VEHICLES = [
  {
    id: 'v-1',
    model: 'Toyota Corolla Cross 2.0',
    plate: 'ABC-1D23',
    currentKm: 48500,
    createdAt: '2025-01-10T10:00:00.000Z',
  },
  {
    id: 'v-2',
    model: 'Honda Civic Touring 1.5 Turbo',
    plate: 'XYZ-9876',
    currentKm: 62100,
    createdAt: '2025-02-15T14:30:00.000Z',
  },
  {
    id: 'v-3',
    model: 'Volkswagen Compass Longitude 1.3',
    plate: 'KRM-4E56',
    currentKm: 29800,
    createdAt: '2025-03-01T09:15:00.000Z',
  }
];

export const INITIAL_MAINTENANCES = [
  {
    id: 'm-1',
    vehicleId: 'v-1',
    serviceType: 'Troca de Óleo e Filtros (Engine & Cabin)',
    date: '2025-06-10',
    kmAtService: 40000,
    cost: 480.00,
    classification: MAINTENANCE_TYPES.PREVENTATIVE,
  },
  {
    id: 'm-2',
    vehicleId: 'v-1',
    serviceType: 'Alinhamento 3D e Balanceamento das 4 Rodas',
    date: '2025-08-05',
    kmAtService: 43500,
    cost: 220.00,
    classification: MAINTENANCE_TYPES.PREVENTATIVE,
  },
  {
    id: 'm-3',
    vehicleId: 'v-1',
    serviceType: 'Análise de Desgaste das Pastilhas de Freio (Análise de Ruído)',
    date: '2025-10-12',
    kmAtService: 46000,
    cost: 150.00,
    classification: MAINTENANCE_TYPES.PREDICTIVE,
  },
  {
    id: 'm-4',
    vehicleId: 'v-1',
    serviceType: 'Substituição da Bateria 60Ah (Falha Elétrica na Partida)',
    date: '2025-11-20',
    kmAtService: 47200,
    cost: 650.00,
    classification: MAINTENANCE_TYPES.CORRECTIVE,
  },
  {
    id: 'm-5',
    vehicleId: 'v-2',
    serviceType: 'Revisão dos 60.000 km (Velas de Iridium + Óleo Câmbio CVT)',
    date: '2025-07-22',
    kmAtService: 60000,
    cost: 1450.00,
    classification: MAINTENANCE_TYPES.PREVENTATIVE,
  },
  {
    id: 'm-6',
    vehicleId: 'v-2',
    serviceType: 'Substituição Amortecedores Dianteiros (Vazamento Detectado)',
    date: '2025-09-14',
    kmAtService: 61500,
    cost: 1890.00,
    classification: MAINTENANCE_TYPES.CORRECTIVE,
  },
  {
    id: 'm-7',
    vehicleId: 'v-3',
    serviceType: 'Revisão dos 20.000 km (Troca de Óleo + Fluido de Freio)',
    date: '2025-05-18',
    kmAtService: 20000,
    cost: 790.00,
    classification: MAINTENANCE_TYPES.PREVENTATIVE,
  }
];
