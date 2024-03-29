import * as React from "react";
import styles from "./Spfx.module.scss";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import { Button, TextField } from "@mui/material";
import { Input } from "@mui/base/Input";
import Stack from "@mui/material/Stack";

export default class Spfx extends React.Component<ISpfxProps, {}> {
  public render(): React.ReactElement<ISpfxProps> {
    const { hasTeamsContext } = this.props;

    return (
      <section
        className={`${styles.spfx} ${hasTeamsContext ? styles.teams : ""}`}
      >
        <div className={styles.welcome}>
          <div className={"p-200"}>
            <h2>Feedback Form</h2>
          </div>
        </div>
        <div>
          <div>
            Customer Name
            <TextField id="filled-basic" label="Filled" variant="outlined" />
          </div>
          <div>
            GCN
            <Input aria-label="Demo input" placeholder="Type something…" />
          </div>
          <div>
            Current DD Level
            <Input aria-label="Demo input" placeholder="Type something…" />
          </div>
          <div>
            QA review started
            <Input aria-label="Demo input" placeholder="Type something…" />
          </div>
          <div>
            QA review closed
            <Input aria-label="Demo input" placeholder="Type something…" />
          </div>
          <div>
            Review type
            <Input aria-label="Demo input" placeholder="Type something…" />
          </div>
          <div>
            Responsible Team
            <Input aria-label="Demo input" placeholder="Type something…" />
          </div>
          <div>
            Quality Checker
            <Input aria-label="Demo input" placeholder="Type something…" />
          </div>
          <div>
            Regulatory Analyst
            <Input aria-label="Demo input" placeholder="Type something…" />
          </div>
          <div>
            Amount of feedbacks
            <Input aria-label="Demo input" placeholder="Type something…" />
          </div>
          <div>
            Adjustments required?
            <Input aria-label="Demo input" placeholder="Type something…" />
          </div>
          <div>
            Quality:
            <Input aria-label="Demo input" placeholder="Type something…" />
          </div>
          <div>
            Challenge process?
            <Input aria-label="Demo input" placeholder="Type something…" />
          </div>
          <div className={styles.welcome}>
            <div>
              <Stack spacing={2} direction="row">
                <Button>Przejdź dalej</Button>
              </Stack>
            </div>
            <p>v1.02</p>
          </div>
        </div>
      </section>
    );
  }
}
