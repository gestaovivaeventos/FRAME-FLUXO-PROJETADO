/**
 * Dados Mockados do Módulo Fluxo Projetado
 * Dados fictícios para validação de layout
 */

import { Fundo, ResumoProjecao, DadosGraficoProjecao, ProjecaoReceita } from '../types';

// ============================================
// Lista de Unidades (Mockada)
// ============================================

export const UNIDADES_MOCK = [
  'Todas as Unidades',
  'BELO HORIZONTE',
  'BRASÍLIA',
  'CAMPINAS',
  'CURITIBA',
  'FLORIANÓPOLIS',
  'FORTALEZA',
  'GOIÂNIA',
  'PORTO ALEGRE',
  'RECIFE',
  'RIBEIRÃO PRETO',
  'RIO DE JANEIRO',
  'SALVADOR',
  'SÃO PAULO CENTRO',
  'SÃO PAULO LESTE',
  'SÃO PAULO OESTE',
  'SÃO PAULO SUL',
  'VITÓRIA',
];

// ============================================
// Fundos Mockados
// ============================================

export const FUNDOS_MOCK: Fundo[] = [
  {
    id: 'F001',
    nome: 'Turma Engenharia UFMG 2026',
    unidade: 'BELO HORIZONTE',
    dataInicio: '2024-03-15',
    dataFormatura: '2026-12-15',
    valorArrecadacaoPrevisao: 450000,
    percentualFee: 8,
    convitesExtrasVendidos: 45000,
    margemConviteExtra: 12,
    margemFechamento: 5,
    status: 'ativo',
    parcelasFeeRecebidas: 4,
    feeRecebidoFechamento: false,
  },
  {
    id: 'F002',
    nome: 'Turma Medicina USP 2026',
    unidade: 'SÃO PAULO CENTRO',
    dataInicio: '2024-01-10',
    dataFormatura: '2026-07-20',
    valorArrecadacaoPrevisao: 850000,
    percentualFee: 10,
    convitesExtrasVendidos: 92000,
    margemConviteExtra: 12,
    margemFechamento: 6,
    status: 'ativo',
    parcelasFeeRecebidas: 6,
    feeRecebidoFechamento: false,
  },
  {
    id: 'F003',
    nome: 'Turma Direito PUC-RS 2027',
    unidade: 'PORTO ALEGRE',
    dataInicio: '2024-08-01',
    dataFormatura: '2027-12-10',
    valorArrecadacaoPrevisao: 380000,
    percentualFee: 7,
    convitesExtrasVendidos: 18000,
    margemConviteExtra: 12,
    margemFechamento: 4.5,
    status: 'ativo',
    parcelasFeeRecebidas: 2,
    feeRecebidoFechamento: false,
  },
  {
    id: 'F004',
    nome: 'Turma Arquitetura UNICAMP 2026',
    unidade: 'CAMPINAS',
    dataInicio: '2023-06-20',
    dataFormatura: '2026-06-30',
    valorArrecadacaoPrevisao: 520000,
    percentualFee: 9,
    convitesExtrasVendidos: 65000,
    margemConviteExtra: 12,
    margemFechamento: 5.5,
    status: 'ativo',
    parcelasFeeRecebidas: 6,
    feeRecebidoFechamento: false,
  },
  {
    id: 'F005',
    nome: 'Turma Odontologia UFPR 2026',
    unidade: 'CURITIBA',
    dataInicio: '2024-02-28',
    dataFormatura: '2026-11-25',
    valorArrecadacaoPrevisao: 420000,
    percentualFee: 8.5,
    convitesExtrasVendidos: 38000,
    margemConviteExtra: 12,
    margemFechamento: 5,
    status: 'ativo',
    parcelasFeeRecebidas: 5,
    feeRecebidoFechamento: false,
  },
  {
    id: 'F006',
    nome: 'Turma Administração FGV 2025',
    unidade: 'RIO DE JANEIRO',
    dataInicio: '2023-01-15',
    dataFormatura: '2025-12-18',
    valorArrecadacaoPrevisao: 680000,
    percentualFee: 9,
    convitesExtrasVendidos: 78000,
    margemConviteExtra: 12,
    margemFechamento: 5.5,
    status: 'ativo',
    parcelasFeeRecebidas: 6,
    feeRecebidoFechamento: false,
  },
  {
    id: 'F007',
    nome: 'Turma Psicologia UnB 2027',
    unidade: 'BRASÍLIA',
    dataInicio: '2025-02-10',
    dataFormatura: '2027-07-15',
    valorArrecadacaoPrevisao: 290000,
    percentualFee: 7.5,
    convitesExtrasVendidos: 8500,
    margemConviteExtra: 12,
    margemFechamento: 4,
    status: 'ativo',
    parcelasFeeRecebidas: 0,
    feeRecebidoFechamento: false,
  },
  {
    id: 'F008',
    nome: 'Turma Farmácia UFSC 2026',
    unidade: 'FLORIANÓPOLIS',
    dataInicio: '2024-04-05',
    dataFormatura: '2026-08-20',
    valorArrecadacaoPrevisao: 340000,
    percentualFee: 8,
    convitesExtrasVendidos: 28000,
    margemConviteExtra: 12,
    margemFechamento: 4.5,
    status: 'ativo',
    parcelasFeeRecebidas: 4,
    feeRecebidoFechamento: false,
  },
];

