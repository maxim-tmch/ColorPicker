import React from "react";

interface ColorTangeProps {
  name: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ColorRange: React.FC<ColorTangeProps> = props => {
  return (
    <div className="range-line">
      <span>{props.name}</span>
      <input
        id={props.id}
        type="range"
        value={props.value}
        min="0"
        max="255"
        step="1"
        onChange={props.onChange}
      />
    </div>
  );
};

export default ColorRange;
