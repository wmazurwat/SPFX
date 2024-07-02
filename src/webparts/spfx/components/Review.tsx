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

interface ReviewState {
  tabIndex: number;
  answers: { [id: string]: string };
  commentsReview: { [id: string]: string };
}

export default class Review extends React.Component<
  ISpfxPropsWithAnswer,
  ReviewState
> {
  constructor(props: ISpfxPropsWithAnswer) {
    super(props);
    this.state = {
      tabIndex: 0,
      answers: {},
      commentsReview: {},
    };
  }

  handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    this.setState({ tabIndex: newValue });
  };

  handleCommentChange = (id: string, value: string) => {
    this.setState((prevState) => ({
      commentsReview: {
        ...prevState.commentsReview,
        [id]: value,
      },
    }));
  };

  render() {
    const { hasTeamsContext, customerName, quality } = this.props;
    const parsedAnswers = JSON.parse(this.props.answers as unknown as string);
    const { tabIndex, commentsReview } = this.state;

    const sections = [
      ...new Set(parsedAnswers.map((item: Answer) => item.Section)),
    ];

    const filteredAnswers = parsedAnswers.filter(
      (answer: Answer) => answer.Section === sections[tabIndex]
    );

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
            value={tabIndex}
            onChange={this.handleTabChange}
            aria-label="Vertical tabs"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            {sections.map((section: string, index: number) => (
              <Tab key={index} label={section} />
            ))}
          </Tabs>
          <Box sx={{ flexGrow: 1, p: 3 }}>
            {filteredAnswers.map((a: any) => (
              <Question
                key={a.ID.toString()}
                answer={a}
                commentsReview={commentsReview}
                onCommentChange={this.handleCommentChange}
              />
            ))}
          </Box>
        </Box>
      </section>
    );
  }
}
