import React, { useState } from 'react';
import { Building, TrendingUp, AlertTriangle, DollarSign, Users, Calendar, Download, Filter, Eye, Bell } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import type { User } from '../App';

interface GovernanceSpendDashboardProps {
  user: User;
}

export const GovernanceSpendDashboard: React.FC<GovernanceSpendDashboardProps> = ({ user }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAnomalies, setShowAnomalies] = useState(true);

  const spendCategories = [
    { name: 'Regulatory Compliance', value: 2850000, color: '#EF4444', growth: '+12.4%', budget: 3000000 },
    { name: 'Audit & Assurance', value: 1650000, color: '#F59E0B', growth: '+8.7%', budget: 1800000 },
    { name: 'Risk Management', value: 1420000, color: '#8B5CF6', growth: '+15.2%', budget: 1500000 },
    { name: 'Legal & Advisory', value: 980000, color: '#10B981', growth: '+6.3%', budget: 1100000 },
    { name: 'Technology Governance', value: 750000, color: '#3B82F6', growth: '+22.1%', budget: 800000 },
    { name: 'Training & Certification', value: 320000, color: '#6B7280', growth: '+4.8%', budget: 350000 },
  ];

  const monthlyTrend = [
    { month: 'Jan', actual: 6800000, budget: 7200000, forecast: 6900000, anomalies: 2 },
    { month: 'Feb', actual: 7100000, budget: 7200000, forecast: 7050000, anomalies: 1 },
    { month: 'Mar', actual: 7350000, budget: 7200000, forecast: 7200000, anomalies: 3 },
    { month: 'Apr', actual: 7580000, budget: 7200000, forecast: 7400000, anomalies: 4 },
    { month: 'May', actual: 7820000, budget: 7200000, forecast: 7600000, anomalies: 2 },
    { month: 'Jun', actual: 7970000, budget: 7200000, forecast: 7750000, anomalies: 5 },
  ];

  const aiAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Regulatory Compliance Budget Exceeded',
      description: 'RBI compliance costs exceeded monthly budget by ₹38.5L',
      category: 'Regulatory Compliance',
      amount: 3850000,
      time: '15 minutes ago',
      aiConfidence: 94,
      action: 'CFO approval required'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Audit Fee Anomaly Detected',
      description: 'External audit fees 45% higher than historical average',
      category: 'Audit & Assurance',
      amount: 850000,
      time: '2 hours ago',
      aiConfidence: 87,
      action: 'Review vendor contract'
    },
    {
      id: 3,
      type: 'info',
      title: 'Technology Governance Optimization',
      description: 'FinAI identified ₹12L potential savings in tech governance',
      category: 'Technology Governance',
      amount: 1200000,
      time: '4 hours ago',
      aiConfidence: 91,
      action: 'Review recommendations'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Training Budget Utilization Low',
      description: 'Only 68% of training budget utilized, risk of budget cut',
      category: 'Training & Certification',
      amount: 218000,
      time: '6 hours ago',
      aiConfidence: 83,
      action: 'Accelerate training programs'
    }
  ];

  const vendorSpend = [
    { vendor: 'KPMG India', category: 'Audit & Assurance', amount: 1250000, contracts: 3, status: 'active' },
    { vendor: 'EY India', category: 'Risk Management', amount: 980000, contracts: 2, status: 'active' },
    { vendor: 'Deloitte India', category: 'Regulatory Compliance', amount: 850000, contracts: 4, status: 'active' },
    { vendor: 'PwC India', category: 'Legal & Advisory', amount: 720000, contracts: 2, status: 'active' },
    { vendor: 'Infosys Finacle', category: 'Technology Governance', amount: 650000, contracts: 1, status: 'active' },
  ];

  const governanceMetrics = [
    {
      title: 'Total Governance Spend',
      value: '₹7.97Cr',
      change: '+10.7%',
      trend: 'up',
      budget: '₹7.2Cr',
      status: 'over-budget'
    },
    {
      title: 'AI Anomalies Detected',
      value: '12',
      change: '+3',
      trend: 'up',
      budget: '5',
      status: 'critical'
    },
    {
      title: 'Budget Utilization',
      value: '110.7%',
      change: '+10.7%',
      trend: 'up',
      budget: '100%',
      status: 'over-budget'
    },
    {
      title: 'Active Vendors',
      value: '47',
      change: '+2',
      trend: 'up',
      budget: '50',
      status: 'good'
    }
  ];

  const totalSpend = spendCategories.reduce((sum, cat) => sum + cat.value, 0);
  const totalBudget = spendCategories.reduce((sum, cat) => sum + cat.budget, 0);
  const budgetVariance = ((totalSpend - totalBudget) / totalBudget * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Building className="w-8 h-8 text-blue-600 mr-3" />
            Governance Spend Dashboard
          </h1>
          <p className="text-gray-600">AI-powered financial governance monitoring and anomaly detection</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {governanceMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                metric.status === 'good' ? 'bg-green-100 text-green-800' :
                metric.status === 'over-budget' ? 'bg-red-100 text-red-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {metric.status === 'good' ? 'On Track' :
                 metric.status === 'over-budget' ? 'Over Budget' :
                 'Alert'}
              </span>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="flex items-center justify-between text-sm">
                <span className={`font-medium ${
                  metric.trend === 'up' && metric.status !== 'good' ? 'text-red-600' :
                  metric.trend === 'down' && metric.status === 'good' ? 'text-green-600' :
                  'text-orange-600'
                }`}>
                  {metric.change}
                </span>
                <span className="text-gray-500">Target: {metric.budget}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spend by Category */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Governance Spend by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {spendCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`₹${(value as number / 100000).toFixed(1)}L`, 'Spend']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {spendCategories.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-3" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-900">₹{(item.value / 100000).toFixed(1)}L</span>
                  <span className={`text-xs ml-2 ${
                    parseFloat(item.growth.replace('%', '').replace('+', '')) > 15 ? 'text-red-600' :
                    parseFloat(item.growth.replace('%', '').replace('+', '')) > 10 ? 'text-orange-600' :
                    'text-green-600'
                  }`}>
                    {item.growth}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Spend Trend vs Budget</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${(value as number / 100000).toFixed(1)}L`, '']} />
                <Area
                  type="monotone"
                  dataKey="budget"
                  stackId="1"
                  stroke="#10B981"
                  fill="#D1FAE5"
                  fillOpacity={0.6}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#EF4444"
                  strokeWidth={3}
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: 5 }}
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
        </div>
      </div>

      {/* AI Anomaly Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-orange-500" />
              FinAI Anomaly Detection & Alerts
            </h2>
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showAnomalies}
                  onChange={(e) => setShowAnomalies(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Show Anomalies</span>
              </label>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {aiAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'critical' ? 'bg-red-50 border-red-400' :
                alert.type === 'warning' ? 'bg-orange-50 border-orange-400' :
                'bg-blue-50 border-blue-400'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-900">{alert.title}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        alert.type === 'critical' ? 'bg-red-100 text-red-800' :
                        alert.type === 'warning' ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {alert.type}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {alert.category}
                      </span>
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded-full">
                        AI Confidence: {alert.aiConfidence}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Amount: ₹{(alert.amount / 100000).toFixed(1)}L</span>
                      <span>{alert.time}</span>
                      <span className="font-medium text-blue-600">{alert.action}</span>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-col space-y-2">
                    <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">
                      Review
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Vendors */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Top Governance Vendors</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Vendor</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Contracts</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendorSpend.map((vendor, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{vendor.vendor}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{vendor.category}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">₹{(vendor.amount / 100000).toFixed(1)}L</td>
                    <td className="py-3 px-4 text-gray-600">{vendor.contracts}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        vendor.status === 'active' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {vendor.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Eye className="w-4 h-4" />
                        <span>View</span>
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