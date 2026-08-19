import React, { useState } from 'react';
import { NEARBY_SERVICES } from '../types';
import { 
  MapPin, 
  Phone, 
  ExternalLink, 
  Star, 
  Search, 
  Filter, 
  Wrench, 
  Droplet, 
  Bike, 
  Anchor, 
  Zap, 
  Disc,
  Clock
} from 'lucide-react';

export function NearbyServicesView() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocationQuery, setUserLocationQuery] = useState('');

  const categories = [
    { id: 'ALL', label: 'Todos', icon: Filter },
    { id: 'MECHANIC', label: 'Oficinas Mecânicas', icon: Wrench },
    { id: 'OIL_CHANGE', label: 'Troca de Óleo', icon: Droplet },
    { id: 'MOTO_SHOP', label: 'Motopeças & Motos', icon: Bike },
    { id: 'NAUTICAL', label: 'Assistência Náutica', icon: Anchor },
    { id: 'AUTO_ELECTRIC', label: 'Auto Elétrica', icon: Zap },
    { id: 'TIRES', label: 'Pneus & Alinhamento', icon: Disc },
  ];

  const filteredServices = NEARBY_SERVICES.filter((item) => {
    const matchesCategory =
      selectedCategory === 'ALL' || item.type === selectedCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const openGoogleMaps = (query, address) => {
    const fullQuery = encodeURIComponent(`${query} ${address}`);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${fullQuery}`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleGlobalSearchMaps = (e) => {
    e.preventDefault();
    if (!userLocationQuery.trim()) return;
    const query = encodeURIComponent(`Oficina Mecânica perto de ${userLocationQuery}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 p-6 sm:p-8 border border-cyan-500/20 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold">
            <MapPin className="h-3.5 w-3.5" />
            <span>Rede de Atendimento & Geolocalização</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Oficinas e Centros de Manutenção Próximos
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Encontre oficinas mecânicas, motopeças, centros de troca de óleo e assistência náutica de confiança próximos a você.
          </p>

          {/* Quick Google Maps Location Search */}
          <form onSubmit={handleGlobalSearchMaps} className="pt-2 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
              <input
                type="text"
                placeholder="Digite seu bairro, CEP ou cidade (ex: Pinheiros, São Paulo)..."
                value={userLocationQuery}
                onChange={(e) => setUserLocationQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-slate-950/90 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-cyan-600/20 transition-all shrink-0"
            >
              <Search className="h-4 w-4" />
              <span>Buscar no Google Maps</span>
            </button>
          </form>
        </div>
        <div className="absolute right-4 bottom-0 opacity-10 pointer-events-none hidden md:block">
          <MapPin className="h-64 w-64 text-cyan-400" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-cyan-600 text-white border-cyan-500 shadow-md shadow-cyan-600/20'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search Input for Recommended list */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filtrar por nome, endereço ou especialidade (ex: Freios, Óleo Sintético, Moto)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Services List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 hover:border-cyan-500/50 transition-all shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                  {service.categoryLabel}
                </span>
                <div className="flex items-center space-x-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md text-amber-400 text-xs font-bold">
                  <Star className="h-3.5 w-3.5 fill-amber-400" />
                  <span>{service.rating}</span>
                </div>
              </div>

              {/* Title & Address */}
              <div>
                <h3 className="text-base font-bold text-white leading-snug">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-400 flex items-center space-x-1 mt-1">
                  <MapPin className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{service.address}</span>
                </p>
              </div>

              {/* Status & Distance */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="flex items-center space-x-1.5 text-slate-400">
                  <Clock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate text-emerald-400 font-medium">{service.openStatus}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-slate-400 justify-end">
                  <span className="font-semibold text-slate-300">{service.distanceKm}</span>
                  <span className="text-[10px] text-slate-500">da sua localização</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {service.specialties.map((spec, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-slate-950 text-slate-400 border border-slate-800 px-2 py-0.5 rounded"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800">
              <a
                href={`tel:${service.phone.replace(/\D/g, '')}`}
                className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-indigo-400" />
                <span>Ligar</span>
              </a>

              <button
                onClick={() => openGoogleMaps(service.mapsQuery, service.address)}
                className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors shadow-md shadow-cyan-600/20"
              >
                <span>Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
