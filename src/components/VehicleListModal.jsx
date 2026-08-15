import React from 'react';
import { X, Car, Plus, Edit2, Trash2, CheckCircle, Gauge } from 'lucide-react';
import { formatKm } from '../utils/calculations';

export function VehicleListModal({
  isOpen,
  onClose,
  vehicles = [],
  activeVehicleId,
  onSelectVehicle,
  onOpenAddVehicle,
  onEditVehicle,
  onDeleteVehicle,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in no-print">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-600">
              <Car className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">Gerenciar Frota / Veículos</h3>
              <p className="text-xs text-slate-400">Selecione, edite ou cadastre novos veículos</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body - List of Vehicles */}
        <div className="p-5 overflow-y-auto flex-1 divide-y divide-slate-100">
          {vehicles.length > 0 ? (
            vehicles.map((v) => {
              const isActive = v.id === activeVehicleId;
              return (
                <div
                  key={v.id}
                  className={`py-3.5 px-3 rounded-xl transition-all flex items-center justify-between group ${
                    isActive ? 'bg-indigo-50/80 border border-indigo-200' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectVehicle(v.id)}>
                    <div className={`p-2.5 rounded-xl ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <Car className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-slate-900">{v.model}</span>
                        <span className="text-xs font-mono font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                          {v.plate}
                        </span>
                        {isActive && (
                          <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                            <CheckCircle className="h-3 w-3" />
                            <span>ATIVO</span>
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center space-x-1">
                        <Gauge className="h-3.5 w-3.5 text-slate-400" />
                        <span>Odômetro: <strong>{formatKm(v.currentKm)}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => onEditVehicle(v)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-white transition-colors"
                      title="Editar Veículo"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteVehicle(v.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white transition-colors"
                      title="Excluir Veículo e Histórico"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-slate-500">
              <Car className="h-10 w-10 mx-auto text-slate-300 mb-2" />
              <p className="text-xs">Nenhum veículo cadastrado na frota.</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between flex-shrink-0">
          <button
            onClick={onOpenAddVehicle}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 rounded-xl transition-all shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Cadastrar Novo Veículo</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
