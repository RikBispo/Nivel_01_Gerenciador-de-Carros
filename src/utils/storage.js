import { INITIAL_VEHICLES, INITIAL_MAINTENANCES } from '../types';

const STORAGE_KEYS = {
  VEHICLES: 'autocare_vehicles_v1',
  MAINTENANCES: 'autocare_maintenances_v1',
  ACTIVE_VEHICLE: 'autocare_active_vehicle_v1',
};

export function loadVehicles() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.VEHICLES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(INITIAL_VEHICLES));
      return INITIAL_VEHICLES;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao carregar veículos do localStorage:', error);
    return INITIAL_VEHICLES;
  }
}

export function saveVehicles(vehicles) {
  try {
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(vehicles));
  } catch (error) {
    console.error('Erro ao salvar veículos no localStorage:', error);
  }
}

export function loadMaintenances() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.MAINTENANCES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.MAINTENANCES, JSON.stringify(INITIAL_MAINTENANCES));
      return INITIAL_MAINTENANCES;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao carregar manutenções do localStorage:', error);
    return INITIAL_MAINTENANCES;
  }
}

export function saveMaintenances(maintenances) {
  try {
    localStorage.setItem(STORAGE_KEYS.MAINTENANCES, JSON.stringify(maintenances));
  } catch (error) {
    console.error('Erro ao salvar manutenções no localStorage:', error);
  }
}

export function loadActiveVehicleId(vehicles) {
  try {
    const savedId = localStorage.getItem(STORAGE_KEYS.ACTIVE_VEHICLE);
    if (savedId && vehicles.some((v) => v.id === savedId)) {
      return savedId;
    }
    return vehicles.length > 0 ? vehicles[0].id : null;
  } catch (error) {
    return vehicles.length > 0 ? vehicles[0].id : null;
  }
}

export function saveActiveVehicleId(id) {
  try {
    if (id) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_VEHICLE, id);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_VEHICLE);
    }
  } catch (error) {
    console.error('Erro ao salvar veículo ativo no localStorage:', error);
  }
}
