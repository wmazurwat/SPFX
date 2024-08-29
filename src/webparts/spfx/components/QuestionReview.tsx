import * as React from "react";
import { Chip, TextField } from "@mui/material";
import { Answer } from "./types";

interface QuestionReviewProps {
  answer: Answer;
  commentsReview: { [id: string]: string };
  onCommentChange: (id: string, value: string) => void;
}

export default class QuestionReview extends React.Component<
  QuestionReviewProps,
  {}
> {
  handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onCommentChange(
      this.props.answer.ID.toString(),
      event.target.value
    );
  };

  render() {
    const { answer, commentsReview } = this.props;

    // Pobieramy najnowszy komentarz
    const latestComment = answer.CommentReview?.length
      ? answer.CommentReview[answer.CommentReview.length - 1].Comment
      : "";

    return (
      <div key={answer.ID} className="border-b-2 border-sky-500">
        <div className="flex justify-between items-start p-2 m-2">
          <div className="flex flex-col">
            <div className="text-xl justify-start">
              {answer.Question}
              {Number(answer.Weight) < 0.5 ? (
                <span></span>
              ) : Number(answer.Weight) === 0.5 ? (
                <span>*</span>
              ) : Number(answer.Weight) === 1 ? (
                <span>**</span>
              ) : (
                <span>***</span>
              )}
            </div>
            <div className="text-base justify-start">{answer.Hint}</div>
          </div>
          <div className="p-2 m-2">
            {answer.Answer !== null && (
              <Chip
                label={answer.Answer}
                color={
                  answer.Answer === "Yes"
                    ? "success"
                    : answer.Answer === "No"
                    ? "error"
                    : answer.Answer === "N/a"
                    ? "warning"
                    : undefined
                }
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 p-2 m-2">
          <div>
            <TextField
              fullWidth
              id={`comment-${answer.ID}`}
              label="Comment"
              multiline
              maxRows={4}
              value={commentsReview[answer.ID] || latestComment}
              onChange={this.handleCommentChange}
              InputProps={{
                readOnly: false,
              }}
            />
          </div>
          <div className="flex items-center">
            {answer.CommentQA?.Comment && (
              <>
                {answer.CommentQA?.Person}
                {": "}
                {answer.CommentQA?.Comment}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
