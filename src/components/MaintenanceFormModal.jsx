import React, { useState, useEffect } from 'react';
import { X, Wrench, Save, Calendar, Gauge, DollarSign, Tag, Car } from 'lucide-react';
import { MAINTENANCE_TYPES } from '../types';

export function MaintenanceFormModal({
  isOpen,
  onClose,
  onSave,
  editingMaintenance = null,
  activeVehicle,
}) {
  const [serviceType, setServiceType] = useState('');
  const [date, setDate] = useState('');
  const [kmAtService, setKmAtService] = useState('');
  const [cost, setCost] = useState('');
  const [classification, setClassification] = useState(MAINTENANCE_TYPES.PREVENTATIVE);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingMaintenance) {
      setServiceType(editingMaintenance.serviceType || '');
      setDate(editingMaintenance.date || '');
      setKmAtService(editingMaintenance.kmAtService !== undefined ? editingMaintenance.kmAtService : '');
      setCost(editingMaintenance.cost !== undefined ? editingMaintenance.cost : '');
      setClassification(editingMaintenance.classification || MAINTENANCE_TYPES.PREVENTATIVE);
    } else {
      setServiceType('');
      setDate(new Date().toISOString().split('T')[0]);
      setKmAtService(activeVehicle ? activeVehicle.currentKm || '' : '');
      setCost('');
      setClassification(MAINTENANCE_TYPES.PREVENTATIVE);
    }
    setError('');
  }, [editingMaintenance, isOpen, activeVehicle]);

  if (!isOpen || !activeVehicle) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!serviceType.trim()) {
      setError('Por favor, informe o tipo de serviço.');
      return;
    }
    if (!date) {
      setError('Por favor, selecione a data da manutenção.');
      return;
    }
    const kmNum = Number(kmAtService);
    if (isNaN(kmNum) || kmNum < 0) {
      setError('Por favor, informe uma quilometragem válida no momento do serviço.');
      return;
    }
    const costNum = Number(cost);
    if (isNaN(costNum) || costNum < 0) {
      setError('Por favor, informe um valor em R$ válido.');
      return;
    }

    onSave({
      id: editingMaintenance ? editingMaintenance.id : undefined,
      vehicleId: activeVehicle.id,
      serviceType: serviceType.trim(),
      date,
      kmAtService: kmNum,
      cost: costNum,
      classification,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in no-print">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-600">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">
                {editingMaintenance ? 'Editar Manutenção' : 'Registrar Nova Manutenção'}
              </h3>
              <p className="text-xs text-indigo-300">
                Veículo: {activeVehicle.model} ({activeVehicle.plate})
              </p>
            </div>
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

          {/* Tipo de Serviço */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tipo de Serviço *
            </label>
            <input
              type="text"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              placeholder="Ex: Troca de Óleo e Filtros, Pastilhas de Freio..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          {/* Grid: Data & Classificação */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Data do Serviço *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Classificação *
              </label>
              <select
                value={classification}
                onChange={(e) => setClassification(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white font-medium"
              >
                <option value={MAINTENANCE_TYPES.PREVENTATIVE}>
                  {MAINTENANCE_TYPES.PREVENTATIVE} (Rotina)
                </option>
                <option value={MAINTENANCE_TYPES.PREDICTIVE}>
                  {MAINTENANCE_TYPES.PREDICTIVE} (Análise)
                </option>
                <option value={MAINTENANCE_TYPES.CORRECTIVE}>
                  {MAINTENANCE_TYPES.CORRECTIVE} (Reparo)
                </option>
              </select>
            </div>
          </div>

          {/* Grid: Quilometragem & Valor (R$) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Quilometragem no Serviço (km) *
              </label>
              <input
                type="number"
                value={kmAtService}
                onChange={(e) => setKmAtService(e.target.value)}
                placeholder="Ex: 40000"
                min="0"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Valor Total (R$) *
              </label>
              <input
                type="number"
                step="0.01"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="Ex: 480.00"
                min="0"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium"
                required
              />
            </div>
          </div>

          {/* Modal Footer */}
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
              <span>Salvar Registro</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
