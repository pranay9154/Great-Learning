export type ActivityType = 'online-class' | 'assignment' | 'quiz' | 'discussion';
export type ActivityStatus = 'not-started' | 'in-progress' | 'completed' | 'overdue';

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  subject: string;
  status: ActivityStatus;
  description: string;
  dueDate?: string;
  startTime?: string;
  duration?: string;
  progress?: number;
  points?: number;
  instructor?: string;
  submissions?: number;
  totalStudents?: number;
}