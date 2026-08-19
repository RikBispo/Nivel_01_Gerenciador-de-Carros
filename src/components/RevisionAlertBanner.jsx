import React from 'react';
import { AlertTriangle, Clock, Calendar, CheckCircle2, Download, Bell } from 'lucide-react';
import { formatKm } from '../utils/calculations';
import { openGoogleCalendarEvent, downloadIcsFile } from '../utils/calendarUtil';

export function RevisionAlertBanner({ nextRevision, activeVehicle }) {
  if (!nextRevision || !activeVehicle) return null;

  const isOverdue = nextRevision.status === 'OVERDUE';
  const isWarning = nextRevision.status === 'WARNING';

  // Do not render banner if status is completely OK and mileage remaining is large (> 3000 km)
  if (!isOverdue && !isWarning) return null;

  const handleGoogleCalendar = () => {
    const title = `Revisão Preventiva - ${activeVehicle.model} (${activeVehicle.plate})`;
    const details = `Lembrete AutoCare Manager:\\nVeículo: ${activeVehicle.model}\\nPlaca: ${activeVehicle.plate}\\nQuilometragem Atual: ${activeVehicle.currentKm} km\\nQuilometragem Alvo da Revisão: ${nextRevision.projectedNextKm} km\\nStatus: ${nextRevision.message}`;
    
    // Set alarm date 3 days from today
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);

    openGoogleCalendarEvent({
      title,
      details,
      startDate: targetDate,
      location: 'Oficina Mecânica de Preferência',
    });
  };

  const handleDownloadIcs = () => {
    const title = `Revisão Preventiva - ${activeVehicle.model} (${activeVehicle.plate})`;
    const details = `Lembrete AutoCare Manager:\nVeículo: ${activeVehicle.model}\nPlaca: ${activeVehicle.plate}\nQuilometragem Alvo da Revisão: ${nextRevision.projectedNextKm} km\nStatus: ${nextRevision.message}`;

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);

    downloadIcsFile({
      title,
      details,
      startDate: targetDate,
      location: 'Oficina Mecânica',
    });
  };

  return (
    <div
      className={`rounded-3xl p-5 border shadow-2xl transition-all ${
        isOverdue
          ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
          : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div
            className={`p-3 rounded-2xl shrink-0 ${
              isOverdue ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}
          >
            <AlertTriangle className="h-6 w-6" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-white">
                {isOverdue ? 'Alerta Crítico: Revisão Preventiva Vencida!' : 'Atenção: Revisão Próxima do Vencimento'}
              </h3>
              <span
                className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                  isOverdue ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}
              >
                {isOverdue ? 'Vencida' : 'Próxima'}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {nextRevision.message} Recomendamos efetuar a troca de óleo e checagem dos itens de segurança para o veículo{' '}
              <strong className="text-white">{activeVehicle.model}</strong> ({activeVehicle.plate}).
            </p>
          </div>
        </div>

        {/* Action Buttons for Calendar Reminders */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
          <button
            onClick={handleGoogleCalendar}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold border border-slate-700 transition-colors shadow-sm"
            title="Agendar Lembrete no Google Agenda"
          >
            <Calendar className="h-4 w-4 text-cyan-400" />
            <span>Google Agenda</span>
          </button>

          <button
            onClick={handleDownloadIcs}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
            title="Baixar Arquivo .ICS para Outlook / Apple Agenda"
          >
            <Bell className="h-4 w-4" />
            <span>Baixar Alarm (.ics)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
