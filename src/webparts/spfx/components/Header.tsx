import * as React from "react";
import "./styles.css";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
interface HeaderProps {
  qualityReview: string;
  customerName: string;
}

export default class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <div className="p-5 m-2 justify-center">
        <List>
          <ListItem>
            <ListItemText primary={this.props.customerName} />
          </ListItem>
          <Divider variant="middle" component="li" textAlign="left">
            Customer Name
          </Divider>
          <ListItem>
            <ListItemText primary={this.props.qualityReview} />
          </ListItem>
          <Divider variant="middle" component="li" textAlign="left">
            Quality
          </Divider>
        </List>
      </div>
    );
  }
}
