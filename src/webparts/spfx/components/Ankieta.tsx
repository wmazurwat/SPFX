import * as React from "react";
import {
  IconButton,
  Box,
  Tabs,
  Tab,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import styles from "./Spfx.module.scss";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import { getQAData } from "./ColumnUtils";
import DynamicSection from "./DynamicSection";

interface AnkietaProps extends ISpfxProps {
  customerName: string;
  savedAnswers: { [x: number]: SectionAnswers };
  saveAnswers: (
    index: number,
    answers: SectionAnswers,
    comments: { [key: string]: string }
  ) => void;
  feedbackFormState: any;
  setActivePage: (page: number) => void;
  setQuality: () => void;
  setSections: (sections: string) => void;
  userDisplayName: string;
}

export interface SectionAnswers {
  [key: string]: string;
}

interface AnkietaState {
  tabIndex: number;
  sections: { [key: string]: any[] };
  totalWeight: number;
  comments: { [key: number]: { [key: string]: string } };
  hasValidationErrors: boolean;
}

export default class Ankieta extends React.Component<
  AnkietaProps,
  AnkietaState
> {
  private spWeb: any;

  constructor(props: AnkietaProps) {
    super(props);
    this.state = {
      tabIndex: 0,
      sections: {},
      totalWeight: 0,
      comments: {},
      hasValidationErrors: false,
    };

    const sp = spfi().using(SPFx(this.props.context));
    this.spWeb = sp.web;
  }

  async componentDidMount() {
    try {
      const sections = await getQAData(this.spWeb);
      this.props.setSections(sections);
      this.setState({ sections });
    } catch (error) {
      console.error("Error fetching items or columns:", error);
    }
  }

  handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    this.setState({ tabIndex: newValue }, this.scrollToTop);
  };

  saveAnswersToSharePoint = async () => {
    if (this.state.hasValidationErrors) {
      alert("Please correct validation errors before saving.");
      return;
    }
    try {
      const {
        savedAnswers,
        feedbackFormState,
        customerName,
        quality,
        userDisplayName,
      } = this.props;
      const { comments } = this.state;
      const status = "Review";
      const { sections } = this.state;
      const answersList = Object.assign({}, ...Object.values(savedAnswers));
      let cumulativeIndex = 0;

      const list = Object.keys(sections).flatMap((key) => {
        const itemsWithIndex = sections[key].map((item) => ({
          ...item,
          section: key,
          index: cumulativeIndex,
        }));
        cumulativeIndex++;
        return itemsWithIndex;
      });
      const allAnswers = list.map((q) => ({
        ID: q.id,
        Section: q.section,
        Question: q.Pytanie,
        Hint: q.Podpowiedź,
        Weight: q.Waga,
        Answer: answersList[q.id] || "",
        CommentQA: {
          Person: comments[q.index]?.[q.id] == null ? "" : userDisplayName,
          Comment: comments[q.index]?.[q.id] || "",
        },
        CommentReview: {
          Person: "",
          Comment: "",
        },
      }));
      const feedbackFormColumns = {
        GCN: feedbackFormState.gcn,
        CurrentDDLevel: feedbackFormState.currentDdLevel,
        Reviewtype: feedbackFormState.reviewType,
        ResponsibleTeam: feedbackFormState.responsibleTeam,
        QualityChecker: feedbackFormState.qualityChecker,
        RegulatoryAnalyst: feedbackFormState.regulatoryAnalyst,
        Amountoffeedbacks: feedbackFormState.amountOfFeedbacks,
        Adjustmentsrequired: feedbackFormState.adjustmentsRequired,
        Challengeprocess: feedbackFormState.challengeProcess,
        CustomerName: customerName,
        Quality: quality,
        Status: status,
      };
      const item = {
        ...feedbackFormColumns,
        Answer: JSON.stringify(allAnswers),
      };

      await this.spWeb.lists.getByTitle("Dane").items.add(item);
      this.scrollToTop();
    } catch (error) {
      console.error("Error adding item to SharePoint list", error);
      alert("Failed to save data!");
    }
    this.props.setActivePage(0);
    this.resetState();
    this.props.saveAnswers(0, {}, {});
  };

  handleNext = () => {
    const { tabIndex, sections } = this.state;
    if (tabIndex < Object.keys(sections).length - 1) {
      this.setState({ tabIndex: tabIndex + 1 }, this.scrollToTop);
    }
  };

  handleBack = () => {
    const { tabIndex } = this.state;
    if (tabIndex > 0) {
      this.setState({ tabIndex: tabIndex - 1 }, this.scrollToTop);
    }
  };

  scrollToTop = () => {
    document.querySelector("section")?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    console.log("test");
  };

  handleNavigateToFeedbackForm = () => {
    this.props.setActivePage(1);
  };

  resetState = () => {
    this.setState({
      tabIndex: 0,
      sections: {},
      totalWeight: 0,
      comments: {},
      hasValidationErrors: false,
    });
  };

  saveAnswers = (
    index: number,
    answers: SectionAnswers,
    comments: { [key: string]: string }
  ) => {
    const updatedComments = { ...this.state.comments, [index]: comments };
    const hasErrors = Object.keys(answers).some(
      (key) =>
        answers[key] === "No" && (!comments[key] || comments[key].trim() === "")
    );
    this.setState({ hasValidationErrors: hasErrors });
    this.props.saveAnswers(index, answers, comments);
    this.props.setQuality();
    this.setState({ comments: updatedComments });
  };

  renderSection = () => {
    const { sections, tabIndex, totalWeight, comments } = this.state;
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
      userEmail,
      context,
      quality,
      savedAnswers,
      qualityReview,
    } = this.props;
    const sectionName = Object.keys(sections)[tabIndex];
    return (
      <DynamicSection
        saveAnswers={(
          answers: SectionAnswers,
          comments: { [key: string]: string }
        ) => {
          this.saveAnswers(tabIndex, answers, comments);
        }}
        answers={savedAnswers[tabIndex]}
        comments={comments[tabIndex] || {}}
        key={tabIndex}
        sectionName={sectionName}
        questions={sections[sectionName] || []}
        description={description}
        isDarkTheme={isDarkTheme}
        environmentMessage={environmentMessage}
        hasTeamsContext={hasTeamsContext}
        userDisplayName={userDisplayName}
        userEmail={userEmail}
        context={context}
        quality={quality}
        totalWeight={totalWeight}
        qualityReview={qualityReview}
      />
    );
  };

  public render(): React.ReactElement<ISpfxProps> {
    const { hasTeamsContext } = this.props;
    const { tabIndex, hasValidationErrors } = this.state;

    return (
      <section
        className={`relative flex flex-col overflow-y-auto h-full ${
          styles.spfx
        } ${hasTeamsContext ? styles.teams : "shadow"}`}
      >
        <div className="relative flex items-center justify-center p-5 m-2 text-4xl">
          <IconButton
            onClick={this.handleNavigateToFeedbackForm}
            className="absolute left-5"
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <div className="flex-grow text-center">QRM Feedback Form</div>
        </div>
        <div className="p-5 m-2 justify-center">
          <List>
            <ListItem>
              <ListItemText primary={this.props.customerName} />
            </ListItem>
            <Divider variant="middle" component="li" textAlign="left">
              Customer Name
            </Divider>
            <ListItem>
              <ListItemText primary={this.props.quality} />
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
            {Object.keys(this.state.sections).map((section, index) => (
              <Tab key={index} label={section} />
            ))}
          </Tabs>
          <Box sx={{ flexGrow: 1, p: 3 }}>{this.renderSection()}</Box>
        </Box>
        <div className="flex justify-between p-10">
          <Button
            variant="contained"
            onClick={this.handleBack}
            disabled={tabIndex === 0}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={this.handleNext}
            disabled={tabIndex === Object.keys(this.state.sections).length - 1}
          >
            Next
          </Button>
        </div>
        <div className={"flex justify-end mr-5"}>
          <Button
            variant="contained"
            onClick={this.saveAnswersToSharePoint}
            disabled={hasValidationErrors}
          >
            Save Answers
          </Button>
        </div>
      </section>
    );
  }
}
