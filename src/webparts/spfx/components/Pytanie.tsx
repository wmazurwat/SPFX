import * as React from "react";
import "./styles.css";
import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  FormLabel,
} from "@mui/material";
import type { ISpfxProps } from "./ISpfxProps";
type PytanieProps = ISpfxProps & {
  text: string;
  error: boolean;
  value: string;
  setValue: (v: string) => void;
};
export default class Pytanie extends React.Component<PytanieProps> {
  setValue = (newValue: string): void => {
    this.props.setValue(newValue);
  };

  public render(): React.ReactElement<ISpfxProps> {
    return (
      <div className="border-b-2 border-sky-500 flex justify-evenly ...">
        {/* <div className={"p-2 m-2"}>{this.props.text}</div>
        <div className={"m-2 justify-end"}> */}
        <FormControl variant="standard" required>
          <FormLabel id="demo-error-radios">{this.props.text}</FormLabel>
          <RadioGroup
            aria-labelledby="demo-error-radios"
            name="quiz"
            value={this.props.value}
            onChange={(e) => this.setValue(e.target.value)}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
            <FormControlLabel value="N/a" control={<Radio />} label="N/a" />
          </RadioGroup>
          {this.props.error && (
            <FormHelperText>Odpowiedz na pytanie</FormHelperText>
          )}
        </FormControl>
        {/* </div> */}
      </div>
    );
  }
}
