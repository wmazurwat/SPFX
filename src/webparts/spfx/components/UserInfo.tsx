import * as React from "react";
import type { ISpfxProps } from "./ISpfxProps";
import { Divider, List, ListItem, ListItemText } from "@mui/material";

export default class UserInfo extends React.Component<ISpfxProps, {}> {
  public render(): React.ReactElement<ISpfxProps> {
    return (
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
    );
  }
}
