export const MAINTENANCE_TYPES = {
  PREVENTATIVE: 'Preventiva',
  PREDICTIVE: 'Preditiva',
  CORRECTIVE: 'Corretiva',
};

export const DEFAULT_PREVENTATIVE_INTERVAL_KM = 10000;

export const VEHICLE_TYPES = {
  CAR: { id: 'CAR', label: 'Carro', icon: 'Car' },
  MOTORCYCLE: { id: 'MOTORCYCLE', label: 'Moto', icon: 'Bike' },
  TRUCK: { id: 'TRUCK', label: 'Caminhão', icon: 'Truck' },
  JETSKI: { id: 'JETSKI', label: 'Jet-Ski', icon: 'Anchor' },
  SUV: { id: 'SUV', label: 'SUV / 4x4', icon: 'Shield' },
  VAN: { id: 'VAN', label: 'Van / Utilitário', icon: 'Bus' },
  TRACTOR: { id: 'TRACTOR', label: 'Trator', icon: 'Tractor' },
  OTHER: { id: 'OTHER', label: 'Outro', icon: 'Wrench' },
};

export const DEFAULT_VEHICLE_PHOTOS = {
  CAR: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
  MOTORCYCLE: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
  TRUCK: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
  JETSKI: 'https://images.unsplash.com/photo-1563299796-17596ed6b017?auto=format&fit=crop&w=800&q=80',
  SUV: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
  VAN: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
  TRACTOR: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&w=800&q=80',
  OTHER: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80',
};

export const INITIAL_VEHICLES = [
  {
    id: 'v-1',
    model: 'Toyota Corolla Cross 2.0',
    type: 'CAR',
    plate: 'ABC-1D23',
    currentKm: 48500,
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    createdAt: '2025-01-10T10:00:00.000Z',
  },
  {
    id: 'v-2',
    model: 'Honda CB 500X ABS',
    type: 'MOTORCYCLE',
    plate: 'XYZ-9876',
    currentKm: 18200,
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
    createdAt: '2025-02-15T14:30:00.000Z',
  },
  {
    id: 'v-3',
    model: 'Sea-Doo GTX 300 Limited',
    type: 'JETSKI',
    plate: 'JET-2025',
    currentKm: 85, // Horas de uso
    imageUrl: 'https://images.unsplash.com/photo-1563299796-17596ed6b017?auto=format&fit=crop&w=800&q=80',
    createdAt: '2025-03-01T09:15:00.000Z',
  }
];

export const INITIAL_MAINTENANCES = [
  {
    id: 'm-1',
    vehicleId: 'v-1',
    serviceType: 'Troca de Óleo 5W30 e Filtros de Motor & Cabine',
    date: '2025-06-10',
    kmAtService: 40000,
    cost: 480.00,
    classification: MAINTENANCE_TYPES.PREVENTATIVE,
  },
  {
    id: 'm-2',
    vehicleId: 'v-1',
    serviceType: 'Alinhamento 3D e Balanceamento das Rodas',
    date: '2025-08-05',
    kmAtService: 43500,
    cost: 220.00,
    classification: MAINTENANCE_TYPES.PREVENTATIVE,
  },
  {
    id: 'm-3',
    vehicleId: 'v-1',
    serviceType: 'Inspeção de Desgaste das Pastilhas de Freio',
    date: '2025-10-12',
    kmAtService: 46000,
    cost: 150.00,
    classification: MAINTENANCE_TYPES.PREDICTIVE,
  },
  {
    id: 'm-4',
    vehicleId: 'v-1',
    serviceType: 'Substituição da Bateria 60Ah',
    date: '2025-11-20',
    kmAtService: 47200,
    cost: 650.00,
    classification: MAINTENANCE_TYPES.CORRECTIVE,
  },
  {
    id: 'm-5',
    vehicleId: 'v-2',
    serviceType: 'Troca de Óleo Semi-sintético e Filtro de Moto',
    date: '2025-07-22',
    kmAtService: 15000,
    cost: 250.00,
    classification: MAINTENANCE_TYPES.PREVENTATIVE,
  },
  {
    id: 'm-6',
    vehicleId: 'v-2',
    serviceType: 'Ajuste e Kit Relação (Corrente, Coroa e Pinhão)',
    date: '2025-09-14',
    kmAtService: 17500,
    cost: 580.00,
    classification: MAINTENANCE_TYPES.CORRECTIVE,
  },
  {
    id: 'm-7',
    vehicleId: 'v-3',
    serviceType: 'Revisão de 50 Horas: Óleo Náutico + Velas de Ignição',
    date: '2025-05-18',
    kmAtService: 50,
    cost: 890.00,
    classification: MAINTENANCE_TYPES.PREVENTATIVE,
  }
];

