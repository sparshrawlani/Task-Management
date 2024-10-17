export interface TodoContextType {
  groups: Group[];
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
}

export interface Group {
  name: string;
  groupList: List[];
}

export interface List {
  name: string;
  lists: TodoType[];
}

export type TodoType = {
  status: string;
  id: number;
  description: string;
  completed: boolean;
  dueDate: Date | undefined;
  remindme: Date | undefined;
  repeat: RepeatType | undefined;
  listType: ListType[];
};

export type RepeatType =
  | "Daily"
  | "WeekDays"
  | "Weekly"
  | "Monthly"
  | "Yearly"
  | "Customized";

export type ListType = "Tasks"
