import * as React from "react";
import styles from "./Spfx.module.scss";
import type { ISpfxProps } from "./ISpfxProps";
import { Button } from "@mui/material";
import { Input as BaseInput } from "@mui/base/Input";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";

const Input = React.forwardRef(function CustomInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return <BaseInput slots={{ input: InputElement }} {...props} ref={ref} />;
});

export default class Spfx extends React.Component<ISpfxProps, {}> {
  public render(): React.ReactElement<ISpfxProps> {
    const { hasTeamsContext } = this.props;

    return (
      <section
        className={`${styles.spfx} ${hasTeamsContext ? styles.teams : ""}`}
      >
        <div className={styles.welcome}>
          <div className={"m-80"}>
            <h2>Feedback Form</h2>
          </div>
        </div>
        <div>
          <div>
            Customer Name
            <Input aria-label="Demo input" placeholder="Type something…" />
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
            <p>v1.01</p>
          </div>
        </div>
      </section>
    );
  }
}

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};
const InputElement = styled("input")(
  ({ theme }) => `
  width: 160px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
