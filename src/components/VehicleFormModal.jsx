import React, { useState, useEffect } from 'react';
import { X, Car, Bike, Truck, Anchor, Shield, Bus, Tractor, Image as ImageIcon } from 'lucide-react';
import { VEHICLE_TYPES, DEFAULT_VEHICLE_PHOTOS } from '../types';

export function VehicleFormModal({ isOpen, onClose, onSave, editingVehicle }) {
  const [model, setModel] = useState('');
  const [type, setType] = useState('CAR');
  const [plate, setPlate] = useState('');
  const [currentKm, setCurrentKm] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (editingVehicle) {
      setModel(editingVehicle.model || '');
      setType(editingVehicle.type || 'CAR');
      setPlate(editingVehicle.plate || '');
      setCurrentKm(editingVehicle.currentKm !== undefined ? editingVehicle.currentKm : '');
      setImageUrl(editingVehicle.imageUrl || '');
    } else {
      setModel('');
      setType('CAR');
      setPlate('');
      setCurrentKm('');
      setImageUrl('');
    }
  }, [editingVehicle, isOpen]);

  if (!isOpen) return null;

  const handleTypeSelect = (selectedType) => {
    setType(selectedType);
    if (!imageUrl) {
      setImageUrl(DEFAULT_VEHICLE_PHOTOS[selectedType] || '');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!model.trim()) return;

    onSave({
      id: editingVehicle ? editingVehicle.id : undefined,
      model: model.trim(),
      type,
      plate: plate.trim().toUpperCase(),
      currentKm: Number(currentKm) || 0,
      imageUrl: imageUrl.trim() || DEFAULT_VEHICLE_PHOTOS[type] || '',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/20">
              <Car className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {editingVehicle ? 'Editar Veículo' : 'Cadastrar Novo Veículo'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
          {/* Vehicle Type Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Tipo de Veículo *
            </label>
            <div className="grid grid-cols-4 gap-2">
              {Object.values(VEHICLE_TYPES).map((vType) => {
                const isSelected = type === vType.id;
                return (
                  <button
                    key={vType.id}
                    type="button"
                    onClick={() => handleTypeSelect(vType.id)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-md shadow-indigo-600/10'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span>{vType.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Model / Name */}
          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Modelo / Nome do Veículo *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Corolla Cross 2.0, Honda CB 500X, Sea-Doo GTX 300..."
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Plate & Current KM */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Placa ou Identificação
              </label>
              <input
                type="text"
                placeholder="Ex: ABC-1D23"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Quilometragem / Horas Atual *
              </label>
              <input
                type="number"
                required
                min="0"
                placeholder="Ex: 48500"
                value={currentKm}
                onChange={(e) => setCurrentKm(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Photo URL & Preset Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Foto do Veículo (URL da imagem)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://exemplo.com/minha-foto.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setImageUrl(DEFAULT_VEHICLE_PHOTOS[type] || '')}
                className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center space-x-1 shrink-0"
                title="Usar imagem de catálogo pré-definida"
              >
                <ImageIcon className="h-4 w-4 text-indigo-400" />
                <span>Usar Padrão</span>
              </button>
            </div>

            {/* Photo Preview */}
            {imageUrl && (
              <div className="relative h-32 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 mt-2">
                <img
                  src={imageUrl}
                  alt="Prévia do Veículo"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = DEFAULT_VEHICLE_PHOTOS[type] || DEFAULT_VEHICLE_PHOTOS.CAR;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-2">
                  <span className="text-[10px] text-slate-300 font-semibold bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                    Prévia da Imagem
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
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
              {editingVehicle ? 'Salvar Alterações' : 'Cadastrar Veículo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
