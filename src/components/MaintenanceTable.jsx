import React, { useState } from 'react';
import { 
  Wrench, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Plus, 
  Calendar, 
  Gauge, 
  DollarSign, 
  Tag,
  Car
} from 'lucide-react';
import { formatCurrency, formatKm, formatDate } from '../utils/calculations';
import { MAINTENANCE_TYPES } from '../types';

export function MaintenanceTable({
  activeVehicle,
  maintenances = [],
  vehicles = [],
  viewMode,
  onOpenAddMaintenance,
  onEditMaintenance,
  onDeleteMaintenance,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Filter records
  const relevantMaintenances = viewMode === 'CURRENT' && activeVehicle
    ? maintenances.filter((m) => m.vehicleId === activeVehicle.id)
    : maintenances;

  const filteredList = relevantMaintenances.filter((item) => {
    const matchesSearch = item.serviceType
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'ALL' || item.classification === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort by date / kmAtService descending
  filteredList.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  const getBadgeStyle = (classification) => {
    switch (classification) {
      case MAINTENANCE_TYPES.PREVENTATIVE:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case MAINTENANCE_TYPES.PREDICTIVE:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case MAINTENANCE_TYPES.CORRECTIVE:
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden no-print">
      
      {/* Header & Controls */}
      <div className="p-5 sm:p-6 border-b border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Wrench className="h-5 w-5 text-indigo-400" />
              <span>Histórico de Manutenções</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {viewMode === 'CURRENT' && activeVehicle
                ? `Registros do veículo: ${activeVehicle.model} (${activeVehicle.plate})`
                : `Exibindo todas as manutenções da frota`}
            </p>
          </div>

          {activeVehicle && (
            <button
              onClick={onOpenAddMaintenance}
              className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/20 self-start sm:self-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Registrar Manutenção</span>
            </button>
          )}
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar serviço (ex: Óleo, Freio, Pneu)..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === 'ALL'
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              Todos ({relevantMaintenances.length})
            </button>
            <button
              onClick={() => setSelectedCategory(MAINTENANCE_TYPES.PREVENTATIVE)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === MAINTENANCE_TYPES.PREVENTATIVE
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-emerald-400'
              }`}
            >
              Preventiva
            </button>
            <button
              onClick={() => setSelectedCategory(MAINTENANCE_TYPES.PREDICTIVE)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === MAINTENANCE_TYPES.PREDICTIVE
                  ? 'bg-amber-600 text-white border-amber-500'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-amber-400'
              }`}
            >
              Preditiva
            </button>
            <button
              onClick={() => setSelectedCategory(MAINTENANCE_TYPES.CORRECTIVE)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === MAINTENANCE_TYPES.CORRECTIVE
                  ? 'bg-rose-600 text-white border-rose-500'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-rose-400'
              }`}
            >
              Corretiva
            </button>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-4 sm:px-6">Serviço / Descrição</th>
              {viewMode === 'CONSOLIDATED' && (
                <th className="py-3.5 px-4">Veículo</th>
              )}
              <th className="py-3.5 px-4">Data</th>
              <th className="py-3.5 px-4">KM / Horas</th>
              <th className="py-3.5 px-4">Classificação</th>
              <th className="py-3.5 px-4 text-right">Custo (R$)</th>
              <th className="py-3.5 px-4 sm:px-6 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs">
            {filteredList.length > 0 ? (
              filteredList.map((item) => {
                const vehicleOwner = vehicles.find((v) => v.id === item.vehicleId);

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Service Type */}
                    <td className="py-4 px-4 sm:px-6 font-semibold text-slate-100">
                      <div className="flex items-start space-x-2">
                        <Wrench className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{item.serviceType}</span>
                      </div>
                    </td>

                    {/* Consolidated Vehicle Owner */}
                    {viewMode === 'CONSOLIDATED' && (
                      <td className="py-4 px-4 text-slate-300">
                        {vehicleOwner ? (
                          <div className="flex items-center space-x-1.5">
                            <Car className="h-3.5 w-3.5 text-slate-400" />
                            <span className="font-semibold">{vehicleOwner.model}</span>
                          </div>
                        ) : (
                          <span className="text-slate-500 italic">Desconhecido</span>
                        )}
                      </td>
                    )}

                    {/* Date */}
                    <td className="py-4 px-4 text-slate-300 font-mono">
                      {formatDate(item.date)}
                    </td>

                    {/* KM */}
                    <td className="py-4 px-4 text-slate-300 font-mono">
                      {formatKm(item.kmAtService)}
                    </td>

                    {/* Classification */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${getBadgeStyle(
                          item.classification
                        )}`}
                      >
                        {item.classification}
                      </span>
                    </td>

                    {/* Cost */}
                    <td className="py-4 px-4 text-right font-bold text-white font-mono text-sm">
                      {formatCurrency(item.cost)}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <button
                          onClick={() => onEditMaintenance(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
                          title="Editar Registro"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDeleteMaintenance(item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                          title="Excluir Registro"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={viewMode === 'CONSOLIDATED' ? 7 : 6}
                  className="py-12 text-center text-slate-500 italic"
                >
                  Nenhum registro de manutenção encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