// ============================================
// Resumo de Projeção (Mockado)
// ============================================

export function calcularResumoProjecao(
  fundos: Fundo[],
  anoFiltro?: number
): ResumoProjecao {
  const fundosAtivos = fundos.filter(f => f.status === 'ativo');
  const anoAtual = anoFiltro || new Date().getFullYear();
  
  // Calcular FEE total e recebido (separado em Antecipação e Fechamento)
  let feeTotal = 0;
  let feeRecebido = 0;
  let feeAntecipacaoTotal = 0; // 60% do FEE (6 parcelas de 10%)
  let feeAntecipacaoRecebido = 0;
  let feeFechamentoTotal = 0; // 40% do FEE (no fechamento)
  let feeFechamentoRecebido = 0;
  let convitesExtrasTotal = 0;
  let margemFechamentoTotal = 0;
  let somaMargens = 0;
  
  fundosAtivos.forEach(fundo => {
    const feeValor = fundo.valorArrecadacaoPrevisao * (fundo.percentualFee / 100);
    feeTotal += feeValor;
    
    // FEE de Antecipação = 60% (6 parcelas de 10%)
    const fee60Percent = feeValor * 0.6;
    feeAntecipacaoTotal += fee60Percent;
    const feePorParcela = fee60Percent / 6;
    const antecipacaoRecebido = feePorParcela * fundo.parcelasFeeRecebidas;
    feeAntecipacaoRecebido += antecipacaoRecebido;
    feeRecebido += antecipacaoRecebido;
    
    // FEE de Fechamento = 40%
    const fee40Percent = feeValor * 0.4;
    feeFechamentoTotal += fee40Percent;
    if (fundo.feeRecebidoFechamento) {
      feeFechamentoRecebido += fee40Percent;
      feeRecebido += fee40Percent;
    }
    
    // Convite Extra (12% sobre vendas * margem)
    const receitaConviteExtra = fundo.convitesExtrasVendidos * (fundo.margemConviteExtra / 100);
    convitesExtrasTotal += receitaConviteExtra;
    
    // Margem de Fechamento
    const baseMargemFechamento = fundo.valorArrecadacaoPrevisao + fundo.convitesExtrasVendidos;
    const margemBruta = baseMargemFechamento * (fundo.margemFechamento / 100);
    const margemLiquida = margemBruta - feeValor; // Deduz FEE
    margemFechamentoTotal += Math.max(0, margemLiquida);
    
    somaMargens += fundo.margemFechamento;
  });
  
  const fundosFechamentoAno = fundosAtivos.filter(f => {
    const anoFormatura = new Date(f.dataFormatura).getFullYear();
    return anoFormatura === anoAtual;
  }).length;
  
  return {
    // Visão Geral
    receitaTotalProjetada: (feeTotal - feeRecebido) + convitesExtrasTotal + margemFechamentoTotal,
    receitaProjetadaFee: feeTotal - feeRecebido,
    receitaProjetadaFeeAntecipacao: feeAntecipacaoTotal - feeAntecipacaoRecebido,
    receitaProjetadaFeeFechamento: feeFechamentoTotal - feeFechamentoRecebido,
    receitaProjetadaConviteExtra: convitesExtrasTotal,
    receitaProjetadaMargemFechamento: margemFechamentoTotal,
    
    // Acompanhamento Financeiro
    feeJaRecebido: feeRecebido,
    feeAReceber: feeTotal - feeRecebido,
    convitesExtrasVendidos: fundosAtivos.reduce((sum, f) => sum + f.convitesExtrasVendidos, 0),
    margemMediaAplicada: fundosAtivos.length > 0 ? somaMargens / fundosAtivos.length : 0,
    
    // Operacionais
    fundosAtivos: fundosAtivos.length,
    fundosFechamentoAnoAtual: fundosFechamentoAno,
  };
}

