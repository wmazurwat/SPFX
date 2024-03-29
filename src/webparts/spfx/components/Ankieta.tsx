import * as React from "react";
import styles from "./Spfx.module.scss";
import type { ISpfxProps } from "./ISpfxProps";
import { Button } from "@mui/material";
import { Tabs as BaseTabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import { Input as BaseInput } from "@mui/base/Input";
import { styled } from "@mui/system";

const Input = React.forwardRef(function CustomInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return <BaseInput slots={{ input: InputElement }} {...props} ref={ref} />;
});

export default class Ankieta extends React.Component<ISpfxProps, {}> {
  public render(): React.ReactElement<ISpfxProps> {
    const { hasTeamsContext } = this.props;

    return (
      <section
        className={`${styles.spfx} ${hasTeamsContext ? styles.teams : ""}`}
      >
        <div className={styles.welcome}>
          <div className={"m-80"}>
            <h2>Customer Name: Marcin Lesiak Quality: 21%</h2>
          </div>
          <Tabs defaultValue={0} orientation="vertical">
            <TabsList>
              <Tab>Sekcja 1</Tab>
              <Tab>Sekcja 2</Tab>
              <Tab>Sekcja 3</Tab>
              <Tab>Sekcja 4</Tab>
              <Tab>Sekcja 5</Tab>
              <Tab>Sekcja 6</Tab>
              <Tab>Sekcja 7</Tab>
              <Tab>Sekcja 8</Tab>
              <Tab>Sekcja 9</Tab>
            </TabsList>
            <TabPanel value={0}>
              <div>
                Pytanie nr 1
                <Input aria-label="Demo input" placeholder="Type something…" />
              </div>
              <div>
                Pytanie nr 2
                <Input aria-label="Demo input" placeholder="Type something…" />
              </div>
              <div>
                Pytanie nr 3
                <Input aria-label="Demo input" placeholder="Type something…" />
              </div>
              <div>
                Pytanie nr 4
                <Input aria-label="Demo input" placeholder="Type something…" />
              </div>
              <div>
                Pytanie nr 5
                <Input aria-label="Demo input" placeholder="Type something…" />
              </div>
              <div>
                Pytanie nr 6
                <Input aria-label="Demo input" placeholder="Type something…" />
              </div>
              <div>
                Pytanie nr 7
                <Input aria-label="Demo input" placeholder="Type something…" />
              </div>
              <div>
                Pytanie nr 8
                <Input aria-label="Demo input" placeholder="Type something…" />
              </div>
              <div>
                Pytanie nr 9
                <Input aria-label="Demo input" placeholder="Type something…" />
              </div>
            </TabPanel>
            <TabPanel value={1}>Second page</TabPanel>
            <TabPanel value={2}>Third page</TabPanel>
            <TabPanel value={3}>Third page</TabPanel>
            <TabPanel value={4}>Third page</TabPanel>
            <TabPanel value={5}>Third page</TabPanel>
          </Tabs>
          <div>
            <Button>Zapisz</Button>
          </div>
          <p>v1.01</p>
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

const Tab = styled(BaseTab)`
  font-family: "IBM Plex Sans", sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${buttonClasses.focusVisible} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${tabClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }
`;

const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
`;

const Tabs = styled(BaseTabs)`
  display: flex;
  gap: 16px;
  width: 200px;
`;

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  min-width: 80px;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  padding: 6px;
  gap: 12px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 8px ${
    theme.palette.mode === "dark" ? grey[900] : grey[200]
  };
  `
);
