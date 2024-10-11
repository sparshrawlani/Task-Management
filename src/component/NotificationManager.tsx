import React, { useEffect, useRef } from "react";
import { useTodo } from "./TodoProvider";
import { getDueDateReminders } from "../utils/reminderUtils";
import { playSound } from "../utils/playSound";

const soundUrl = "/sounds/sound.mp3";
const CHECK_INTERVAL = 3000;

const NotificationManager: React.FC = () => {
  const { groups } = useTodo();
  const notifiedTasks = useRef<Set<number>>(new Set());

  useEffect(() => {
    const checkReminders = () => {
      const { remindSoon } = getDueDateReminders(groups, 1);

      const now = new Date();

      remindSoon.forEach((todo) => {
        if (todo.remindme) {
          const remindmeDate = new Date(todo.remindme);
          const timeDiff = Math.abs(remindmeDate.getTime() - now.getTime());

          if (timeDiff <= 5000 && !notifiedTasks.current.has(todo.id)) {
            playSound(soundUrl);
            notifiedTasks.current.add(todo.id);
          }
        }
      });
    };

    const intervalId = setInterval(checkReminders, CHECK_INTERVAL);

    return () => clearInterval(intervalId);
  }, [groups]);

  return null;
};

export default NotificationManager;
