import { Group, TodoType } from "../types";

export const getDueDateReminders = (groups: Group[], timeWindowMinutes = 1) => {
  const now = new Date();
  const reminders = {
    remindSoon: [] as TodoType[],
  };

  groups.forEach((group) => {
    group.groupList.forEach((list) => {
      list.lists.forEach((todo) => {
        if (todo.remindme) {
          const remindmeDate = new Date(todo.remindme);
          const timeDiff = remindmeDate.getTime() - now.getTime();
          const minutesDiff = timeDiff / (1000 * 60);

          if (minutesDiff >= 0 && minutesDiff <= timeWindowMinutes) {
            reminders.remindSoon.push(todo);
          }
        }
      });
    });
  });

  return reminders;
};
