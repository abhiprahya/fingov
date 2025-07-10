import React, { useState } from 'react';
import { FolderOpen, Upload, Search, Filter, Download, Eye, Tag, Calendar, FileText, Shield, AlertTriangle } from 'lucide-react';
import type { User } from '../App';

interface DocumentVaultProps {
  user: User;
}

export const DocumentVault: React.FC<DocumentVaultProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const documents = [
    {
      id: 1,
      name: 'RBI Compliance Audit Report 2024.pdf',
      category: 'Regulatory Compliance',
      vendor: 'KPMG India',
      amount: 2850000,
      uploadDate: '2024-07-01',
      size: '4.2 MB',
      tags: ['RBI', 'Audit', 'Compliance', 'Annual'],
      aiTags: ['High Priority', 'Regulatory'],
      status: 'approved',
      version: '1.0',
      expiryDate: '2025-07-01',
      accessLevel: 'restricted'
    },
    {
      id: 2,
      name: 'SEBI Framework Implementation.docx',
      category: 'Risk Management',
      vendor: 'EY India',
      amount: 1650000,
      uploadDate: '2024-06-28',
      size: '2.8 MB',
      tags: ['SEBI', 'Framework', 'Implementation'],
      aiTags: ['Medium Priority', 'Strategic'],
      status: 'approved',
      version: '2.1',
      expiryDate: '2025-06-28',
      accessLevel: 'internal'
    },
    {
      id: 3,
      name: 'Cybersecurity Assessment Report.pdf',
      category: 'Technology Governance',
      vendor: 'PwC India',
      amount: 750000,
      uploadDate: '2024-07-03',
      size: '6.1 MB',
      tags: ['Cybersecurity', 'Assessment', 'Technology'],
      aiTags: ['Critical', 'Security'],
      status: 'pending_review',
      version: '1.0',
      expiryDate: '2025-01-03',
      accessLevel: 'confidential'
    },
    {
      id: 4,
      name: 'Legal Advisory Contract.pdf',
      category: 'Legal & Advisory',
      vendor: 'Cyril Amarchand Mangaldas',
      amount: 980000,
      uploadDate: '2024-06-25',
      size: '1.5 MB',
      tags: ['Legal', 'Contract', 'Advisory'],
      aiTags: ['Contract', 'Legal'],
      status: 'approved',
      version: '1.0',
      expiryDate: '2025-06-25',
      accessLevel: 'restricted'
    },
    {
      id: 5,
      name: 'Training Certification Records.xlsx',
      category: 'Training & Certification',
      vendor: 'Internal',
      amount: 0,
      uploadDate: '2024-07-02',
      size: '890 KB',
      tags: ['Training', 'Certification', 'Records'],
      aiTags: ['HR', 'Compliance'],
      status: 'approved',
      version: '3.2',
      expiryDate: null,
      accessLevel: 'internal'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: documents.length },
    { id: 'regulatory', name: 'Regulatory Compliance', count: documents.filter(d => d.category === 'Regulatory Compliance').length },
    { id: 'risk', name: 'Risk Management', count: documents.filter(d => d.category === 'Risk Management').length },
    { id: 'technology', name: 'Technology Governance', count: documents.filter(d => d.category === 'Technology Governance').length },
    { id: 'legal', name: 'Legal & Advisory', count: documents.filter(d => d.category === 'Legal & Advisory').length },
    { id: 'training', name: 'Training & Certification', count: documents.filter(d => d.category === 'Training & Certification').length }
  ];

  const allTags = Array.from(new Set(documents.flatMap(doc => [...doc.tags, ...doc.aiTags])));

  const aiInsights = [
    {
      id: 1,
      type: 'warning',
      title: 'Document Expiry Alert',
      description: '3 documents expiring within 90 days',
      action: 'Review renewal requirements',
      confidence: 95
    },
    {
      id: 2,
      type: 'info',
      title: 'Auto-tagging Complete',
      description: 'InfraGuard AI tagged 12 new documents',
      action: 'Review AI suggestions',
      confidence: 87
    },
    {
      id: 3,
      type: 'critical',
      title: 'Compliance Gap Detected',
      description: 'Missing IRDAI documentation for Q2',
      action: 'Upload required documents',
      confidence: 92
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || 
                           doc.category.toLowerCase().includes(selectedCategory);
    const matchesTag = selectedTag === 'all' || 
                      [...doc.tags, ...doc.aiTags].includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending_review': return 'bg-orange-100 text-orange-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'confidential': return 'bg-red-100 text-red-800';
      case 'restricted': return 'bg-orange-100 text-orange-800';
      case 'internal': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log('Uploading documents:', Array.from(files).map(f => f.name));
      setShowUploadModal(false);
    }
  };

  const totalDocuments = documents.length;
  const pendingReview = documents.filter(d => d.status === 'pending_review').length;
  const expiringDocs = documents.filter(d => d.expiryDate && new Date(d.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <FolderOpen className="w-8 h-8 text-blue-600 mr-3" />
            Document Vault & Financial Reporting
          </h1>
          <p className="text-gray-600">AI-powered document management with auto-tagging and compliance tracking</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Documents</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">{totalDocuments}</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">{totalDocuments}</h3>
            <p className="text-gray-600 text-sm">Total Documents</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-orange-600">{pendingReview}</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">{pendingReview}</h3>
            <p className="text-gray-600 text-sm">Pending Review</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-sm font-medium text-red-600">{expiringDocs}</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">{expiringDocs}</h3>
            <p className="text-gray-600 text-sm">Expiring Soon</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Tag className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-600">AI</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">{allTags.length}</h3>
            <p className="text-gray-600 text-sm">AI Tags Applied</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>

          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>

          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Advanced Filter</span>
          </button>
        </div>
      </div>

      {/* InfraGuard AI Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-purple-500" />
            InfraGuard AI Insights
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {aiInsights.map((insight) => (
              <div key={insight.id} className={`p-4 rounded-lg border-l-4 ${
                insight.type === 'critical' ? 'bg-red-50 border-red-400' :
                insight.type === 'warning' ? 'bg-orange-50 border-orange-400' :
                'bg-blue-50 border-blue-400'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-900">{insight.title}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        insight.type === 'critical' ? 'bg-red-100 text-red-800' :
                        insight.type === 'warning' ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {insight.type}
                      </span>
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded-full">
                        AI Confidence: {insight.confidence}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                    <p className="text-sm font-medium text-blue-600">{insight.action}</p>
                  </div>
                  <button className="ml-4 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">
                    Take Action
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{doc.name}</h3>
                  <p className="text-sm text-gray-600">{doc.vendor}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                  {doc.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Category:</span>
                <span className="text-gray-900">{doc.category}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Size:</span>
                <span className="text-gray-900">{doc.size}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Version:</span>
                <span className="text-gray-900">v{doc.version}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Access Level:</span>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getAccessLevelColor(doc.accessLevel)}`}>
                  {doc.accessLevel}
                </span>
              </div>
              {doc.amount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Amount:</span>
                  <span className="font-medium text-gray-900">₹{(doc.amount / 100000).toFixed(1)}L</span>
                </div>
              )}
              {doc.expiryDate && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Expires:</span>
                  <span className={`font-medium ${
                    new Date(doc.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {doc.expiryDate}
                  </span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1 mb-2">
                {doc.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                {doc.aiTags.slice(0, 2).map((tag) => (
                  <span key={tag} className="inline-flex px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                    AI: {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Uploaded: {doc.uploadDate}</span>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="regulatory">Regulatory Compliance</option>
                  <option value="risk">Risk Management</option>
                  <option value="technology">Technology Governance</option>
                  <option value="legal">Legal & Advisory</option>
                  <option value="training">Training & Certification</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
                <input
                  type="text"
                  placeholder="Enter vendor name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (Optional)</label>
                <input
                  type="number"
                  placeholder="Enter amount in ₹"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Files</label>
                <label className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-600">Choose files to upload</span>
                    <p className="text-xs text-gray-500 mt-1">PDF, Word, Excel, Image files supported</p>
                  </div>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    multiple
                    accept=".pdf,.docx,.doc,.xlsx,.xls,.jpg,.jpeg,.png"
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
                Upload & Auto-Tag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};