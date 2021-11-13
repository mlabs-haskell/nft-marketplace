import React from "react";
import { Card } from "../../component/UI/atoms/Card";

function Home() {
  return (
    <div>
      <h2 style={{ marginLeft: "30px" }}>Live auctions</h2>
      <div
        style={{
          display: "flex",
          overflow: "scroll",
          justifyContent: "space-around",
        }}
      >
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default Home;
