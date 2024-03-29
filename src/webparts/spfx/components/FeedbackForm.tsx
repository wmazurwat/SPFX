import * as React from "react";
import styles from "./Spfx.module.scss";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import { TextField } from "@mui/material";

export default class FeedbackForm extends React.Component<ISpfxProps, {}> {
  public render(): React.ReactElement<ISpfxProps> {
    const { hasTeamsContext } = this.props;

    return (
      <section
        className={`${styles.spfx} ${hasTeamsContext ? styles.teams : ""}`}
      >
        <div className={"p-10 text-4xl flex justify-center"}>
          <div>Feedback Form</div>
        </div>

        <div>
          <div className={"p-2"}>
            <TextField
              id="filled-basic"
              label="Customer Name"
              variant="outlined"
            />
          </div>
          <div className={"p-2"}>
            <TextField id="filled-basic" label="GCN" variant="outlined" />
          </div>
          <div className={"p-2"}>
            <TextField
              id="filled-basic"
              label="Current DD Level"
              variant="outlined"
            />
          </div>
          <div className={"p-2"}>
            <TextField
              id="filled-basic"
              label="QA review started"
              variant="outlined"
            />
          </div>
          <div className={"p-2"}>
            <TextField
              id="filled-basic"
              label="QA review closed"
              variant="outlined"
            />
          </div>
          <div className={"p-2"}>
            <TextField
              id="filled-basic"
              label="Review type"
              variant="outlined"
            />
          </div>
          <div className={"p-2"}>
            <TextField
              id="filled-basic"
              label="Responsible Team"
              variant="outlined"
            />
          </div>
          <div className={"p-2"}>
            <TextField
              id="filled-basic"
              label="Quality Checker"
              variant="outlined"
            />
          </div>
          <div className={"p-2"}>
            <TextField
              id="filled-basic"
              label="Regulatory Analyst"
              variant="outlined"
            />
          </div>
          <div className={"p-2"}>
            <TextField
              id="filled-basic"
              label="Amount of feedbacks"
              variant="outlined"
            />
          </div>
          <div className={"p-2"}>
            <TextField
              id="filled-basic"
              label="Adjustments required?"
              variant="outlined"
            />
          </div>
          <div className={"p-2"}>
            <TextField id="filled-basic" label="Quality:" variant="outlined" />
          </div>
          <div className={"p-2"}>
            <TextField
              id="filled-basic"
              label="Challenge process?"
              variant="outlined"
            />
          </div>
        </div>
      </section>
    );
  }
}
