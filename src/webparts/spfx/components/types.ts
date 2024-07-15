export interface CommentQA {
    Person: string;
    Comment: string;
  }
  
export interface Answer {
    ID: number;
    Question?: string;
    Hint?: string;
    Weight?: string;
    Answer: string | null;
    Section: string;
    CommentQA?: {
      Person: string;
      Comment: string;
    };
    CommentReview?: Array<{
      Person: string;
      Comment: string;
    }>;
  }