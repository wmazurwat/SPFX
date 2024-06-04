import * as React from "react";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  // FormHelperText,
  Radio,
  Button,
  TextField,
  // FormLabel,
} from "@mui/material";
import { SectionAnswers } from "./Ankieta";

type DynamicSectionProps = {
  sectionName: string;
  saveAnswers: (answers: SectionAnswers) => void;
  questions: Array<{ Pytanie: string; Podpowiedź: string; id: string }>;
  answers: { [key: string]: string };
} & ISpfxProps;

type DynamicSectionState = {
  hasErrors: boolean;
};

export default class DynamicSection extends React.Component<
  DynamicSectionProps,
  DynamicSectionState
> {
  constructor(props: DynamicSectionProps) {
    super(props);
    this.state = {
      hasErrors: false,
    };
  }

  static defaultProps = {
    answers: {},
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
      this.props.saveAnswers(this.props.answers);
    }
  };

  renderQuestion = () => {
    const { questions } = this.props;
    console.log("Questions in DynamicSection:", questions); // Dodaj ten wiersz
    return questions.map((q, i) => (
      <div key={i}>
        <FormControl variant="standard" required>
          <div className={"  text-xl justify-start"} id="demo-error-radios">
            {q.Pytanie}
          </div>
          <div className={"  text-base justify-start"} id="demo-error-radios">
            {q.Podpowiedź}
          </div>
          <RadioGroup
            aria-labelledby="demo-error-radios"
            name="quiz"
            value={this.props.answers[q.id]}
            onChange={(e) => {
              const newAnswers = {
                ...this.props.answers,
                [q.id]: e.target.value,
              };
              this.props.saveAnswers(newAnswers);
            }}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
            <FormControlLabel value="N/a" control={<Radio />} label="N/a" />
          </RadioGroup>
          <div className={"p-2 m-2"}>
            <TextField
              fullWidth
              id="outlined-multiline-flexible"
              label="Komentarz"
              multiline
              maxRows={4}
            />
          </div>
          {/* {this.props.error && (
            <FormHelperText>Odpowiedz na pytanie</FormHelperText>
          )} */}
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
