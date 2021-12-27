import React, { useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  canvas: {
    width: 400,
    height: 400,
    backgroundColor: "gray",
  },
});

function draw(canvas, coordinates) {
  console.log(canvas);
  console.log(coordinates);
  if (canvas.getContext) {
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 400, 400);
    ctx.beginPath();
    ctx.moveTo(coordinates[0][0], coordinates[0][1]);
    ctx.lineTo(coordinates[0][0], coordinates[0][1]);
    ctx.lineTo(coordinates[1][0], coordinates[1][1]);
    ctx.lineTo(coordinates[2][0], coordinates[2][1]);
    ctx.lineTo(coordinates[3][0], coordinates[3][1]);
    ctx.fill();
  }
}

const BoundBox = (props) => {
  const styles = useStyles();
  const canvasRef = useRef();
  const [coordinates, setCoordinates] = useState([
    [0, 0],
    [0, 100],
    [100, 100],
    [100, 0],
  ]);

  useEffect(() => {
    draw(canvasRef.current, coordinates);
  }, [coordinates]);
  console.log(coordinates);
  return (
    <div>
      <canvas className={styles.canvas} ref={canvasRef} />
      <input
        type={"number"}
        value={coordinates[0][0]}
        onChange={(e) => {
          console.log(e.target.value);
          let modify = [...coordinates];
          modify[0][0] = e.target.value;
          setCoordinates(modify);
        }}
      />
      <input
        type={"number"}
        value={coordinates[0][1]}
        onChange={(e) => {
          console.log(e.target.value);
          setCoordinates((prev) => {
            let modify = prev;
            modify[0][1] = e.target.value;
            return modify;
          });
        }}
      />
    </div>
  );
};

export default BoundBox;
