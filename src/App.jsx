import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { KpiCards } from './components/KpiCards';
import { RevisionAlertBanner } from './components/RevisionAlertBanner';
import { MaintenanceTable } from './components/MaintenanceTable';
import { VehicleListModal } from './components/VehicleListModal';
import { VehicleFormModal } from './components/VehicleFormModal';
import { MaintenanceFormModal } from './components/MaintenanceFormModal';
import { PrintReportView } from './components/PrintReportView';

import {
  loadVehicles,
  saveVehicles,
  loadMaintenances,
  saveMaintenances,
  loadActiveVehicleId,
  saveActiveVehicleId,
} from './utils/storage';
import { Car, Wrench, CheckCircle2, AlertCircle, PlusCircle } from 'lucide-react';

export function App() {
  const [vehicles, setVehicles] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  const [activeVehicleId, setActiveVehicleId] = useState(null);
  const [viewMode, setViewMode] = useState('CURRENT'); // 'CURRENT' | 'CONSOLIDATED'
  
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

  // Sync state changes to LocalStorage
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
      const nextId = remainingVehicles.length > 0 ? remainingVehicles[0].id : null;
      setActiveVehicleId(nextId);
      saveActiveVehicleId(nextId);
    }

    showToast(`Veículo ${target.model} e seu histórico foram removidos.`, 'info');
  };

  const handleUpdateVehicleKm = (vehicleId, newKm) => {
    const updatedVehicles = vehicles.map((v) =>
      v.id === vehicleId ? { ...v, currentKm: Number(newKm) } : v
    );
    setVehicles(updatedVehicles);
    saveVehicles(updatedVehicles);
    showToast('Quilometragem atualizada com sucesso!');
  };

  // Maintenance CRUD
  const handleSaveMaintenance = (maintData) => {
    let updatedMaintenances = [];
    if (maintData.id) {
      // Edit
      updatedMaintenances = maintenances.map((m) =>
        m.id === maintData.id ? { ...m, ...maintData } : m
      );
      showToast('Registro de manutenção atualizado!');
    } else {
      // Create
      const newM = {
        ...maintData,
        id: `m-${Date.now()}`,
      };
      updatedMaintenances = [...maintenances, newM];
      showToast('Nova manutenção registrada com sucesso!');
    }

    setMaintenances(updatedMaintenances);
    saveMaintenances(updatedMaintenances);

    // If maintenance kmAtService is higher than vehicle's currentKm, update currentKm automatically
    const currentV = vehicles.find((v) => v.id === maintData.vehicleId);
    if (currentV && maintData.kmAtService > currentV.currentKm) {
      handleUpdateVehicleKm(currentV.id, maintData.kmAtService);
    }
  };

  const handleDeleteMaintenance = (id) => {
    if (!window.confirm('Deseja realmente excluir esta manutenção do histórico?')) return;
    const remaining = maintenances.filter((m) => m.id !== id);
    setMaintenances(remaining);
    saveMaintenances(remaining);
    showToast('Registro de manutenção removido.', 'info');
  };

  // Active Vehicle Object
  const activeVehicle = vehicles.find((v) => v.id === activeVehicleId) || null;

  // Print PDF Trigger
  const handleExportPdf = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* App Topbar Header */}
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
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 no-print">
        
        {/* Toast Feedback Notification */}
        {toast && (
          <div className="fixed bottom-5 right-5 z-50 animate-bounce">
            <div className={`px-4 py-3 rounded-2xl shadow-xl border flex items-center space-x-2.5 text-xs font-bold text-white ${
              toast.type === 'info' ? 'bg-slate-900 border-slate-700' : 'bg-emerald-600 border-emerald-500'
            }`}>
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              <span>{toast.message}</span>
            </div>
          </div>
        )}

        {/* Empty State Banner if No Vehicles Exist */}
        {vehicles.length === 0 && (
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-8 rounded-3xl shadow-lg text-center space-y-4">
            <div className="h-16 w-16 mx-auto rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Car className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Bem-vindo ao AutoCare Dash Manager!</h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                Você ainda não possui nenhum veículo cadastrado. Adicione seu primeiro veículo para acompanhar revisões, gastos e próximas manutenções.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingVehicle(null);
                setIsVehicleFormOpen(true);
              }}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Cadastrar Primeiro Veículo</span>
            </button>
          </div>
        )}

        {/* Dynamic Revision Alert Banner for Active Vehicle */}
        {activeVehicle && viewMode === 'CURRENT' && (
          <RevisionAlertBanner
            activeVehicle={activeVehicle}
            maintenances={maintenances}
            onUpdateVehicleKm={handleUpdateVehicleKm}
          />
        )}

        {/* Financial KPI Cards Component */}
        <KpiCards
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          activeVehicle={activeVehicle}
          maintenances={maintenances}
          vehiclesCount={vehicles.length}
        />

        {/* Maintenance History Table Component */}
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

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-4 text-center text-xs text-slate-500 no-print mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AutoCare Dash Manager — Sistema de Gestão de Revisões</span>
          <span className="text-slate-400">Dados salvos com segurança em LocalStorage</span>
        </div>
      </footer>

      {/* Modals */}
      <VehicleListModal
        isOpen={isVehicleListOpen}
        onClose={() => setIsVehicleListOpen(false)}
        vehicles={vehicles}
        activeVehicleId={activeVehicleId}
        onSelectVehicle={handleSelectVehicle}
        onOpenAddVehicle={() => {
          setIsVehicleListOpen(false);
          setEditingVehicle(null);
          setIsVehicleFormOpen(true);
        }}
        onEditVehicle={(v) => {
          setIsVehicleListOpen(false);
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

      {/* High Quality Printable View for PDF Generation */}
      <PrintReportView
        vehicles={vehicles}
        maintenances={maintenances}
        activeVehicle={activeVehicle}
      />

    </div>
  );
}

export default App;
