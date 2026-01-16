/**
 * Fluxo Anual Card
 * Exibe o fluxo financeiro de um ano específico
 */

import React from 'react';

export interface DadosFluxoAnual {
  ano: number;
  receitaCarteira: number;
  receitaNovosVendas: number;
  subtotal: number;
  custo: number;
  saldo: number;
  isAtual: boolean;
}

interface FluxoAnualCardProps {
  dados: DadosFluxoAnual;
  isSelected?: boolean;
  onClick?: () => void;
}

const formatarMoeda = (valor: number): string => {
  const absValor = Math.abs(valor);
  if (absValor >= 1000000) {
    return `R$ ${(valor / 1000000).toFixed(2).replace('.', ',')}M`;
  }
  if (absValor >= 1000) {
    return `R$ ${(valor / 1000).toFixed(1).replace('.', ',')}K`;
  }
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });
};

export default function FluxoAnualCard({ dados, isSelected = false, onClick }: FluxoAnualCardProps) {
  const saldoPositivo = dados.saldo >= 0;

  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-lg p-4
        ${onClick ? 'cursor-pointer hover:bg-gray-800/80' : ''}
        transition-all duration-200
        ${isSelected 
          ? 'bg-gray-800 border border-orange-500/50' 
          : 'bg-gray-800/50 border border-gray-700/50'
        }
      `}
      style={{
        background: '#1e2028',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      }}
    >
      {/* Header com Ano */}
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700/50">
        <span className="text-lg font-bold text-white">
          {dados.ano}
        </span>
        {dados.isAtual && (
          <span className="px-1.5 py-0.5 text-[9px] font-bold bg-orange-500 text-white rounded uppercase">
            Atual
          </span>
        )}
      </div>

      {/* Linhas do Fluxo */}
      <div className="space-y-2">
        {/* Receita Carteira */}
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase tracking-wide">Proj. Carteira</span>
          <span className="text-sm font-semibold text-white tabular-nums">
            {formatarMoeda(dados.receitaCarteira)}
          </span>
        </div>

        {/* Receita Novos Vendas */}
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase tracking-wide">Proj. Novas Vendas</span>
          <span className="text-sm font-semibold text-white tabular-nums">
            {formatarMoeda(dados.receitaNovosVendas)}
          </span>
        </div>

        {/* Divisor */}
        <div className="border-t border-gray-700/50 my-1" />

        {/* Subtotal */}
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase tracking-wide">Subtotal</span>
          <span className="text-sm font-semibold text-white tabular-nums">
            {formatarMoeda(dados.subtotal)}
          </span>
        </div>

        {/* Custo */}
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase tracking-wide">Custo Fixo</span>
          <span className="text-sm font-semibold text-red-400 tabular-nums">
            {formatarMoeda(dados.custo)}
          </span>
        </div>

        {/* Divisor */}
        <div className="border-t border-gray-700/50 my-1" />

        {/* Saldo */}
        <div className="flex flex-col">
          <span className="text-[10px] font-medium text-gray-300 uppercase tracking-wide">Saldo</span>
          <span className={`text-base font-bold tabular-nums ${saldoPositivo ? 'text-emerald-400' : 'text-red-400'}`}>
            {formatarMoeda(dados.saldo)}
          </span>
        </div>

        {/* Indicador visual do saldo */}
        <div className={`h-1 rounded-full mt-2 ${saldoPositivo ? 'bg-emerald-500' : 'bg-red-500'}`} />
      </div>
    </div>
  );
}
