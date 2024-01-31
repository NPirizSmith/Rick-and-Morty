import React, { useState } from "react";
import Heart from "react-animated-heart";

export default function heart() {
  const [isClick, setClick] = useState(false);
  return (
    <div className="App">
      <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
    </div>
  );
}