// ============================================
// Dados do Gráfico de Projeção Mensal
// ============================================

export function gerarDadosGraficoProjecao(ano: number): DadosGraficoProjecao[] {
  const meses = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];
  
  // Dados mockados com variação realista
  const baseFee = [15000, 18000, 22000, 25000, 28000, 35000, 42000, 48000, 55000, 65000, 78000, 120000];
  const baseConvite = [3000, 4500, 5200, 6800, 7500, 9200, 11000, 13500, 16000, 19000, 24000, 35000];
  const baseMargem = [0, 0, 0, 0, 0, 45000, 0, 0, 0, 0, 85000, 150000];
  
  return meses.map((mes, index) => ({
    mes,
    fee: baseFee[index] * (0.9 + Math.random() * 0.2),
    conviteExtra: baseConvite[index] * (0.85 + Math.random() * 0.3),
    margemFechamento: baseMargem[index] * (0.8 + Math.random() * 0.4),
    total: baseFee[index] + baseConvite[index] + baseMargem[index],
  }));
}

// ============================================
// Projeção por Ano
// ============================================

export interface ReceitaAnual {
  ano: number;
  valor: number;
  isAtual: boolean;
}

export function gerarProjecaoPorAno(): ReceitaAnual[] {
  const anoAtual = new Date().getFullYear();
  
  // Valores mockados com variação realista por ano
  const valoresPorAno: Record<number, number> = {
    2026: 892000,
    2027: 1250000,
    2028: 980000,
    2029: 720000,
    2030: 450000,
  };
  
  const anos: ReceitaAnual[] = [];
  for (let i = 0; i < 5; i++) {
    const ano = anoAtual + i;
    anos.push({
      ano,
      valor: valoresPorAno[ano] || Math.floor(300000 + Math.random() * 700000),
      isAtual: ano === anoAtual,
    });
  }
  
  return anos;
}

// ============================================
// Resumo por Ano (dados mockados variados)
// ============================================

