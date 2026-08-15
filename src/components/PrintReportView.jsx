import React from 'react';
import { calculateMetrics, calculateNextRevision, formatCurrency, formatKm, formatDate } from '../utils/calculations';
import { MAINTENANCE_TYPES } from '../types';

export function PrintReportView({ vehicles = [], maintenances = [], activeVehicle }) {
  const consolidatedMetrics = calculateMetrics(maintenances);

  return (
    <div className="hidden print:block p-8 bg-white text-slate-900 font-sans print-container">
      
      {/* Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">
            AutoCare Dash Manager
          </h1>
          <p className="text-sm text-slate-600">Relatório Completo de Histórico de Revisões & Custos de Frota</p>
        </div>
        <div className="text-right text-xs text-slate-500">
          <p>Data de Emissão: {new Date().toLocaleDateString('pt-BR')}</p>
          <p>Total de Veículos: {vehicles.length}</p>
        </div>
      </div>

      {/* Consolidado Global Summary */}
      <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200 print-card">
        <h2 className="text-sm font-bold uppercase text-slate-800 mb-3">Resumo Financeiro Consolidado</h2>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="p-2 bg-white rounded border border-slate-200">
            <span className="text-[10px] font-bold text-teal-700 uppercase block">Preventiva</span>
            <span className="text-base font-bold text-slate-900">{formatCurrency(consolidatedMetrics.totalPreventative)}</span>
          </div>
          <div className="p-2 bg-white rounded border border-slate-200">
            <span className="text-[10px] font-bold text-amber-700 uppercase block">Preditiva</span>
            <span className="text-base font-bold text-slate-900">{formatCurrency(consolidatedMetrics.totalPredictive)}</span>
          </div>
          <div className="p-2 bg-white rounded border border-slate-200">
            <span className="text-[10px] font-bold text-rose-700 uppercase block">Corretiva</span>
            <span className="text-base font-bold text-slate-900">{formatCurrency(consolidatedMetrics.totalCorrective)}</span>
          </div>
          <div className="p-2 bg-slate-900 text-white rounded">
            <span className="text-[10px] font-bold uppercase block text-indigo-300">Custo Total</span>
            <span className="text-base font-bold">{formatCurrency(consolidatedMetrics.totalCost)}</span>
          </div>
        </div>
      </div>

      {/* Vehicles & Manutencao Details */}
      {vehicles.map((vehicle) => {
        const vehicleMaintenances = maintenances.filter((m) => m.vehicleId === vehicle.id);
        const vMetrics = calculateMetrics(vehicleMaintenances);
        const rev = calculateNextRevision(vehicle, maintenances);

        return (
          <div key={vehicle.id} className="mb-8 page-break-inside-avoid">
            <div className="bg-slate-100 p-3 rounded-t-lg border border-slate-300 flex justify-between items-center">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  {vehicle.model} <span className="text-slate-600 font-mono text-sm">({vehicle.plate})</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Quilometragem Atual: {formatKm(vehicle.currentKm)} | Próxima Revisão Estimada: {formatKm(rev?.projectedNextKm)}
                </p>
              </div>
              <div className="text-right text-xs">
                <span className="font-bold text-slate-900">Total Gasto: {formatCurrency(vMetrics.totalCost)}</span>
              </div>
            </div>

            {vehicleMaintenances.length > 0 ? (
              <table className="w-full text-left text-xs border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-300 text-slate-700 font-bold">
                    <th className="p-2 border border-slate-200">Tipo de Serviço</th>
                    <th className="p-2 border border-slate-200">Data</th>
                    <th className="p-2 border border-slate-200">Km Serv.</th>
                    <th className="p-2 border border-slate-200">Classificação</th>
                    <th className="p-2 border border-slate-200 text-right">Valor (R$)</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleMaintenances.map((m) => (
                    <tr key={m.id} className="border-b border-slate-200">
                      <td className="p-2 border border-slate-200 font-medium">{m.serviceType}</td>
                      <td className="p-2 border border-slate-200">{formatDate(m.date)}</td>
                      <td className="p-2 border border-slate-200">{formatKm(m.kmAtService)}</td>
                      <td className="p-2 border border-slate-200">{m.classification}</td>
                      <td className="p-2 border border-slate-200 text-right font-bold">{formatCurrency(m.cost)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-3 text-xs italic text-slate-500 border border-slate-200 border-t-0 rounded-b-lg">
                Nenhuma manutenção registrada para este veículo.
              </div>
            )}
          </div>
        );
      })}

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-slate-200 text-center text-xs text-slate-400">
        Gerado automaticamente por AutoCare Dash Manager — Sistema de Gestão de Revisões Automotivas
      </div>

    </div>
  );
}
