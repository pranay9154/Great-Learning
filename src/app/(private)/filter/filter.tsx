"use client";
import Contents from '@/components/pages/contents/contents';
import { FilterBar } from '@/components/pages/contents/filterBar';
import { ModeToggle } from '@/components/pages/theme/modeToggle';
import { ActivityType, ActivityStatus } from '@/lib/activity';
import { mockActivities } from '@/lib/constants';
import { useState, useMemo } from 'react';

export default function Filter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<ActivityType[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<ActivityStatus[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'dueDate' | 'title' | 'status'>('dueDate');
  const filteredActivities = useMemo(() => {
    let filtered = mockActivities;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (activity) =>
          activity.title.toLowerCase().includes(query) ||
          activity.description.toLowerCase().includes(query) ||
          activity.subject.toLowerCase().includes(query)
      );
    }
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((activity) =>
        selectedTypes.includes(activity.type)
      );
    }
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((activity) =>
        selectedStatuses.includes(activity.status)
      );
    }
    if (selectedSubjects.length > 0) {
      filtered = filtered.filter((activity) =>
        selectedSubjects.includes(activity.subject)
      );
    }
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else {
        const statusOrder = { overdue: 0, 'in-progress': 1, 'not-started': 2, completed: 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
    });

    return sorted;
  }, [
    searchQuery,
    selectedTypes,
    selectedStatuses,
    selectedSubjects,
    sortBy,
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black dark:border-gray-700">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6">
          <ModeToggle />

          <p className="text-gray-600">
            Track your learning progress and stay on top of your activities
          </p>
        </div>
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTypes={selectedTypes}
          onTypesChange={setSelectedTypes}
          selectedStatuses={selectedStatuses}
          onStatusesChange={setSelectedStatuses}
          selectedSubjects={selectedSubjects}
          onSubjectsChange={setSelectedSubjects}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalActivities={mockActivities.length}
          filteredCount={filteredActivities.length}
        />

        <Contents activities={filteredActivities} />
      </main>
    </div>
  );
}