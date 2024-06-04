import * as React from "react";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import {
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

type State = {
  qaReviewStarted: any;
};

export default class FeedbackForm extends React.Component<ISpfxProps, State> {
  constructor(props: ISpfxProps) {
    super(props);
    this.state = {
      qaReviewStarted: dayjs().toDate(), // Setting default value as today's date
    };
  }

  // handleDateChange = (newValue: Date | null) => {
  //   this.setState({ qaReviewStarted: newValue });
  // };

  public render(): React.ReactElement<ISpfxProps> {
    const { hasTeamsContext } = this.props;
    // const { qaReviewStarted } = this.state;

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
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField multiline maxRows={1} fullWidth id="gcn" label="GCN" />
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
              >
                <MenuItem value="SDD">SDD</MenuItem>
                <MenuItem value="CDD">CDD</MenuItem>
                <MenuItem value="EDD">EDD</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* <div className={"p-2 m-2 justify-center"}>
            <DatePicker
              label="QA review started"
              value={qaReviewStarted}
              onChange={(newValue) => this.handleDateChange(newValue)}
              renderInput={(params: any) => <TextField fullWidth {...params} />}
            />
          </div> */}
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="qa-review-closed"
              label="QA review closed"
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <FormControl fullWidth>
              <InputLabel id="Review Type">Review Type</InputLabel>
              <Select
                labelId="Review Type"
                id="Review Type"
                label="Review Type"
              >
                <MenuItem value="SDD">Review</MenuItem>
                {/* <MenuItem value="CDD">Onboarding</MenuItem> */}
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
              >
                <MenuItem value="SDD">Remediation</MenuItem>
                <MenuItem value="CDD">CB 1 Reviews</MenuItem>
                <MenuItem value="CDD">CB 2 Reviews</MenuItem>
                <MenuItem value="CDD">CB 3 Reviews</MenuItem>
                <MenuItem value="CDD">SF Reviews</MenuItem>
                <MenuItem value="CDD">IB Reviews</MenuItem>
                <MenuItem value="CDD">MidCorp Reviews</MenuItem>
                <MenuItem value="CDD">C&PC</MenuItem>
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
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="regulatory-analyst"
              label="Regulatory Analyst"
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="amount-of-feedbacks"
              label="Amount of feedbacks"
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="adjustments-required"
              label="Adjustments required?"
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="quality"
              label="Quality"
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="challenge-process"
              label="Challenge process?"
            />
          </div>
        </div>
      </section>
    );
  }
}
