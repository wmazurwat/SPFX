import * as React from "react";
import { useState } from "react";
import { TextField, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface SurveyQuestionProps {
  question: {
    id: string;
    section: string;
    question: string;
    hint: string;
    weight: number;
  };
  updateQuestion: (updatedQuestion: {
    id: string;
    section: string;
    question: string;
    hint: string;
    weight: number;
  }) => void;
  deleteQuestion: (id: string) => void;
}

const SurveyQuestion: React.FC<SurveyQuestionProps> = ({
  question,
  updateQuestion,
  deleteQuestion,
}) => {
  const [questionText, setQuestionText] = useState(question.question);
  const [questionHint, setQuestionHint] = useState(question.hint);
  const [questionWeight, setQuestionWeight] = useState(question.weight);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionText(e.target.value);
    updateQuestion({
      ...question,
      question: e.target.value,
      hint: questionHint,
      weight: questionWeight,
    });
  };

  const handleHintChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionHint(e.target.value);
    updateQuestion({
      ...question,
      question: questionText,
      hint: e.target.value,
      weight: questionWeight,
    });
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionWeight(Number(e.target.value));
    updateQuestion({
      ...question,
      question: questionText,
      hint: questionHint,
      weight: Number(e.target.value),
    });
  };

  return (
    <Box display="flex" alignItems="center" mb={2}>
      <Box flexGrow={1}>
        <TextField
          label="Question Text"
          value={questionText}
          onChange={handleTextChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Hint"
          value={questionHint}
          onChange={handleHintChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Weight"
          type="number"
          inputProps={{ step: 0.5 }}
          value={questionWeight}
          onChange={handleWeightChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
      </Box>
      <IconButton
        onClick={() => deleteQuestion(question.id)}
        color="error"
        edge="end"
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default SurveyQuestion;
