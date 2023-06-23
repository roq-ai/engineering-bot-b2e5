import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { mentorFeedbackValidationSchema } from 'validationSchema/mentor-feedbacks';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.mentor_feedback
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getMentorFeedbackById();
    case 'PUT':
      return updateMentorFeedbackById();
    case 'DELETE':
      return deleteMentorFeedbackById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMentorFeedbackById() {
    const data = await prisma.mentor_feedback.findFirst(convertQueryToPrismaUtil(req.query, 'mentor_feedback'));
    return res.status(200).json(data);
  }

  async function updateMentorFeedbackById() {
    await mentorFeedbackValidationSchema.validate(req.body);
    const data = await prisma.mentor_feedback.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteMentorFeedbackById() {
    const data = await prisma.mentor_feedback.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
