'use client';
import {
  AlertCircle,
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Filter,
  Plus,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';

const ModernDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('pending');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const summaryData = {
    total: 1,
    pending: 1,
    completed: 0,
    failed: 0,
  };

  const mockRequests = [
    {
      id: 3,
      employeeOut: '12345',
      employeeIn: '54321',
      swapDate: '28/06/2025',
      paybackDate: '29/06/2025',
      type: 'TROCA',
      status: 'SOLICITADO',
      observation: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-700/50 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
              <h1 className="text-xl font-bold text-white">Troca de Folgas</h1>
            </div>
            <button className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2">
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
            Dashboard do Encarregado
          </h2>
          <p className="text-gray-400 text-lg">
            Bem-vindo,{' '}
            <span className="text-white font-semibold">Felipe Encarregado</span>
            !
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-blue-400" />
            <h3 className="text-2xl font-bold text-white">Visão Geral</h3>
          </div>

          <div className="flex items-center space-x-4 bg-gray-800/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-700/50">
            <button className="p-2 hover:bg-gray-700/50 rounded-xl transition-all duration-200 text-gray-400 hover:text-white">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2 px-4 py-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              <span className="text-white font-semibold min-w-[120px] text-center">
                Junho 2025
              </span>
            </div>
            <button className="p-2 hover:bg-gray-700/50 rounded-xl transition-all duration-200 text-gray-400 hover:text-white">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent"></div>
            <div className="relative p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <BarChart3 className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-white">
                  {summaryData.total}
                </div>
              </div>
              <h4 className="text-blue-300 font-semibold mb-1">
                Total de Solicitações
              </h4>
              <p className="text-gray-400 text-sm">
                Todas as suas solicitações
              </p>
            </div>
          </div>

          {/* Pending Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-600/5 border border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent"></div>
            <div className="relative p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-500/20 rounded-xl">
                  <Clock className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold text-white">
                  {summaryData.pending}
                </div>
              </div>
              <h4 className="text-yellow-300 font-semibold mb-1">
                Solicitadas/Agendadas
              </h4>
              <p className="text-gray-400 text-sm">Aguardando realização</p>
            </div>
          </div>

          {/* Completed Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-600/5 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent"></div>
            <div className="relative p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <CheckCircle2 className="h-6 w-6 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-white">
                  {summaryData.completed}
                </div>
              </div>
              <h4 className="text-green-300 font-semibold mb-1">Realizadas</h4>
              <p className="text-gray-400 text-sm">Concluídas com sucesso</p>
            </div>
          </div>

          {/* Failed Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 hover:border-red-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent"></div>
            <div className="relative p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-500/20 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-red-400" />
                </div>
                <div className="text-3xl font-bold text-white">
                  {summaryData.failed}
                </div>
              </div>
              <h4 className="text-red-300 font-semibold mb-1">
                Não Realizadas
              </h4>
              <p className="text-gray-400 text-sm">Exigem atenção</p>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-gray-400" />
            <h3 className="text-2xl font-bold text-white">
              Minhas Solicitações
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
            {/* Mobile: Stack buttons vertically */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto"
              >
                <Plus className="h-5 w-5" />
                <span>Nova Solicitação</span>
              </button>

              <div className="flex space-x-2 w-full sm:w-auto">
                <button className="bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 hover:text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 border border-gray-700/50 flex-1 sm:flex-initial">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filtros</span>
                </button>

                <button className="bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 hover:text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 border border-gray-700/50 flex-1 sm:flex-initial">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-800/40 backdrop-blur-sm p-1 rounded-xl border border-gray-700/50 w-full sm:w-auto">
            <button
              onClick={() => setSelectedTab('pending')}
              className={`flex-1 sm:flex-initial px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedTab === 'pending'
                  ? 'bg-gray-700/80 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/40'
              }`}
            >
              Não Realizados
            </button>
            <button
              onClick={() => setSelectedTab('history')}
              className={`flex-1 sm:flex-initial px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedTab === 'history'
                  ? 'bg-gray-700/80 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/40'
              }`}
            >
              Histórico
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl">
          <div className="px-6 py-4 border-b border-gray-700/50 bg-gray-800/50">
            <h4 className="text-lg font-semibold text-white">
              {selectedTab === 'pending'
                ? 'Solicitações Não Realizadas'
                : 'Histórico de Solicitações'}
            </h4>
          </div>

          {/* Mobile: Card View */}
          <div className="block sm:hidden">
            <div className="p-4 space-y-4">
              {mockRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/30"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-400">
                        ID
                      </span>
                      <span className="text-white font-semibold">
                        #{request.id}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-lg border border-blue-500/30">
                        {request.type}
                      </span>
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-lg border border-yellow-500/30">
                        {request.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <span className="text-xs text-gray-400 block">
                        Sai (Crachá)
                      </span>
                      <span className="text-white font-medium">
                        {request.employeeOut}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block">
                        Entra (Crachá)
                      </span>
                      <span className="text-white font-medium">
                        {request.employeeIn}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block">
                        Data Troca
                      </span>
                      <span className="text-white">{request.swapDate}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block">
                        Data Pagamento
                      </span>
                      <span className="text-white">{request.paybackDate}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      Observação: {request.observation || '-'}
                    </span>
                    {selectedTab === 'pending' && (
                      <button className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors border border-red-500/30">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/60">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                    ID
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                    Sai (Crachá)
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                    Entra (Crachá)
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                    Data Troca
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                    Data Pagamento
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                    Tipo
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                    Observação
                  </th>
                  {selectedTab === 'pending' && (
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                      Ações
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {mockRequests.map((request, index) => (
                  <tr
                    key={request.id}
                    className={`border-t border-gray-700/30 hover:bg-gray-800/40 transition-colors ${
                      index % 2 === 0 ? 'bg-gray-800/20' : 'bg-transparent'
                    }`}
                  >
                    <td className="px-6 py-4 text-white font-medium">
                      #{request.id}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {request.employeeOut}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {request.employeeIn}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {request.swapDate}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {request.paybackDate}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-medium rounded-lg border border-blue-500/30">
                        {request.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm font-medium rounded-lg border border-yellow-500/30">
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {request.observation || '-'}
                    </td>
                    {selectedTab === 'pending' && (
                      <td className="px-6 py-4">
                        <button className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors border border-red-500/30">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State for History Tab */}
        {selectedTab === 'history' && (
          <div className="text-center py-12 bg-gray-800/20 rounded-2xl border border-gray-700/30 mt-6">
            <CheckCircle2 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Nenhuma solicitação realizada
            </h3>
            <p className="text-gray-500">
              Suas solicitações realizadas aparecerão aqui.
            </p>
          </div>
        )}
      </div>

      {/* Modal Backdrop */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Nova Solicitação
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Crachá de Saída
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                      placeholder="Ex: 12345"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Crachá de Entrada
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                      placeholder="Ex: 54321"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Data da Troca
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Data de Pagamento
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Observação (Opcional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all resize-none"
                    placeholder="Adicione qualquer observação relevante..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 border border-gray-600/50"
                  >
                    Cancelar
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-blue-500/25">
                    <Plus className="h-5 w-5" />
                    <span>Criar Solicitação</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernDashboard;
