import * as React from "react";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import { Button } from "@mui/material";
import Ankieta, { SectionAnswers } from "./Ankieta";
import Review from "./Review";
import FeedbackForm from "./FeedbackForm";
import Lista from "./Lista";
import View from "./View";
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
  qualityReview: string;
  answers: Answer[];
  idReview: number;
  sections: any;
};

export default class Spfx extends React.Component<ISpfxProps, State> {
  constructor(props: ISpfxProps) {
    super(props);
    this.state = {
      activePage: 0,
      customerName: "",
      savedAnswers: {},
      sections: [],
      feedbackFormState: {
        currentDdLevel: "",
        reviewType: "",
        responsibleTeam: "",
        qualityChecker: "",
        regulatoryAnalyst: "",
      },
      quality: "100",
      qualityReview: "100",
      answers: [],
      idReview: 0,
    };
  }

  getQuality = (answers: any): string => {
    const allAnswers = Object.entries(answers).flatMap(
      ([sectionIndex, sectionAnswers]: [string, SectionAnswers]) => {
        const sectionQuestions =
          this.state.sections[
            Object.keys(this.state.sections)[parseInt(sectionIndex, 10)]
          ];
        return sectionQuestions.map((q: any) => ({
          Weight: q.Waga,
          Answer: sectionAnswers[q.id] || "",
        }));
      }
    );
    const quality = allAnswers.reduce((acc, curr) => {
      return acc - (curr.Answer === "No" ? curr.Weight : 0);
    }, 100);
    return quality.toString();
  };

  setCustomerName = (name: string) => {
    this.setState({ customerName: name });
  };

  setQualityReview = (qualityReview: string) => {
    this.setState({ qualityReview });
  };
  setQuality = () => {
    console.log("hello");
  };
  // setQuality = (quality: string) => {
  //   this.setState({ quality });
  // };

  setSections = (sections: any) => {
    this.setState({ sections });
  };

  setAnswers = (answers: Answer[]) => {
    this.setState({ answers });
  };

  saveAnswers = (index: number, answers: SectionAnswers) => {
    const newAnswers = { ...this.state.savedAnswers, [index]: answers };
    this.setState({
      savedAnswers: newAnswers,
      quality: this.getQuality(newAnswers),
    });
  };

  setFeedbackFormState = (state: any) => {
    this.setState({ feedbackFormState: state });
  };

  resetFeedbackFormState = () => {
    this.setState({
      customerName: "",
      feedbackFormState: {
        currentDdLevel: "",
        reviewType: "",
        responsibleTeam: "",
        qualityChecker: "",
        regulatoryAnalyst: "",
      },
    });
  };

  setIdReview = (id: number) => {
    this.setState({ idReview: id });
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
            setQualityReview={this.setQualityReview}
            setAnswer={this.setAnswers}
            resetFeedbackFormState={this.resetFeedbackFormState}
            setIdReview={this.setIdReview}
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
            setSections={this.setSections}
          />
        );
      case 3:
        return (
          <Review
            {...this.props}
            customerName={this.state.customerName}
            quality={this.state.quality}
            answers={this.state.answers}
            qualityReview={this.state.qualityReview}
            setActivePage={this.setActivePage}
            idReview={this.state.idReview} // Pass idReview to Review component
          />
        );
      case 4:
        return (
          <View
            {...this.props}
            qualityReview={this.state.qualityReview}
            customerName={this.state.customerName}
            quality={this.state.quality}
            answers={this.state.answers}
            setActivePage={this.setActivePage}
            idReview={this.state.idReview} // Pass idReview to Review component
          />
        );
      default:
        return (
          <Review
            {...this.props}
            customerName={this.state.customerName}
            qualityReview={this.state.qualityReview}
            answers={this.state.answers}
            setActivePage={this.setActivePage}
            idReview={this.state.idReview} // Pass idReview to Review component
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
