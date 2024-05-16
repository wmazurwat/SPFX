import * as React from "react";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import styles from "./Spfx.module.scss";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import { Button } from "@mui/material";

type State = {
  items: { Title: string; LastName: string }[];
};

export default class Lista extends React.Component<ISpfxProps, State> {
  private spWeb;

  constructor(props: ISpfxProps) {
    super(props);
    this.state = {
      items: [],
    };
    const sp = spfi().using(SPFx(this.props.context));
    this.spWeb = sp.web;
  }

  async componentDidMount() {
    try {
      await this.loadItems();
    } catch (error) {
      console.error("Error loading items in componentDidMount:", error);
    }
  }

  private async loadItems() {
    try {
      const items = await this.spWeb.lists
        .getByTitle("Dane")
        .items.select("Title", "LastName")
        .top(100)(); // Pobierz do 100 elementów
      this.setState({ items });
      console.log(items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  private handleRefresh = async () => {
    try {
      await this.loadItems();
    } catch (error) {
      console.error("Error refreshing items:", error);
    }
  };

  public render(): React.ReactElement<ISpfxProps> {
    const { hasTeamsContext } = this.props;
    return (
      <section
        className={`${styles.spfx} ${
          hasTeamsContext ? styles.teams : "shadow"
        }`}
      >
        <div className={"p-5 m-2 text-4xl flex justify-center "}>
          <div>Customer risk analysis - List</div>
        </div>
        <div className="items-list">
          <h3>Items from SharePoint list:</h3>
          <ul>
            {this.state.items.map((item, index) => (
              <li key={index}>
                {item.Title} - {item.LastName}
              </li>
            ))}
          </ul>
        </div>
        <div className={"flex justify-center"}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleRefresh}
          >
            Odśwież listę
          </Button>
        </div>
      </section>
    );
  }
}
