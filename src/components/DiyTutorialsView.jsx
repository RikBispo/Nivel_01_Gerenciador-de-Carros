import React, { useState } from 'react';
import { DIY_TUTORIALS, VEHICLE_TYPES } from '../types';
import { 
  Wrench, 
  Clock, 
  DollarSign, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  ChevronRight, 
  Search,
  Filter,
  Info
} from 'lucide-react';

export function DiyTutorialsView({ activeVehicle }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [selectedVehicleType, setSelectedVehicleType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTutorialId, setActiveTutorialId] = useState(null);

  const filteredTutorials = DIY_TUTORIALS.filter((tutorial) => {
    const matchesDifficulty =
      selectedDifficulty === 'ALL' || tutorial.difficulty === selectedDifficulty;

    const matchesVehicle =
      selectedVehicleType === 'ALL' ||
      tutorial.vehicleTypes.includes(selectedVehicleType);

    const matchesSearch =
      tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorial.summary.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDifficulty && matchesVehicle && matchesSearch;
  });

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case 'EASY':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            🟢 Muito Fácil
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            🟡 Fácil a Médio
          </span>
        );
      case 'HARD':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            🟠 Requer Atenção
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 border border-indigo-500/20 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Faça Você Mesmo (DIY) & Economize</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Guia de Manutenções Fáceis em Casa
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Descubra revisões e trocas simples que você mesmo pode realizar no seu veículo. 
            Economize dinheiro em mão de obra com tutoriais passo a passo e dicas de segurança.
          </p>
        </div>
        <div className="absolute right-4 bottom-0 opacity-10 pointer-events-none hidden md:block">
          <Wrench className="h-64 w-64 text-indigo-400" />
        </div>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800 backdrop-blur-md">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar tutorial ou serviço..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filter Difficulty */}
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full py-2 px-3 text-sm bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">Todas as Dificuldades</option>
            <option value="EASY">🟢 Muito Fácil</option>
            <option value="MEDIUM">🟡 Fácil a Médio</option>
          </select>
        </div>

        {/* Filter Vehicle Type */}
        <div>
          <select
            value={selectedVehicleType}
            onChange={(e) => setSelectedVehicleType(e.target.value)}
            className="w-full py-2 px-3 text-sm bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">Todos os Tipos de Veículos</option>
            {Object.values(VEHICLE_TYPES).map((vt) => (
              <option key={vt.id} value={vt.id}>
                {vt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tutorials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTutorials.map((tutorial) => {
          const isExpanded = activeTutorialId === tutorial.id;

          return (
            <div
              key={tutorial.id}
              className={`rounded-2xl border transition-all duration-300 bg-slate-900/90 shadow-lg hover:border-indigo-500/50 ${
                isExpanded ? 'border-indigo-500 ring-1 ring-indigo-500/50' : 'border-slate-800'
              }`}
            >
              <div className="p-6 space-y-4">
                {/* Header info */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {getDifficultyBadge(tutorial.difficulty)}
                    <h3 className="text-lg font-bold text-white mt-2 leading-snug">
                      {tutorial.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {tutorial.summary}
                </p>

                {/* Quick stats badges */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <Clock className="h-4 w-4 text-cyan-400 shrink-0" />
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase font-semibold">Tempo Est.</span>
                      <span className="font-medium text-slate-200">{tutorial.timeEst}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <DollarSign className="h-4 w-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase font-semibold">Economia Est.</span>
                      <span className="font-medium text-emerald-400">{tutorial.savingsEst}</span>
                    </div>
                  </div>
                </div>

                {/* Expand Toggle */}
                <button
                  onClick={() => setActiveTutorialId(isExpanded ? null : tutorial.id)}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 text-xs font-semibold transition-colors"
                >
                  <span>{isExpanded ? 'Ocultar Passo a Passo' : 'Ver Tutorial Completo'}</span>
                  <ChevronRight
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {/* Expanded Tutorial Body */}
                {isExpanded && (
                  <div className="pt-4 border-t border-slate-800 space-y-4 animate-fadeIn">
                    {/* Tools Needed */}
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                        <Wrench className="h-3.5 w-3.5 text-indigo-400" />
                        <span>Ferramentas Necessárias</span>
                      </h4>
                      <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                        {tutorial.toolsNeeded.map((tool, idx) => (
                          <li key={idx}>{tool}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Step by Step */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        Passo a Passo:
                      </h4>
                      <ol className="space-y-2">
                        {tutorial.steps.map((step, idx) => (
                          <li
                            key={idx}
                            className="flex items-start space-x-3 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/60 text-slate-300"
                          >
                            <span className="flex items-center justify-center h-5 w-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] shrink-0">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Safety Tip */}
                    {tutorial.tips && (
                      <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                        <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold block text-amber-200">Dica de Segurança:</strong>
                          <span>{tutorial.tips}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