export const DIY_TUTORIALS = [
  {
    id: 'diy-1',
    title: 'Troca das Palhetas do Limpador de Pára-brisa',
    vehicleTypes: ['CAR', 'SUV', 'VAN', 'TRUCK'],
    difficulty: 'EASY', // EASY, MEDIUM, HARD
    difficultyLabel: 'Muito Fácil',
    timeEst: '5 a 10 min',
    savingsEst: 'R$ 40 - R$ 80 em mão de obra',
    toolsNeeded: ['Nenhuma ferramenta (sistema de encaixe universal)'],
    summary: 'Mantenha a visibilidade perfeita em dias de chuva trocando as palhetas ressecadas.',
    steps: [
      'Levante a haste do limpador para longe do pára-brisa.',
      'Pressione a pequena trava plástica na base da palheta antiga.',
      'Deslize a palheta para baixo para soltá-la do gancho em "U".',
      'Encaixe a nova palheta no gancho até ouvir um estalo firme (clique).',
      'Abaixe cuidadosamente a haste de volta ao vidro.'
    ],
    tips: 'Nunca deixe a haste metálica sem palheta subir sozinha, pois pode trincar o vidro.'
  },
  {
    id: 'diy-2',
    title: 'Verificação e Calibragem dos Pneus (Com Estepe)',
    vehicleTypes: ['CAR', 'MOTORCYCLE', 'SUV', 'VAN', 'TRUCK'],
    difficulty: 'EASY',
    difficultyLabel: 'Muito Fácil',
    timeEst: '5 min',
    savingsEst: 'R$ 30 - R$ 50/mês (economia de combustível)',
    toolsNeeded: ['Calibrador de posto ou medidor portátil'],
    summary: 'Pneus calibrados aumentam a vida útil da borracha e reduzem o consumo de combustível.',
    steps: [
      'Consulte a etiqueta na porta do motorista ou manual para saber a pressão correta (PSI).',
      'Remova a tampa da válvula do pneu.',
      'Conecte a mangueira do calibrador firmemente até parar de chiar.',
      'Digite a pressão desejada e aguarde o sinal sonoro do aparelho.',
      'Recoloque a tampa protetora da válvula em todos os pneus e estepe.'
    ],
    tips: 'Faça a calibragem sempre com os pneus frios (rodou menos de 3 km).'
  },
  {
    id: 'diy-3',
    title: 'Limpeza e Lubrificação da Corrente de Moto',
    vehicleTypes: ['MOTORCYCLE'],
    difficulty: 'MEDIUM',
    difficultyLabel: 'Fácil a Médio',
    timeEst: '20 min',
    savingsEst: 'R$ 60 - R$ 120 por manutenção',
    toolsNeeded: ['Querosene/Desengraxante', 'Escova de dentes/corrente', 'Spray Lubrificante C2/C4 ou óleo 90'],
    summary: 'Garanta rodagem suave e evite quebras prematuras da corrente da motocicleta.',
    steps: [
      'Coloque a moto no descanso central ou cavalete de roda traseira.',
      'Borrife desengraxante ou querosene por toda a extensão da corrente.',
      'Esfregue com a escova para remover graxa acumulada e terra.',
      'Seque completamente com um pano limpo e seco.',
      'Gire a roda manualmente e aplique o lubrificante na parte interna dos elos da corrente.'
    ],
    tips: 'Aguarde 15 minutos antes de pilotar para o lubrificante aderir bem e não espirrar.'
  },
  {
    id: 'diy-4',
    title: 'Substituição do Filtro de Ar da Cabine / Ar-Condicionado',
    vehicleTypes: ['CAR', 'SUV', 'VAN'],
    difficulty: 'EASY',
    difficultyLabel: 'Fácil',
    timeEst: '15 min',
    savingsEst: 'R$ 50 - R$ 100 em mão de obra',
    toolsNeeded: ['Nenhuma ou Chave Philips simples'],
    summary: 'Elimine maus odores e melhore o fluxo de ar puro no interior do veículo.',
    steps: [
      'Abra o porta-luvas e pressione as abas laterais para desencaixá-lo completamente.',
      'Localize a tampa retangular do compartimento do filtro de ar.',
      'Pressione a trava da tampa e remova o filtro antigo (observe a seta de fluxo de ar).',
      'Insira o novo filtro de cabine na mesma direção da seta.',
      'Recoloque a tampa e encaixe novamente o porta-luvas.'
    ],
    tips: 'Troque o filtro a cada 10.000 km ou 1 ano de uso para evitar proliferação de fungos.'
  },
  {
    id: 'diy-5',
    title: 'Adoçamento / Adoçar o Motor do Jet-Ski após uso no Mar',
    vehicleTypes: ['JETSKI'],
    difficulty: 'MEDIUM',
    difficultyLabel: 'Fácil a Médio',
    timeEst: '15 min',
    savingsEst: 'R$ 200 - R$ 500 (Prevenção contra oxidação)',
    toolsNeeded: ['Mangueira de jardim com engate rápido para jet-ski'],
    summary: 'Remova o sal marinho do sistema de arrefecimento para evitar corrosão do motor.',
    steps: [
      'Coloque o Jet-Ski em local plano (carreta) fora da água.',
      'LIGUE O MOTOR do Jet-Ski PRIMEIRO (regra crucial!).',
      'Abra a torneira da mangueira de água em seguida.',
      'Deixe a água circular limpando o sistema por 2 a 3 minutos acelerando suavemente.',
      'FECHE A ÁGUA PRIMEIRO e depois DESLIGUE O MOTOR.'
    ],
    tips: 'NUNCA abra a água com o motor desligado para não calçar o motor com água nos cilindros!'
  }
];

