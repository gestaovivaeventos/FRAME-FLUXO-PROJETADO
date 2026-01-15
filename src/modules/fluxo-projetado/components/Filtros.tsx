/**
 * Filtros do Dashboard
 * Componente de filtros para o módulo Fluxo Projetado
 */

import React from 'react';
import { Filter, RefreshCw, Calendar } from 'lucide-react';
import { FiltrosFluxoProjetado } from '../types';
import { UNIDADES_MOCK, getAnosDisponiveis } from '../utils';

interface FiltrosProps {
  filtros: FiltrosFluxoProjetado;
  onChange: (filtros: FiltrosFluxoProjetado) => void;
  onRefresh?: () => void;
  loading?: boolean;
}

export default function Filtros({ filtros, onChange, onRefresh, loading }: FiltrosProps) {
  const anos = getAnosDisponiveis();

  return (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
      <div className="flex flex-wrap items-center gap-4">
        {/* Ícone de Filtros */}
        <div className="flex items-center gap-2 text-gray-400">
          <Filter className="w-5 h-5" />
          <span className="text-sm font-medium">Filtros</span>
        </div>

        {/* Separador */}
        <div className="h-8 w-px bg-gray-700 hidden sm:block" />

        {/* Filtro de Unidade */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs text-gray-500 mb-1">Unidade</label>
          <select
            value={filtros.unidade}
            onChange={(e) => onChange({ ...filtros, unidade: e.target.value })}
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {UNIDADES_MOCK.map((unidade) => (
              <option key={unidade} value={unidade}>
                {unidade}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de Ano */}
        <div className="w-32">
          <label className="block text-xs text-gray-500 mb-1">
            <Calendar className="w-3 h-3 inline mr-1" />
            Ano
          </label>
          <select
            value={filtros.ano}
            onChange={(e) => onChange({ ...filtros, ano: Number(e.target.value) })}
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {anos.map((ano) => (
              <option key={ano} value={ano}>
                {ano}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de Status */}
        <div className="w-36">
          <label className="block text-xs text-gray-500 mb-1">Status</label>
          <select
            value={filtros.status}
            onChange={(e) => onChange({ ...filtros, status: e.target.value as any })}
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="todos">Todos</option>
            <option value="ativo">Ativos</option>
            <option value="fechado">Fechados</option>
          </select>
        </div>

        {/* Botão Refresh */}
        {onRefresh && (
          <div className="flex items-end">
            <button
              onClick={onRefresh}
              disabled={loading}
              className={`
                flex items-center gap-2 px-4 py-2 
                bg-orange-500 hover:bg-orange-600 
                disabled:bg-gray-600 disabled:cursor-not-allowed
                text-white font-medium rounded-lg 
                transition-colors
              `}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Atualizar</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
