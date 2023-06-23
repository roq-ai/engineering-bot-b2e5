const mapping: Record<string, string> = {
  companies: 'company',
  'mentor-feedbacks': 'mentor_feedback',
  roadmaps: 'roadmap',
  'student-progresses': 'student_progress',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
