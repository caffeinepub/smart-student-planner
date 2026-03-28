// App-specific types that mirror the backend interface
export interface CalendarEvent {
  id: number;
  title: string;
  date: bigint;
  note: string;
  color: string;
}

export interface BirthdayReminder {
  id: number;
  name: string;
  birthdate: bigint;
  relation: string;
}

export interface Subtask {
  id: number;
  text: string;
  done: boolean;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: bigint;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface TodoEntry {
  todo: Todo;
  completed: boolean;
}

export interface UserProfile {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BackendActor = any;
