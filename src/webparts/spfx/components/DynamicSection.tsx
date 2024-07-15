import * as React from "react";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
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
  comments: { [key: string]: string };
  qualityReview: string;
  totalWeight: number;
} & ISpfxProps;

type DynamicSectionState = {
  hasErrors: { [key: string]: boolean };
  comments: { [key: string]: string };
};

export default class DynamicSection extends React.Component<
  DynamicSectionProps,
  DynamicSectionState
> {
  constructor(props: DynamicSectionProps) {
    super(props);
    this.state = {
      hasErrors: {},
      comments: props.comments || {},
    };
  }

  static defaultProps = {
    answers: {},
  };

  handleChange = (id: string, value: string) => {
    const newAnswers = {
      ...this.props.answers,
      [id]: value,
    };

    const newErrors = {
      ...this.state.hasErrors,
      [id]:
        value === "No" &&
        (!this.state.comments[id] || this.state.comments[id].trim() === ""),
    };

    this.setState({ hasErrors: newErrors });
    this.props.saveAnswers(newAnswers, this.state.comments);
  };

  handleCommentChange = (id: string, value: string) => {
    const newComments = {
      ...this.state.comments,
      [id]: value,
    };

    const newErrors = {
      ...this.state.hasErrors,
      [id]: this.props.answers[id] === "No" && (!value || value.trim() === ""),
    };

    this.setState({ comments: newComments, hasErrors: newErrors });
    this.props.saveAnswers(this.props.answers, newComments);
  };

  renderQuestion = () => {
    const { questions } = this.props;
    return questions.map((q, i) => (
      <div key={i} className="w-full">
        <FormControl
          variant="standard"
          required
          className="w-full"
          error={this.state.hasErrors[q.id]}
        >
          <div className={"text-xl justify-start"} id="demo-error-radios">
            {q.Pytanie}
            {q.Waga < 0.5 ? (
              <span></span>
            ) : q.Waga === 0.5 ? (
              <span> *</span>
            ) : q.Waga === 1 ? (
              <span> **</span>
            ) : (
              <span> ***</span>
            )}
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
              error={this.state.hasErrors[q.id]}
              helperText={
                this.state.hasErrors[q.id]
                  ? "Comment is required if answer is No"
                  : ""
              }
            />
          </div>
          <div className="border-b-2 border-sky-500" />
        </FormControl>
      </div>
    ));
  };

  public render(): React.ReactElement<DynamicSectionProps> {
    return <form>{this.renderQuestion()}</form>;
  }
}
