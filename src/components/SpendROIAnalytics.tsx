import React, { useState } from 'react';
import { BarChart3, TrendingUp, Target, Calculator, Download, Calendar, Filter, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart, ScatterChart, Scatter } from 'recharts';
import type { User } from '../App';

interface SpendROIAnalyticsProps {
  user: User;
}

export const SpendROIAnalytics: React.FC<SpendROIAnalyticsProps> = ({ user }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('12m');
  const [selectedMetric, setSelectedMetric] = useState('roi');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const roiData = [
    {
      category: 'Regulatory Compliance',
      investment: 28500000,
      returns: 45200000,
      roi: 58.6,
      riskReduction: 85,
      complianceScore: 96,
      timeToValue: 6
    },
    {
      category: 'Risk Management',
      investment: 16500000,
      returns: 32100000,
      roi: 94.5,
      riskReduction: 78,
      complianceScore: 92,
      timeToValue: 4
    },
    {
      category: 'Technology Governance',
      investment: 14200000,
      returns: 28900000,
      roi: 103.5,
      riskReduction: 72,
      complianceScore: 89,
      timeToValue: 8
    },
    {
      category: 'Audit & Assurance',
      investment: 9800000,
      returns: 15600000,
      roi: 59.2,
      riskReduction: 68,
      complianceScore: 94,
      timeToValue: 3
    },
    {
      category: 'Legal & Advisory',
      investment: 7500000,
      returns: 11200000,
      roi: 49.3,
      riskReduction: 55,
      complianceScore: 87,
      timeToValue: 5
    }
  ];

  const quarterlyTrend = [
    { quarter: 'Q1 2023', investment: 65000000, returns: 89000000, roi: 36.9, forecast: 92000000 },
    { quarter: 'Q2 2023', investment: 68000000, returns: 95000000, roi: 39.7, forecast: 98000000 },
    { quarter: 'Q3 2023', investment: 71000000, returns: 102000000, roi: 43.7, forecast: 105000000 },
    { quarter: 'Q4 2023', investment: 74000000, returns: 108000000, roi: 45.9, forecast: 112000000 },
    { quarter: 'Q1 2024', investment: 76500000, returns: 115000000, roi: 50.3, forecast: 118000000 },
    { quarter: 'Q2 2024', investment: 78000000, returns: 122000000, roi: 56.4, forecast: 125000000 },
  ];

  const riskVsReturnData = [
    { risk: 15, return: 58.6, category: 'Regulatory Compliance', size: 285 },
    { risk: 22, return: 94.5, category: 'Risk Management', size: 165 },
    { risk: 28, return: 103.5, category: 'Technology Governance', size: 142 },
    { risk: 32, return: 59.2, category: 'Audit & Assurance', size: 98 },
    { risk: 45, return: 49.3, category: 'Legal & Advisory', size: 75 },
  ];

  const forecastData = [
    { month: 'Jul 2024', actual: 122000000, forecast: 125000000, optimistic: 135000000, pessimistic: 115000000 },
    { month: 'Aug 2024', actual: null, forecast: 128000000, optimistic: 140000000, pessimistic: 118000000 },
    { month: 'Sep 2024', actual: null, forecast: 132000000, optimistic: 145000000, pessimistic: 122000000 },
    { month: 'Oct 2024', actual: null, forecast: 135000000, optimistic: 148000000, pessimistic: 125000000 },
    { month: 'Nov 2024', actual: null, forecast: 138000000, optimistic: 152000000, pessimistic: 128000000 },
    { month: 'Dec 2024', actual: null, forecast: 142000000, optimistic: 156000000, pessimistic: 132000000 },
  ];

  const kpiMetrics = [
    {
      title: 'Overall ROI',
      value: '64.2%',
      change: '+8.4%',
      trend: 'up',
      target: '60%',
      status: 'good'
    },
    {
      title: 'Risk Reduction',
      value: '71.6%',
      change: '+5.2%',
      trend: 'up',
      target: '70%',
      status: 'good'
    },
    {
      title: 'Time to Value',
      value: '5.2 months',
      change: '-0.8',
      trend: 'down',
      target: '6 months',
      status: 'good'
    },
    {
      title: 'Compliance Score',
      value: '91.6%',
      change: '+2.1%',
      trend: 'up',
      target: '90%',
      status: 'good'
    }
  ];

  const investmentRecommendations = [
    {
      id: 1,
      category: 'Technology Governance',
      recommendation: 'Increase investment by ₹5Cr',
      expectedROI: 125,
      confidence: 89,
      reasoning: 'High ROI potential with automation initiatives',
      priority: 'high'
    },
    {
      id: 2,
      category: 'Risk Management',
      recommendation: 'Optimize vendor mix',
      expectedROI: 15,
      confidence: 76,
      reasoning: 'Consolidate overlapping services',
      priority: 'medium'
    },
    {
      id: 3,
      category: 'Legal & Advisory',
      recommendation: 'Reduce external dependency',
      expectedROI: 22,
      confidence: 82,
      reasoning: 'Build internal legal capabilities',
      priority: 'low'
    }
  ];

  const totalInvestment = roiData.reduce((sum, item) => sum + item.investment, 0);
  const totalReturns = roiData.reduce((sum, item) => sum + item.returns, 0);
  const overallROI = ((totalReturns - totalInvestment) / totalInvestment * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="w-8 h-8 text-blue-600 mr-3" />
            Spend & ROI Analytics
          </h1>
          <p className="text-gray-600">AI-powered ROI analysis and investment optimization</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="6m">Last 6 months</option>
            <option value="12m">Last 12 months</option>
            <option value="24m">Last 24 months</option>
          </select>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="roi">ROI Analysis</option>
            <option value="risk">Risk Analysis</option>
            <option value="compliance">Compliance Impact</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Analysis</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                metric.status === 'good' ? 'bg-green-100 text-green-800' :
                metric.status === 'warning' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {metric.status === 'good' ? 'On Target' : 'Alert'}
              </span>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="flex items-center justify-between text-sm">
                <span className={`font-medium ${
                  metric.trend === 'up' && metric.status === 'good' ? 'text-green-600' :
                  metric.trend === 'down' && metric.title.includes('Time') ? 'text-green-600' :
                  'text-red-600'
                }`}>
                  {metric.change}
                </span>
                <span className="text-gray-500">Target: {metric.target}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ROI by Category */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ROI by Governance Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'ROI']} />
                <Bar dataKey="roi" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quarterly Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quarterly ROI Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={quarterlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, '']} />
                <Line 
                  type="monotone" 
                  dataKey="roi" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
                  name="Actual ROI"
                />
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  name="FinAI Forecast"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Risk vs Return Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Risk vs Return Analysis</h2>
          <p className="text-gray-600 text-sm mt-1">Bubble size represents investment amount</p>
        </div>
        <div className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart data={riskVsReturnData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="risk" name="Risk Score" />
                <YAxis dataKey="return" name="ROI %" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'return' ? `${value}%` : value,
                    name === 'return' ? 'ROI' : 'Risk Score'
                  ]}
                  labelFormatter={(label, payload) => payload?.[0]?.payload?.category || ''}
                />
                <Scatter dataKey="return" fill="#3B82F6" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* FinAI Investment Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-purple-500" />
            FinAI Investment Recommendations
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {investmentRecommendations.map((rec) => (
              <div key={rec.id} className={`p-4 rounded-lg border-l-4 ${
                rec.priority === 'high' ? 'bg-green-50 border-green-400' :
                rec.priority === 'medium' ? 'bg-orange-50 border-orange-400' :
                'bg-blue-50 border-blue-400'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-900">{rec.category}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        rec.priority === 'high' ? 'bg-green-100 text-green-800' :
                        rec.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {rec.priority} priority
                      </span>
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded-full">
                        AI Confidence: {rec.confidence}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{rec.recommendation}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Expected ROI: +{rec.expectedROI}%</span>
                      <span>{rec.reasoning}</span>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-col space-y-2">
                    <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">
                      Implement
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors">
                      Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROI Forecast */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">6-Month ROI Forecast</h2>
        </div>
        <div className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${(value as number / 1000000).toFixed(1)}Cr`, '']} />
                <Area
                  type="monotone"
                  dataKey="pessimistic"
                  stackId="1"
                  stroke="none"
                  fill="#FEE2E2"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="optimistic"
                  stackId="1"
                  stroke="none"
                  fill="#DBEAFE"
                  fillOpacity={0.6}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Actual Returns</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 border-2 border-blue-500 border-dashed rounded-full mr-2"></div>
              <span>FinAI Forecast</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-200 rounded-full mr-2"></div>
              <span>Confidence Range</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed ROI Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Detailed ROI Analysis</h2>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter</span>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Investment</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Returns</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">ROI %</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Risk Reduction</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Compliance Score</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Time to Value</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {roiData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{item.category}</td>
                    <td className="py-3 px-4 text-gray-600">₹{(item.investment / 10000000).toFixed(1)}Cr</td>
                    <td className="py-3 px-4 text-gray-600">₹{(item.returns / 10000000).toFixed(1)}Cr</td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${
                        item.roi > 80 ? 'text-green-600' :
                        item.roi > 50 ? 'text-orange-600' :
                        'text-red-600'
                      }`}>
                        {item.roi}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.riskReduction}%</td>
                    <td className="py-3 px-4 text-gray-600">{item.complianceScore}%</td>
                    <td className="py-3 px-4 text-gray-600">{item.timeToValue} months</td>
                    <td className="py-3 px-4">
                      <button className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Eye className="w-4 h-4" />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};