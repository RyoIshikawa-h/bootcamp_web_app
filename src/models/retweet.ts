import {Retweet} from "@prisma/client";
import {databaseManager} from "@/db/index";

type RetweetData = Pick<Retweet, "userId" | "postId">;

export const getPostRetweetedCount = async (
  postId: number
): Promise<number> => {
  const prisma = databaseManager.getInstance();
  const count = await prisma.retweet.count({
    where: {
      postId,
    },
  });
  return count;
};

export const createRetweet = async (
  RetweetData: RetweetData
): Promise<Retweet> => {
  const prisma = databaseManager.getInstance();
  const Retweet = await prisma.retweet.create({
    data: RetweetData,
  });
  return Retweet;
};

export const deleteRetweet = async (
  RetweetData: RetweetData
): Promise<Retweet> => {
  const prisma = databaseManager.getInstance();
  const Retweet = await prisma.retweet.delete({
    where: {
      /* eslint-disable camelcase */
      userId_postId: {
        userId: RetweetData.userId,
        postId: RetweetData.postId,
      },
      /* eslint-enable camelcase */
    },
  });
  return Retweet;
};

export const hasUserRetweetedPost = async (
  userId: number,
  postId: number
): Promise<boolean> => {
  const prisma = databaseManager.getInstance();
  const Retweet = await prisma.retweet.findFirst({
    where: {
      userId,
      postId,
    },
  });
  return Retweet !== null;
};
