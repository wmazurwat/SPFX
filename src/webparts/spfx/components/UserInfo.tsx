import * as React from "react";
import type { ISpfxProps } from "./ISpfxProps";
import { Divider, List, ListItem, ListItemText } from "@mui/material";

type UserInfoProps = {
  customerName: string;
};

export default class UserInfo extends React.Component<
  UserInfoProps & ISpfxProps,
  {}
> {
  public render(): React.ReactElement<UserInfoProps & ISpfxProps> {
    return (
      <div className={"p-5 m-2 justify-center "}>
        <List>
          <ListItem>
            <ListItemText primary={this.props.customerName} />
          </ListItem>
          <Divider variant="middle" component="li" textAlign="left">
            Customer Name
          </Divider>
          <ListItem>
            <ListItemText primary={this.props.customerName} />
          </ListItem>
          <Divider variant="middle" component="li" textAlign="left">
            Quality
          </Divider>
          <ListItem>
            <ListItemText primary={this.props.customerName} />
          </ListItem>
          <Divider variant="middle" component="li" textAlign="left">
            Process Deficiency
          </Divider>
        </List>
      </div>
    );
  }
}
