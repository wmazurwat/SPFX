import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import * as React from "react";
import styles from "./Spfx.module.scss";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
} from "@mui/material";
import QuestionView from "./QuestionView";
import { Answer } from "./types";
import { spfi, SPFx } from "@pnp/sp";

interface ISpfxPropsWithAnswer extends ISpfxProps {
  answers: Answer[];
  customerName: string;
  qualityReview: string;
  setActivePage: (page: number) => void;
  idReview: number; // Add idReview prop
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
  private spWeb;

  constructor(props: ISpfxPropsWithAnswer) {
    super(props);
    this.state = {
      tabIndex: 0,
      answers: {},
      commentsReview: {},
    };
    const sp = spfi().using(SPFx(this.props.context));
    this.spWeb = sp.web;
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

  handleBackClick = () => {
    this.props.setActivePage(0); // Navigate back to Lista
  };

  handleSaveComments = async () => {
    const { commentsReview } = this.state;
    const { userDisplayName, idReview } = this.props;

    try {
      const item = await this.spWeb.lists
        .getByTitle("Dane")
        .items.getById(idReview);
      const answerData = await item.select("Answer")();
      const answers = JSON.parse(answerData.Answer);
      // console.log("answers", answers);

      // Add comments to the correct answers
      for (const [id, comment] of Object.entries(commentsReview)) {
        if (comment) {
          const answer = answers.find((a: Answer) => a.ID.toString() === id);
          if (answer) {
            if (!Array.isArray(answer.CommentReview)) {
              answer.CommentReview = [];
            }
            answer.CommentReview.push({
              Person: userDisplayName,
              Comment: comment,
            });
          }
        }
      }

      await item.update({
        Answer: JSON.stringify(answers),
        Status: "Reviewed", // Update status to "Reviewed"
      });
    } catch (error) {
      console.error(`Error updating item ${idReview}:`, error);
    }

    this.props.setActivePage(0); // Navigate back to Lista
  };

  render() {
    const { hasTeamsContext, customerName, qualityReview } = this.props;
    const parsedAnswers = JSON.parse(this.props.answers as unknown as string);
    const { tabIndex, commentsReview } = this.state;
    // Filter out the section named "MI Data"
    const sections = [
      ...new Set(parsedAnswers.map((item: Answer) => item.Section)),
    ].filter((section) => section !== "MI Data");

    const filteredAnswers = parsedAnswers.filter(
      (answer: Answer) => answer.Section === sections[tabIndex]
    );

    return (
      <section
        className={`${styles.spfx} ${hasTeamsContext ? styles.teams : ""}`}
      >
        <div className="relative flex items-center justify-center p-5 m-2 text-4xl">
          <IconButton
            onClick={this.handleBackClick}
            className="absolute left-5"
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <div className="flex-grow text-center">QRM Feedback Form</div>
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
              <ListItemText primary={qualityReview} />
            </ListItem>
            <Divider variant="middle" component="li" textAlign="left">
              Quality
            </Divider>
          </List>
        </div>
        <Box sx={{ display: "flex", height: "100%" }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tabIndex}
            onChange={this.handleTabChange}
            aria-label="Vertical tabs"
            sx={{
              borderRight: 1,
              borderColor: "divider",
              minWidth: 330,
              width: 330,
            }}
          >
            {sections.map((section: string, index: number) => (
              <Tab
                key={index}
                label={section}
                sx={{ minWidth: 330, width: 330 }}
              />
            ))}
          </Tabs>
          <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
            {filteredAnswers.map((a: any) => (
              <QuestionView
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
