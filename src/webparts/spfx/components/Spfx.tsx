import * as React from "react";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import { Button } from "@mui/material";
import Ankieta, { SectionAnswers } from "./Ankieta";
import Review from "./Review";
import FeedbackForm from "./FeedbackForm";
import Lista from "./Lista";

type State = {
  activePage: number;
  customerName: string;
  savedAnswers: { [x: number]: SectionAnswers };
  feedbackFormState: any;
  quality: string;
};

export default class Spfx extends React.Component<ISpfxProps, State> {
  constructor(props: ISpfxProps) {
    super(props);
    this.state = {
      activePage: 0,
      customerName: "",
      savedAnswers: {},
      feedbackFormState: {},
      quality: "",
    };
  }

  setCustomerName = (name: string) => {
    this.setState({ customerName: name });
  };
  setQuality = (name: string) => {
    this.setState({ quality: name });
  };

  saveAnswers = (index: number, answers: SectionAnswers) => {
    this.setState({
      savedAnswers: { ...this.state.savedAnswers, [index]: answers },
    });
  };

  setFeedbackFormState = (state: any) => {
    this.setState({ feedbackFormState: state });
  };

  setActivePage = (page: number) => {
    this.setState({ activePage: page });
  };

  renderPage = () => {
    switch (this.state.activePage) {
      case 0:
        return (
          <Lista
            {...this.props}
            setActivePage={this.setActivePage}
            setCustomerName={this.setCustomerName}
            setQuality={this.setQuality}
          />
        );
      case 1:
        return (
          <FeedbackForm
            {...this.props}
            customerName={this.state.customerName}
            setCustomerName={this.setCustomerName}
            savedAnswers={this.state.savedAnswers}
            saveAnswers={this.saveAnswers}
            setFeedbackFormState={this.setFeedbackFormState}
            setActivePage={this.setActivePage}
          />
        );
      case 2:
        return (
          <Ankieta
            {...this.props}
            customerName={this.state.customerName}
            savedAnswers={this.state.savedAnswers}
            saveAnswers={this.saveAnswers}
            feedbackFormState={this.state.feedbackFormState}
            setActivePage={this.setActivePage}
          />
        );
      case 3:
        return (
          <Review
            {...this.props}
            customerName={this.state.customerName}
            quality={this.state.quality}
          />
        );
      default:
        return (
          <Review
            {...this.props}
            customerName={this.state.customerName}
            quality={this.state.quality}
          />
        );
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
