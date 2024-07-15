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
  SelectChangeEvent,
} from "@mui/material";

interface FeedbackFormProps extends ISpfxProps {
  hasTeamsContext: boolean;
  customerName: string;
  setCustomerName: (name: string) => void;
  feedbackFormState: {
    currentDdLevel: string;
    customerNumber: string;
    reviewType: string;
    responsibleTeam: string;
    qualityChecker: string;
    regulatoryAnalyst: string;
  };
  setFeedbackFormState: (state: any) => void;
  setActivePage: (page: number) => void;
}

export default class FeedbackForm extends React.Component<FeedbackFormProps> {
  handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      this.props.setFeedbackFormState({
        ...this.props.feedbackFormState,
        [field]: value,
      });
      if (field === "customerName") {
        this.props.setCustomerName(value);
      }
    };

  handleSelectChange =
    (field: string) => (event: SelectChangeEvent<string>) => {
      const value = event.target.value;
      this.props.setFeedbackFormState({
        ...this.props.feedbackFormState,
        [field]: value,
      });
    };

  handleNext = () => {
    this.props.setActivePage(2);
  };

  handleBack = () => {
    this.props.setActivePage(0);
  };

  public render(): React.ReactElement<FeedbackFormProps> {
    const { hasTeamsContext, feedbackFormState } = this.props;
    return (
      <section className={`${hasTeamsContext ? "teams" : "shadow"} p-5`}>
        <div className="relative flex items-center justify-center p-5 m-2 text-4xl">
          <IconButton onClick={this.handleBack} className="absolute left-5">
            <ArrowBackIosNewIcon />
          </IconButton>
          <div className="flex-grow text-center">QRM Feedback Form</div>
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
          <div className={"p-2 m-2 justify-start"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="customer-number"
              label="Customer Number"
              value={feedbackFormState.customerNumber}
              onChange={this.handleInputChange("customerNumber")}
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
                value={feedbackFormState.currentDdLevel}
                onChange={this.handleSelectChange("currentDdLevel")}
              >
                <MenuItem value="SDD">SDD</MenuItem>
                <MenuItem value="CDD">CDD</MenuItem>
                <MenuItem value="EDD">EDD</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <FormControl fullWidth>
              <InputLabel id="Proces Type">Proces Type</InputLabel>
              <Select
                labelId="Proces Type"
                id="Proces Type"
                label="Proces Type"
                value={feedbackFormState.reviewType}
                onChange={this.handleSelectChange("reviewType")}
              >
                <MenuItem value="Review">Review</MenuItem>
                <MenuItem value="Onboarding">Onboarding</MenuItem>
              </Select>
            </FormControl>
          </div>
          {feedbackFormState.reviewType === "Review" ? (
            <div className={"p-2 m-2 justify-center"}>
              <FormControl fullWidth>
                <InputLabel id="Responsible Team">Responsible Team</InputLabel>
                <Select
                  labelId="Responsible Team"
                  id="Responsible Team"
                  label="Responsible Team"
                  value={feedbackFormState.responsibleTeam}
                  onChange={this.handleSelectChange("responsibleTeam")}
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
          {feedbackFormState.reviewType === "Onboarding" ? (
            <div className={"p-2 m-2 justify-center"}>
              <FormControl fullWidth>
                <InputLabel id="Responsible Team">Responsible Team</InputLabel>
                <Select
                  labelId="Responsible Team"
                  id="Responsible Team"
                  label="Responsible Team"
                  value={feedbackFormState.responsibleTeam}
                  onChange={this.handleSelectChange("responsibleTeam")}
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
              value={feedbackFormState.qualityChecker}
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
              value={feedbackFormState.regulatoryAnalyst}
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
