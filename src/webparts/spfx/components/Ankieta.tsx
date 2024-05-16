import * as React from "react";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import styles from "./Spfx.module.scss";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import UserInfo from "./UserInfo";
import Sekcja1 from "./Sekcja1";
import Sekcja2 from "./Sekcja2";
import { Button } from "@mui/material";

export default class Ankieta extends React.Component<ISpfxProps, {}> {
  spWeb;
  constructor(props: ISpfxProps) {
    super(props);
    const sp = spfi().using(SPFx(this.props.context));
    this.spWeb = sp.web;
    // Konfiguracja PnP z kontekstem SPFx
    // wyswitlic::
    sp.web.lists
      .getByTitle("Dane")
      .items.getPaged()
      .then((items) => {
        console.log(items);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
    // console.log("listy::", sp.web.lists);

    // sp.web.lists
    //   .add("TestDane")
    //   .then(() => {
    //     console.log("added");
    //     console.log(sp.web.lists);
    //   })
    //   .catch(() => console.log("error"));
    // this.list = spWeb.lists.getByTitle("Dane");
  }

  // Metoda do zapisu danych
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

  public render(): React.ReactElement<ISpfxProps> {
    const { hasTeamsContext } = this.props;
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
        </div>
        <UserInfo {...this.props} />
        <div>
          <Sekcja1 {...this.props} />
          <Sekcja2 {...this.props} />
        </div>
      </section>
    );
  }
}
