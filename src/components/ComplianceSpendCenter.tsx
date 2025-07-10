import React, { useState } from 'react';
import { Shield, Upload, AlertTriangle, Calendar, CheckCircle, Clock, DollarSign, FileText, Bell, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import type { User } from '../App';

interface ComplianceSpendCenterProps {
  user: User;
}

export const ComplianceSpendCenter: React.FC<ComplianceSpendCenterProps> = ({ user }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const complianceExpenses = [
    {
      id: 1,
      vendor: 'KPMG India',
      invoiceNumber: 'INV-2024-0156',
      amount: 2850000,
      dueDate: '2024-07-15',
      category: 'RBI Audit',
      governanceType: 'Regulatory Compliance',
      status: 'pending_approval',
      uploadDate: '2024-07-01',
      aiRiskScore: 15,
      description: 'Annual RBI compliance audit services'
    },
    {
      id: 2,
      vendor: 'EY India',
      invoiceNumber: 'INV-2024-0157',
      amount: 1650000,
      dueDate: '2024-07-20',
      category: 'SEBI Compliance',
      governanceType: 'Risk Management',
      status: 'approved',
      uploadDate: '2024-06-28',
      aiRiskScore: 8,
      description: 'SEBI compliance framework implementation'
    },
    {
      id: 3,
      vendor: 'Deloitte India',
      invoiceNumber: 'INV-2024-0158',
      amount: 980000,
      dueDate: '2024-07-25',
      category: 'IRDAI Assessment',
      governanceType: 'Regulatory Compliance',
      status: 'processing',
      uploadDate: '2024-07-02',
      aiRiskScore: 22,
      description: 'IRDAI regulatory assessment and documentation'
    },
    {
      id: 4,
      vendor: 'PwC India',
      invoiceNumber: 'INV-2024-0159',
      amount: 750000,
      dueDate: '2024-08-01',
      category: 'Cyber Security Audit',
      governanceType: 'Technology Governance',
      status: 'pending_approval',
      uploadDate: '2024-07-03',
      aiRiskScore: 35,
      description: 'Comprehensive cybersecurity audit and compliance'
    }
  ];

  const renewalAlerts = [
    {
      id: 1,
      service: 'RBI Compliance License',
      vendor: 'Reserve Bank of India',
      renewalDate: '2024-08-15',
      amount: 500000,
      daysLeft: 14,
      priority: 'high',
      autoRenewal: false
    },
    {
      id: 2,
      service: 'SEBI Registration',
      vendor: 'SEBI',
      renewalDate: '2024-09-30',
      amount: 250000,
      daysLeft: 60,
      priority: 'medium',
      autoRenewal: true
    },
    {
      id: 3,
      service: 'ISO 27001 Certification',
      vendor: 'BSI India',
      renewalDate: '2024-10-15',
      amount: 350000,
      daysLeft: 75,
      priority: 'medium',
      autoRenewal: false
    }
  ];

  const spendBreakdown = [
    { name: 'RBI Compliance', value: 4200000, color: '#EF4444' },
    { name: 'SEBI Compliance', value: 2800000, color: '#F59E0B' },
    { name: 'IRDAI Compliance', value: 1900000, color: '#8B5CF6' },
    { name: 'Cyber Security', value: 1500000, color: '#10B981' },
    { name: 'Legal Advisory', value: 1200000, color: '#3B82F6' },
    { name: 'Training & Certification', value: 800000, color: '#6B7280' },
  ];

  const monthlyTrend = [
    { month: 'Jan', spend: 8500000, budget: 9000000, renewals: 2 },
    { month: 'Feb', spend: 9200000, budget: 9000000, renewals: 1 },
    { month: 'Mar', spend: 8800000, budget: 9000000, renewals: 3 },
    { month: 'Apr', spend: 9500000, budget: 9000000, renewals: 2 },
    { month: 'May', spend: 10200000, budget: 9000000, renewals: 4 },
    { month: 'Jun', spend: 12400000, budget: 9000000, renewals: 1 },
  ];

  const aiAnomalies = [
    {
      id: 1,
      type: 'critical',
      title: 'Unusual Vendor Invoice Amount',
      description: 'KPMG invoice 67% higher than historical average',
      vendor: 'KPMG India',
      amount: 2850000,
      confidence: 92,
      recommendation: 'Review contract terms and scope changes'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Duplicate Service Detection',
      description: 'Similar services from multiple vendors detected',
      vendor: 'Multiple',
      amount: 1200000,
      confidence: 78,
      recommendation: 'Consolidate vendor services'
    },
    {
      id: 3,
      type: 'info',
      title: 'Early Payment Discount Available',
      description: 'RegAI identified 3% discount opportunity',
      vendor: 'EY India',
      amount: 49500,
      confidence: 85,
      recommendation: 'Process payment within 10 days'
    }
  ];

  const totalSpend = complianceExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const pendingApprovals = complianceExpenses.filter(e => e.status === 'pending_approval').length;
  const highRiskItems = complianceExpenses.filter(e => e.aiRiskScore > 20).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending_approval': return 'bg-orange-100 text-orange-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (score: number) => {
    if (score > 30) return 'text-red-600';
    if (score > 15) return 'text-orange-600';
    return 'text-green-600';
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log('Uploading compliance documents:', Array.from(files).map(f => f.name));
      setShowUploadModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Shield className="w-8 h-8 text-blue-600 mr-3" />
            Compliance Spend Center
          </h1>
          <p className="text-gray-600">Manage compliance expenses with AI-powered anomaly detection</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Invoice</span>
          </button>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="regulatory">Regulatory Compliance</option>
            <option value="risk">Risk Management</option>
            <option value="technology">Technology Governance</option>
            <option value="legal">Legal Advisory</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">+12.4%</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">₹{(totalSpend / 100000).toFixed(1)}L</h3>
            <p className="text-gray-600 text-sm">Total Pending Spend</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-orange-600">{pendingApprovals}</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">{pendingApprovals}</h3>
            <p className="text-gray-600 text-sm">Pending Approvals</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-sm font-medium text-red-600">{highRiskItems}</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">{aiAnomalies.length}</h3>
            <p className="text-gray-600 text-sm">AI Anomalies</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">{renewalAlerts.length}</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">{renewalAlerts.length}</h3>
            <p className="text-gray-600 text-sm">Upcoming Renewals</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spend Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Spend Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {spendBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`₹${(value as number / 100000).toFixed(1)}L`, 'Spend']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {spendBreakdown.map((item, index) => (
              <div key={index} className="flex items-center text-xs">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-600 truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Compliance Spend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${(value as number / 100000).toFixed(1)}L`, '']} />
                <Line 
                  type="monotone" 
                  dataKey="spend" 
                  stroke="#EF4444" 
                  strokeWidth={3}
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: 5 }}
                  name="Actual Spend"
                />
                <Line 
                  type="monotone" 
                  dataKey="budget" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  name="Budget"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* RegAI Anomaly Detection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-purple-500" />
            RegAI Anomaly Detection
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {aiAnomalies.map((anomaly) => (
              <div key={anomaly.id} className={`p-4 rounded-lg border-l-4 ${
                anomaly.type === 'critical' ? 'bg-red-50 border-red-400' :
                anomaly.type === 'warning' ? 'bg-orange-50 border-orange-400' :
                'bg-blue-50 border-blue-400'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-900">{anomaly.title}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        anomaly.type === 'critical' ? 'bg-red-100 text-red-800' :
                        anomaly.type === 'warning' ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {anomaly.type}
                      </span>
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded-full">
                        AI Confidence: {anomaly.confidence}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{anomaly.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Vendor: {anomaly.vendor}</span>
                      <span>Amount: ₹{(anomaly.amount / 100000).toFixed(1)}L</span>
                      <span className="font-medium text-blue-600">{anomaly.recommendation}</span>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-col space-y-2">
                    <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">
                      Investigate
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors">
                      Mark Safe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Expenses Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Compliance Expenses</h2>
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
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Vendor</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Invoice</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Due Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">AI Risk</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {complianceExpenses.map((expense) => (
                  <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{expense.vendor}</div>
                        <div className="text-sm text-gray-500">{expense.description}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{expense.invoiceNumber}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">₹{(expense.amount / 100000).toFixed(1)}L</td>
                    <td className="py-3 px-4 text-gray-600">{expense.category}</td>
                    <td className="py-3 px-4 text-gray-600">{expense.dueDate}</td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${getRiskColor(expense.aiRiskScore)}`}>
                        {expense.aiRiskScore}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}>
                        {expense.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        {expense.status === 'pending_approval' && (
                          <>
                            <button className="px-3 py-1 text-sm bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors">
                              Approve
                            </button>
                            <button className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors">
                              Reject
                            </button>
                          </>
                        )}
                        <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Renewal Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Renewals</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {renewalAlerts.map((renewal) => (
              <div key={renewal.id} className={`p-4 border rounded-lg ${
                renewal.daysLeft <= 30 ? 'border-red-200 bg-red-50' :
                renewal.daysLeft <= 60 ? 'border-orange-200 bg-orange-50' :
                'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{renewal.service}</h4>
                    <p className="text-sm text-gray-600">{renewal.vendor}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span>Renewal: {renewal.renewalDate}</span>
                      <span>Amount: ₹{(renewal.amount / 100000).toFixed(1)}L</span>
                      <span className={`font-medium ${
                        renewal.daysLeft <= 30 ? 'text-red-600' :
                        renewal.daysLeft <= 60 ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {renewal.daysLeft} days left
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      renewal.priority === 'high' ? 'bg-red-100 text-red-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {renewal.priority} priority
                    </span>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Renew Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Compliance Invoice</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
                <input
                  type="text"
                  placeholder="Enter vendor name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount in ₹"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Governance Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="regulatory">Regulatory Compliance</option>
                  <option value="risk">Risk Management</option>
                  <option value="technology">Technology Governance</option>
                  <option value="legal">Legal Advisory</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Invoice File</label>
                <label className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-600">Choose file to upload</span>
                    <p className="text-xs text-gray-500 mt-1">PDF, Excel, CSV files supported</p>
                  </div>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.xlsx,.xls,.csv"
                  />
                </label>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upload & Process
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};