export interface Task {
  id: number;
  userId: number;
  title: string;
  summary?: string | null;
  dueDate: string;
}

export interface NewTaskData {
  userId: number;
  title: string;
  summary?: string | null;
  dueDate: string;
}
