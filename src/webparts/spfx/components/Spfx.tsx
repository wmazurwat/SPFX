import * as React from "react";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import { Button } from "@mui/material";
import Ankieta, { SectionAnswers } from "./Ankieta";
import Review from "./Review";
import FeedbackForm from "./FeedbackForm";
import Lista from "./Lista";
import { Answer } from "./types";

type State = {
  activePage: number;
  customerName: string;
  savedAnswers: { [x: number]: SectionAnswers };
  feedbackFormState: {
    currentDdLevel: string;
    reviewType: string;
    responsibleTeam: string;
    qualityChecker: string;
    regulatoryAnalyst: string;
  };
  quality: string;
  answers: Answer[];
};

export default class Spfx extends React.Component<ISpfxProps, State> {
  constructor(props: ISpfxProps) {
    super(props);
    this.state = {
      activePage: 0,
      customerName: "",
      savedAnswers: {},
      feedbackFormState: {
        currentDdLevel: "",
        reviewType: "",
        responsibleTeam: "",
        qualityChecker: "",
        regulatoryAnalyst: "",
      },
      quality: "100",
      answers: [],
    };
  }

  setCustomerName = (name: string) => {
    this.setState({ customerName: name });
  };

  setQuality = (quality: string) => {
    this.setState({ quality });
  };

  setAnswers = (answers: Answer[]) => {
    this.setState({ answers });
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
            setAnswer={this.setAnswers}
          />
        );
      case 1:
        return (
          <FeedbackForm
            {...this.props}
            customerName={this.state.customerName}
            setCustomerName={this.setCustomerName}
            feedbackFormState={this.state.feedbackFormState}
            setFeedbackFormState={this.setFeedbackFormState}
            setActivePage={this.setActivePage}
          />
        );
      case 2:
        return (
          <Ankieta
            {...this.props}
            customerName={this.state.customerName}
            quality={this.state.quality}
            savedAnswers={this.state.savedAnswers}
            saveAnswers={this.saveAnswers}
            feedbackFormState={this.state.feedbackFormState}
            setActivePage={this.setActivePage}
            setQuality={this.setQuality}
          />
        );
      case 3:
        return (
          <Review
            {...this.props}
            customerName={this.state.customerName}
            quality={this.state.quality}
            answers={this.state.answers}
            setActivePage={this.setActivePage}
          />
        );
      default:
        return (
          <Review
            {...this.props}
            customerName={this.state.customerName}
            quality={this.state.quality}
            answers={this.state.answers}
            setActivePage={this.setActivePage}
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
