import * as React from "react";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import styles from "./Spfx.module.scss";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import UserInfo from "./UserInfo";
import { Tabs, Tab, Box, TextField, Button } from "@mui/material";
import {
  getColumnList,
  addSingleLineTextColumnToSharePoint,
  getQAData,
} from "./ColumnUtils";
import DynamicSection from "./DynamicSection";

interface AnkietaProps extends ISpfxProps {
  customerName: string;
  savedAnswers: { [x: number]: SectionAnswers };
  saveAnswers: (index: number, answers: SectionAnswers) => void;
  feedbackFormState: any; // New prop
}

export interface SectionAnswers {
  [key: string]: string;
}

export default class Ankieta extends React.Component<
  AnkietaProps,
  {
    tabIndex: number;
    existingColumns: string[];
    sections: any;
  }
> {
  private spWeb;

  constructor(props: AnkietaProps) {
    super(props);
    this.state = {
      tabIndex: 0,
      existingColumns: [],
      sections: {},
    };

    const sp = spfi().using(SPFx(this.props.context));
    this.spWeb = sp.web;
  }

  async componentDidMount() {
    try {
      const items = await this.spWeb.lists.getByTitle("Dane").items.getPaged();
      console.log("Items from 'Dane':", items);

      const existingColumns = await getColumnList(this.spWeb);
      console.log("Existing columns:", existingColumns);

      const sections = await getQAData(this.spWeb);
      console.log("Sections from QA:", sections);

      this.setState({ existingColumns, sections });
    } catch (error) {
      console.error("Error fetching items or columns:", error);
    }
  }

  handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    this.setState({ tabIndex: newValue });
  };

  saveAnswersToSharePoint = async () => {
    try {
      const { savedAnswers, feedbackFormState, customerName } = this.props;
      let { existingColumns } = this.state;

      // Fetch the latest column list to avoid duplicates
      existingColumns = await getColumnList(this.spWeb);

      // Check and add columns if they do not exist
      for (const answers of Object.values(savedAnswers)) {
        for (const questionId of Object.keys(answers)) {
          const columnName = `Answer${questionId}`;
          if (!existingColumns.includes(columnName)) {
            await this.handleAddSingleLineColumn(columnName);
            existingColumns.push(columnName); // Update the local list of existing columns
          }
        }
      }

      // Prepare feedbackFormState to be saved in SharePoint
      const feedbackFormColumns = {
        // qaReviewStarted: feedbackFormState.qaReviewStarted,
        GCN: feedbackFormState.gcn,
        CurrentDDLevel: feedbackFormState.currentDdLevel,
        // qaReviewClosed: feedbackFormState.qaReviewClosed,
        Reviewtype: feedbackFormState.reviewType,
        ResponsibleTeam: feedbackFormState.responsibleTeam,
        QualityChecker: feedbackFormState.qualityChecker,
        RegulatoryAnalyst: feedbackFormState.regulatoryAnalyst,
        Amountoffeedbacks: feedbackFormState.amountOfFeedbacks,
        Adjustmentsrequired: feedbackFormState.adjustmentsRequired,
        // challengeProcess: feedbackFormState.challengeProcess,
        CustomerName: customerName,
      };

      // Save answers to the SharePoint list
      for (const [sectionIndex, answers] of Object.entries(savedAnswers)) {
        const item: { [key: string]: string } = {
          Title: `Section ${sectionIndex}`, //nazwa Title Tytuł
          ...feedbackFormColumns, // Add feedback form state to the item
        };

        for (const [questionId, answer] of Object.entries(answers)) {
          item[`Answer${questionId}`] = answer;
        }

        await this.spWeb.lists.getByTitle("Dane").items.add(item);
      }

      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error adding item to SharePoint list", error);
      alert("Failed to save data!");
    }
  };

  handleAddSingleLineColumn = async (columnName: string) => {
    await addSingleLineTextColumnToSharePoint(
      this.spWeb,
      columnName,
      this.state.existingColumns
    );
  };

  renderSection = () => {
    const { sections, tabIndex } = this.state;
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
      userEmail,
      context,
    } = this.props;
    console.log("Rendering sections with data:", sections);
    console.log("savedAnswers:", this.props.savedAnswers);
    const sectionName = Object.keys(sections)[tabIndex];
    console.log(
      "sectionName",
      sections,
      Object.keys(sections),
      tabIndex,
      sectionName
    );
    return (
      <DynamicSection
        saveAnswers={(answers: SectionAnswers) =>
          this.props.saveAnswers(tabIndex, answers)
        }
        answers={this.props.savedAnswers[tabIndex]}
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
        <div className={"p-5 m-2 text-4xl flex justify-center "}>
          <div>Customer risk analysis - Questionnaire</div>
        </div>
        <UserInfo {...this.props} />
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
          <Box sx={{ flexGrow: 1, p: 3 }}>
            <div className={"p-2 m-2"}>
              <TextField
                fullWidth
                id={Object.keys(this.state.sections)[this.state.tabIndex]}
                label={Object.keys(this.state.sections)[this.state.tabIndex]}
                multiline
                maxRows={4}
              />
            </div>
            {this.renderSection()}
          </Box>
        </Box>
        <Button className={"p-10 m-2"} onClick={this.saveAnswersToSharePoint}>
          Save Answers
        </Button>
      </section>
    );
  }
}
