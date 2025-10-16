
import React, { useState, useMemo } from 'react';
import { EditIcon, DeleteIcon, SearchIcon } from '../Icons';
import { formatCurrency } from '../../data/utils';

interface Column<T> {
  header: string;
  accessor: keyof T;
  isCurrency?: boolean;
  formatter?: (value: any) => string;
  highlight?: (value: any) => boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  actionButtons?: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  showFooter?: boolean;
}

export function Table<T extends { id?: string | number }>({ columns, data, actionButtons = false, onEdit, onDelete, showFooter = false }: TableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);

  const filteredData = useMemo(() => {
    return data.filter(item => 
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const requestSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIndicator = (key: keyof T) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
  };

  const totals = useMemo(() => {
    if (!showFooter) return null;
    const numericColumns = columns.filter(c => typeof data[0]?.[c.accessor] === 'number');
    const totalsRow: Record<string, number | string> = {};
    numericColumns.forEach(col => {
      totalsRow[col.accessor as string] = data.reduce((sum, item) => sum + (Number(item[col.accessor]) || 0), 0);
    });
    return totalsRow;
  }, [data, columns, showFooter]);

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <div className="relative">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="text-gray-400" />
            </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(col => (
                <th key={String(col.accessor)} onClick={() => requestSort(col.accessor)} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                  {col.header}{getSortIndicator(col.accessor)}
                </th>
              ))}
              {actionButtons && <th className="px-6 py-3"></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedData.map((item, index) => (
              <tr key={item.id || index} className="hover:bg-gray-50">
                {columns.map(col => {
                  const value = item[col.accessor];
                  const displayValue = col.formatter ? col.formatter(value) : (col.isCurrency && typeof value === 'number' ? formatCurrency(value) : String(value));
                  const highlightClass = col.highlight && col.highlight(value) ? 'text-red-600 font-bold' : '';
                  return <td key={String(col.accessor)} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 ${highlightClass}`}>{displayValue}</td>
                })}
                {actionButtons && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => onEdit && onEdit(item)} className="text-indigo-600 hover:text-indigo-900 mr-3"><EditIcon /></button>
                    <button onClick={() => onDelete && onDelete(item)} className="text-red-600 hover:text-red-900"><DeleteIcon /></button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
           {showFooter && totals && (
            <tfoot className="bg-gray-100 font-bold">
                <tr>
                    {columns.map((col, index) => (
                        <td key={String(col.accessor)} className="px-6 py-3 text-sm text-gray-800">
                            {index === 0 ? "Totals" : (totals[col.accessor as string] !== undefined ? formatCurrency(totals[col.accessor as string] as number) : "")}
                        </td>
                    ))}
                    {actionButtons && <td></td>}
                </tr>
            </tfoot>
           )}
        </table>
      </div>
    </div>
  );
}
