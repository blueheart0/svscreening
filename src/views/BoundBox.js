import React, { useCallback, useEffect, useRef, useState } from "react";
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
    console.log(ctx);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
  const drawing = useCallback(() => {
    draw(canvasRef.current, coordinates);
  }, [coordinates]);

  useEffect(() => {
    window.requestAnimationFrame(drawing);
    return () => {
      Window.cancelAnimationFrame();
    };
  }, [drawing]);
  console.log(coordinates);
  return (
    <div>
      <canvas className={styles.canvas} ref={canvasRef} />
      <div>
        {coordinates.map((item, index) => {
          return (
            <div>
              <input
                type={"number"}
                value={item[0]}
                onChange={(e) => {
                  let modify = [...coordinates];
                  modify[index][0] = e.target.value;
                  setCoordinates(modify);
                }}
              />
              <input
                type={"number"}
                value={item[1]}
                onChange={(e) => {
                  let modify = [...coordinates];
                  modify[index][1] = e.target.value;
                  setCoordinates(modify);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoundBox;
