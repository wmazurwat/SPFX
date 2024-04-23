import * as React from "react";
import styles from "./Spfx.module.scss";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import {
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";

export default class Review extends React.Component<ISpfxProps, {}> {
  public render(): React.ReactElement<ISpfxProps> {
    const { hasTeamsContext } = this.props;

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

        <div className="border-b-2 border-sky-500">
          <div className=" flex justify-evenly ...">
            <div className={"p-2 m-2"}>
              Czy organizacja może wykazać, że zidentyfikowała właściwe grupy
              klientów lub rynków dla uzyskania najlepszych korzyści finansowych
              i ekonomicznych?
            </div>
            <div className={"p-2 m-2 size-20"}>
              <Chip label="Tak" color="success" />
            </div>
          </div>
          <div className={"p-2 m-2"}>
            <TextField
              fullWidth
              id="outlined-multiline-flexible"
              label="Komentarz"
              multiline
              maxRows={4}
            />
          </div>
        </div>
        <div className="border-b-2 border-sky-500">
          <div className=" flex justify-evenly ...">
            <div className={"p-2 m-2"}>
              Czy organizacja może wykazać, że potrzeby, oczekiwania i wymagania
              klienta są w pełni zrozumiane?
            </div>
            <div className={"p-2 m-2 size-20"}>
              <Chip label="Nie" color="error" />
            </div>
          </div>
          <div className={"p-2 m-2"}>
            <TextField
              fullWidth
              id="outlined-multiline-flexible"
              label="Komentarz"
              multiline
              maxRows={4}
            />
          </div>
        </div>
        <div className="border-b-2 border-sky-500">
          <div className=" flex justify-evenly ...">
            <div className={"p-2 m-2"}>
              Czy organizacja może wykazać, że potrzeby, oczekiwania i wymagania
              powiązanego z organizacją łańcucha dostaw są w pełni zrozumiane?
            </div>
            <div className={"p-2 m-2 size-auto"}>
              <Chip label="Nie dotyczy" color="warning" />
            </div>
          </div>
          <div className={"p-2 m-2"}>
            <TextField
              fullWidth
              id="outlined-multiline-flexible"
              label="Komentarz"
              multiline
              maxRows={4}
            />
          </div>
        </div>
        <div>
          <div className=" flex justify-evenly ...">
            <div className={"p-2 m-2"}>
              Czy organizacja może wykazać, że powyższe pozycje są zarządzane
              przez ustalenie wyraźnych celów?
            </div>
            <div className={"p-2 m-2 size-20"}>
              <Chip label="Tak" color="success" />
            </div>
          </div>
          <div className={"p-2 m-2"}>
            <TextField
              fullWidth
              id="outlined-multiline-flexible"
              label="Komentarz"
              multiline
              maxRows={4}
            />
          </div>
        </div>
      </section>
    );
  }
}
