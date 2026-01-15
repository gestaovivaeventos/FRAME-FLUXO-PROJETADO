/**
 * API Route para buscar dados de fundos do Google Sheets
 * Com cache centralizado e deduplicação de requests
 * Usa Service Account para autenticação
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getSheetData, CACHE_TTL } from '@/lib/sheets-client';
import cache from '@/lib/cache';

// Cache key e TTL
const CACHE_KEY = 'vendas:fundos';
const SHEET_NAME = process.env.NEXT_PUBLIC_SHEET_FUNDOS || 'FUNDOS';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Verificar se é refresh forçado
    const forceRefresh = req.query.refresh === 'true';
    if (forceRefresh) {
      cache.invalidate(CACHE_KEY);
    }

    console.log('[Cache] Fetching: vendas:fundos');
    const rows = await getSheetData(SHEET_NAME, CACHE_KEY, CACHE_TTL.FUNDOS);

    // Headers de cache para o browser
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
    
    return res.status(200).json({ values: rows, cached: true });

  } catch (error: any) {
    console.error('[API/fundos] Erro:', error.message);
    return res.status(500).json({
      error: 'Erro interno',
      message: error.message || 'Erro desconhecido',
    });
  }
}
