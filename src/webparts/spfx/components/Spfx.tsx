import * as React from "react";
import "./styles.css";
import type { ISpfxProps } from "./ISpfxProps";
import { Button } from "@mui/material";
import Ankieta from "./Ankieta";
type State = {
  activePage: number;
};

const Page2 = () => <h1>Page2</h1>;
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
        return <Ankieta {...this.props} />;
      case 1:
        return <Page2 />;
      case 2:
        return <Page3 />;
      default:
        return <Ankieta {...this.props} />;
    }
  };
  handleButtonClick = () => {
    this.setState((prevState) => ({ activePage: prevState.activePage + 1 }));
  };

  render() {
    return (
      <>
        {this.renderPage()}

        <Button onClick={this.handleButtonClick}>
          {this.state.activePage} Przejdź dalej
        </Button>
      </>
    );
  }
}
