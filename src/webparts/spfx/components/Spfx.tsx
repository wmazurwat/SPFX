import * as React from "react";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import { Button } from "@mui/material";
import Ankieta from "./Ankieta";
import Review from "./Review";
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
        return <Ankieta {...this.props} />;
      case 1:
        return <FeedbackForm {...this.props} />;
      case 2:
        return <Review {...this.props} />;
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
        <div className="w-full">
          {this.renderPage()}
          <div className={"p-10 flex justify-end"}>
            <Button onClick={this.handleButtonClick}>Przejdź dalej</Button>
          </div>
          <div>{this.state.activePage}</div>
        </div>
      </>
    );
  }
}
