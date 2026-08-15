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
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case MAINTENANCE_TYPES.PREDICTIVE:
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case MAINTENANCE_TYPES.CORRECTIVE:
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden no-print">
      
      {/* Header & Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Wrench className="h-5 w-5 text-indigo-600" />
              <span>Histórico de Manutenções</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {viewMode === 'CURRENT' && activeVehicle
                ? `Registros do veículo: ${activeVehicle.model}`
                : `Exibindo todas as manutenções de todos os veículos`}
            </p>
          </div>

          {activeVehicle && (
            <button
              onClick={onOpenAddMaintenance}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-all shadow-sm shadow-indigo-600/20 self-start sm:self-auto"
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
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Classification Filter Tabs */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-medium overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === 'ALL'
                  ? 'bg-white text-slate-900 font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({relevantMaintenances.length})
            </button>
            <button
              onClick={() => setSelectedCategory(MAINTENANCE_TYPES.PREVENTATIVE)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === MAINTENANCE_TYPES.PREVENTATIVE
                  ? 'bg-white text-teal-700 font-bold shadow-sm'
                  : 'text-slate-600 hover:text-teal-700'
              }`}
            >
              Preventiva
            </button>
            <button
              onClick={() => setSelectedCategory(MAINTENANCE_TYPES.PREDICTIVE)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === MAINTENANCE_TYPES.PREDICTIVE
                  ? 'bg-white text-amber-700 font-bold shadow-sm'
                  : 'text-slate-600 hover:text-amber-700'
              }`}
            >
              Preditiva
            </button>
            <button
              onClick={() => setSelectedCategory(MAINTENANCE_TYPES.CORRECTIVE)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === MAINTENANCE_TYPES.CORRECTIVE
                  ? 'bg-white text-rose-700 font-bold shadow-sm'
                  : 'text-slate-600 hover:text-rose-700'
              }`}
            >
              Corretiva
            </button>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {filteredList.length > 0 ? (
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold border-b border-slate-100">
              <tr>
                {viewMode === 'CONSOLIDATED' && <th className="py-3.5 px-4">Veículo</th>}
                <th className="py-3.5 px-4">Tipo de Serviço</th>
                <th className="py-3.5 px-4">Data</th>
                <th className="py-3.5 px-4">Km Serv.</th>
                <th className="py-3.5 px-4">Classificação</th>
                <th className="py-3.5 px-4 text-right">Valor (R$)</th>
                <th className="py-3.5 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.map((item) => {
                const vehicleOwner = vehicles.find((v) => v.id === item.vehicleId);
                const badgeStyle = getBadgeStyle(item.classification);

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors border-l-2 border-l-transparent hover:border-l-indigo-600"
                  >
                    {viewMode === 'CONSOLIDATED' && (
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {vehicleOwner ? `${vehicleOwner.model} (${vehicleOwner.plate})` : 'Desconhecido'}
                      </td>
                    )}
                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      {item.serviceType}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {formatDate(item.date)}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-700">
                      {formatKm(item.kmAtService)}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${badgeStyle}`}>
                        {item.classification}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-slate-900 whitespace-nowrap">
                      {formatCurrency(item.cost)}
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="inline-flex items-center space-x-1">
                        <button
                          onClick={() => onEditMaintenance(item)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                          title="Editar Manutenção"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDeleteMaintenance(item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Excluir Manutenção"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          /* Empty State */
          <div className="py-12 px-4 text-center">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
              <Wrench className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">Nenhuma manutenção encontrada</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchTerm || selectedCategory !== 'ALL'
                ? 'Tente ajustar a busca ou o filtro de classificação.'
                : activeVehicle
                ? 'Clique no botão acima para cadastrar a primeira manutenção deste veículo.'
                : 'Selecione ou cadastre um veículo para começar a registrar histórico.'}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
