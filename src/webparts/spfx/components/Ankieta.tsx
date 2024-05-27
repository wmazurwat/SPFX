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
import Sekcja1 from "./Sekcja1";
import Sekcja2 from "./Sekcja2";
import { Button, Tabs, Tab, Box } from "@mui/material";
import {
  addMultiLineTextColumnToSharePoint,
  addSingleLineTextColumnToSharePoint,
} from "./ColumnUtils";

export default class Ankieta extends React.Component<
  ISpfxProps,
  { tabIndex: number }
> {
  private spWeb;

  constructor(props: ISpfxProps) {
    super(props);
    this.state = {
      tabIndex: 0,
    };

    const sp = spfi().using(SPFx(this.props.context));
    this.spWeb = sp.web;
  }

  async componentDidMount() {
    try {
      const items = await this.spWeb.lists.getByTitle("Dane").items.getPaged();
      console.log(items);
    } catch (error) {
      console.error("Error fetching items:", error);
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
    await addMultiLineTextColumnToSharePoint(this.spWeb, columnName);
  };

  handleAddSingleLineColumn = async (columnName: string) => {
    await addSingleLineTextColumnToSharePoint(this.spWeb, columnName);
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
          <Button
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
          </Button>
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
            <Tab label="Sekcja 1" />
            <Tab label="Sekcja 2" />
          </Tabs>
          <Box sx={{ flexGrow: 1, p: 3 }}>
            {tabIndex === 0 && <Sekcja1 {...this.props} />}
            {tabIndex === 1 && <Sekcja2 {...this.props} />}
          </Box>
        </Box>
      </section>
    );
  }
}
