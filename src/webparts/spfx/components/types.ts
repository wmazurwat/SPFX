export interface IQAItem {
    Sekcja: string;
    Pytanie: string;
    Podpowiedź: string;
    id: string;
  }
export interface CommentQA {
    Person: string;
    Comment: string;
  }
  
export interface Answer {
    ID: number;
    Question: string;
    Hint?: string;
    Answer: string | null;
    Section: string;
    CommentQA?: {
      Person: string;
      Comment: string;
    };
    CommentReview?: {
      Person: string;
      Comment: string;
    }[];
  }