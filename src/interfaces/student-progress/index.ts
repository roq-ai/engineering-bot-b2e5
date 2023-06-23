import { UserInterface } from 'interfaces/user';
import { RoadmapInterface } from 'interfaces/roadmap';
import { GetQueryInterface } from 'interfaces';

export interface StudentProgressInterface {
  id?: string;
  student_id: string;
  roadmap_id: string;
  progress: number;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  roadmap?: RoadmapInterface;
  _count?: {};
}

export interface StudentProgressGetQueryInterface extends GetQueryInterface {
  id?: string;
  student_id?: string;
  roadmap_id?: string;
}
