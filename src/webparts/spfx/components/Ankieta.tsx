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
import { Tabs, Tab, Box, TextField } from "@mui/material";
import {
  getColumnList,
  addMultiLineTextColumnToSharePoint,
  addSingleLineTextColumnToSharePoint,
  getQAData,
} from "./ColumnUtils";
import DynamicSection from "./DynamicSection";

interface AnkietaProps extends ISpfxProps {
  customerName: string;
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

  saveDataToSharePoint = async (title: string, lastName: string) => {
    try {
      const result = await this.spWeb.lists.getByTitle("Dane").items.add({
        Title: title,
        LastName: lastName,
      });
      console.log("Item created:", result);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error adding item to SharePoint list", error);
      alert("Failed to save data!");
    }
  };

  handleAddMultiLineColumn = async (columnName: string) => {
    await addMultiLineTextColumnToSharePoint(
      this.spWeb,
      columnName,
      this.state.existingColumns
    );
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
    console.log("Rendering sections with data:", sections); // Dodaj ten wiersz
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
          {/* <Button
            onClick={() =>
              this.saveDataToSharePoint("Sample Title", "Sample LastName")
            }
          >
            Save Data
          </Button>
          <Button onClick={() => this.handleAddMultiLineColumn("Wiele")}>
            Dodaj kolumnę z wieloma wierszami tekstu
          </Button>
          <Button onClick={() => this.handleAddSingleLineColumn("Jedna")}>
            Dodaj jedną kolumnę tekstową
          </Button> */}
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
                // id={section}
                label="Komentarz sekcji"
                multiline
                maxRows={4}
              />
            </div>
            {this.renderSection()}
          </Box>
        </Box>
      </section>
    );
  }
}
