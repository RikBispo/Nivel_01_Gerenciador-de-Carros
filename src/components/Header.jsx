import React from 'react';
import { 
  Car, 
  PlusCircle, 
  Wrench, 
  FileDown, 
  ChevronDown, 
  ListFilter,
  BarChart3,
  MapPin,
  Sparkles,
  Bike,
  Truck,
  Anchor,
  Shield,
  Bus,
  Tractor
} from 'lucide-react';
import { formatKm } from '../utils/calculations';
import { VEHICLE_TYPES } from '../types';

export function Header({
  vehicles = [],
  activeVehicleId,
  onSelectVehicle,
  onOpenVehicleList,
  onOpenAddVehicle,
  onOpenAddMaintenance,
  onExportPdf,
  activeTab,
  onTabChange,
}) {
  const activeVehicle = vehicles.find((v) => v.id === activeVehicleId);

  const getVehicleIcon = (typeId) => {
    switch (typeId) {
      case 'MOTORCYCLE':
        return <Bike className="h-4 w-4 text-cyan-400" />;
      case 'TRUCK':
        return <Truck className="h-4 w-4 text-amber-400" />;
      case 'JETSKI':
        return <Anchor className="h-4 w-4 text-sky-400" />;
      case 'SUV':
        return <Shield className="h-4 w-4 text-emerald-400" />;
      case 'VAN':
        return <Bus className="h-4 w-4 text-indigo-400" />;
      case 'TRACTOR':
        return <Tractor className="h-4 w-4 text-lime-400" />;
      default:
        return <Car className="h-4 w-4 text-indigo-400" />;
    }
  };

  const navTabs = [
    { id: 'dashboard', label: 'Dashboard & Custos', icon: BarChart3 },
    { id: 'maintenances', label: 'Histórico de Manutenções', icon: Wrench },
    { id: 'diy', label: 'Faça Você Mesmo (DIY)', icon: Sparkles },
    { id: 'nearby', label: 'Oficinas Próximas', icon: MapPin },
  ];

  return (
    <header className="bg-slate-950 text-white sticky top-0 z-30 shadow-2xl border-b border-slate-800/80 backdrop-blur-xl no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-600/30">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-black tracking-tight text-white">AutoCare</h1>
                  <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    PRO
                  </span>
                </div>
                <p className="text-xs text-slate-400">Gerenciador de Revisões & Gestão da Frota</p>
              </div>
            </div>

            {/* Mobile Actions Toggle */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={onOpenVehicleList}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
                title="Gerenciar Veículos"
              >
                <ListFilter className="h-5 w-5" />
              </button>
              <button
                onClick={onOpenAddMaintenance}
                disabled={!activeVehicle}
                className="p-2 rounded-xl bg-indigo-600 text-white disabled:opacity-50"
                title="Registrar Manutenção"
              >
                <PlusCircle className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Active Vehicle Quick Switcher */}
          <div className="flex items-center space-x-3 bg-slate-900/90 p-1.5 pl-3 pr-2 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium whitespace-nowrap flex items-center space-x-1">
              <span>Veículo:</span>
              {activeVehicle && getVehicleIcon(activeVehicle.type)}
            </div>
            
            {vehicles.length > 0 ? (
              <div className="relative flex-1 md:w-64">
                <select
                  value={activeVehicleId || ''}
                  onChange={(e) => onSelectVehicle(e.target.value)}
                  className="w-full appearance-none bg-slate-950 text-white text-xs sm:text-sm font-semibold py-1.5 pl-3 pr-8 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer truncate"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.model} ({v.plate}) • {formatKm(v.currentKm)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="h-4 w-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            ) : (
              <span className="text-xs text-amber-400 italic">Nenhum veículo cadastrado</span>
            )}

            <button
              onClick={onOpenVehicleList}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors whitespace-nowrap border border-slate-700"
              title="Ver Lista de Veículos"
            >
              Gerenciar
            </button>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={onOpenAddVehicle}
              className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-800 transition-all shadow-sm"
            >
              <PlusCircle className="h-4 w-4 text-indigo-400" />
              <span>Novo Veículo</span>
            </button>

            <button
              onClick={onOpenAddMaintenance}
              disabled={!activeVehicle}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-600/20"
            >
              <Wrench className="h-4 w-4" />
              <span>Log Manutenção</span>
            </button>

            <button
              onClick={onExportPdf}
              className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-emerald-700 text-white hover:bg-emerald-600 transition-all shadow-sm"
              title="Exportar Relatório PDF"
            >
              <FileDown className="h-4 w-4" />
              <span>Exportar PDF</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center space-x-2 border-t border-slate-800/80 pt-2 overflow-x-auto scrollbar-none">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50 shadow-md shadow-indigo-600/10'
                    : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