export function gerarResumoPorAno(ano: number): ResumoProjecao {
  // Multiplicadores por ano para simular variação
  const multiplicadores: Record<number, number> = {
    2026: 1.0,
    2027: 1.4,
    2028: 1.1,
    2029: 0.8,
    2030: 0.5,
  };
  
  const mult = multiplicadores[ano] || 1.0;
  
  // Valores base (2026) - Fundos da Carteira
  const baseValues = {
    receitaTotalProjetada: 892000,
    receitaProjetadaFee: 340000,
    receitaProjetadaFeeAntecipacao: 204000, // 60% do FEE
    receitaProjetadaFeeFechamento: 136000, // 40% do FEE
    receitaProjetadaConviteExtra: 285000,
    receitaProjetadaMargemFechamento: 267000,
    feeJaRecebido: 180000,
    feeAReceber: 160000,
    convitesExtrasVendidos: 372500,
    margemMediaAplicada: 5.1,
    fundosAtivos: 8,
    fundosFechamentoAnoAtual: 4,
  };
  
  // Aplicar multiplicador e variação
  return {
    receitaTotalProjetada: Math.round(baseValues.receitaTotalProjetada * mult),
    receitaProjetadaFee: Math.round(baseValues.receitaProjetadaFee * mult),
    receitaProjetadaFeeAntecipacao: Math.round(baseValues.receitaProjetadaFeeAntecipacao * mult),
    receitaProjetadaFeeFechamento: Math.round(baseValues.receitaProjetadaFeeFechamento * mult),
    receitaProjetadaConviteExtra: Math.round(baseValues.receitaProjetadaConviteExtra * mult),
    receitaProjetadaMargemFechamento: Math.round(baseValues.receitaProjetadaMargemFechamento * mult),
    feeJaRecebido: ano <= new Date().getFullYear() ? Math.round(baseValues.feeJaRecebido * mult) : 0,
    feeAReceber: Math.round(baseValues.feeAReceber * mult),
    convitesExtrasVendidos: Math.round(baseValues.convitesExtrasVendidos * mult),
    margemMediaAplicada: baseValues.margemMediaAplicada,
    fundosAtivos: Math.round(baseValues.fundosAtivos * mult),
    fundosFechamentoAnoAtual: Math.max(1, Math.round(baseValues.fundosFechamentoAnoAtual * mult)),
  };
}

// ============================================
// Resumo Novos Fundos por Ano (prospecção)
// ============================================

export function gerarResumoNovosFundosPorAno(ano: number): ResumoProjecao {
  // Multiplicadores diferentes para novos fundos (crescimento esperado)
  const multiplicadores: Record<number, number> = {
    2026: 0.3,  // Ano atual - poucos novos fundos ainda
    2027: 0.6,  // Crescimento gradual
    2028: 0.9,  // Expansão
    2029: 1.2,  // Maturidade
    2030: 1.5,  // Consolidação
  };
  
  const mult = multiplicadores[ano] || 0.5;
  
  // Valores base para novos fundos (projeção de vendas/prospecção)
  const baseValues = {
    receitaTotalProjetada: 450000,
    receitaProjetadaFee: 180000,
    receitaProjetadaFeeAntecipacao: 108000, // 60% do FEE
    receitaProjetadaFeeFechamento: 72000, // 40% do FEE
    receitaProjetadaConviteExtra: 150000,
    receitaProjetadaMargemFechamento: 120000,
    feeJaRecebido: 0, // Novos fundos ainda não receberam
    feeAReceber: 180000,
    convitesExtrasVendidos: 125000,
    margemMediaAplicada: 5.5,
    fundosAtivos: 5,
    fundosFechamentoAnoAtual: 2,
  };
  
  // Aplicar multiplicador
  return {
    receitaTotalProjetada: Math.round(baseValues.receitaTotalProjetada * mult),
    receitaProjetadaFee: Math.round(baseValues.receitaProjetadaFee * mult),
    receitaProjetadaFeeAntecipacao: Math.round(baseValues.receitaProjetadaFeeAntecipacao * mult),
    receitaProjetadaFeeFechamento: Math.round(baseValues.receitaProjetadaFeeFechamento * mult),
    receitaProjetadaConviteExtra: Math.round(baseValues.receitaProjetadaConviteExtra * mult),
    receitaProjetadaMargemFechamento: Math.round(baseValues.receitaProjetadaMargemFechamento * mult),
    feeJaRecebido: 0, // Novos fundos sempre começam com 0
    feeAReceber: Math.round(baseValues.feeAReceber * mult),
    convitesExtrasVendidos: Math.round(baseValues.convitesExtrasVendidos * mult),
    margemMediaAplicada: baseValues.margemMediaAplicada,
    fundosAtivos: Math.max(1, Math.round(baseValues.fundosAtivos * mult)),
    fundosFechamentoAnoAtual: Math.max(0, Math.round(baseValues.fundosFechamentoAnoAtual * mult)),
  };
}

// ============================================
// Resumo Padrão para Exibição
// ============================================

export const RESUMO_MOCK = calcularResumoProjecao(FUNDOS_MOCK, 2026);
export const GRAFICO_MOCK = gerarDadosGraficoProjecao(2026);
