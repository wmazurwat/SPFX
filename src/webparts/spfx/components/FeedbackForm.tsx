import * as React from "react";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import {
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import dayjs from "dayjs";

interface FeedbackFormProps extends ISpfxProps {
  customerName: string;
  setCustomerName: (name: string) => void;
  savedAnswers: { [x: number]: any };
  saveAnswers: (index: number, answers: any) => void;
  setFeedbackFormState: (state: any) => void;
}

type State = {
  qaReviewStarted: any;
  gcn: string;
  currentDdLevel: string;
  qaReviewClosed: string;
  reviewType: string;
  responsibleTeam: string;
  qualityChecker: string;
  regulatoryAnalyst: string;
  amountOfFeedbacks: string;
  adjustmentsRequired: string;
  challengeProcess: string;
};

export default class FeedbackForm extends React.Component<
  FeedbackFormProps,
  State
> {
  constructor(props: FeedbackFormProps) {
    super(props);
    this.state = {
      qaReviewStarted: dayjs().toDate(),
      gcn: "",
      currentDdLevel: "",
      qaReviewClosed: "",
      reviewType: "",
      responsibleTeam: "",
      qualityChecker: "",
      regulatoryAnalyst: "",
      amountOfFeedbacks: "",
      adjustmentsRequired: "",
      challengeProcess: "",
    };
  }

  componentDidUpdate(prevProps: FeedbackFormProps, prevState: State) {
    if (prevState !== this.state) {
      this.props.setFeedbackFormState(this.state);
    }
  }

  handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ [field]: event.target.value } as unknown as Pick<
        State,
        keyof State
      >);
      if (field === "customerName") {
        this.props.setCustomerName(event.target.value);
      }
    };

  handleDateChange = (newValue: Date | null) => {
    this.setState({ qaReviewStarted: newValue });
  };

  handleNext = () => {
    this.props.setActivePage!(2);
  };

  handleBack = () => {
    this.props.setActivePage!(0);
  };

  public render(): React.ReactElement<FeedbackFormProps> {
    const { hasTeamsContext } = this.props;
    return (
      <section className={`${hasTeamsContext ? "teams" : "shadow"} p-5`}>
        <div className={"p-5 m-2 text-4xl flex justify-center"}>
          <div>Customer risk analysis - General information</div>
        </div>

        <div className={"p-2 m-2 shadow grid grid-cols-2"}>
          <div className={"p-2 m-2 justify-start"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="customer-name"
              label="Customer Name"
              value={this.props.customerName}
              onChange={this.handleInputChange("customerName")}
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="gcn"
              label="GCN"
              value={this.state.gcn}
              onChange={this.handleInputChange("gcn")}
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <FormControl fullWidth>
              <InputLabel id="current-dd-level-label">
                Current DD Level
              </InputLabel>
              <Select
                labelId="current-dd-level-label"
                id="current-dd-level"
                label="Current DD Level"
                value={this.state.currentDdLevel}
                onChange={this.handleInputChange("currentDdLevel")}
              >
                <MenuItem value="SDD">SDD</MenuItem>
                <MenuItem value="CDD">CDD</MenuItem>
                <MenuItem value="EDD">EDD</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={"p-2 m-2 justify-center"}>
            {/* <DatePicker
              label="QA review started"
              value={qaReviewStarted}
              onChange={(newValue) => this.handleDateChange(newValue)}
            /> */}
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="qa-review-closed"
              label="QA review closed"
              value={this.state.qaReviewClosed}
              onChange={this.handleInputChange("qaReviewClosed")}
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <FormControl fullWidth>
              <InputLabel id="Review Type">Review Type</InputLabel>
              <Select
                labelId="Review Type"
                id="Review Type"
                label="Review Type"
                value={this.state.reviewType}
                onChange={this.handleInputChange("reviewType")}
              >
                <MenuItem value="Review">Review</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <FormControl fullWidth>
              <InputLabel id="Responsible Team">Responsible Team</InputLabel>
              <Select
                labelId="Responsible Team"
                id="Responsible Team"
                label="Responsible Team"
                value={this.state.responsibleTeam}
                onChange={this.handleInputChange("responsibleTeam")}
              >
                <MenuItem value="Remediation">Remediation</MenuItem>
                <MenuItem value="CB 1 Reviews">CB 1 Reviews</MenuItem>
                <MenuItem value="CB 2 Reviews">CB 2 Reviews</MenuItem>
                <MenuItem value="CB 3 Reviews">CB 3 Reviews</MenuItem>
                <MenuItem value="SF Reviews">SF Reviews</MenuItem>
                <MenuItem value="IB Reviews">IB Reviews</MenuItem>
                <MenuItem value="MidCorp Reviews">MidCorp Reviews</MenuItem>
                <MenuItem value="C&PC">C&PC</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="quality-checker"
              label="Quality Checker"
              value={this.state.qualityChecker}
              onChange={this.handleInputChange("qualityChecker")}
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="regulatory-analyst"
              label="Regulatory Analyst"
              value={this.state.regulatoryAnalyst}
              onChange={this.handleInputChange("regulatoryAnalyst")}
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="amount-of-feedbacks"
              label="Amount of feedbacks"
              value={this.state.amountOfFeedbacks}
              onChange={this.handleInputChange("amountOfFeedbacks")}
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="adjustments-required"
              label="Adjustments required?"
              value={this.state.adjustmentsRequired}
              onChange={this.handleInputChange("adjustmentsRequired")}
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="challenge-process"
              label="Challenge process?"
              value={this.state.challengeProcess}
              onChange={this.handleInputChange("challengeProcess")}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="contained" onClick={this.handleBack}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={this.handleNext}>
            Next
          </Button>
        </div>
      </section>
    );
  }
}
