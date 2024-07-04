import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import * as React from "react";
import { IconButton, Box, Tabs, Tab, Button } from "@mui/material";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import styles from "./Spfx.module.scss";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import {
  getColumnList,
  addSingleLineTextColumnToSharePoint,
  getQAData,
} from "./ColumnUtils";
import DynamicSection from "./DynamicSection";
import Header from "./Header";

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
  existingColumns: string[];
  sections: { [key: string]: any[] };
  totalWeight: number;
  comments: { [key: number]: { [key: string]: string } };
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
      existingColumns: [],
      sections: {},
      totalWeight: 0,
      comments: {},
    };

    const sp = spfi().using(SPFx(this.props.context));
    this.spWeb = sp.web;
  }

  async componentDidMount() {
    try {
      const existingColumns = await getColumnList(this.spWeb);
      const sections = await getQAData(this.spWeb);
      if (existingColumns && sections) {
        this.setState({ existingColumns, sections });
        this.props.setSections(sections);
      } else {
        console.error("Failed to fetch existing columns or sections");
      }
    } catch (error) {
      console.error("Error fetching items or columns:", error);
    }
  }

  handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    this.setState({ tabIndex: newValue });
  };

  updateTotalWeight = (weight: number) => {
    this.setState({ totalWeight: weight });
    if (this.props.setQuality) {
      this.props.setQuality();
    }
  };

  saveAnswersToSharePoint = async () => {
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
      // console.log("savedAnswers", savedAnswers);
      const { sections } = this.state;
      const answersList = Object.assign({}, ...Object.values(savedAnswers)); //tutaj
      // console.log(answersList);
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
      // console.log("allAnswers", allAnswers);
      const item = {
        ...feedbackFormColumns,
        Answer: JSON.stringify(allAnswers),
      };

      await this.spWeb.lists.getByTitle("Dane").items.add(item);

      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error adding item to SharePoint list", error);
      alert("Failed to save data!");
    }
    this.props.setActivePage(0); // Navigate to List page
  };

  handleAddSingleLineColumn = async (columnName: string) => {
    await addSingleLineTextColumnToSharePoint(
      this.spWeb,
      columnName,
      this.state.existingColumns
    );
  };

  handleNext = () => {
    const { tabIndex, sections } = this.state;
    if (tabIndex < Object.keys(sections).length - 1) {
      this.setState({ tabIndex: tabIndex + 1 });
    }
  };

  handleBack = () => {
    const { tabIndex } = this.state;
    if (tabIndex > 0) {
      this.setState({ tabIndex: tabIndex - 1 });
    }
  };

  handleNavigateToFeedbackForm = () => {
    this.props.setActivePage(1); // Navigate to FeedbackForm page
  };

  saveAnswers = (
    index: number,
    answers: SectionAnswers,
    comments: { [key: string]: string }
  ) => {
    const updatedComments = { ...this.state.comments, [index]: comments };
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
        updateTotalWeight={this.updateTotalWeight}
        totalWeight={totalWeight}
      />
    );
  };

  public render(): React.ReactElement<ISpfxProps> {
    const { hasTeamsContext } = this.props;
    const { tabIndex } = this.state;

    return (
      <section
        className={`${styles.spfx} ${
          hasTeamsContext ? styles.teams : "shadow"
        }`}
      >
        <div className="relative flex items-center justify-center p-5 m-2 text-4xl">
          <IconButton
            onClick={this.handleNavigateToFeedbackForm}
            className="absolute left-5"
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <div className="flex-grow text-center">
            Customer risk analysis - Questionnaire
          </div>
        </div>
        <Header
          customerName={this.props.customerName}
          quality={this.props.quality}
        />
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
        <Button
          className={"flex justify-end mr-10"}
          onClick={this.saveAnswersToSharePoint}
        >
          Save Answers
        </Button>
      </section>
    );
  }
}
