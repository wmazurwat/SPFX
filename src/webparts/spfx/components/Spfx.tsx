import * as React from "react";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import { Button } from "@mui/material";
import Ankieta from "./Ankieta";
import Ankieta1 from "./Ankieta1";
import FeedbackForm from "./FeedbackForm";
type State = {
  activePage: number;
};

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
        return <Ankieta1 {...this.props} />;
      case 1:
        return <Ankieta {...this.props} />;
      case 2:
        return <FeedbackForm {...this.props} />;
      default:
        return <Ankieta1 {...this.props} />;
    }
  };
  handleButtonClick = () => {
    this.setState((prevState) => ({ activePage: prevState.activePage + 1 }));
  };

  render() {
    return (
      <>
        {this.renderPage()}
        <div className={"p-10 flex justify-end"}>
          <Button onClick={this.handleButtonClick}>Przejdź dalej</Button>
        </div>
        <div>{this.state.activePage}</div>
      </>
    );
  }
}
