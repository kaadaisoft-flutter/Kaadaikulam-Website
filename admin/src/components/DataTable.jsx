import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Download, ChevronLeft, ChevronRight, ArrowUpDown, Filter, X } from 'lucide-react';
import { exportToExcel } from '../utils/exportToExcel';

const DataTable = ({
    data,
    columns,
    exportFileName = "Export",
    searchPlaceholder = "Search...",
    itemsPerPage = 10,
    filterOptions = [], // [{key: 'status', label: 'Status', options: [{value: 'Published', label: 'Published'}]}]
    initialFilters = {}, // e.g. { status: 'pending' } to show only pending on load
    showExport = true,
    loading = false
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [showFilter, setShowFilter] = useState(false);
    const [activeFilters, setActiveFilters] = useState(initialFilters);
    const filterRef = useRef(null);

    // Handle clicks outside filter dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilter(false);
            }
        };

        if (showFilter) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showFilter]);

    // Handle Sorting
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Handle Filter change
    const handleFilterChange = (key, value) => {
        setActiveFilters(prev => {
            const updated = { ...prev };
            if (value === '' || value === undefined) {
                delete updated[key];
            } else {
                updated[key] = value;
            }
            return updated;
        });
        setCurrentPage(1);
        setShowFilter(false); // Close dropdown after selection
    };

    const activeFilterCount = Object.keys(activeFilters).length;

    // Filter, Sort, and Paginate Data
    const processedData = useMemo(() => {
        let filtered = data;

        // Search
        if (searchTerm) {
            filtered = filtered.filter(item =>
                Object.values(item).some(val =>
                    String(val).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        // Apply filters
        Object.entries(activeFilters).forEach(([key, value]) => {
            if (value) {
                filtered = filtered.filter(item => String(item[key]) === String(value));
            }
        });

        // Sort
        if (sortConfig.key) {
            filtered = [...filtered].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return filtered;
    }, [data, searchTerm, sortConfig, activeFilters]);

    // Pagination calculations
    const totalPages = Math.max(1, Math.ceil(processedData.length / itemsPerPage));
    const paginatedData = processedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleExport = () => {
        exportToExcel(processedData, exportFileName);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            {/* Table Toolbar — Order: Search | Filter | Export */}
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-end items-center gap-3">
                {/* Search */}
                <div className="relative w-full sm:w-64 sm:order-1">
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>

                {/* Filter toggle */}
                {filterOptions.length > 0 && (
                    <div className="relative sm:order-2" ref={filterRef}>
                        <button
                            onClick={() => setShowFilter(!showFilter)}
                            className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${activeFilterCount > 0 ? 'border-primary text-primary bg-primary/5' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                        >
                            <Filter size={16} />
                            <span className="hidden sm:inline">Filter</span>
                            {activeFilterCount > 0 && (
                                <span className="w-5 h-5 flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full">{activeFilterCount}</span>
                            )}
                        </button>

                        {/* Filter dropdown */}
                        {showFilter && (
                            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 p-4 z-30 space-y-3">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-semibold text-gray-700">Filters</span>
                                    {activeFilterCount > 0 && (
                                        <button
                                            onClick={() => {
                                                setActiveFilters({});
                                                setShowFilter(false);
                                            }}
                                            className="text-xs text-primary hover:underline"
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </div>
                                {filterOptions.map((filter) => (
                                    <div key={filter.key}>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">{filter.label}</label>
                                        <select
                                            className="w-full border border-gray-200 rounded-md p-1.5 text-sm focus:ring-primary focus:border-primary"
                                            value={activeFilters[filter.key] || ''}
                                            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                                        >
                                            <option value="">All</option>
                                            {filter.options.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Export */}
                {showExport && (
                    <button
                        onClick={handleExport}
                        className="sm:order-3 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <Download size={16} />
                        <span className="hidden sm:inline">Export</span>
                    </button>
                )}
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    className={`px-6 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase ${col.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                                    onClick={() => col.sortable && handleSort(col.key)}
                                >
                                    <div className="flex items-center gap-2">
                                        {col.label}
                                        {col.sortable && <ArrowUpDown size={14} className="text-gray-400" />}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Loading Records...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : paginatedData.length > 0 ? (
                            paginatedData.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-50/50 transition-colors">
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                                            {col.render ? col.render(row) : row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
                                        <X size={24} className="opacity-20" />
                                        <span className="text-sm font-medium">No results found matching your criteria</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer — always visible */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
                <p className="text-sm text-gray-500">
                    {processedData.length > 0 ? (
                        <>Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, processedData.length)}</span> of <span className="font-medium">{processedData.length}</span> results</>
                    ) : (
                        <>0 results</>
                    )}
                </p>

                <div className="flex gap-1">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-1 rounded-md border border-gray-200 text-gray-500 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(p => p === 1 || p === totalPages || Math.abs(currentPage - p) <= 1)
                        .map((page, i, arr) => (
                            <React.Fragment key={page}>
                                {i > 0 && arr[i - 1] !== page - 1 && <span className="px-2 text-gray-400">...</span>}
                                <button
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-md text-sm border ${currentPage === page
                                        ? 'border-primary bg-primary text-white font-medium'
                                        : 'border-transparent text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {page}
                                </button>
                            </React.Fragment>
                        ))}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-1 rounded-md border border-gray-200 text-gray-500 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
