import * as React from "react";
import SurveyQuestion from "./SurveyQuestion";
import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface SurveySectionProps {
  section: string;
  questions: {
    id: string;
    section: string;
    question: string;
    hint: string;
    weight: number;
  }[];
  updateQuestion: (updatedQuestion: {
    id: string;
    section: string;
    question: string;
    hint: string;
    weight: number;
  }) => void;
  addQuestion: (section: string) => void;
  deleteQuestion: (id: string) => void;
  updateSectionTitle: (oldTitle: string, newTitle: string) => void;
}

const SurveySection: React.FC<SurveySectionProps> = ({
  section,
  questions,
  updateQuestion,
  addQuestion,
  deleteQuestion,
  updateSectionTitle,
}) => {
  const [sectionTitle, setSectionTitle] = useState(section);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setSectionTitle(newTitle);
    updateSectionTitle(section, newTitle);
  };

  return (
    <Box mb={6} p={4} border={1} borderRadius={1} borderColor="divider">
      <TextField
        label="Section Title"
        value={sectionTitle}
        onChange={handleTitleChange}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      {questions.map((question) => (
        <SurveyQuestion
          key={question.id}
          question={question}
          updateQuestion={updateQuestion}
          deleteQuestion={deleteQuestion}
        />
      ))}
      <Button
        variant="outlined"
        fullWidth
        onClick={() => addQuestion(section)}
        className="mt-2"
      >
        New Question
      </Button>
    </Box>
  );
};

export default SurveySection;
