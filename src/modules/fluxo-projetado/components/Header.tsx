/**
 * Header do Módulo Fluxo Projetado
 */

import React from 'react';
import { TrendingUp, HelpCircle } from 'lucide-react';

interface HeaderProps {
  titulo?: string;
  subtitulo?: string;
}

export default function Header({ 
  titulo = 'Fluxo Projetado',
  subtitulo = 'Projeção de Receita para Franqueados'
}: HeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg shadow-orange-500/20">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">
            {titulo}
          </h1>
          <p className="text-gray-400 text-xs">
            {subtitulo}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-xs">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Como funciona?</span>
        </button>
      </div>
    </div>
  );
}
