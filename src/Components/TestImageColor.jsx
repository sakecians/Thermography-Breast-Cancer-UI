import React, { useState } from "react";
import { ColorExtractor } from "react-color-extractor";

export default function TestImageColor() {
  const [colors, setColors] = useState([]);
  const colorGetter = (newColors) => setColors([...colors, ...newColors]);
  return (
    <div>
      <ColorExtractor getColors={colorGetter}>
        <img
          alt='thermo'
          src='https://i.imgur.com/OCyjHNF.jpg'
          style={{ width: 700, height: 500 }}
        />
      </ColorExtractor>
      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
        }}>
        {colors.map((color, id) => {
          return (
            <div
              key={id}
              style={{
                backgroundColor: color,
                width: 100,
                height: 100,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
