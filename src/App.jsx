import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { KpiCards } from './components/KpiCards';
import { RevisionAlertBanner } from './components/RevisionAlertBanner';
import { MaintenanceTable } from './components/MaintenanceTable';
import { VehicleListModal } from './components/VehicleListModal';
import { VehicleFormModal } from './components/VehicleFormModal';
import { MaintenanceFormModal } from './components/MaintenanceFormModal';
import { PrintReportView } from './components/PrintReportView';
import { DiyTutorialsView } from './components/DiyTutorialsView';
import { NearbyServicesView } from './components/NearbyServicesView';
import { MonthlyCostDashboard } from './components/MonthlyCostDashboard';

import {
  loadVehicles,
  saveVehicles,
  loadMaintenances,
  saveMaintenances,
  loadActiveVehicleId,
  saveActiveVehicleId,
} from './utils/storage';
import { calculateMetrics, calculateNextRevision } from './utils/calculations';
import { Car, Wrench, CheckCircle2, AlertCircle, PlusCircle } from 'lucide-react';

export function App() {
  const [vehicles, setVehicles] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  const [activeVehicleId, setActiveVehicleId] = useState(null);
  const [viewMode, setViewMode] = useState('CURRENT'); // 'CURRENT' | 'CONSOLIDATED'
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'maintenances' | 'diy' | 'nearby'
  
  // Toast notifications state
  const [toast, setToast] = useState(null);

  // Modals state
  const [isVehicleListOpen, setIsVehicleListOpen] = useState(false);
  const [isVehicleFormOpen, setIsVehicleFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const [isMaintenanceFormOpen, setIsMaintenanceFormOpen] = useState(false);
  const [editingMaintenance, setEditingMaintenance] = useState(null);

  // Initial Load from LocalStorage
  useEffect(() => {
    const loadedV = loadVehicles();
    const loadedM = loadMaintenances();
    const activeId = loadActiveVehicleId(loadedV);

    setVehicles(loadedV);
    setMaintenances(loadedM);
    setActiveVehicleId(activeId);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleSelectVehicle = (id) => {
    setActiveVehicleId(id);
    saveActiveVehicleId(id);
    if (viewMode === 'CONSOLIDATED') {
      setViewMode('CURRENT');
    }
  };

  // Vehicle CRUD
  const handleSaveVehicle = (vehicleData) => {
    let updatedVehicles = [];
    if (vehicleData.id) {
      // Edit
      updatedVehicles = vehicles.map((v) =>
        v.id === vehicleData.id ? { ...v, ...vehicleData } : v
      );
      showToast(`Veículo ${vehicleData.model} atualizado com sucesso!`);
    } else {
      // Create
      const newV = {
        ...vehicleData,
        id: `v-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      updatedVehicles = [...vehicles, newV];
      setActiveVehicleId(newV.id);
      saveActiveVehicleId(newV.id);
      showToast(`Veículo ${newV.model} cadastrado com sucesso!`);
    }

    setVehicles(updatedVehicles);
    saveVehicles(updatedVehicles);
  };

  const handleDeleteVehicle = (id) => {
    const target = vehicles.find((v) => v.id === id);
    if (!target) return;

    const confirmMsg = `Tem certeza que deseja excluir o veículo "${target.model}" (${target.plate})?\nATENÇÃO: Todo o histórico de manutenções deste veículo também será removido permanentemente.`;
    if (!window.confirm(confirmMsg)) return;

    const remainingVehicles = vehicles.filter((v) => v.id !== id);
    const remainingMaintenances = maintenances.filter((m) => m.vehicleId !== id);

    setVehicles(remainingVehicles);
    saveVehicles(remainingVehicles);

    setMaintenances(remainingMaintenances);
    saveMaintenances(remainingMaintenances);

    if (activeVehicleId === id) {
      const nextActiveId = remainingVehicles.length > 0 ? remainingVehicles[0].id : null;
      setActiveVehicleId(nextActiveId);
      saveActiveVehicleId(nextActiveId);
    }

    showToast(`Veículo e seus registros foram removidos.`);
  };

  // Maintenance CRUD
  const handleSaveMaintenance = (maintData) => {
    let updatedMaintenances = [];
    if (maintData.id) {
      // Edit
      updatedMaintenances = maintenances.map((m) =>
        m.id === maintData.id ? { ...m, ...maintData } : m
      );
      showToast(`Registro de manutenção atualizado com sucesso!`);
    } else {
      // Create
      const newM = {
        ...maintData,
        id: `m-${Date.now()}`,
      };
      updatedMaintenances = [...maintenances, newM];
      showToast(`Nova manutenção salva com sucesso!`);
    }

    setMaintenances(updatedMaintenances);
    saveMaintenances(updatedMaintenances);

    // Update active vehicle KM if maintenance KM > current KM
    const activeV = vehicles.find((v) => v.id === maintData.vehicleId);
    if (activeV && Number(maintData.kmAtService) > Number(activeV.currentKm || 0)) {
      const updatedV = vehicles.map((v) =>
        v.id === activeV.id ? { ...v, currentKm: Number(maintData.kmAtService) } : v
      );
      setVehicles(updatedV);
      saveVehicles(updatedV);
    }
  };

  const handleDeleteMaintenance = (id) => {
    if (!window.confirm('Deseja realmente excluir este registro de manutenção?')) return;
    const remaining = maintenances.filter((m) => m.id !== id);
    setMaintenances(remaining);
    saveMaintenances(remaining);
    showToast('Registro excluído com sucesso.');
  };

  const handleExportPdf = () => {
    window.print();
  };

  // Derived Active Vehicle and Metrics
  const activeVehicle = vehicles.find((v) => v.id === activeVehicleId);

  const relevantMaintenances = viewMode === 'CURRENT' && activeVehicle
    ? maintenances.filter((m) => m.vehicleId === activeVehicle.id)
    : maintenances;

  const metrics = calculateMetrics(relevantMaintenances);
  const nextRevision = calculateNextRevision(activeVehicle, maintenances);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 animate-fadeIn">
          <div className="flex items-center space-x-2 px-4 py-3 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-2xl">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span className="text-xs font-semibold">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main Header */}
      <Header
        vehicles={vehicles}
        activeVehicleId={activeVehicleId}
        onSelectVehicle={handleSelectVehicle}
        onOpenVehicleList={() => setIsVehicleListOpen(true)}
        onOpenAddVehicle={() => {
          setEditingVehicle(null);
          setIsVehicleFormOpen(true);
        }}
        onOpenAddMaintenance={() => {
          setEditingMaintenance(null);
          setIsMaintenanceFormOpen(true);
        }}
        onExportPdf={handleExportPdf}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Render Tab 1: Dashboard & Custos */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Alert Banner if revision is pending */}
            <RevisionAlertBanner
              nextRevision={nextRevision}
              activeVehicle={activeVehicle}
            />

            {/* Vehicle Hero Card & Financial KPI Summary */}
            <KpiCards
              metrics={metrics}
              nextRevision={nextRevision}
              activeVehicle={activeVehicle}
              onOpenEditVehicle={(v) => {
                setEditingVehicle(v);
                setIsVehicleFormOpen(true);
              }}
            />

            {/* Monthly Cost Graphs & Breakdown */}
            <MonthlyCostDashboard
              vehicles={vehicles}
              maintenances={maintenances}
              activeVehicleId={activeVehicleId}
            />
          </div>
        )}

        {/* Render Tab 2: Histórico de Manutenções */}
        {activeTab === 'maintenances' && (
          <div className="space-y-6 animate-fadeIn">
            {/* View Mode Toggle: Active Vehicle vs Entire Fleet */}
            <div className="flex items-center justify-between bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
              <div className="text-xs font-bold text-slate-300">
                Escopo de Exibição das Manutenções:
              </div>
              <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setViewMode('CURRENT')}
                  disabled={!activeVehicle}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'CURRENT'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Veículo Ativo {activeVehicle ? `(${activeVehicle.model})` : ''}
                </button>
                <button
                  onClick={() => setViewMode('CONSOLIDATED')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'CONSOLIDATED'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Toda a Frota ({maintenances.length})
                </button>
              </div>
            </div>

            <MaintenanceTable
              activeVehicle={activeVehicle}
              maintenances={maintenances}
              vehicles={vehicles}
              viewMode={viewMode}
              onOpenAddMaintenance={() => {
                setEditingMaintenance(null);
                setIsMaintenanceFormOpen(true);
              }}
              onEditMaintenance={(m) => {
                setEditingMaintenance(m);
                setIsMaintenanceFormOpen(true);
              }}
              onDeleteMaintenance={handleDeleteMaintenance}
            />
          </div>
        )}

        {/* Render Tab 3: Faça Você Mesmo (DIY) */}
        {activeTab === 'diy' && (
          <div className="animate-fadeIn">
            <DiyTutorialsView activeVehicle={activeVehicle} />
          </div>
        )}

        {/* Render Tab 4: Oficinas Próximas */}
        {activeTab === 'nearby' && (
          <div className="animate-fadeIn">
            <NearbyServicesView />
          </div>
        )}

      </main>

      {/* Hidden Print Container for High Quality PDF Generation */}
      <div className="hidden print:block print-container">
        <PrintReportView
          activeVehicle={activeVehicle}
          maintenances={relevantMaintenances}
          metrics={metrics}
          nextRevision={nextRevision}
          viewMode={viewMode}
        />
      </div>

      {/* Modals */}
      <VehicleListModal
        isOpen={isVehicleListOpen}
        onClose={() => setIsVehicleListOpen(false)}
        vehicles={vehicles}
        activeVehicleId={activeVehicleId}
        onSelectVehicle={handleSelectVehicle}
        onOpenAddVehicle={() => {
          setEditingVehicle(null);
          setIsVehicleFormOpen(true);
        }}
        onOpenEditVehicle={(v) => {
          setEditingVehicle(v);
          setIsVehicleFormOpen(true);
        }}
        onDeleteVehicle={handleDeleteVehicle}
      />

      <VehicleFormModal
        isOpen={isVehicleFormOpen}
        onClose={() => setIsVehicleFormOpen(false)}
        onSave={handleSaveVehicle}
        editingVehicle={editingVehicle}
      />

      <MaintenanceFormModal
        isOpen={isMaintenanceFormOpen}
        onClose={() => setIsMaintenanceFormOpen(false)}
        onSave={handleSaveMaintenance}
        editingMaintenance={editingMaintenance}
        activeVehicle={activeVehicle}
      />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} AutoCare Manager — Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
