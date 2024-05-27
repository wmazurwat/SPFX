import * as React from "react";
import { Button, TextField } from "@mui/material";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";

type DynamicSectionProps = {
  sectionName: string;
  questions: Array<{ Pytanie: string; Podpowiedź: string }>;
} & ISpfxProps;

type DynamicSectionState = {
  answers: { [key: string]: string };
  hasErrors: boolean;
};

export default class DynamicSection extends React.Component<
  DynamicSectionProps,
  DynamicSectionState
> {
  constructor(props: DynamicSectionProps) {
    super(props);
    this.state = {
      answers: {},
      hasErrors: false,
    };
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.setState({
      hasErrors: Object.values(this.state.answers).some(
        (answer: string) => !answer
      ),
    });
  };

  renderQuestions = () => {
    const { questions } = this.props;
    console.log("Questions in DynamicSection:", questions); // Dodaj ten wiersz
    return questions.map((q, i) => (
      <div key={i}>
        <TextField
          label={q.Pytanie + (q.Podpowiedź ? ` (${q.Podpowiedź})` : "")}
          value={this.state.answers[q.Pytanie + q.Podpowiedź] || ""}
          onChange={(e) =>
            this.setState((state) => ({
              answers: {
                ...state.answers,
                [q.Pytanie + q.Podpowiedź]: e.target.value,
              },
            }))
          }
          error={
            this.state.hasErrors &&
            !this.state.answers[q.Pytanie + q.Podpowiedź]
          }
          helperText={
            this.state.hasErrors &&
            !this.state.answers[q.Pytanie + q.Podpowiedź]
              ? "This field is required"
              : ""
          }
        />
      </div>
    ));
  };

  public render(): React.ReactElement<DynamicSectionProps> {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>{this.props.sectionName}</h2>
        {this.renderQuestions()}
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Check Answer
        </Button>
      </form>
    );
  }
}
