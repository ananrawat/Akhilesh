
export enum AppScreen {
  Instructions,
  Sections,
  Test,
  Results,
}

export interface Option {
  id: number;
  text: string;
}

export interface Question {
  id: string;
  sectionId: number;
  questionText: string;
  questionTextHindi: string;
  options: Option[];
  correctOptionId: number;
  positiveMarks: number;
  negativeMarks: number;
}

export interface Section {
  id: number;
  title: string;
  questions: number;
  marks: number;
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId: number;
}
