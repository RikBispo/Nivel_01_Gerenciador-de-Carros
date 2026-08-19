import React, { useState } from 'react';
import { formatCurrency, formatKm } from '../utils/calculations';
import { MAINTENANCE_TYPES } from '../types';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar, 
  PieChart, 
  Car,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export function MonthlyCostDashboard({
  vehicles = [],
  maintenances = [],
  activeVehicleId,
}) {
  const currentYearNum = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYearNum);
  const [filterMode, setFilterMode] = useState('ACTIVE'); // 'ACTIVE' | 'FLEET'

  // Filter maintenances by selected vehicle / fleet
  const targetMaintenances = maintenances.filter((m) => {
    if (filterMode === 'ACTIVE') {
      return m.vehicleId === activeVehicleId;
    }
    return true;
  });

  const activeVehicle = vehicles.find((v) => v.id === activeVehicleId);

  // Group costs by month (0-11) for the selected year
  const monthlyData = MONTH_NAMES.map((monthName, idx) => {
    const monthNumStr = String(idx + 1).padStart(2, '0');
    const monthRecords = targetMaintenances.filter((m) => {
      if (!m.date) return false;
      const [y, mStr] = m.date.split('-');
      return Number(y) === Number(selectedYear) && mStr === monthNumStr;
    });

    const totalCost = monthRecords.reduce((sum, item) => sum + (Number(item.cost) || 0), 0);
    const count = monthRecords.length;

    let preventativeCost = 0;
    let predictiveCost = 0;
    let correctiveCost = 0;

    monthRecords.forEach((r) => {
      const c = Number(r.cost) || 0;
      if (r.classification === MAINTENANCE_TYPES.PREVENTATIVE) preventativeCost += c;
      else if (r.classification === MAINTENANCE_TYPES.PREDICTIVE) predictiveCost += c;
      else if (r.classification === MAINTENANCE_TYPES.CORRECTIVE) correctiveCost += c;
    });

    return {
      monthIndex: idx,
      monthName,
      shortName: monthName.slice(0, 3),
      totalCost,
      count,
      preventativeCost,
      predictiveCost,
      correctiveCost,
    };
  });

  // Calculate year totals
  const totalYearCost = monthlyData.reduce((acc, curr) => acc + curr.totalCost, 0);
  const monthsWithCost = monthlyData.filter((m) => m.totalCost > 0).length || 1;
  const averageMonthlyCost = totalYearCost / 12;

  // Find max monthly cost for bar graph percentage calculation
  const maxMonthlyCost = Math.max(...monthlyData.map((m) => m.totalCost), 1);

  // Breakdown by Category for the Year
  const totalPreventative = monthlyData.reduce((acc, curr) => acc + curr.preventativeCost, 0);
  const totalPredictive = monthlyData.reduce((acc, curr) => acc + curr.predictiveCost, 0);
  const totalCorrective = monthlyData.reduce((acc, curr) => acc + curr.correctiveCost, 0);

  // Breakdown per Vehicle if fleet view
  const vehicleBreakdown = vehicles.map((v) => {
    const vMaintenances = maintenances.filter((m) => {
      if (m.vehicleId !== v.id) return false;
      if (!m.date) return false;
      return Number(m.date.split('-')[0]) === Number(selectedYear);
    });
    const cost = vMaintenances.reduce((acc, curr) => acc + (Number(curr.cost) || 0), 0);
    return {
      ...v,
      costInYear: cost,
      countInYear: vMaintenances.length,
    };
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 border border-indigo-500/20 shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-semibold">
              <BarChart3 className="h-3.5 w-3.5" />
              <span>Painel de Custos Mensais & Métricas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Análise Financeira de Manutenções
            </h2>
            <p className="text-slate-300 text-sm">
              {filterMode === 'ACTIVE' && activeVehicle
                ? `Acompanhe o orçamento e histórico de custos do ${activeVehicle.model} (${activeVehicle.plate}).`
                : 'Acompanhe o orçamento e histórico de custos consolidados de toda a frota.'}
            </p>
          </div>

          {/* Controls: Year & Scope */}
          <div className="flex items-center space-x-2 bg-slate-950/80 p-2 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setFilterMode('ACTIVE')}
              disabled={!activeVehicleId}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'ACTIVE'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Veículo Ativo
            </button>
            <button
              onClick={() => setFilterMode('FLEET')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'FLEET'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Toda Frota
            </button>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-slate-900 border border-slate-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={2026}>Ano 2026</option>
              <option value={2025}>Ano 2025</option>
              <option value={2024}>Ano 2024</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Cost Card */}
        <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Total em {selectedYear}</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            {formatCurrency(totalYearCost)}
          </div>
          <p className="text-[11px] text-slate-400">
            Investido em {targetMaintenances.length} registro(s) de manutenção.
          </p>
        </div>

        {/* Monthly Average */}
        <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Média Mensal</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-cyan-400">
            {formatCurrency(averageMonthlyCost)}
          </div>
          <p className="text-[11px] text-slate-400">
            Calculado proporcionalmente aos 12 meses do ano.
          </p>
        </div>

        {/* Highest Spend Category */}
        <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Custo Preventivo</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400">
            {formatCurrency(totalPreventative)}
          </div>
          <p className="text-[11px] text-slate-400">
            {totalYearCost > 0
              ? `${Math.round((totalPreventative / totalYearCost) * 100)}% do orçamento total em prevenção.`
              : 'Nenhuma manutenção registrada neste ano.'}
          </p>
        </div>
      </div>

      {/* Main Monthly Bar Chart Visualizer */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-indigo-400" />
              <span>Evolução de Gastos Mês a Mês ({selectedYear})</span>
            </h3>
            <p className="text-xs text-slate-400">
              Visualização comparativa das manutenções executadas ao longo do ano.
            </p>
          </div>
        </div>

        {/* Bars Container */}
        <div className="grid grid-cols-6 md:grid-cols-12 gap-2 pt-4 items-end min-h-[220px]">
          {monthlyData.map((m) => {
            const heightPercent = maxMonthlyCost > 0 ? (m.totalCost / maxMonthlyCost) * 100 : 0;

            return (
              <div key={m.monthIndex} className="flex flex-col items-center space-y-2 group">
                {/* Tooltip on hover */}
                <div className="text-[10px] font-semibold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {formatCurrency(m.totalCost)}
                </div>

                {/* Bar */}
                <div className="w-full bg-slate-950 rounded-t-xl h-44 flex items-end p-1 relative overflow-hidden border border-slate-800">
                  <div
                    style={{ height: `${Math.max(heightPercent, m.totalCost > 0 ? 8 : 0)}%` }}
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      m.totalCost > 0
                        ? 'bg-gradient-to-t from-indigo-600 via-cyan-500 to-indigo-400 group-hover:brightness-125'
                        : 'bg-slate-800/20'
                    }`}
                  />
                </div>

                {/* Month Name */}
                <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
                  {m.shortName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category & Fleet Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Breakdown by Category */}
        <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <PieChart className="h-5 w-5 text-cyan-400" />
            <span>Gastos por Categoria de Manutenção</span>
          </h3>

          <div className="space-y-3">
            {/* Preventative */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-emerald-400 font-semibold">Preventiva</span>
                <span className="text-slate-300 font-bold">{formatCurrency(totalPreventative)}</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  style={{ width: `${totalYearCost > 0 ? (totalPreventative / totalYearCost) * 100 : 0}%` }}
                  className="bg-emerald-500 h-full rounded-full"
                />
              </div>
            </div>

            {/* Predictive */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-amber-400 font-semibold">Preditiva</span>
                <span className="text-slate-300 font-bold">{formatCurrency(totalPredictive)}</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  style={{ width: `${totalYearCost > 0 ? (totalPredictive / totalYearCost) * 100 : 0}%` }}
                  className="bg-amber-500 h-full rounded-full"
                />
              </div>
            </div>

            {/* Corrective */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-rose-400 font-semibold">Corretiva</span>
                <span className="text-slate-300 font-bold">{formatCurrency(totalCorrective)}</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  style={{ width: `${totalYearCost > 0 ? (totalCorrective / totalYearCost) * 100 : 0}%` }}
                  className="bg-rose-500 h-full rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fleet Breakdown */}
        <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Car className="h-5 w-5 text-indigo-400" />
            <span>Comparativo entre Veículos ({selectedYear})</span>
          </h3>

          <div className="space-y-3">
            {vehicleBreakdown.map((v) => (
              <div
                key={v.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs"
              >
                <div>
                  <h4 className="font-bold text-white">{v.model}</h4>
                  <p className="text-[11px] text-slate-400">
                    Placa: {v.plate} • {v.countInYear} serviço(s)
                  </p>
                </div>
                <span className="font-black text-indigo-400 text-sm">
                  {formatCurrency(v.costInYear)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
