import * as React from "react";
import styles from "./Spfx.module.scss";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  FormControl,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

export default class Ankieta1 extends React.Component<ISpfxProps, {}> {
  public render(): React.ReactElement<ISpfxProps> {
    const { hasTeamsContext } = this.props;

    return (
      <section
        className={`${styles.spfx} ${
          hasTeamsContext ? styles.teams : " shadow"
        }`}
      >
        <div className={"p-5 m-2 text-4xl flex justify-center "}>
          <div>Ankieta</div>
        </div>

        <div className={"p-5 m-2 justify-center "}>
          <List>
            <ListItem>
              <ListItemText primary="Marcin Lesiak" />
            </ListItem>
            <Divider variant="middle" component="li" textAlign="left">
              Customer Name
            </Divider>

            <ListItem>
              <ListItemText primary="AD2137" />
            </ListItem>
            <Divider variant="middle" component="li" textAlign="left">
              Current DD Level
            </Divider>
            <ListItem>
              <ListItemText primary="Programmer" />
            </ListItem>
            <Divider variant="middle" component="li" textAlign="left">
              Review type
            </Divider>
            <ListItem>
              <ListItemText primary="20.03.2024" />
            </ListItem>
            <Divider variant="middle" component="li" textAlign="left">
              QA review started
            </Divider>
            <ListItem>
              <ListItemText primary="19.04.2024" />
            </ListItem>
            <Divider variant="middle" component="li" textAlign="left">
              QA review closed
            </Divider>
          </List>
        </div>

        <div>
          <Accordion defaultExpanded>
            <AccordionSummary
              aria-controls="panel1-content"
              id="panel1-header"
              className={"text-xl"}
            >
              Sekcja 1
            </AccordionSummary>
            <AccordionDetails>
              <div className="border-b-2 border-sky-500 flex justify-evenly ...">
                <div className={"p-2 m-2"}>
                  Czy organizacja może wykazać, że zidentyfikowała właściwe
                  grupy klientów lub rynków dla uzyskania najlepszych korzyści
                  finansowych i ekonomicznych?
                </div>
                <div className={"m-2 justify-end"}>
                  <FormControl>
                    <Select className={"min-w-32"}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Tak</MenuItem>
                      <MenuItem value={20}>Nie</MenuItem>
                      <MenuItem value={30}>Nie dotyczy</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="border-b-2 border-sky-500 flex justify-evenly ...">
                <div className={"p-2 m-2"}>
                  Czy organizacja może wykazać, że potrzeby, oczekiwania i
                  wymagania klienta są w pełni zrozumiane?
                </div>
                <div className={"m-2 justify-end"}>
                  <FormControl>
                    <Select className={"min-w-32"}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Tak</MenuItem>
                      <MenuItem value={20}>Nie</MenuItem>
                      <MenuItem value={30}>Nie dotyczy</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="border-b-2 border-sky-500 flex justify-evenly ...">
                <div className={"p-2 m-2"}>
                  Czy organizacja może wykazać, że potrzeby, oczekiwania i
                  wymagania powiązanego z organizacją łańcucha dostaw są w pełni
                  zrozumiane?
                </div>
                <div className={"m-2 justify-end"}>
                  <FormControl>
                    <Select className={"min-w-32"}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Tak</MenuItem>
                      <MenuItem value={20}>Nie</MenuItem>
                      <MenuItem value={30}>Nie dotyczy</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="border-b-2 border-sky-500 flex justify-evenly ...">
                <div className={"p-2 m-2"}>
                  Czy organizacja może wykazać, że powyższe pozycje są
                  zarządzane przez ustalenie wyraźnych celów?
                </div>
                <div className={"m-2 justify-end"}>
                  <FormControl>
                    <Select className={"min-w-32"}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Tak</MenuItem>
                      <MenuItem value={20}>Nie</MenuItem>
                      <MenuItem value={30}>Nie dotyczy</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="border-b-2 border-sky-500 flex justify-evenly ...">
                <div className={"p-2 m-2"}>
                  Czy organizacja może wykazać, że cele są skutecznie
                  komunikowane wszystkim pracownikom, których dotyczą?
                </div>
                <div className={"m-2 justify-end"}>
                  <FormControl>
                    <Select className={"min-w-32"}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Tak</MenuItem>
                      <MenuItem value={20}>Nie</MenuItem>
                      <MenuItem value={30}>Nie dotyczy</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="border-b-2 border-sky-500 flex justify-evenly ...">
                <div className={"p-2 m-2"}>
                  Czy organizacja może wykazać, że zrównoważone, uczciwe
                  podejście jest stosowane do wszystkich klientów?
                </div>
                <div className={"m-2 justify-end"}>
                  <FormControl>
                    <Select className={"min-w-32"}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Tak</MenuItem>
                      <MenuItem value={20}>Nie</MenuItem>
                      <MenuItem value={30}>Nie dotyczy</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="border-b-2 border-sky-500 flex justify-evenly ...">
                <div className={"p-2 m-2"}>
                  Czy organizacja może wykazać, że uwagi i reklamacje klientów
                  są rozpatrywane uczciwie i we właściwym czasie?
                </div>
                <div className={"m-2 justify-end"}>
                  <FormControl>
                    <Select className={"min-w-32"}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Tak</MenuItem>
                      <MenuItem value={20}>Nie</MenuItem>
                      <MenuItem value={30}>Nie dotyczy</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="border-b-2 border-sky-500 flex justify-evenly ...">
                <div className={"p-2 m-2"}>
                  Czy organizacja może wykazać, że informacje o zadowoleniu
                  klienta są zbierane, mierzone i oceniane?
                </div>
                <div className={"m-2 justify-end"}>
                  <FormControl>
                    <Select className={"min-w-32"}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Tak</MenuItem>
                      <MenuItem value={20}>Nie</MenuItem>
                      <MenuItem value={30}>Nie dotyczy</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="border-b-2 border-sky-500 flex justify-evenly ...">
                <div className={"p-2 m-2"}>
                  Czy organizacja może wykazać, że zadowolenie klienta jest
                  komunikowane wewnątrz organizacji?
                </div>
                <div className={"m-2 justify-end"}>
                  <FormControl>
                    <Select className={"min-w-32"}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Tak</MenuItem>
                      <MenuItem value={20}>Nie</MenuItem>
                      <MenuItem value={30}>Nie dotyczy</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="border-b-2 border-sky-500 flex justify-evenly ...">
                <div className={"p-2 m-2"}>
                  Czy organizacja może wykazać, że jest stabilny łańcuch dostaw,
                  który zapewnia utrzymanie zadowolenia klienta?
                </div>
                <div className={"m-2 justify-end"}>
                  <FormControl>
                    <Select className={"min-w-32"}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Tak</MenuItem>
                      <MenuItem value={20}>Nie</MenuItem>
                      <MenuItem value={30}>Nie dotyczy</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="border-b-2 border-sky-500 flex justify-evenly ...">
                <div className={"p-2 m-2"}>
                  Czy organizacja może wykazać, że organizacja zapewnia
                  niezbędne zasoby i spełnia wymagania klientów?
                </div>
                <div className={"m-2 justify-end"}>
                  <FormControl>
                    <Select className={"min-w-32"}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Tak</MenuItem>
                      <MenuItem value={20}>Nie</MenuItem>
                      <MenuItem value={30}>Nie dotyczy</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="border-b-2 border-sky-500 flex justify-evenly ...">
                <div className={"p-2 m-2"}>
                  Czy organizacja może wykazać, że organizacja rozeznaje
                  potrzebę wspólnego rozwoju, jeśli jest to wymagane?
                </div>
                <div className={"m-2 justify-end"}>
                  <FormControl>
                    <Select className={"min-w-32"}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Tak</MenuItem>
                      <MenuItem value={20}>Nie</MenuItem>
                      <MenuItem value={30}>Nie dotyczy</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="border-b-2 border-sky-500 flex justify-evenly ...">
                <div className={"p-2 m-2"}>
                  Czy organizacja może wykazać, że zmiany warunków rynkowych, w
                  tym zmiany konkurencyjności, są regularnie przeglądane?
                </div>
                <div className={"m-2 justify-end"}>
                  <FormControl>
                    <Select className={"min-w-32"}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Tak</MenuItem>
                      <MenuItem value={20}>Nie</MenuItem>
                      <MenuItem value={30}>Nie dotyczy</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
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
