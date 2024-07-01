import * as React from "react";
import styles from "./Spfx.module.scss";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
} from "@mui/material";
import Question from "./Question";
import { Answer } from "./types";

interface ISpfxPropsWithAnswer extends ISpfxProps {
  answers: Answer[];
  customerName: string;
  quality: string;
}

export default class Review extends React.Component<ISpfxPropsWithAnswer, {}> {
  render() {
    const { hasTeamsContext, answers, customerName, quality } = this.props;
    console.log(" panswers:0", JSON.parse(answers as unknown as string)[0]);
    const parsedAnswers = JSON.parse(answers as unknown as string);
    return (
      <section
        className={`${styles.spfx} ${hasTeamsContext ? styles.teams : ""}`}
      >
        <div className="p-5 m-2 text-4xl flex justify-center">
          <div>Customer risk analysis - Review</div>
        </div>
        <div className="p-5 m-2 justify-center">
          <List>
            <ListItem>
              <ListItemText primary={customerName} />
            </ListItem>
            <Divider variant="middle" component="li" textAlign="left">
              Customer Name
            </Divider>
            <ListItem>
              <ListItemText primary={quality} />
            </ListItem>
            <Divider variant="middle" component="li" textAlign="left">
              Quality
            </Divider>
          </List>
        </div>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            aria-label="Vertical tabs"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            {[
              ...new Set(parsedAnswers.map((item: Answer) => item.Section)),
            ].map((section: string, index: number) => (
              <Tab key={index} label={section} />
            ))}
          </Tabs>
          <Box sx={{ flexGrow: 1, p: 3 }}>
            {parsedAnswers.map((a: any) => (
              <Question key={a.ID} answer={a} />
            ))}
          </Box>
        </Box>
      </section>
    );
  }
}
