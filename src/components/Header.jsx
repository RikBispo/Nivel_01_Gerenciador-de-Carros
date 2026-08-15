import React from 'react';
import { 
  Car, 
  PlusCircle, 
  Wrench, 
  FileDown, 
  ChevronDown, 
  ShieldCheck,
  ListFilter
} from 'lucide-react';
import { formatKm } from '../utils/calculations';

export function Header({
  vehicles = [],
  activeVehicleId,
  onSelectVehicle,
  onOpenVehicleList,
  onOpenAddVehicle,
  onOpenAddMaintenance,
  onExportPdf,
}) {
  const activeVehicle = vehicles.find((v) => v.id === activeVehicleId);

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-30 shadow-lg border-b border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/30">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-bold tracking-tight text-white">AutoCare</h1>
                  <span className="bg-indigo-950 text-indigo-400 text-xs font-semibold px-2 py-0.5 rounded border border-indigo-800/50">
                    Dash Manager
                  </span>
                </div>
                <p className="text-xs text-slate-400">Histórico de Revisões & Gestão da Frota</p>
              </div>
            </div>

            {/* Mobile Actions Toggle */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={onOpenVehicleList}
                className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700"
                title="Gerenciar Veículos"
              >
                <ListFilter className="h-5 w-5" />
              </button>
              <button
                onClick={onOpenAddMaintenance}
                disabled={!activeVehicle}
                className="p-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50"
                title="Registrar Manutenção"
              >
                <PlusCircle className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Active Vehicle Selector */}
          <div className="flex items-center space-x-3 bg-slate-800/80 p-1.5 pl-3 pr-2 rounded-xl border border-slate-700/60">
            <div className="text-xs text-slate-400 font-medium whitespace-nowrap">
              Veículo Ativo:
            </div>
            
            {vehicles.length > 0 ? (
              <div className="relative flex-1 md:w-64">
                <select
                  value={activeVehicleId || ''}
                  onChange={(e) => onSelectVehicle(e.target.value)}
                  className="w-full appearance-none bg-slate-900 text-white text-sm font-semibold py-1.5 pl-3 pr-8 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer truncate"
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
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors whitespace-nowrap"
              title="Ver Lista de Veículos"
            >
              Gerenciar
            </button>
          </div>

          {/* Header Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={onOpenAddVehicle}
              className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition-all shadow-sm"
            >
              <PlusCircle className="h-4 w-4 text-indigo-400" />
              <span>Novo Veículo</span>
            </button>

            <button
              onClick={onOpenAddMaintenance}
              disabled={!activeVehicle}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-600/20"
            >
              <Wrench className="h-4 w-4" />
              <span>Log Manutenção</span>
            </button>

            <button
              onClick={onExportPdf}
              className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-emerald-700 text-white hover:bg-emerald-600 transition-all shadow-sm"
              title="Exportar Relatório PDF"
            >
              <FileDown className="h-4 w-4" />
              <span>Exportar PDF</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
