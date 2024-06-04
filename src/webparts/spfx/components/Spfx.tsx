import * as React from "react";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import { Button } from "@mui/material";
import Ankieta from "./Ankieta";
import Review from "./Review";
import FeedbackForm from "./FeedbackForm";
import List from "./Lista";

type State = {
  activePage: number;
  customerName: string;
};

export default class Spfx extends React.Component<ISpfxProps, State> {
  constructor(props: ISpfxProps) {
    super(props);
    this.state = {
      activePage: 0,
      customerName: "",
    };
  }

  setCustomerName = (name: string) => {
    this.setState({ customerName: name });
  };

  renderPage = () => {
    switch (this.state.activePage) {
      case 0:
        return <List {...this.props} />;
      case 1:
        return (
          <FeedbackForm
            {...this.props}
            customerName={this.state.customerName}
            setCustomerName={this.setCustomerName}
          />
        );
      case 2:
        return (
          <Ankieta customerName={this.state.customerName} {...this.props} />
        );
      default:
        return <Review {...this.props} />;
    }
  };

  handleButtonClickForward = () => {
    this.setState((prevState) => ({ activePage: prevState.activePage + 1 }));
  };

  handleButtonClickBack = () => {
    this.setState((prevState) => ({ activePage: prevState.activePage - 1 }));
  };

  render() {
    return (
      <>
        <div className="w-full">
          {this.renderPage()}
          <div className={"p-10 flex justify-center"}>
            <Button
              className={"p-10 flex "}
              onClick={this.handleButtonClickBack}
            >
              Backward
            </Button>
            <Button
              className={"p-10 flex "}
              onClick={this.handleButtonClickForward}
            >
              Forward
            </Button>
          </div>
        </div>
      </>
    );
  }
}
