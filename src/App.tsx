import React from "react";
import "./App.css";
import ColorPicker from "./components/ColorPicker";

const colors = [
  { name: "Red", hex: "#ff0000" },
  { name: "Yellow", hex: "#ffff00" },
  { name: "Green", hex: "#00ff00" },
  { name: "Blue", hex: "#0000ff" }
];

interface AppState {
  selectedColor: string;
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedColor: "#ff00ff"
    };
  }

  onChange = (color: string) => {
    this.setState({ selectedColor: color });
  };

  render() {
    return (
      <ColorPicker
        selectedColor={this.state.selectedColor}
        colors={colors}
        onChangeColor={this.onChange}
      />
    );
  }
}

export default App;
