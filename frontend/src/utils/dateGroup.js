import {
  format,
  isToday,
  isYesterday,
  isWithinInterval,
  subDays,
} from "date-fns";

export const groupChatSessions = (sessions) => {
  const today = [];
  const yesterday = [];
  const previous7Days = [];
  const previous30Days = [];

  if (!sessions) return { today, yesterday, previous7Days, previous30Days };

  sessions.forEach((session) => {
    const sessionDate = new Date(session.updatedTime);
    if (isToday(sessionDate)) {
      today.push({ ...session });
    } else if (isYesterday(sessionDate)) {
      yesterday.push({ ...session });
    } else if (
      isWithinInterval(sessionDate, {
        start: subDays(new Date(), 7),
        end: new Date(),
      })
    ) {
      previous7Days.push({ ...session });
    } else if (
      isWithinInterval(sessionDate, {
        start: subDays(new Date(), 30),
        end: new Date(),
      })
    ) {
      previous30Days.push({ ...session });
    }
  });

  return { today, yesterday, previous7Days, previous30Days };
};
