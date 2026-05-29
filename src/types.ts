export interface SlideData {
  id: number;
  title: string;
  tag?: string;
  category?: string;
}

export interface Bug {
  id: string;
  slideId: number;
  x: number; // percentage
  y: number; // percentage
  found: boolean;
  name: string;
  description: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
