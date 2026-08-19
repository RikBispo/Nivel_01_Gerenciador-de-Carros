import React, { useState, useEffect } from 'react';
import { X, Wrench } from 'lucide-react';
import { MAINTENANCE_TYPES } from '../types';

export function MaintenanceFormModal({
  isOpen,
  onClose,
  onSave,
  editingMaintenance,
  activeVehicle,
}) {
  const [serviceType, setServiceType] = useState('');
  const [date, setDate] = useState('');
  const [kmAtService, setKmAtService] = useState('');
  const [cost, setCost] = useState('');
  const [classification, setClassification] = useState(MAINTENANCE_TYPES.PREVENTATIVE);

  useEffect(() => {
    if (editingMaintenance) {
      setServiceType(editingMaintenance.serviceType || '');
      setDate(editingMaintenance.date || '');
      setKmAtService(
        editingMaintenance.kmAtService !== undefined ? editingMaintenance.kmAtService : ''
      );
      setCost(editingMaintenance.cost !== undefined ? editingMaintenance.cost : '');
      setClassification(
        editingMaintenance.classification || MAINTENANCE_TYPES.PREVENTATIVE
      );
    } else {
      setServiceType('');
      setDate(new Date().toISOString().split('T')[0]);
      setKmAtService(activeVehicle ? activeVehicle.currentKm || '' : '');
      setCost('');
      setClassification(MAINTENANCE_TYPES.PREVENTATIVE);
    }
  }, [editingMaintenance, isOpen, activeVehicle]);

  if (!isOpen || !activeVehicle) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!serviceType.trim()) return;

    onSave({
      id: editingMaintenance ? editingMaintenance.id : undefined,
      vehicleId: activeVehicle.id,
      serviceType: serviceType.trim(),
      date,
      kmAtService: Number(kmAtService) || 0,
      cost: Number(cost) || 0,
      classification,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/20">
              <Wrench className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {editingMaintenance ? 'Editar Manutenção' : 'Novo Registro de Manutenção'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Veículo Afetado
            </label>
            <input
              type="text"
              disabled
              value={`${activeVehicle.model} (${activeVehicle.plate})`}
              className="w-full px-4 py-2.5 text-xs bg-slate-950/50 border border-slate-800 rounded-xl text-slate-400 cursor-not-allowed font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Serviço / Descrição *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Troca de Óleo e Filtro, Pastilha de Freio..."
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Data do Serviço *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                KM / Horas no Serviço *
              </label>
              <input
                type="number"
                required
                min="0"
                value={kmAtService}
                onChange={(e) => setKmAtService(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Custo Total (R$) *
              </label>
              <input
                type="number"
                required
                step="0.01"
                min="0"
                placeholder="0.00"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Classificação *
              </label>
              <select
                value={classification}
                onChange={(e) => setClassification(e.target.value)}
                className="w-full px-3 py-2.5 text-xs font-semibold bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={MAINTENANCE_TYPES.PREVENTATIVE}>Preventiva</option>
                <option value={MAINTENANCE_TYPES.PREDICTIVE}>Preditiva</option>
                <option value={MAINTENANCE_TYPES.CORRECTIVE}>Corretiva</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
            >
              {editingMaintenance ? 'Salvar Alterações' : 'Salvar Registro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
