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
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg shadow-orange-500/20">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {titulo}
          </h1>
          <p className="text-gray-400 text-sm">
            {subtitulo}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm">
          <HelpCircle className="w-4 h-4" />
          <span>Como funciona?</span>
        </button>
      </div>
    </div>
  );
}
