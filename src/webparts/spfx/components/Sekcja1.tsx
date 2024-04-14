import * as React from "react";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import Pytanie from "./Pytanie";

type SekcjaState = {
  error: boolean;
  answers: Array<string>;
  hasErrors: boolean;
};

const pytania = [
  "Czy organizacja może wykazać, że zidentyfikowała właściwe grupy klientów lub rynków dla uzyskania najlepszych korzyści finansowych i ekonomicznych?",
  "Test2",
];

export default class Sekcja1 extends React.Component<ISpfxProps, SekcjaState> {
  constructor(props: ISpfxProps) {
    super(props);
    this.state = {
      hasErrors: false,
      error: false,
      answers: [...Array(1)],
    };
  }
  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    this.setState({
      hasErrors: this.state.answers.reduce(
        (acc, current) => acc || current === undefined,
        false
      ),
    });
  };
  public render(): React.ReactElement<ISpfxProps> {
    return (
      <Accordion>
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
          className={"text-xl"}
        >
          Sekcja 1
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            {pytania.map((p, i) => (
              <Pytanie
                key={i}
                {...this.props}
                setValue={(v: string) =>
                  this.setState(() => {
                    const newAnswers = [...this.state.answers];
                    newAnswers[i] = v;
                    return { answers: newAnswers };
                  })
                }
                value={this.state.answers[i]}
                error={this.state.hasErrors && !this.state.answers[i]}
                text={p}
              />
            ))}
            <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
              Check Answer
            </Button>
          </form>
          <div className="border-b-2 border-sky-500 flex justify-evenly ...">
            <div className={"p-2 m-2"}>
              Czy organizacja może wykazać, że potrzeby, oczekiwania i wymagania
              klienta są w pełni zrozumiane?
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
              Czy organizacja może wykazać, że potrzeby, oczekiwania i wymagania
              powiązanego z organizacją łańcucha dostaw są w pełni zrozumiane?
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
              Czy organizacja może wykazać, że powyższe pozycje są zarządzane
              przez ustalenie wyraźnych celów?
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
              Czy organizacja może wykazać, że cele są skutecznie komunikowane
              wszystkim pracownikom, których dotyczą?
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
              Czy organizacja może wykazać, że zrównoważone, uczciwe podejście
              jest stosowane do wszystkich klientów?
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
              Czy organizacja może wykazać, że uwagi i reklamacje klientów są
              rozpatrywane uczciwie i we właściwym czasie?
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
              Czy organizacja może wykazać, że informacje o zadowoleniu klienta
              są zbierane, mierzone i oceniane?
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
              Czy organizacja może wykazać, że organizacja zapewnia niezbędne
              zasoby i spełnia wymagania klientów?
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
              Czy organizacja może wykazać, że organizacja rozeznaje potrzebę
              wspólnego rozwoju, jeśli jest to wymagane?
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
              Czy organizacja może wykazać, że zmiany warunków rynkowych, w tym
              zmiany konkurencyjności, są regularnie przeglądane?
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
    );
  }
}
