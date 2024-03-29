import * as React from "react";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import { Button } from "@mui/material";
import Ankieta from "./Ankieta";
import FeedbackForm from "./FeedbackForm";
type State = {
  activePage: number;
};

const Page3 = () => <h1>Page3</h1>;

export default class Spfx extends React.Component<ISpfxProps, State> {
  constructor(props: ISpfxProps) {
    super(props);
    this.state = {
      activePage: 0,
    };
  }

  renderPage = () => {
    switch (this.state.activePage) {
      case 0:
        return <FeedbackForm {...this.props} />;
      case 1:
        return <Ankieta {...this.props} />;
      case 2:
        return <Page3 />;
      default:
        return <FeedbackForm {...this.props} />;
    }
  };
  handleButtonClick = () => {
    this.setState((prevState) => ({ activePage: prevState.activePage + 1 }));
  };

  render() {
    return (
      <>
        {this.renderPage()}

        <Button onClick={this.handleButtonClick}>Przejdź dalej</Button>
        <div>{this.state.activePage}</div>
      </>
    );
  }
}
