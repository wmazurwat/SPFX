import * as React from "react";
import styles from "./Spfx.module.scss";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import {
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";

export default class Review extends React.Component<ISpfxProps, {}> {
  public render(): React.ReactElement<ISpfxProps> {
    const { hasTeamsContext } = this.props;
    console.log(" test ");
    console.log(this.props.answer);
    console.log(" test ");

    return (
      <section
        className={`${styles.spfx} ${hasTeamsContext ? styles.teams : ""}`}
      >
        <div className={"p-5 m-2 text-4xl flex justify-center"}>
          <div>Customer risk analysis - Review</div>
        </div>

        <div className={"p-5 m-2 justify-center "}>
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
            aria-label="Vertical tabs"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Identification & Verification of the customer" />
            <Tab label="Ownership & Control" />
            <Tab label="BO/SMO identification & verification" />
            <Tab label="Main Principals" />
            <Tab label="Authorized representatives/signatories" />
            <Tab label="Screening" />
            <Tab label="Nature of Business" />
            <Tab label="Purpose of relationship" />
            <Tab label="Source of Wealth and Source of Funds" />
            <Tab label="Recordkeeping" />
            <Tab label="Escalations" />
          </Tabs>
          <Box sx={{ flexGrow: 1, p: 3 }}>
            <div className="border-b-2 border-sky-500">
              <div className="flex justify-between items-start p-2 m-2">
                <div className="flex flex-col">
                  <div className={"text-xl justify-start"} id="tekst1">
                    {
                      "Identification & Verification of the customer correctly performed?"
                    }
                  </div>
                  <div className={"text-base justify-start"} id="tekst2">
                    {
                      "Any of the following missing: Full legal name, Registered Address, Correspondence address, Tax residence/TIN, Proof of listing/Proof of regulation"
                    }
                  </div>
                </div>
                <div className={"p-2 m-2"}>
                  <Chip label="Yes" color="success" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 p-2 m-2">
                <div id="k1">
                  <TextField
                    fullWidth
                    id="komentarz"
                    label="Comment"
                    multiline
                    maxRows={4}
                  />
                </div>
                <div id="k2" className="flex items-center">
                  AC: Comment
                </div>
              </div>
            </div>
            <div className="border-b-2 border-sky-500">
              <div className="flex justify-between items-start p-2 m-2">
                <div className="flex flex-col">
                  <div className={"text-xl justify-start"} id="tekst1">
                    {
                      "Identification & Verification of the customer correctly performed?"
                    }
                  </div>
                  <div className={"text-base justify-start"} id="tekst2">
                    {
                      "Any of the following missing: Full legal name, Registered Address, Correspondence address, Tax residence/TIN, Proof of listing/Proof of regulation"
                    }
                  </div>
                </div>
                <div className={"p-2 m-2"}>
                  <Chip label="No" color="error" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 p-2 m-2">
                <div id="k1">
                  <TextField
                    fullWidth
                    id="komentarz"
                    label="Comment"
                    multiline
                    maxRows={4}
                  />
                </div>
                <div id="k2" className="flex items-center">
                  AC: Comment
                </div>
              </div>
            </div>
            <div className="border-b-2 border-sky-500">
              <div className="flex justify-between items-start p-2 m-2">
                <div className="flex flex-col">
                  <div className={"text-xl justify-start"} id="tekst1">
                    {
                      "Identification & Verification of the customer correctly performed?"
                    }
                  </div>
                  <div className={"text-base justify-start"} id="tekst2">
                    {
                      "Any of the following missing: Full legal name, Registered Address, Correspondence address, Tax residence/TIN, Proof of listing/Proof of regulation"
                    }
                  </div>
                </div>
                <div className={"p-2 m-2"}>
                  <Chip label="N/a" color="warning" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 p-2 m-2">
                <div id="k1">
                  <TextField
                    fullWidth
                    id="komentarz"
                    label="Comment"
                    multiline
                    maxRows={4}
                  />
                </div>
                <div id="k2" className="flex items-center">
                  AC: Komentarz
                </div>
              </div>
            </div>
          </Box>
        </Box>
      </section>
    );
  }
}
