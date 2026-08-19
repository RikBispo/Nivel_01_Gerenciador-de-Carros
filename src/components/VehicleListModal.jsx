import React from 'react';
import { X, Plus, Edit2, Trash2, CheckCircle2, Car, Gauge } from 'lucide-react';
import { formatKm } from '../utils/calculations';
import { VEHICLE_TYPES, DEFAULT_VEHICLE_PHOTOS } from '../types';

export function VehicleListModal({
  isOpen,
  onClose,
  vehicles = [],
  activeVehicleId,
  onSelectVehicle,
  onOpenAddVehicle,
  onOpenEditVehicle,
  onDeleteVehicle,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/20">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Gerenciador de Veículos</h3>
              <p className="text-xs text-slate-400">Frota cadastrada ({vehicles.length})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-6 overflow-y-auto space-y-3">
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => {
              const isActive = vehicle.id === activeVehicleId;
              const vType = VEHICLE_TYPES[vehicle.type] || VEHICLE_TYPES.CAR;
              const photo = vehicle.imageUrl || DEFAULT_VEHICLE_PHOTOS[vehicle.type] || DEFAULT_VEHICLE_PHOTOS.CAR;

              return (
                <div
                  key={vehicle.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition-all gap-4 ${
                    isActive
                      ? 'bg-indigo-600/10 border-indigo-500 shadow-md shadow-indigo-600/10'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Thumbnail */}
                    <div className="h-14 w-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                      <img
                        src={photo}
                        alt={vehicle.model}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.src = DEFAULT_VEHICLE_PHOTOS[vehicle.type] || DEFAULT_VEHICLE_PHOTOS.CAR;
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-white text-base leading-snug">
                          {vehicle.model}
                        </h4>
                        <span className="text-[10px] font-semibold bg-slate-800 text-indigo-300 border border-slate-700 px-2 py-0.5 rounded">
                          {vType.label}
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full flex items-center space-x-1">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>Ativo</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-3 text-xs text-slate-400">
                        <span className="font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {vehicle.plate || 'SEM PLACA'}
                        </span>
                        <span className="flex items-center space-x-1 text-cyan-400 font-semibold">
                          <Gauge className="h-3.5 w-3.5" />
                          <span>{formatKm(vehicle.currentKm)}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center space-x-2 self-end sm:self-center">
                    {!isActive && (
                      <button
                        onClick={() => {
                          onSelectVehicle(vehicle.id);
                          onClose();
                        }}
                        className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                      >
                        Selecionar
                      </button>
                    )}

                    <button
                      onClick={() => {
                        onClose();
                        onOpenEditVehicle(vehicle);
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-indigo-400 hover:bg-slate-800 border border-slate-800 transition-colors"
                      title="Editar Veículo"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => onDeleteVehicle(vehicle.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 border border-slate-800 transition-colors"
                      title="Excluir Veículo"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-slate-500 italic py-8">
              Nenhum veículo cadastrado.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenAddVehicle();
            }}
            className="flex items-center space-x-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/20"
          >
            <Plus className="h-4 w-4" />
            <span>Cadastrar Novo Veículo</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
