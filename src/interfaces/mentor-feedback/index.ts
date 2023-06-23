import { UserInterface } from 'interfaces/user';
import { RoadmapInterface } from 'interfaces/roadmap';
import { GetQueryInterface } from 'interfaces';

export interface MentorFeedbackInterface {
  id?: string;
  mentor_id: string;
  roadmap_id: string;
  feedback: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  roadmap?: RoadmapInterface;
  _count?: {};
}

export interface MentorFeedbackGetQueryInterface extends GetQueryInterface {
  id?: string;
  mentor_id?: string;
  roadmap_id?: string;
  feedback?: string;
}
