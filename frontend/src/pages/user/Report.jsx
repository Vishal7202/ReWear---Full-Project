import React, { useState, useEffect, useMemo } from 'react';

const sampleReports = [
  {
    id: 1,
    type: 'Complaint',
    title: 'Late delivery of product',
    status: 'Resolved',
    date: '2025-08-05',
  },
  {
    id: 2,
    type: 'Listing',
    title: 'Duplicate listing found',
    status: 'Pending',
    date: '2025-08-06',
  },
  {
    id: 3,
    type: 'Complaint',
    title: 'Wrong item delivered',
    status: 'In Progress',
    date: '2025-08-07',
  },
  {
    id: 4,
    type: 'Listing',
    title: 'Listing removed incorrectly',
    status: 'Resolved',
    date: '2025-08-03',
  },
  {
    id: 5,
    type: 'Complaint',
    title: 'Package damaged',
    status: 'Pending',
    date: '2025-08-02',
  },
];

const PAGE_SIZE = 2;

const Report = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Sorting
  const [filterType, setFilterType] = useState('All');
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReports(sampleReports);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtered & Sorted reports
  const filteredReports = useMemo(() => {
    let filtered = reports;
    if (filterType !== 'All') {
      filtered = filtered.filter((r) => r.type === filterType);
    }

    filtered = filtered.sort((a, b) => {
      if (sortField === 'date') {
        // Sort by date
        if (sortOrder === 'asc') return new Date(a.date) - new Date(b.date);
        else return new Date(b.date) - new Date(a.date);
      } else if (sortField === 'status') {
        // Sort by status alphabetically
        if (sortOrder === 'asc') return a.status.localeCompare(b.status);
        else return b.status.localeCompare(a.status);
      }
      return 0;
    });

    return filtered;
  }, [reports, filterType, sortField, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(filteredReports.length / PAGE_SIZE);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Handlers
  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSortChange = (field) => {
    if (sortField === field) {
      // toggle sort order if same field clicked
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold mb-6 text-indigo-700">Reports Dashboard</h1>
      <p className="text-gray-600 mb-8">
        View and manage complaint reports, listing reports, and other important information here.
      </p>

      {/* Filters & Sorting */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <label htmlFor="filterType" className="mr-2 font-semibold text-gray-700">
            Filter by Type:
          </label>
          <select
            id="filterType"
            value={filterType}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>All</option>
            <option>Complaint</option>
            <option>Listing</option>
          </select>
        </div>

        <div>
          <span className="mr-2 font-semibold text-gray-700">Sort by:</span>
          <button
            onClick={() => handleSortChange('date')}
            className={`mr-3 px-3 py-1 rounded ${
              sortField === 'date' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Date {sortField === 'date' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
          </button>
          <button
            onClick={() => handleSortChange('status')}
            className={`px-3 py-1 rounded ${
              sortField === 'status' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Status {sortField === 'status' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-10 text-gray-500 animate-pulse">Loading reports...</div>
      ) : paginatedReports.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No reports found.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedReports.map(({ id, type, title, status, date }) => (
                <tr
                  key={id}
                  className="hover:bg-indigo-50 cursor-pointer transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${
                          status === 'Resolved'
                            ? 'bg-green-100 text-green-800'
                            : status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && paginatedReports.length > 0 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded border ${
              currentPage === 1
                ? 'cursor-not-allowed text-gray-400 border-gray-300'
                : 'text-indigo-700 border-indigo-700 hover:bg-indigo-100'
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded border ${
                  page === currentPage
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'text-indigo-700 border-indigo-700 hover:bg-indigo-100'
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded border ${
              currentPage === totalPages
                ? 'cursor-not-allowed text-gray-400 border-gray-300'
                : 'text-indigo-700 border-indigo-700 hover:bg-indigo-100'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Report;
