import * as React from "react";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Button,
  TextField,
} from "@mui/material";
import { SectionAnswers } from "./Ankieta";

type DynamicSectionProps = {
  sectionName: string;
  saveAnswers: (
    answers: SectionAnswers,
    comments: { [key: string]: string }
  ) => void;
  questions: Array<{
    Pytanie: string;
    Podpowiedź: string;
    id: string;
    Waga: number;
  }>;
  answers: { [key: string]: string };
  updateTotalWeight: (weight: number) => void;
  totalWeight: number;
} & ISpfxProps;

type DynamicSectionState = {
  hasErrors: boolean;
  comments: { [key: string]: string };
};

export default class DynamicSection extends React.Component<
  DynamicSectionProps,
  DynamicSectionState
> {
  constructor(props: DynamicSectionProps) {
    super(props);
    this.state = {
      hasErrors: false,
      comments: {},
    };
  }

  static defaultProps = {
    answers: {},
  };

  updateWeight = (answers: { [key: string]: string }) => {
    let totalWeight = 0;
    this.props.questions.forEach((q) => {
      if (answers[q.id] === "No") {
        totalWeight += q.Waga;
      }
    });
    this.props.updateTotalWeight(totalWeight);
    console.log("Total Weight for 'No' responses:", totalWeight);
  };

  handleChange = (id: string, value: string) => {
    const newAnswers = {
      ...this.props.answers,
      [id]: value,
    };
    this.props.saveAnswers(newAnswers, this.state.comments);
    this.updateWeight(newAnswers);
  };

  handleCommentChange = (id: string, value: string) => {
    this.setState((prevState) => {
      const newComments = {
        ...prevState.comments,
        [id]: value,
      };
      this.props.saveAnswers(this.props.answers, newComments);
      return { comments: newComments };
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const hasErrors = Object.values(this.props.answers).some(
      (answer: string) => !answer
    );
    this.setState({
      hasErrors,
    });
    if (!hasErrors) {
      const { sectionName, questions, answers, userDisplayName } = this.props;
      const { comments } = this.state;
      const result = questions.map((q) => ({
        ID: q.id,
        Section: sectionName,
        Question: q.Pytanie,
        Hint: q.Podpowiedź,
        Weight: q.Waga,
        Answer: answers[q.id] || "",
        CommentQA: {
          Person: comments[q.id] == null ? "" : userDisplayName,
          Comment: comments[q.id] || "",
        },
        CommentReview: "", // Możesz dostosować to, aby zawierało komentarze przeglądowe, jeśli potrzebne
      }));
      console.log("Saved JSON: ", JSON.stringify(result, null, 2));
      this.props.saveAnswers(answers, comments);
    }
  };

  renderQuestion = () => {
    const { questions } = this.props;
    console.log("Questions in DynamicSection:", questions);
    return questions.map((q, i) => (
      <div key={i}>
        <FormControl variant="standard" required>
          <div className={"text-xl justify-start"} id="demo-error-radios">
            {q.Pytanie}
          </div>
          <div className={"text-base justify-start"} id="demo-error-radios">
            {q.Podpowiedź}
          </div>
          <RadioGroup
            aria-labelledby="demo-error-radios"
            name="quiz"
            value={this.props.answers[q.id] || ""}
            onChange={(e) => this.handleChange(q.id, e.target.value)}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
            <FormControlLabel value="N/a" control={<Radio />} label="N/a" />
          </RadioGroup>
          <div className={"p-2 m-2"}>
            <TextField
              fullWidth
              id="outlined-multiline-flexible"
              label="Comment"
              multiline
              maxRows={4}
              value={this.state.comments[q.id] || ""}
              onChange={(e) => this.handleCommentChange(q.id, e.target.value)}
            />
          </div>
          <div className="border-b-2 border-sky-500" />
        </FormControl>
      </div>
    ));
  };

  public render(): React.ReactElement<DynamicSectionProps> {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderQuestion()}
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Check Answer
        </Button>
      </form>
    );
  }
}
