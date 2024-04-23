import * as React from "react";
import styles from "./Spfx.module.scss";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import UserInfo from "./UserInfo";
import Sekcja1 from "./Sekcja1";
import Sekcja2 from "./Sekcja2";

// import { Box } from "@mui/system";
// import { TabPanel } from "@mui/base";
// import {
//   Tab,
//   Tabs,
// } from "@mui/material";
// export default function VerticalTabs() {
//   const [value, setValue] = React.useState(0);
// const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//   setValue(newValue);
// };

export default class Ankieta extends React.Component<ISpfxProps, {}> {
  public render(): React.ReactElement<ISpfxProps> {
    const { hasTeamsContext } = this.props;
    return (
      <section
        className={`${styles.spfx} ${
          hasTeamsContext ? styles.teams : " shadow"
        }`}
      >
        <div className={"p-5 m-2 text-4xl flex justify-center "}>
          <div>Customer risk analysis - Questionnaire</div>
        </div>
        <UserInfo {...this.props} />
        {/* <div>
          <Box>
            <Tabs>
              <Tab label="Sekcja 1"></Tab>
              <Tab label="Sekcja 2"></Tab>
            </Tabs>
            <TabPanel value={value} >
               <Sekcja1 {...this.props} />
            </TabPanel>
            <TabPanel value={value} >
              <Sekcja2 {...this.props} />
            </TabPanel>
          </Box>
        </div> */}
        <div>
          <Sekcja1 {...this.props} />
          <Sekcja2 {...this.props} />
        </div>
      </section>
    );
  }
}
