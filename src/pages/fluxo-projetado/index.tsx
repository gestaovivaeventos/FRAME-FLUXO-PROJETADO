/**
 * Dashboard Fluxo Projetado
 * Página principal do módulo de projeção de receita
 */

import React, { useState } from 'react';
import Head from 'next/head';
import {
  Header,
  CardsVisaoGeral,
  CardReceitaAnual,
} from '@/modules/fluxo-projetado';
import { useFluxoProjetado } from '@/modules/fluxo-projetado/hooks';

export default function FluxoProjetadoDashboard() {
  const anoAtual = new Date().getFullYear();
  const [anoSelecionado, setAnoSelecionado] = useState(anoAtual);
  
  const {
    resumo,
    receitasPorAno,
    getResumoPorAno,
    getResumoNovosFundosPorAno,
  } = useFluxoProjetado();

  // Obter resumo do ano selecionado
  const resumoAnoSelecionado = getResumoPorAno(anoSelecionado);
  const resumoNovosFundos = getResumoNovosFundosPorAno(anoSelecionado);

  return (
    <>
      <Head>
        <title>Fluxo Projetado - Projeto Central</title>
        <meta name="description" content="Projeção de receita para franqueados" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <Header />

          {/* Badge de Dados Mockados */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
              <span className="text-yellow-500 text-xs font-medium">
                Dados Mockados - Layout em Validação
              </span>
            </div>
          </div>

          {/* Card de Receita Total Anual */}
          <div className="mb-6">
            <CardReceitaAnual 
              receitasPorAno={receitasPorAno} 
              anoSelecionado={anoSelecionado}
              onAnoClick={setAnoSelecionado}
            />
          </div>

          {/* Cards de Receita Projetada - Fundos da Carteira */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                Receita Projetada Fundos da Carteira
              </h2>
              <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-sm font-medium rounded-full">
                {anoSelecionado}
              </span>
              {anoSelecionado !== anoAtual && (
                <button
                  onClick={() => setAnoSelecionado(anoAtual)}
                  className="text-xs text-gray-400 hover:text-orange-400 transition-colors"
                >
                  (voltar para ano atual)
                </button>
              )}
            </div>
            <CardsVisaoGeral resumo={resumoAnoSelecionado} />
          </div>

          {/* Cards de Receita Projetada - Novos Fundos */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                Receita Projetada Novos Fundos
              </h2>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-full">
                {anoSelecionado}
              </span>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-xs rounded-full border border-emerald-500/30">
                Prospecção
              </span>
            </div>
            <CardsVisaoGeral resumo={resumoNovosFundos} corTema="verde" />
          </div>

          {/* Footer Info */}
          <div className="text-center text-gray-600 text-xs py-4 border-t border-gray-800">
            <p>
              Fluxo Projetado v1.0 • Dados mockados para validação de layout
            </p>
            <p className="mt-1">
              Última atualização: {new Date().toLocaleString('pt-BR')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
