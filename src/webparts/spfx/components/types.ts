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
    Section: string;
    Question: string;
    Hint: string;
    Weight: number;
    Answer: string;
    CommentQA: CommentQA;
  }