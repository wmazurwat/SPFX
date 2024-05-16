import * as React from "react";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import styles from "./Spfx.module.scss";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
// import UserInfo from "./UserInfo";

// type State = {
//   items: { Title: string; LastName: string }[];
// };

export default class Lista extends React.Component<ISpfxProps, {}> {
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
        this.setState({ items });
        console.log(items);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
    console.log("listy::", sp.web.lists);
  }

  public render(): React.ReactElement<ISpfxProps> {
    const { hasTeamsContext } = this.props;
    return (
      <section
        className={`${styles.spfx} ${
          hasTeamsContext ? styles.teams : "shadow"
        }`}
      >
        <div className={"p-5 m-2 text-4xl flex-auto justify-center "}>
          <div>Customer risk analysis - List</div>
          {/* <div>{sp.web.lists.result[0].Title}</div> */}
          <div className="items-list">
            <h3>Items from SharePoint list:</h3>
            {/* <ul>
            {this.spWeb.lists.map((item, index) => (
              <li key={index}>
                {item.Title} - {item.LastName}
              </li>
            ))}
          </ul> */}
          </div>
        </div>
        {/* <UserInfo {...this.props} /> */}
      </section>
    );
  }
}
