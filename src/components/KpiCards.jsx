import React from 'react';
import { 
  Car, 
  Wrench, 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2,
  Calendar,
  Gauge,
  Tag,
  Bike,
  Truck,
  Anchor,
  Shield,
  Bus,
  Tractor,
  Edit2
} from 'lucide-react';
import { formatCurrency, formatKm } from '../utils/calculations';
import { VEHICLE_TYPES, DEFAULT_VEHICLE_PHOTOS } from '../types';

export function KpiCards({
  metrics,
  nextRevision,
  activeVehicle,
  onOpenEditVehicle,
}) {
  const getVehicleBadge = (typeId) => {
    const vType = VEHICLE_TYPES[typeId] || VEHICLE_TYPES.CAR;
    return (
      <span className="inline-flex items-center space-x-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full text-xs font-semibold">
        <span>{vType.label}</span>
      </span>
    );
  };

  const activePhoto = activeVehicle?.imageUrl || DEFAULT_VEHICLE_PHOTOS[activeVehicle?.type] || DEFAULT_VEHICLE_PHOTOS.CAR;

  return (
    <div className="space-y-6">
      {/* Featured Active Vehicle Card with Photo */}
      {activeVehicle && (
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Vehicle Photo Container */}
            <div className="relative lg:col-span-5 h-56 lg:h-auto min-h-[220px] bg-slate-950 overflow-hidden">
              <img
                src={activePhoto}
                alt={activeVehicle.model}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.target.src = DEFAULT_VEHICLE_PHOTOS[activeVehicle?.type] || DEFAULT_VEHICLE_PHOTOS.CAR;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-slate-950/40 lg:to-slate-900" />
              
              {/* Photo Overlay Badge */}
              <div className="absolute top-3 left-3">
                {getVehicleBadge(activeVehicle.type)}
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                    {activeVehicle.model}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1 rounded-xl text-xs font-bold font-mono">
                      PLACA: {activeVehicle.plate || 'S/N'}
                    </span>
                    <span className="bg-slate-800 text-cyan-400 border border-slate-700 px-3 py-1 rounded-xl text-xs font-semibold flex items-center space-x-1">
                      <Gauge className="h-3.5 w-3.5" />
                      <span>{formatKm(activeVehicle.currentKm)}</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenEditVehicle(activeVehicle)}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shadow-sm"
                  title="Editar Dados do Veículo"
                >
                  <Edit2 className="h-4 w-4 text-indigo-400" />
                </button>
              </div>

              {/* Status & Revision summary bar */}
              {nextRevision && (
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider">
                      Status da Próxima Revisão
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full font-bold border text-[11px] ${nextRevision.badgeColor}`}>
                      {nextRevision.status === 'OVERDUE'
                        ? 'Revisão Atrasada'
                        : nextRevision.status === 'WARNING'
                        ? 'Atenção Próxima'
                        : 'Em Dia'}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-slate-200">
                    {nextRevision.message}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 text-slate-400 border-t border-slate-900">
                    <div>
                      Última preventiva: <strong className="text-slate-200">{formatKm(nextRevision.lastPreventativeKm)}</strong>
                    </div>
                    <div className="text-right">
                      Meta recomendada: <strong className="text-indigo-400">{formatKm(nextRevision.projectedNextKm)}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Financial & Operational KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Cost */}
        <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Investido</span>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            {formatCurrency(metrics.totalCost)}
          </div>
          <p className="text-xs text-slate-400">
            Gasto acumulado no histórico registrado.
          </p>
        </div>

        {/* Card 2: Preventative Expenditure */}
        <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Manutenção Preventiva</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400">
            {formatCurrency(metrics.totalPreventative)}
          </div>
          <p className="text-xs text-slate-400">
            {metrics.totalCost > 0
              ? `${Math.round((metrics.totalPreventative / metrics.totalCost) * 100)}% em prevenção de falhas.`
              : 'Nenhum valor acumulado.'}
          </p>
        </div>

        {/* Card 3: Corrective Expenditure */}
        <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Manutenção Corretiva</span>
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-400">
            {formatCurrency(metrics.totalCorrective)}
          </div>
          <p className="text-xs text-slate-400">
            Gastos com consertos e imprevistos.
          </p>
        </div>

        {/* Card 4: Total Logs & Average */}
        <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Serviços & Média</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Wrench className="h-5 w-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-cyan-400">
            {metrics.count} <span className="text-xs font-normal text-slate-400">registros</span>
          </div>
          <p className="text-xs text-slate-400">
            Média de <strong className="text-slate-200">{formatCurrency(metrics.count > 0 ? metrics.totalCost / metrics.count : 0)}</strong> por serviço.
          </p>
        </div>
      </div>
    </div>
  );
}