export const NEARBY_SERVICES = [
  {
    id: 'loc-1',
    name: 'Auto Center & Oficina Mecânica Precision',
    type: 'MECHANIC',
    categoryLabel: 'Oficina Mecânica',
    rating: 4.9,
    address: 'Av. Paulista, 1500 - Bela Vista',
    distanceKm: '1.2 km',
    phone: '(11) 98765-4321',
    openStatus: 'Aberto até 18:00',
    mapsQuery: 'Oficina Mecanica Auto Center',
    specialties: ['Injeção Eletrônica', 'Suspensão', 'Freios ABS'],
  },
  {
    id: 'loc-2',
    name: 'Express Troca de Óleo & Lubrificantes',
    type: 'OIL_CHANGE',
    categoryLabel: 'Troca de Óleo',
    rating: 4.8,
    address: 'Rua Augusta, 850 - Consolação',
    distanceKm: '2.5 km',
    phone: '(11) 97654-3210',
    openStatus: 'Aberto até 19:00',
    mapsQuery: 'Troca de Oleo Rapida',
    specialties: ['Filtros', 'Óleo Sintético', 'Higienização de Ar'],
  },
  {
    id: 'loc-3',
    name: 'Motopeças & Oficina Moto Speed 24h',
    type: 'MOTO_SHOP',
    categoryLabel: 'Oficina de Motos',
    rating: 4.9,
    address: 'Av. Rebouças, 2100 - Pinheiros',
    distanceKm: '3.1 km',
    phone: '(11) 96543-2109',
    openStatus: 'Aberto 24h',
    mapsQuery: 'Oficina de Motos Motopeças',
    specialties: ['Kits Relação', 'Pneus de Moto', 'Revisão Geral'],
  },
  {
    id: 'loc-4',
    name: 'Assistência Náutica & Jet-Ski Harbor',
    type: 'NAUTICAL',
    categoryLabel: 'Assistência Náutica',
    rating: 5.0,
    address: 'Rod. dos Imigrantes, Km 60',
    distanceKm: '15.4 km',
    phone: '(13) 95432-1098',
    openStatus: 'Aberto até 17:30',
    mapsQuery: 'Manutencao Jet Ski Nautica',
    specialties: ['Motores Sea-Doo & Yamaha', 'Adoçamento', 'Revisão Náutica'],
  },
  {
    id: 'loc-5',
    name: 'Auto Elétrica & Baterias Moura Direct',
    type: 'AUTO_ELECTRIC',
    categoryLabel: 'Auto Elétrica',
    rating: 4.7,
    address: 'Rua da Consolação, 1200 - Centro',
    distanceKm: '1.8 km',
    phone: '(11) 94321-0987',
    openStatus: 'Aberto até 18:30',
    mapsQuery: 'Auto Eletrica e Baterias',
    specialties: ['Troca de Bateria', 'Alternador', 'Motor de Partida'],
  },
  {
    id: 'loc-6',
    name: 'Pneus 3D & Alinhamento Laser',
    type: 'TIRES',
    categoryLabel: 'Pneus & Alinhamento',
    rating: 4.8,
    address: 'Av. Brigadeiro Faria Lima, 3400',
    distanceKm: '4.0 km',
    phone: '(11) 93210-9876',
    openStatus: 'Aberto até 18:00',
    mapsQuery: 'Alinhamento e Balanceamento Pneus',
    specialties: ['Alinhamento 3D', 'Cambagem', 'Venda de Pneus'],
  }
];
