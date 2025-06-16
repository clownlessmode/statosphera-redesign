export type Lesson = {
  id: number;
  title: string;
  description: string;
  duration: string;
  progress: number;
  completed: boolean;
  to: string[];
  icon: React.ReactNode;
  tags: string[];
};
