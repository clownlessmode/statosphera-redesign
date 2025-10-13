import React from "react";

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
  isTest?: boolean; // Флаг для тестовых уроков, которые не показываются в списке
  targetPath?: string; // Путь страницы, на которой проводится урок
};
