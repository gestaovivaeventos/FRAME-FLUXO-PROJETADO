/**
 * Dashboard Fluxo Projetado
 * Página principal do módulo de projeção de receita
 */

import React from 'react';
import Head from 'next/head';
import { Header, FluxoAnualCard } from '@/modules/fluxo-projetado';
import { gerarDadosFluxoAnual, DadosFluxoAnualMock } from '@/modules/fluxo-projetado/utils/mockData';
import { DadosFluxoAnual } from '@/modules/fluxo-projetado/components/FluxoAnualCard';

export default function FluxoProjetadoDashboard() {
  // Gerar dados mockados
  const dadosFluxoAnual: DadosFluxoAnual[] = gerarDadosFluxoAnual().map((item: DadosFluxoAnualMock) => ({
    ...item,
  }));

  return (
    <>
      <Head>
        <title>Fluxo Projetado - Projeto Central</title>
        <meta name="description" content="Projeção de receita para franqueados" />
      </Head>

      <div className="h-screen bg-[#0f1117] overflow-hidden">
        <div className="h-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col">
          {/* Header */}
          <Header />

          {/* Título da Seção */}
          <div className="mb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></span>
              Projeção de Receita por Ano
            </h2>
          </div>

          {/* Grid de Cards Anuais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {dadosFluxoAnual.map((dados) => (
              <FluxoAnualCard
                key={dados.ano}
                dados={dados}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
