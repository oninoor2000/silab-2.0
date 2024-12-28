import { db } from "~/server/db";
import { v4 as uuidv4 } from "uuid";

// Helper function to calculate the difference in milliseconds
const getTimeDifferenceInMilliseconds = (date1: Date, date2: Date): number => {
  return date1.getTime() - date2.getTime();
};

// Helper function to check if user can generate new token
const isAllowedGetNewToken = (
  timeSinceCreation: number,
  validityDuration: number,
): boolean => {
  return timeSinceCreation < validityDuration;
};

export const generateVerificationToken = async (userId: string) => {
  const currentTime = new Date();
  const oneMinuteInMs = 60 * 1000; // 1 minute in milliseconds
  const oneHourInMs = 3600 * 1000; // 1 hour in milliseconds

  // Check for existing token
  const existingToken = await db.verificationToken.findFirst({
    where: { userId },
  });

  if (existingToken) {
    const timeSinceCreation = getTimeDifferenceInMilliseconds(
      currentTime,
      new Date(existingToken.createdAt),
    );

    // Check if the token was created within the last minute
    if (isAllowedGetNewToken(timeSinceCreation, oneMinuteInMs)) {
      const waitTime = Math.ceil((oneMinuteInMs - timeSinceCreation) / 1000); // Calculate remaining wait time in seconds
      return {
        success: false,
        waitTime,
        verificationToken: null,
      };
    }

    // Delete the old token if it's allowed to generate new token
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  // Create a new verification token
  const token = uuidv4();
  const expires = new Date(currentTime.getTime() + oneHourInMs);

  const verificationToken = await db.verificationToken.create({
    data: {
      token,
      userId,
      expires,
    },
  });

  return {
    success: true,
    waitTime: 60,
    verificationToken,
  };
};
