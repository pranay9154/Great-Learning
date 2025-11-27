import {
  Video,
  FileText,
  ClipboardList,
  MessageSquare,
  Clock,
  Calendar,
  Award,
  User,
  Users,
  AlertCircle,
  CheckCircle,
  PlayCircle,
  ArrowRight,
} from 'lucide-react';
import { formatDistanceToNow, format, isPast, isFuture } from 'date-fns';
import { Activity } from '@/lib/activity';

interface ActivityCardProps {
  activity: Activity;
}

const typeConfig = {
  'online-class': {
    icon: Video,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    label: 'Online Class',
  },
  assignment: {
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    label: 'Assignment',
  },
  quiz: {
    icon: ClipboardList,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    label: 'Quiz',
  },
  discussion: {
    icon: MessageSquare,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    label: 'Discussion',
  },
};

const statusConfig = {
  'not-started': {
    label: 'Not Started',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    action: 'Start',
    icon: PlayCircle,
  },
  'in-progress': {
    label: 'In Progress',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    action: 'Continue',
    icon: ArrowRight,
  },
  completed: {
    label: 'Completed',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    action: 'Review',
    icon: CheckCircle,
  },
  overdue: {
    label: 'Overdue',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    action: 'Submit Now',
    icon: AlertCircle,
  },
};

export function ActivityCard({ activity }: ActivityCardProps) {
  const TypeIcon = typeConfig[activity.type].icon;
  const StatusIcon = statusConfig[activity.status].icon;

  const getDueInfo = () => {
    if (!activity.dueDate && !activity.startTime) return null;

    const date = new Date(activity.dueDate || activity.startTime!);
    const isOverdue = activity.dueDate && isPast(date);
    const isUpcoming =
      (activity.dueDate || activity.startTime) && isFuture(date);

    let timeText = '';
    let urgencyClass = '';

    if (activity.type === 'online-class' && activity.startTime) {
      const now = new Date();
      const diffHours = (date.getTime() - now.getTime()) / (1000 * 60 * 60);

      if (diffHours < 0) {
        timeText = 'Started ' + formatDistanceToNow(date, { addSuffix: true });
        urgencyClass = 'text-gray-600';
      } else if (diffHours < 1) {
        timeText = 'Starts in ' + Math.round(diffHours * 60) + ' minutes';
        urgencyClass = 'text-red-600';
      } else if (diffHours < 24) {
        timeText = 'Starts ' + formatDistanceToNow(date, { addSuffix: true });
        urgencyClass = 'text-orange-600';
      } else {
        timeText = 'Starts on ' + format(date, 'MMM dd, yyyy • h:mm a');
        urgencyClass = 'text-gray-600';
      }
    } else if (activity.dueDate) {
      const now = new Date();
      const diffHours = (date.getTime() - now.getTime()) / (1000 * 60 * 60);

      if (isOverdue) {
        timeText =
          'Due ' + formatDistanceToNow(date, { addSuffix: true });
        urgencyClass = 'text-red-600';
      } else if (diffHours < 24) {
        timeText = 'Due in ' + Math.round(diffHours) + ' hours';
        urgencyClass = 'text-red-600';
      } else if (diffHours < 72) {
        timeText = 'Due ' + formatDistanceToNow(date, { addSuffix: true });
        urgencyClass = 'text-orange-600';
      } else {
        timeText = 'Due ' + format(date, 'MMM dd, yyyy • h:mm a');
        urgencyClass = 'text-gray-600';
      }
    }

    return { timeText, urgencyClass, isOverdue, isUpcoming };
  };

  const dueInfo = getDueInfo();

  return (
    <div className="bg-white rounded-lg shadow-sm border 
    border-gray-200 hover:shadow-md transition-shadow dark:bg-black dark:border-gray-700 dark:text-white">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3 mb-3">
              <div className={`${typeConfig[activity.type].bgColor} p-2 rounded-lg `}>
                <TypeIcon className={`w-5 h-5 ${typeConfig[activity.type].color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded ${typeConfig[activity.type].bgColor} ${typeConfig[activity.type].color} `}>
                    {typeConfig[activity.type].label}
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-600">{activity.subject}</span>
                </div>

                <h3 className="text-gray-900 mb-1 truncate sm:whitespace-normal dark:text-white">
                  {activity.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {activity.description}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 ml-14">
              {activity.duration && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{activity.duration}</span>
                </div>
              )}

              {activity.instructor && (
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span>{activity.instructor}</span>
                </div>
              )}

              {activity.points !== undefined && (
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>{activity.points} points</span>
                </div>
              )}

              {activity.submissions !== undefined &&
                activity.totalStudents !== undefined && (
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>
                      {activity.submissions}/{activity.totalStudents} responses
                    </span>
                  </div>
                )}
            </div>
            {activity.progress !== undefined && activity.status === 'in-progress' && (
              <div className="mt-3 ml-14">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{activity.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${activity.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-3 lg:gap-4 flex-shrink-0">
            <div className="flex flex-col items-start lg:items-end gap-2">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${statusConfig[activity.status].bgColor
                  }`}
              >
                <StatusIcon
                  className={`w-4 h-4 ${statusConfig[activity.status].color}`}
                />
                <span
                  className={`text-sm ${statusConfig[activity.status].color}`}
                >
                  {statusConfig[activity.status].label}
                </span>
              </div>
              {dueInfo && (
                <div
                  className={`flex items-center gap-1.5 text-sm ${dueInfo.urgencyClass}`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>{dueInfo.timeText}</span>
                </div>
              )}
            </div>
            <button
              className={`px-4 sm:px-6 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${activity.status === 'overdue'
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : activity.status === 'completed'
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
              <span>{statusConfig[activity.status].action}</span>
              <StatusIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
