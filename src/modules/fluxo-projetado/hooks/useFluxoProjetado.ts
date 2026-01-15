/**
 * Hook para gerenciar dados do Fluxo Projetado
 * Usa dados mockados para validação de layout
 */

import { useState, useCallback, useMemo } from 'react';
import { FiltrosFluxoProjetado, Fundo, ResumoProjecao, DadosGraficoProjecao } from '../types';
import { 
  FUNDOS_MOCK, 
  calcularResumoProjecao, 
  gerarDadosGraficoProjecao,
  gerarProjecaoPorAno,
  gerarResumoPorAno,
  gerarResumoNovosFundosPorAno,
  getAnoAtual,
  ReceitaAnual
} from '../utils';

interface UseFluxoProjetadoReturn {
  // Dados
  fundos: Fundo[];
  resumo: ResumoProjecao;
  dadosGraficoMensal: DadosGraficoProjecao[];
  dadosGraficoAnual: { ano: number; valor: number }[];
  receitasPorAno: ReceitaAnual[];
  
  // Filtros
  filtros: FiltrosFluxoProjetado;
  setFiltros: (filtros: FiltrosFluxoProjetado) => void;
  
  // Estado
  loading: boolean;
  error: string | null;
  
  // Ações
  refresh: () => void;
  getResumoPorAno: (ano: number) => ResumoProjecao;
  getResumoNovosFundosPorAno: (ano: number) => ResumoProjecao;
}

export function useFluxoProjetado(): UseFluxoProjetadoReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filtros, setFiltros] = useState<FiltrosFluxoProjetado>({
    unidade: 'Todas as Unidades',
    ano: getAnoAtual(),
    status: 'todos',
  });

  // Filtrar fundos baseado nos filtros selecionados
  const fundosFiltrados = useMemo(() => {
    return FUNDOS_MOCK.filter((fundo) => {
      // Filtro de unidade
      if (filtros.unidade !== 'Todas as Unidades' && fundo.unidade !== filtros.unidade) {
        return false;
      }
      
      // Filtro de status
      if (filtros.status !== 'todos' && fundo.status !== filtros.status) {
        return false;
      }
      
      return true;
    });
  }, [filtros]);

  // Calcular resumo baseado nos fundos filtrados
  const resumo = useMemo(() => {
    return calcularResumoProjecao(fundosFiltrados, filtros.ano);
  }, [fundosFiltrados, filtros.ano]);

  // Gerar dados do gráfico mensal
  const dadosGraficoMensal = useMemo(() => {
    return gerarDadosGraficoProjecao(filtros.ano);
  }, [filtros.ano]);

  // Gerar dados do gráfico anual
  const dadosGraficoAnual = useMemo(() => {
    return gerarProjecaoPorAno();
  }, []);

  // Receitas por ano para o card de receita anual
  const receitasPorAno = useMemo(() => {
    return gerarProjecaoPorAno();
  }, []);

  // Função para obter resumo de um ano específico (Fundos da Carteira)
  const getResumoPorAno = useCallback((ano: number): ResumoProjecao => {
    return gerarResumoPorAno(ano);
  }, []);

  // Função para obter resumo de novos fundos por ano
  const getResumoNovosFundosPorAno = useCallback((ano: number): ResumoProjecao => {
    return gerarResumoNovosFundosPorAno(ano);
  }, []);

  // Função de refresh (simula atualização)
  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    
    // Simula delay de carregamento
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return {
    fundos: fundosFiltrados,
    resumo,
    dadosGraficoMensal,
    dadosGraficoAnual,
    receitasPorAno,
    filtros,
    setFiltros,
    loading,
    error,
    refresh,
    getResumoPorAno,
    getResumoNovosFundosPorAno,
  };
}
