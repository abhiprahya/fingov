import React from 'react';
import { 
  LayoutDashboard, 
  Cloud, 
  Shield, 
  TrendingUp, 
  Receipt, 
  Bell, 
  FileText,
  Scale,
  Cpu,
  BookOpen,
  Building,
  Users,
  FolderOpen,
  MessageSquare,
  BarChart3,
  ChevronRight 
} from 'lucide-react';
import type { User, Page } from '../App';

interface SidebarProps {
  user: User;
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ user, currentPage, onPageChange }) => {
  const menuItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, roles: ['CFO', 'Governance Lead', 'FinOps Analyst', 'Finance Manager', 'Cloud Manager', 'CISO', 'Compliance Officer'] },
    { id: 'governance-spend' as Page, label: 'Governance Spend', icon: <Building className="w-5 h-5" />, roles: ['CFO', 'Governance Lead', 'Finance Manager', 'FinOps Analyst'] },
    { id: 'compliance-spend' as Page, label: 'Compliance Spend Center', icon: <Shield className="w-5 h-5" />, roles: ['CFO', 'Governance Lead', 'Compliance Officer', 'Finance Manager'] },
    { id: 'spend-roi' as Page, label: 'Spend & ROI Analytics', icon: <BarChart3 className="w-5 h-5" />, roles: ['CFO', 'Governance Lead', 'FinOps Analyst', 'Finance Manager'] },
    { id: 'document-vault' as Page, label: 'Document Vault', icon: <FolderOpen className="w-5 h-5" />, roles: ['CFO', 'Governance Lead', 'Compliance Officer', 'Finance Manager'] },
    { id: 'collaboration' as Page, label: 'Collaboration Hub', icon: <MessageSquare className="w-5 h-5" />, roles: ['CFO', 'Governance Lead', 'FinOps Analyst', 'Finance Manager', 'Cloud Manager', 'CISO', 'Compliance Officer'] },
    { id: 'cloud-integration' as Page, label: 'Cloud Integration', icon: <Cloud className="w-5 h-5" />, roles: ['Cloud Manager', 'FinOps Analyst', 'Governance Lead'] },
    { id: 'compliance' as Page, label: 'Compliance Dashboard', icon: <Shield className="w-5 h-5" />, roles: ['CISO', 'CFO', 'FinOps Analyst', 'Compliance Officer', 'Governance Lead'] },
    { id: 'compliance-frameworks' as Page, label: 'Compliance Frameworks', icon: <BookOpen className="w-5 h-5" />, roles: ['CFO', 'FinOps Analyst', 'Cloud Manager', 'CISO', 'Compliance Officer', 'Governance Lead'] },
    { id: 'forecast' as Page, label: 'AI Forecast', icon: <TrendingUp className="w-5 h-5" />, roles: ['CFO', 'FinOps Analyst', 'Governance Lead', 'Finance Manager'] },
    { id: 'regulatory-impact' as Page, label: 'Regulatory Impact', icon: <Scale className="w-5 h-5" />, roles: ['CFO', 'Compliance Officer', 'CISO', 'Governance Lead'] },
    { id: 'ai-optimization' as Page, label: 'AI Optimization', icon: <Cpu className="w-5 h-5" />, roles: ['FinOps Analyst', 'Cloud Manager', 'Governance Lead'] },
    { id: 'chargeback' as Page, label: 'Chargeback', icon: <Receipt className="w-5 h-5" />, roles: ['CFO', 'FinOps Analyst', 'Finance Manager'] },
    { id: 'notifications' as Page, label: 'Notifications', icon: <Bell className="w-5 h-5" />, roles: ['CFO', 'FinOps Analyst', 'Cloud Manager', 'CISO', 'Compliance Officer', 'Governance Lead', 'Finance Manager'] },
    { id: 'reports' as Page, label: 'Reports', icon: <FileText className="w-5 h-5" />, roles: ['CFO', 'CISO', 'FinOps Analyst', 'Compliance Officer', 'Governance Lead', 'Finance Manager'] },
  ];

  const availableItems = menuItems.filter(item => item.roles.includes(user.role));

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <Shield className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">FinGov.AI</h1>
            <p className="text-xs text-gray-500">Financial Governance</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {availableItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                currentPage === item.id
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                {item.icon}
                <span className="ml-3 font-medium">{item.label}</span>
              </div>
              {currentPage === item.id && (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-medium text-sm">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};