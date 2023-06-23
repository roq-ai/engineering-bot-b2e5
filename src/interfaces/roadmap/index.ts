import { MentorFeedbackInterface } from 'interfaces/mentor-feedback';
import { StudentProgressInterface } from 'interfaces/student-progress';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface RoadmapInterface {
  id?: string;
  title: string;
  field: string;
  team_member_id: string;
  created_at?: any;
  updated_at?: any;
  mentor_feedback?: MentorFeedbackInterface[];
  student_progress?: StudentProgressInterface[];
  user?: UserInterface;
  _count?: {
    mentor_feedback?: number;
    student_progress?: number;
  };
}

export interface RoadmapGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  field?: string;
  team_member_id?: string;
}
