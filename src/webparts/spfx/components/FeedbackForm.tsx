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
        <div className={"p-5 m-2 text-4xl flex justify-center"}>
          <div>Customer risk analysis - General information</div>
        </div>

        <div className={"p-2 m-2 shadow grid grid-cols-2"}>
          <div className={"p-2 m-2 justify-start"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="filled-basic"
              label="Customer Name"
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="filled-basic"
              label="GCN"
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="filled-basic"
              label="Current DD Level"
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="filled-basic"
              label="QA review started"
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="filled-basic"
              label="QA review closed"
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="filled-basic"
              label="Review type"
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="filled-basic"
              label="Responsible Team"
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="filled-basic"
              label="Quality Checker"
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="filled-basic"
              label="Regulatory Analyst"
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="filled-basic"
              label="Amount of feedbacks"
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="filled-basic"
              label="Adjustments required?"
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="filled-basic"
              label="Quality:"
            />
          </div>
          <div className={"p-2 m-2 justify-center"}>
            <TextField
              multiline
              maxRows={1}
              fullWidth
              id="filled-basic"
              label="Challenge process?"
            />
          </div>
        </div>
      </section>
    );
  }
}
