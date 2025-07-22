import React from 'react';
import { Button } from './button';
import { Badge } from './badge';

interface FilterTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface FilterTabsProps {
  tabs: FilterTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({ 
  tabs, 
  activeTab, 
  onTabChange 
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onTabChange(tab.id)}
          className={`h-9 px-3 ${
            activeTab === tab.id 
              ? "bg-primary text-primary-foreground hover:bg-primary/90" 
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          {tab.label}
          {tab.count !== undefined && (
            <Badge 
              variant="secondary" 
              className="ml-2 h-5 px-1.5 text-xs"
            >
              {tab.count}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  );
};