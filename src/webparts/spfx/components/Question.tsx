import * as React from "react";
import { Chip, TextField } from "@mui/material";
import { Answer } from "./types";

interface QuestionProps {
  answer: Answer;
}

export default class Question extends React.Component<QuestionProps, {}> {
  render() {
    const { answer } = this.props;
    return (
      <div key={answer.ID} className="border-b-2 border-sky-500">
        <div className="flex justify-between items-start p-2 m-2">
          <div className="flex flex-col">
            <div className="text-xl justify-start">{answer.Question}</div>
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
              value="" //dodać zapis
              InputProps={{
                readOnly: true,
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
