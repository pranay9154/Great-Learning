import { ActivityType, ActivityStatus } from '@/lib/activity';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTypes: ActivityType[];
  onTypesChange: (types: ActivityType[]) => void;
  selectedStatuses: ActivityStatus[];
  onStatusesChange: (statuses: ActivityStatus[]) => void;
  selectedSubjects: string[];
  onSubjectsChange: (subjects: string[]) => void;
  sortBy: 'dueDate' | 'title' | 'status';
  onSortChange: (sort: 'dueDate' | 'title' | 'status') => void;
  totalActivities: number;
  filteredCount: number;
}

const activityTypes: { value: ActivityType; label: string }[] = [
  { value: 'online-class', label: 'Classes' },
  { value: 'assignment', label: 'Assignments' },
  { value: 'quiz', label: 'Quizzes' },
  { value: 'discussion', label: 'Discussions' },
];

const statuses: { value: ActivityStatus; label: string }[] = [
  { value: 'not-started', label: 'Not Started' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'overdue', label: 'Overdue' },
];

const subjects = ['AI', 'Machine Learning', 'Cloud Computing'];

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedTypes,
  onTypesChange,
  selectedStatuses,
  onStatusesChange,
  selectedSubjects,
  onSubjectsChange,
  sortBy,
  onSortChange,
  totalActivities,
  filteredCount,
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  const toggleType = (type: ActivityType) => {
    if (selectedTypes.includes(type)) {
      onTypesChange(selectedTypes.filter((t) => t !== type));
    } else {
      onTypesChange([...selectedTypes, type]);
    }
  };

  const toggleStatus = (status: ActivityStatus) => {
    if (selectedStatuses.includes(status)) {
      onStatusesChange(selectedStatuses.filter((s) => s !== status));
    } else {
      onStatusesChange([...selectedStatuses, status]);
    }
  };

  const toggleSubject = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      onSubjectsChange(selectedSubjects.filter((s) => s !== subject));
    } else {
      onSubjectsChange([...selectedSubjects, subject]);
    }
  };

  const clearAllFilters = () => {
    onTypesChange([]);
    onStatusesChange([]);
    onSubjectsChange([]);
    onSearchChange('');
  };

  const activeFilterCount =
    selectedTypes.length + selectedStatuses.length + selectedSubjects.length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 dark:bg-black dark:border-gray-700">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center dark:hover:bg-black justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors relative"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="hidden sm:inline ">Filters</span>
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500
             focus:border-transparent dark:text-white dark:bg-black"
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="title">Sort by Title</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredCount} of {totalActivities} activities
          </p>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear all filters
            </button>
          )}
        </div>
      </div>
      {showFilters && (
        <div className="border-t border-gray-200 p-4 space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Activity Type
            </label>
            <div className="flex flex-wrap gap-2">
              {activityTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => toggleType(type.value)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    selectedTypes.includes(type.value)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status.value}
                  onClick={() => toggleStatus(status.value)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    selectedStatuses.includes(status.value)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Subject
            </label>
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => toggleSubject(subject)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    selectedSubjects.includes(subject)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
