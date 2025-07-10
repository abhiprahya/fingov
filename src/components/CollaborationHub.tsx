import React, { useState } from 'react';
import { MessageSquare, Plus, Users, Calendar, FileText, AlertTriangle, CheckCircle, Clock, Filter, Search } from 'lucide-react';
import type { User } from '../App';

interface CollaborationHubProps {
  user: User;
}

export const CollaborationHub: React.FC<CollaborationHubProps> = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState('tasks');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const tasks = [
    {
      id: 1,
      title: 'RBI Compliance Documentation Review',
      description: 'Review and approve Q2 RBI compliance documentation before submission',
      category: 'Regulatory Compliance',
      priority: 'high',
      status: 'in_progress',
      assignedTo: 'Priya Sharma',
      assignedRole: 'Governance Lead',
      createdBy: user.name,
      createdDate: '2024-07-01',
      dueDate: '2024-07-15',
      documents: ['RBI_Q2_Report.pdf', 'Compliance_Checklist.xlsx'],
      comments: 3,
      progress: 65
    },
    {
      id: 2,
      title: 'SEBI Framework Implementation',
      description: 'Implement new SEBI framework requirements across all trading platforms',
      category: 'Risk Management',
      priority: 'high',
      status: 'pending',
      assignedTo: 'Rajesh Sharma',
      assignedRole: 'Compliance Officer',
      createdBy: 'Sarah Johnson',
      createdDate: '2024-06-28',
      dueDate: '2024-08-01',
      documents: ['SEBI_Framework.docx', 'Implementation_Plan.pdf'],
      comments: 7,
      progress: 25
    },
    {
      id: 3,
      title: 'Cybersecurity Audit Follow-up',
      description: 'Address findings from recent cybersecurity audit and implement recommendations',
      category: 'Technology Governance',
      priority: 'medium',
      status: 'completed',
      assignedTo: 'Jennifer Kim',
      assignedRole: 'CISO',
      createdBy: 'Michael Chen',
      createdDate: '2024-06-20',
      dueDate: '2024-07-05',
      documents: ['Audit_Report.pdf', 'Remediation_Plan.docx'],
      comments: 12,
      progress: 100
    },
    {
      id: 4,
      title: 'Vendor Contract Renewal Analysis',
      description: 'Analyze vendor contracts expiring in Q3 and prepare renewal recommendations',
      category: 'Legal & Advisory',
      priority: 'medium',
      status: 'in_progress',
      assignedTo: 'Arjun Patel',
      assignedRole: 'Finance Manager',
      createdBy: user.name,
      createdDate: '2024-07-02',
      dueDate: '2024-07-20',
      documents: ['Vendor_Contracts.xlsx', 'Cost_Analysis.pdf'],
      comments: 5,
      progress: 40
    }
  ];

  const issues = [
    {
      id: 1,
      title: 'Budget Overrun in Compliance Spend',
      description: 'Q2 compliance spending exceeded budget by 15%, need immediate review',
      type: 'budget',
      priority: 'critical',
      status: 'open',
      reportedBy: 'Sarah Johnson',
      assignedTo: 'Priya Sharma',
      createdDate: '2024-07-03',
      category: 'Financial',
      impact: 'high',
      estimatedCost: 2500000
    },
    {
      id: 2,
      title: 'Delayed IRDAI Documentation',
      description: 'IRDAI quarterly submission delayed due to missing documentation',
      type: 'compliance',
      priority: 'high',
      status: 'in_progress',
      reportedBy: 'Rajesh Sharma',
      assignedTo: 'Jennifer Kim',
      createdDate: '2024-07-01',
      category: 'Regulatory',
      impact: 'medium',
      estimatedCost: 0
    },
    {
      id: 3,
      title: 'Vendor Performance Issues',
      description: 'Multiple vendors showing declining performance metrics',
      type: 'vendor',
      priority: 'medium',
      status: 'resolved',
      reportedBy: 'Michael Chen',
      assignedTo: 'Arjun Patel',
      createdDate: '2024-06-25',
      category: 'Operational',
      impact: 'low',
      estimatedCost: 500000
    }
  ];

  const aiDigest = {
    date: '2024-07-03',
    summary: 'Daily governance operations summary with 4 active tasks and 2 critical issues requiring attention.',
    keyInsights: [
      'RBI compliance documentation review is 65% complete, on track for July 15 deadline',
      'SEBI framework implementation behind schedule, may need additional resources',
      'Budget overrun in compliance spend requires immediate CFO attention',
      '3 vendor contracts expiring in Q3 need renewal decisions'
    ],
    recommendations: [
      'Prioritize SEBI framework implementation to avoid regulatory delays',
      'Schedule budget review meeting for compliance spend overrun',
      'Begin vendor contract renewal negotiations early to secure better terms'
    ],
    riskAlerts: [
      'High risk of SEBI compliance deadline miss without additional resources',
      'Budget variance may impact Q3 governance initiatives'
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'open': return 'bg-red-100 text-red-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    return matchesSearch && matchesPriority;
  });

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || issue.priority === selectedPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <MessageSquare className="w-8 h-8 text-blue-600 mr-3" />
            Collaboration Hub
          </h1>
          <p className="text-gray-600">Coordinate governance tasks and track issues with AI-powered insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* FinAI Daily Digest */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
            FinAI Daily Governance Digest - {aiDigest.date}
          </h2>
          <span className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
            AI Generated
          </span>
        </div>
        
        <p className="text-gray-700 mb-4">{aiDigest.summary}</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Key Insights</h3>
            <ul className="space-y-1">
              {aiDigest.keyInsights.map((insight, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  {insight}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Recommendations</h3>
            <ul className="space-y-1">
              {aiDigest.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Risk Alerts</h3>
            <ul className="space-y-1">
              {aiDigest.riskAlerts.map((alert, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  {alert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setSelectedTab('tasks')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'tasks'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Tasks ({tasks.length})</span>
              </div>
            </button>
            <button
              onClick={() => setSelectedTab('issues')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'issues'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Issues ({issues.length})</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={`Search ${selectedTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {selectedTab === 'tasks' && (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Assigned to:</span>
                          <div className="font-medium text-gray-900">{task.assignedTo}</div>
                          <div className="text-xs text-gray-500">{task.assignedRole}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Due Date:</span>
                          <div className="font-medium text-gray-900">{task.dueDate}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Category:</span>
                          <div className="font-medium text-gray-900">{task.category}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Progress:</span>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${task.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium">{task.progress}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                        <span className="flex items-center">
                          <FileText className="w-4 h-4 mr-1" />
                          {task.documents.length} documents
                        </span>
                        <span className="flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {task.comments} comments
                        </span>
                        <span>Created by {task.createdBy}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">
                        View
                      </button>
                      <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'issues' && (
            <div className="space-y-4">
              {filteredIssues.map((issue) => (
                <div key={issue.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{issue.title}</h3>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                          {issue.priority}
                        </span>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                          {issue.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{issue.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Reported by:</span>
                          <div className="font-medium text-gray-900">{issue.reportedBy}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Assigned to:</span>
                          <div className="font-medium text-gray-900">{issue.assignedTo}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Category:</span>
                          <div className="font-medium text-gray-900">{issue.category}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Impact:</span>
                          <div className={`font-medium ${
                            issue.impact === 'high' ? 'text-red-600' :
                            issue.impact === 'medium' ? 'text-orange-600' :
                            'text-green-600'
                          }`}>
                            {issue.impact}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                        <span>Created: {issue.createdDate}</span>
                        <span>Type: {issue.type}</span>
                        {issue.estimatedCost > 0 && (
                          <span>Est. Cost: ₹{(issue.estimatedCost / 100000).toFixed(1)}L</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">
                        Resolve
                      </button>
                      <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Task/Issue Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Task</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  placeholder="Enter task title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Enter task description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="regulatory">Regulatory Compliance</option>
                    <option value="risk">Risk Management</option>
                    <option value="technology">Technology Governance</option>
                    <option value="legal">Legal & Advisory</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="priya">Priya Sharma (Governance Lead)</option>
                  <option value="rajesh">Rajesh Sharma (Compliance Officer)</option>
                  <option value="jennifer">Jennifer Kim (CISO)</option>
                  <option value="arjun">Arjun Patel (Finance Manager)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};