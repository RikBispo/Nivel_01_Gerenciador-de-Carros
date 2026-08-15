import React, { useState } from 'react';
import { 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  Gauge, 
  Edit3, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { calculateNextRevision, formatKm, formatDate } from '../utils/calculations';

export function RevisionAlertBanner({
  activeVehicle,
  maintenances = [],
  onUpdateVehicleKm,
}) {
  if (!activeVehicle) return null;

  const revisionInfo = calculateNextRevision(activeVehicle, maintenances);
  const [isEditingKm, setIsEditingKm] = useState(false);
  const [newKmInput, setNewKmInput] = useState(activeVehicle.currentKm || 0);

  if (!revisionInfo) return null;

  const handleSaveKm = (e) => {
    e.preventDefault();
    const val = Number(newKmInput);
    if (!isNaN(val) && val >= 0) {
      onUpdateVehicleKm(activeVehicle.id, val);
      setIsEditingKm(false);
    }
  };

  const getStatusVisuals = () => {
    switch (revisionInfo.status) {
      case 'OVERDUE':
        return {
          bg: 'bg-rose-50 border-rose-200 text-rose-900',
          badge: 'bg-rose-600 text-white shadow-md shadow-rose-600/30',
          icon: <AlertOctagon className="h-6 w-6 text-rose-600 animate-bounce" />,
          title: 'Atenção: Revisão Preventiva Vencida!',
          sub: `A quilometragem atual (${formatKm(activeVehicle.currentKm)}) ultrapassou a projeção (${formatKm(revisionInfo.projectedNextKm)}).`,
        };
      case 'WARNING':
        return {
          bg: 'bg-amber-50 border-amber-200 text-amber-900',
          badge: 'bg-amber-500 text-white shadow-md shadow-amber-500/20',
          icon: <AlertTriangle className="h-6 w-6 text-amber-600" />,
          title: 'Atenção: Próxima Revisão Próxima!',
          sub: `Faltam menos de 1.000 km para atingir a meta da próxima revisão (${formatKm(revisionInfo.projectedNextKm)}).`,
        };
      case 'OK':
      default:
        return {
          bg: 'bg-emerald-50/70 border-emerald-200 text-emerald-900',
          badge: 'bg-emerald-600 text-white',
          icon: <CheckCircle2 className="h-6 w-6 text-emerald-600" />,
          title: 'Revisão Preventiva em Dia',
          sub: `Sua próxima revisão está projetada para os ${formatKm(revisionInfo.projectedNextKm)}.`,
        };
    }
  };

  const visuals = getStatusVisuals();

  return (
    <div className={`p-4 sm:p-5 rounded-2xl border ${visuals.bg} transition-all no-print shadow-sm`}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        {/* Left Side: Status Icon & Title */}
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 rounded-xl bg-white shadow-sm border border-slate-100 flex-shrink-0">
            {visuals.icon}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold tracking-tight">{visuals.title}</h3>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${visuals.badge}`}>
                {revisionInfo.status === 'OVERDUE' ? 'VENCIDA' : revisionInfo.status === 'WARNING' ? 'PRÓXIMA' : 'OK'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">{visuals.sub}</p>

            {/* Quick Metrics Detail Pills */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <div className="bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200/60 flex items-center space-x-1.5 text-slate-700">
                <Gauge className="h-3.5 w-3.5 text-slate-500" />
                <span>Atual: <strong>{formatKm(activeVehicle.currentKm)}</strong></span>
              </div>

              <div className="bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200/60 flex items-center space-x-1.5 text-slate-700">
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                <span>Meta Revisão: <strong>{formatKm(revisionInfo.projectedNextKm)}</strong></span>
              </div>

              {revisionInfo.lastPreventativeDate && (
                <div className="bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200/60 flex items-center space-x-1.5 text-slate-700">
                  <Calendar className="h-3.5 w-3.5 text-slate-500" />
                  <span>Última Preventiva: <strong>{formatDate(revisionInfo.lastPreventativeDate)}</strong> ({formatKm(revisionInfo.lastPreventativeKm)})</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Quick Km Update Box */}
        <div className="bg-white/90 p-3 rounded-xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 self-stretch lg:self-auto">
          {isEditingKm ? (
            <form onSubmit={handleSaveKm} className="flex items-center space-x-2 w-full">
              <input
                type="number"
                value={newKmInput}
                onChange={(e) => setNewKmInput(e.target.value)}
                placeholder="Km Atual"
                className="w-28 px-2 py-1 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="px-2.5 py-1 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => setIsEditingKm(false)}
                className="px-2 py-1 text-xs text-slate-500 hover:text-slate-800"
              >
                Cancelar
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-between w-full sm:w-auto space-x-3">
              <div>
                <span className="text-[11px] font-semibold uppercase text-slate-400 block">Odômetro</span>
                <span className="text-sm font-bold text-slate-900">{formatKm(activeVehicle.currentKm)}</span>
              </div>
              <button
                onClick={() => {
                  setNewKmInput(activeVehicle.currentKm);
                  setIsEditingKm(true);
                }}
                className="inline-flex items-center space-x-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-lg hover:bg-indigo-100 transition-colors"
                title="Atualizar odômetro do veículo"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>Atualizar Km</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
