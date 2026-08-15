import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  AlertTriangle, 
  DollarSign, 
  TrendingUp, 
  Car, 
  Layers 
} from 'lucide-react';
import { formatCurrency, calculateMetrics } from '../utils/calculations';
import { MAINTENANCE_TYPES } from '../types';

export function KpiCards({
  viewMode, // 'CURRENT' | 'CONSOLIDATED'
  onViewModeChange,
  activeVehicle,
  maintenances = [],
  vehiclesCount = 0,
}) {
  // Filter maintenances based on view mode
  const filteredMaintenances = viewMode === 'CURRENT' && activeVehicle
    ? maintenances.filter((m) => m.vehicleId === activeVehicle.id)
    : maintenances;

  const metrics = calculateMetrics(filteredMaintenances);

  return (
    <div className="space-y-4 no-print">
      {/* Top Bar with View Mode Segmented Control */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">Indicadores Financeiros</h2>
            <p className="text-xs text-slate-500">
              {viewMode === 'CURRENT' && activeVehicle
                ? `Exibindo custos de: ${activeVehicle.model} (${activeVehicle.plate})`
                : `Exibindo total consolidado de ${vehiclesCount} veículos`}
            </p>
          </div>
        </div>

        {/* Segmented Control Switcher */}
        <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200/60 text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => onViewModeChange('CURRENT')}
            disabled={!activeVehicle}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'CURRENT'
                ? 'bg-white text-indigo-600 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900 disabled:opacity-40'
            }`}
          >
            <Car className="h-3.5 w-3.5" />
            <span>Veículo Atual</span>
          </button>
          
          <button
            onClick={() => onViewModeChange('CONSOLIDATED')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'CONSOLIDATED'
                ? 'bg-white text-indigo-600 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Visão Consolidada ({vehiclesCount})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Preventativa Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200/60">
              {MAINTENANCE_TYPES.PREVENTATIVE}
            </span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {formatCurrency(metrics.totalPreventative)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Rotina & Preservação preventiva
            </p>
          </div>
        </div>

        {/* Preditiva Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
              {MAINTENANCE_TYPES.PREDICTIVE}
            </span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Activity className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {formatCurrency(metrics.totalPredictive)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Monitoramento & Análise de desgaste
            </p>
          </div>
        </div>

        {/* Corretiva Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200/60">
              {MAINTENANCE_TYPES.CORRECTIVE}
            </span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {formatCurrency(metrics.totalCorrective)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Reparos não planejados & Quebras
            </p>
          </div>
        </div>

        {/* Total & Maior Gasto Card */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-5 rounded-2xl shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 bg-indigo-900/60 px-2.5 py-1 rounded-full border border-indigo-700/50">
              Custo Total
            </span>
            <div className="p-2 rounded-xl bg-indigo-600/30 text-indigo-300">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          
          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {formatCurrency(metrics.totalCost)}
            </div>
            <div className="text-xs text-indigo-200/80 mt-0.5">
              {metrics.count} manutenção(ões) registrada(s)
            </div>
          </div>

          {/* Destaque Maior Gasto */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Maior Gasto:</span>
            {metrics.highestCategory ? (
              <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                metrics.highestCategory.type === MAINTENANCE_TYPES.PREVENTATIVE
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : metrics.highestCategory.type === MAINTENANCE_TYPES.PREDICTIVE
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {metrics.highestCategory.type} ({formatCurrency(metrics.highestCategory.amount)})
              </span>
            ) : (
              <span className="text-slate-500 italic">Sem registros</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
