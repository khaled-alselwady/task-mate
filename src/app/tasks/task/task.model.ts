export interface Task {
  id: number;
  userId: number;
  title: string;
  summary: string;
  dueDate: Date;
}

export interface NewTaskData {
  userId: number;
  title: string;
  summary: string;
  date: Date;
}
