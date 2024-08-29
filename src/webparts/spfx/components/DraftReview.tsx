import * as React from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import QuestionReview from "./QuestionReview";
import { Answer } from "./types";
import { spfi, SPFx } from "@pnp/sp";
import styles from "./Spfx.module.scss";

interface IDraftReviewProps {
  answers: Answer[];
  customerName: string;
  qualityReview: string;
  setActivePage: (page: number) => void;
  idReview: number;
  userDisplayName: string;
  context: any;
}

interface DraftReviewState {
  tabIndex: number;
  answers: { [id: string]: string };
  commentsReview: { [id: string]: string };
}

export default class DraftReview extends React.Component<
  IDraftReviewProps,
  DraftReviewState
> {
  private spWeb;

  constructor(props: IDraftReviewProps) {
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
    this.props.setActivePage(0);
  };

  handleSaveComments = async (status: string) => {
    const { commentsReview } = this.state;
    const { userDisplayName, idReview } = this.props;

    try {
      const item = await this.spWeb.lists
        .getByTitle("Dane")
        .items.getById(idReview);
      const answerData = await item.select("Answer")();
      const answers = JSON.parse(answerData.Answer);

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
        Status: status,
      });
    } catch (error) {
      console.error(`Error updating item ${idReview}:`, error);
    }

    this.props.setActivePage(0);
  };

  render() {
    const { customerName, qualityReview, answers } = this.props;
    const { tabIndex, commentsReview } = this.state;
    const parsedAnswers = JSON.parse(answers as unknown as string);

    const sections = [
      ...new Set(parsedAnswers.map((item: Answer) => item.Section)),
    ].filter((section) => section !== "MI Data");

    const filteredAnswers = parsedAnswers.filter(
      (answer: Answer) => answer.Section === sections[tabIndex]
    );

    return (
      <section className={styles.spfx}>
        <div className="relative flex items-center justify-center p-5 m-2 text-4xl">
          <IconButton
            onClick={this.handleBackClick}
            className="absolute left-5"
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <div className="flex-grow text-center">QRM Draft Feedback Form</div>
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
              <QuestionReview
                key={a.ID.toString()}
                answer={a}
                commentsReview={commentsReview}
                onCommentChange={this.handleCommentChange}
              />
            ))}
          </Box>
        </Box>
        <div className={"flex justify-end mr-5"}>
          <Button
            variant="contained"
            onClick={() => this.handleSaveComments("Rework draft")}
          >
            Save Draft
          </Button>
          <Button
            variant="contained"
            onClick={() => this.handleSaveComments("In progress")}
          >
            Save Review
          </Button>
        </div>
      </section>
    );
  }
}
