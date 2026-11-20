export const TODO_PRIORITIES = ['low', 'normal', 'urgent'] as const;
export type TodoPriority = (typeof TODO_PRIORITIES)[number];

export const PRIORITY_LABELS: Record<TodoPriority, string> = {
  low: 'Basse',
  normal: 'Normale',
  urgent: 'Urgente',
};

export type Role = 'admin' | 'manager' | 'member';
