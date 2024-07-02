import * as React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import {
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Button,
  IconButton,
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
  currentDdLevel: string;
  qaReviewClosed: string;
  reviewType: string;
  responsibleTeam: string;
  qualityChecker: string;
  regulatoryAnalyst: string;
};

export default class FeedbackForm extends React.Component<
  FeedbackFormProps,
  State
> {
  constructor(props: FeedbackFormProps) {
    super(props);
    this.state = {
      qaReviewStarted: dayjs().toDate(),
      currentDdLevel: "",
      qaReviewClosed: "",
      reviewType: "",
      responsibleTeam: "",
      qualityChecker: "",
      regulatoryAnalyst: "",
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
        <div className="relative flex items-center justify-center p-5 m-2 text-4xl">
          <IconButton onClick={this.handleBack} className="absolute left-5">
            <ArrowBackIosNewIcon />
          </IconButton>
          <div className="flex-grow text-center">QRM Feedbak Form - Review</div>
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
                <MenuItem value="Onboarding">Onboarding</MenuItem>
              </Select>
            </FormControl>
          </div>
          {this.state.reviewType === "Review" ? (
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
          ) : null}
          {this.state.reviewType === "Onboarding" ? (
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
                  <MenuItem value="Norway">Norway</MenuItem>
                  <MenuItem value="Denmark">Denmark</MenuItem>
                  <MenuItem value="Finland">Finland</MenuItem>
                  <MenuItem value="SF Onboardings">SF Onboardings</MenuItem>
                  <MenuItem value="IB Onboardings">IB Onboardings</MenuItem>
                  <MenuItem value="MidCorp Onboardings">
                    MidCorp Onboardings
                  </MenuItem>
                  <MenuItem value="LC Onboardings">LC Onboardings</MenuItem>
                  <MenuItem value="C&PC">C&PC</MenuItem>
                </Select>
              </FormControl>
            </div>
          ) : null}
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
        </div>
        <div className="flex justify-end mr-10">
          <Button variant="contained" color="primary" onClick={this.handleNext}>
            Next
          </Button>
        </div>
      </section>
    );
  }
}
