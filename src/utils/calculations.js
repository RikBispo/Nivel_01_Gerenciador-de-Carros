import { MAINTENANCE_TYPES, DEFAULT_PREVENTATIVE_INTERVAL_KM } from '../types';

/**
 * Format numbers as Brazilian Real currency (R$)
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount || 0);
}

/**
 * Format numbers with thousands separators for Kilometers
 */
export function formatKm(km) {
  if (km === undefined || km === null || isNaN(km)) return '0 km';
  return `${new Intl.NumberFormat('pt-BR').format(km)} km`;
}

/**
 * Format ISO date string (YYYY-MM-DD) to Brazilian date format (DD/MM/YYYY)
 */
export function formatDate(dateString) {
  if (!dateString) return '-';
  const parts = dateString.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[3]}`;
  }
  return dateString;
}

/**
 * Calculate Financial Metrics for a set of maintenance records
 */
export function calculateMetrics(maintenancesList = []) {
  let totalPreventative = 0;
  let totalPredictive = 0;
  let totalCorrective = 0;

  maintenancesList.forEach((item) => {
    const cost = Number(item.cost) || 0;
    if (item.classification === MAINTENANCE_TYPES.PREVENTATIVE) {
      totalPreventative += cost;
    } else if (item.classification === MAINTENANCE_TYPES.PREDICTIVE) {
      totalPredictive += cost;
    } else if (item.classification === MAINTENANCE_TYPES.CORRECTIVE) {
      totalCorrective += cost;
    }
  });

  const totalCost = totalPreventative + totalPredictive + totalCorrective;

  // Identify highest expenditure category
  const categories = [
    { type: MAINTENANCE_TYPES.PREVENTATIVE, amount: totalPreventative, color: 'teal' },
    { type: MAINTENANCE_TYPES.PREDICTIVE, amount: totalPredictive, color: 'amber' },
    { type: MAINTENANCE_TYPES.CORRECTIVE, amount: totalCorrective, color: 'rose' },
  ];

  categories.sort((a, b) => b.amount - a.amount);
  
  const highestCategory = categories[0].amount > 0 ? categories[0] : null;

  return {
    totalPreventative,
    totalPredictive,
    totalCorrective,
    totalCost,
    highestCategory,
    count: maintenancesList.length,
  };
}

/**
 * Calculate Next Revision Alert Status for a vehicle
 * Rule: Based on last Preventative maintenance
 */
export function calculateNextRevision(vehicle, maintenancesList = []) {
  if (!vehicle) return null;

  const vehicleMaintenances = maintenancesList.filter((m) => m.vehicleId === vehicle.id);
  const preventativeRecords = vehicleMaintenances.filter(
    (m) => m.classification === MAINTENANCE_TYPES.PREVENTATIVE
  );

  let lastPreventativeKm = 0;
  let lastPreventativeDate = null;

  if (preventativeRecords.length > 0) {
    // Sort by kmAtService descending
    preventativeRecords.sort((a, b) => (b.kmAtService || 0) - (a.kmAtService || 0));
    lastPreventativeKm = Number(preventativeRecords[0].kmAtService) || 0;
    lastPreventativeDate = preventativeRecords[0].date;
  }

  // Projected next revision km: last preventative km + 10.000 km
  // If no preventative registered yet, project next round 10.000 km step above currentKm
  let projectedNextKm = 0;
  if (lastPreventativeKm > 0) {
    projectedNextKm = lastPreventativeKm + DEFAULT_PREVENTATIVE_INTERVAL_KM;
  } else {
    const current = Number(vehicle.currentKm) || 0;
    projectedNextKm = (Math.floor(current / DEFAULT_PREVENTATIVE_INTERVAL_KM) + 1) * DEFAULT_PREVENTATIVE_INTERVAL_KM;
  }

  const currentKm = Number(vehicle.currentKm) || 0;
  const remainingKm = projectedNextKm - currentKm;

  let status = 'OK'; // 'OK' | 'WARNING' | 'OVERDUE'
  let message = 'Manutenção preventiva em dia.';
  let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';

  if (remainingKm < 0) {
    status = 'OVERDUE';
    message = `Revisão ultrapassada em ${formatKm(Math.abs(remainingKm))}!`;
    badgeColor = 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse';
  } else if (remainingKm <= 1000) {
    status = 'WARNING';
    message = `Revisão próxima! Faltam apenas ${formatKm(remainingKm)}.`;
    badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
  } else {
    message = `Próxima revisão em ${formatKm(remainingKm)}.`;
  }

  return {
    lastPreventativeKm,
    lastPreventativeDate,
    projectedNextKm,
    currentKm,
    remainingKm,
    status,
    message,
    badgeColor,
  };
}
