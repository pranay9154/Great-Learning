"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from "@/components/ui/card";
import { Activity } from "@/lib/activity";
import { mockActivities } from "@/lib/constants";
import { BookOpen, FlaskConical } from "lucide-react";
import { ActivityCard } from "./activityCard";
import { PaginationModel } from "@/components/pagination/pagination";
import { useState } from "react";


interface ActivityListProps {
  activities: Activity[];
}

export default function Contents({ activities }: ActivityListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(activities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = activities.slice(startIndex, endIndex);

  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center dark:bg-black dark:border-gray-700">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-100 p-4 rounded-full">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <p className="text-gray-500 mb-2">No activities found</p>
        <p className="text-sm text-gray-400">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="lg:grid lg:grid-cols-2 lg:gap-4 space-y-4 lg:space-y-0">
        {currentActivities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
      <PaginationModel 
        startingPage={currentPage} 
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}