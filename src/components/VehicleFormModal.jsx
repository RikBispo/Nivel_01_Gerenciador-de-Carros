import React, { useState, useEffect } from 'react';
import { X, Car, Save, Gauge, Hash } from 'lucide-react';

export function VehicleFormModal({ isOpen, onClose, onSave, editingVehicle = null }) {
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [currentKm, setCurrentKm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingVehicle) {
      setModel(editingVehicle.model || '');
      setPlate(editingVehicle.plate || '');
      setCurrentKm(editingVehicle.currentKm !== undefined ? editingVehicle.currentKm : '');
    } else {
      setModel('');
      setPlate('');
      setCurrentKm('');
    }
    setError('');
  }, [editingVehicle, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!model.trim()) {
      setError('Por favor, informe o modelo do veículo.');
      return;
    }
    if (!plate.trim()) {
      setError('Por favor, informe a placa do veículo.');
      return;
    }
    const kmNum = Number(currentKm);
    if (isNaN(kmNum) || kmNum < 0) {
      setError('Por favor, informe uma quilometragem válida igual ou maior que 0.');
      return;
    }

    onSave({
      id: editingVehicle ? editingVehicle.id : undefined,
      model: model.trim(),
      plate: plate.trim().toUpperCase(),
      currentKm: kmNum,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in no-print">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-600">
              <Car className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-bold text-base">
              {editingVehicle ? 'Editar Veículo' : 'Cadastrar Novo Veículo'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">
              {error}
            </div>
          )}

          {/* Modelo */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Modelo do Veículo *
            </label>
            <div className="relative">
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Ex: Toyota Corolla Cross 2.0"
                className="w-full pl-3 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Placa & Quilometragem Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Placa *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={plate}
                  onChange={(e) => setPlate(e.target.value.toUpperCase())}
                  placeholder="ABC-1D23"
                  className="w-full pl-3 pr-3 py-2 text-xs uppercase border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Quilometragem Atual (km) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={currentKm}
                  onChange={(e) => setCurrentKm(e.target.value)}
                  placeholder="Ex: 48500"
                  min="0"
                  className="w-full pl-3 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 rounded-xl transition-all shadow-md shadow-indigo-600/20"
            >
              <Save className="h-4 w-4" />
              <span>Salvar Veículo</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
