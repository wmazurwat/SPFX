import * as React from "react";
import styles from "./Spfx.module.scss";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import UserInfo from "./UserInfo";
import Sekcja1 from "./Sekcja1";
export default class Ankieta extends React.Component<ISpfxProps, {}> {
  public render(): React.ReactElement<ISpfxProps> {
    const { hasTeamsContext } = this.props;
    return (
      <section
        className={`${styles.spfx} ${
          hasTeamsContext ? styles.teams : " shadow"
        }`}
      >
        <div className={"p-5 m-2 text-4xl flex justify-center "}>
          <div>Customer risk analysis - Questionnaire</div>
        </div>
        <UserInfo {...this.props} />
        <div>
          <Sekcja1 {...this.props} />
          <Accordion>
            <AccordionSummary
              aria-controls="panel2-content"
              id="panel2-header"
              className={"text-xl"}
            >
              Sekcja 2
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              aria-controls="panel3-content"
              id="panel3-header"
              className={"text-xl"}
            >
              Sekcja 3
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </AccordionDetails>
          </Accordion>
        </div>
      </section>
    );
  }
}
