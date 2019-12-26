import React, { Component } from "react";
import ColorRange from "./ColorRange";
import onClickOutside from "react-onclickoutside";

interface Color {
  name: string;
  hex: string;
}

interface ColorPickerProps {
  selectedColor: string;
  colors: Color[];
  onChangeColor: (color: string) => void;
}

interface ColorPickerState {
  isOpenColorsDropdown: boolean;
  isOpenRangeDropdown: boolean;
  r: string;
  g: string;
  b: string;
  prev: string;
}

class ColorPicker extends Component<ColorPickerProps, ColorPickerState> {
  constructor(props: ColorPickerProps) {
    super(props);
    this.state = {
      isOpenColorsDropdown: false,
      isOpenRangeDropdown: false,
      r: "",
      g: "",
      b: "",
      prev: ""
    };
  }

  showColorsDropdown = () => {
    this.setState({
      isOpenColorsDropdown: !this.state.isOpenColorsDropdown,
      isOpenRangeDropdown: false
    });
  };
  showRangeDropdown = () => {
    this.setState({
      isOpenRangeDropdown: true,
      isOpenColorsDropdown: false,
      prev: this.props.selectedColor
    });
  };

  rgbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "r":
        this.setState({ r: e.target.value });
        break;
      case "g":
        this.setState({ g: e.target.value });
        break;
      case "b":
        this.setState({ b: e.target.value });
        break;
      default:
        break;
    }
  };

  rgbUpdate = () => {
    this.props.onChangeColor(
      this.rgbToHex(+this.state.r, +this.state.g, +this.state.b)
    );
  };

  convertHex(hex: string) {
    hex = hex.replace("#", "");
    let red = parseInt(hex.substring(0, 2), 16).toString();
    let green = parseInt(hex.substring(2, 4), 16).toString();
    let blue = parseInt(hex.substring(4, 6), 16).toString();
    this.setState({ r: red, g: green, b: blue });
  }

  rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  rgbChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.rgbChange(e);
    this.rgbUpdate();
  };

  componentDidMount() {
    this.convertHex(this.props.selectedColor);
  }

  componentDidUpdate(prevProps: ColorPickerProps) {
    if (this.props.selectedColor !== prevProps.selectedColor) {
      this.convertHex(this.props.selectedColor);
    }
  }

  cancelBtn = () => {
    this.setState({ isOpenRangeDropdown: false });
    this.props.onChangeColor(this.state.prev);
  };

  submitBtn = () => {
    this.setState({ isOpenRangeDropdown: false });
  };

  handleClickOutside = () => {
    if (this.state.isOpenRangeDropdown) {
      this.props.onChangeColor(this.state.prev);
    }
    this.setState({ isOpenRangeDropdown: false, isOpenColorsDropdown: false });
  };

  render() {
    return (
      <div className="container">
        <div className="color-picker">
          <input
            className="main-input"
            disabled
            type="text"
            value={this.props.selectedColor}
          />
          <div className="color-picker-box">
            <div
              style={{ backgroundColor: this.props.selectedColor }}
              onClick={
                this.state.isOpenRangeDropdown
                  ? undefined
                  : this.showRangeDropdown
              }
              className="item"
            ></div>
            {this.state.isOpenRangeDropdown ? (
              <div className="range-dropdown">
                <ColorRange
                  id="r"
                  name="R"
                  value={this.state.r}
                  onChange={this.rgbChangeHandler}
                />
                <ColorRange
                  id="g"
                  name="G"
                  value={this.state.g}
                  onChange={this.rgbChangeHandler}
                />
                <ColorRange
                  id="b"
                  name="B"
                  value={this.state.b}
                  onChange={this.rgbChangeHandler}
                />
                <div className="range-dropdown-buttons">
                  <button onClick={this.cancelBtn} className="btn btn-cancel">
                    Cancel
                  </button>
                  <button onClick={this.submitBtn} className="btn btn-submit">
                    Ok
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          <div className="color-picker-dropdown">
            <i onClick={this.showColorsDropdown} />
            {this.state.isOpenColorsDropdown ? (
              <ul className="color-picker-dropdown-list">
                {this.props.colors.map(element => (
                  <li
                    key={element.name}
                    onClick={() => {
                      this.showColorsDropdown();
                      return this.props.onChangeColor(element.hex);
                    }}
                  >
                    {element.name}
                    <span
                      style={{ backgroundColor: element.hex }}
                      className="dropdown-item"
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default onClickOutside(ColorPicker);
