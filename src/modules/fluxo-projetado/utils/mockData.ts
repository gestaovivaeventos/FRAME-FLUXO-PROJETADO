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
  
  const anos: ReceitaAnual[] = [];
  for (let i = 0; i < 5; i++) {
    const ano = anoAtual + i;
    // Soma dos resumos de Fundos da Carteira + Novos Fundos para cada ano
    const resumoCarteira = gerarResumoPorAno(ano);
    const resumoNovos = gerarResumoNovosFundosPorAno(ano);
    const valorTotal = resumoCarteira.receitaTotalProjetada + resumoNovos.receitaTotalProjetada;
    
    anos.push({
      ano,
      valor: valorTotal,
      isAtual: ano === anoAtual,
    });
  }
  
  return anos;
}

// ============================================
// Resumo por Ano (dados mockados variados) - Fundos da Carteira
// ============================================

export function gerarResumoPorAno(ano: number): ResumoProjecao {
  // Valores base por ano - Fundos da Carteira (fundos existentes)
  // Ano atual tem mais, anos futuros vão diminuindo pois fundos vão fechando
  const dadosPorAno: Record<number, { feeAntecipacao: number; feeFechamento: number; margem: number }> = {
    2026: { feeAntecipacao: 320000, feeFechamento: 210000, margem: 120000 },
    2027: { feeAntecipacao: 280000, feeFechamento: 420000, margem: 280000 },
    2028: { feeAntecipacao: 150000, feeFechamento: 380000, margem: 220000 },
    2029: { feeAntecipacao: 80000, feeFechamento: 250000, margem: 140000 },
    2030: { feeAntecipacao: 30000, feeFechamento: 120000, margem: 70000 },
  };
  
  const dados = dadosPorAno[ano] || { feeAntecipacao: 50000, feeFechamento: 100000, margem: 60000 };
  
  // Receita Total = soma das 3 fontes de receita
  const receitaTotal = dados.feeAntecipacao + dados.feeFechamento + dados.margem;
  
  return {
    receitaTotalProjetada: receitaTotal,
    receitaProjetadaFee: dados.feeAntecipacao + dados.feeFechamento,
    receitaProjetadaFeeAntecipacao: dados.feeAntecipacao,
    receitaProjetadaFeeFechamento: dados.feeFechamento,
    receitaProjetadaConviteExtra: 0,
    receitaProjetadaMargemFechamento: dados.margem,
    feeJaRecebido: 0,
    feeAReceber: dados.feeAntecipacao + dados.feeFechamento,
    convitesExtrasVendidos: 0,
    margemMediaAplicada: 5.1,
    fundosAtivos: 8,
    fundosFechamentoAnoAtual: 4,
  };
}

// ============================================
// Resumo Novos Fundos por Ano (prospecção)
// ============================================

export function gerarResumoNovosFundosPorAno(ano: number): ResumoProjecao {
  // Valores base por ano - Novos Fundos (prospecção)
  // Ano atual tem poucos, anos futuros crescem com novos fechamentos
  const dadosPorAno: Record<number, { feeAntecipacao: number; feeFechamento: number; margem: number }> = {
    2026: { feeAntecipacao: 45000, feeFechamento: 35000, margem: 20000 },
    2027: { feeAntecipacao: 120000, feeFechamento: 25000, margem: 15000 },
    2028: { feeAntecipacao: 200000, feeFechamento: 80000, margem: 50000 },
    2029: { feeAntecipacao: 280000, feeFechamento: 150000, margem: 90000 },
    2030: { feeAntecipacao: 350000, feeFechamento: 220000, margem: 130000 },
  };
  
  const dados = dadosPorAno[ano] || { feeAntecipacao: 100000, feeFechamento: 50000, margem: 30000 };
  
  // Receita Total = soma das 3 fontes de receita
  const receitaTotal = dados.feeAntecipacao + dados.feeFechamento + dados.margem;
  
  return {
    receitaTotalProjetada: receitaTotal,
    receitaProjetadaFee: dados.feeAntecipacao + dados.feeFechamento,
    receitaProjetadaFeeAntecipacao: dados.feeAntecipacao,
    receitaProjetadaFeeFechamento: dados.feeFechamento,
    receitaProjetadaConviteExtra: 0,
    receitaProjetadaMargemFechamento: dados.margem,
    feeJaRecebido: 0,
    feeAReceber: dados.feeAntecipacao + dados.feeFechamento,
    convitesExtrasVendidos: 0,
    margemMediaAplicada: 5.5,
    fundosAtivos: Math.max(1, Math.round((ano - 2025) * 2)),
    fundosFechamentoAnoAtual: Math.max(0, Math.round((ano - 2026) * 1.5)),
  };
}

// ============================================
// Resumo Padrão para Exibição
// ============================================

export const RESUMO_MOCK = calcularResumoProjecao(FUNDOS_MOCK, 2026);
export const GRAFICO_MOCK = gerarDadosGraficoProjecao(2026);
