import axios from 'axios';
import queryString from 'query-string';
import { MentorFeedbackInterface, MentorFeedbackGetQueryInterface } from 'interfaces/mentor-feedback';
import { GetQueryInterface } from '../../interfaces';

export const getMentorFeedbacks = async (query?: MentorFeedbackGetQueryInterface) => {
  const response = await axios.get(`/api/mentor-feedbacks${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMentorFeedback = async (mentorFeedback: MentorFeedbackInterface) => {
  const response = await axios.post('/api/mentor-feedbacks', mentorFeedback);
  return response.data;
};

export const updateMentorFeedbackById = async (id: string, mentorFeedback: MentorFeedbackInterface) => {
  const response = await axios.put(`/api/mentor-feedbacks/${id}`, mentorFeedback);
  return response.data;
};

export const getMentorFeedbackById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/mentor-feedbacks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMentorFeedbackById = async (id: string) => {
  const response = await axios.delete(`/api/mentor-feedbacks/${id}`);
  return response.data;
};
