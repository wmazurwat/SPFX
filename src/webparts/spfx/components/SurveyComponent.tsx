import * as React from "react";
import SurveySection from "./SurveySection";
import { useState } from "react";
import { IconButton, Button, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Question {
  id: string;
  section: string;
  question: string;
  hint: string;
  weight: number;
}

const SurveyComponent: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [sections, setSections] = useState<string[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const addSection = () => {
    const newSection = `section${sections.length + 1}`;
    setSections([...sections, newSection]);
  };

  const deleteSection = (section: string) => {
    setSections(sections.filter((s) => s !== section));
    setQuestions(questions.filter((q) => q.section !== section));
    if (selectedSection === section) {
      setSelectedSection(null);
    }
  };

  const updateSectionTitle = (oldTitle: string, newTitle: string) => {
    setSections(sections.map((s) => (s === oldTitle ? newTitle : s)));
    setQuestions(
      questions.map((q) =>
        q.section === oldTitle ? { ...q, section: newTitle } : q
      )
    );
    if (selectedSection === oldTitle) {
      setSelectedSection(newTitle);
    }
  };

  const addQuestion = (section: string) => {
    const newQuestion: Question = {
      id: (questions.length + 1).toString(),
      section: section,
      question: "New Question",
      hint: "New Hint",
      weight: 0.5,
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (updatedQuestion: Question) => {
    const updatedQuestions = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <Box className="p-4">
      <Box className="flex">
        <Box className="w-1/4 p-2 border-r border-gray-300">
          {sections.map((section, index) => (
            <Box key={index} className="flex items-center justify-between mb-2">
              <Button
                variant={selectedSection === section ? "contained" : "outlined"}
                fullWidth
                onClick={() => setSelectedSection(section)}
              >
                {section}
              </Button>
              <IconButton onClick={() => deleteSection(section)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button variant="contained" fullWidth onClick={addSection}>
            New Section
          </Button>
        </Box>
        <Box className="w-3/4 p-2">
          {selectedSection && (
            <SurveySection
              section={selectedSection}
              questions={questions.filter((q) => q.section === selectedSection)}
              updateQuestion={updateQuestion}
              addQuestion={addQuestion}
              deleteQuestion={deleteQuestion}
              updateSectionTitle={updateSectionTitle}
            />
          )}
        </Box>
      </Box>
      <Box className="flex justify-end">
        <Button variant="contained" color="primary" className="m-5 p-5">
          Save survey
        </Button>
      </Box>
    </Box>
  );
};

export default SurveyComponent;
