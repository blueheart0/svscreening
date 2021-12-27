import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
});

function random_rgba() {
  let o = Math.round,
    r = Math.random,
    s = 255;
  return "rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + ",0.3)";
}

function rgb(string) {
  let hash = 0;
  if (string.length === 0) return hash;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  let rgb = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 255;
    rgb[i] = value;
  }
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.3)`;
}

const _drawPolygons = function (
  canvas,
  { label, Polygon },
  imgWidth,
  imgHeight,
  cWidth,
  cHeight
) {
  if (!Boolean(canvas)) return;
  // let widthRatio = cWidth / imgWidth;
  // let hegihtRatio = cHeight / imgHeight;
  let widthRatio = 1;
  let hegihtRatio = 1;
  let ctx = canvas.getContext("2d");
  for (let i = 0; i < Polygon.length; i++) {
    let [x, y] = Polygon[i];
    if (i === 0) {
      ctx.beginPath();
      ctx.moveTo(x * widthRatio, y * hegihtRatio);
    }
    ctx.lineTo(x * widthRatio, y * hegihtRatio);
    if (i >= Polygon.length - 1) {
      ctx.fillStyle = rgb(label);
      ctx.fill();
      ctx.closePath();
    }
  }
};

const _makeCanvas = function (canvas, image, data) {
  if (!Boolean(data)) return;
  if (!Boolean(canvas)) return;
  if (!Boolean(image)) return;
  const { imgWidth, imgHeight, objects } = data;
  console.log({ canvas });
  let ctx = canvas.getContext("2d");
  canvas.width = imgWidth;
  canvas.height = imgHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let _image = new Image(imgWidth, imgHeight);
  _image.src = `assets/images/${image}`;
  _image.onload = function () {
    ctx.drawImage(_image, 0, 0, imgWidth, imgHeight);
    objects.forEach((item) => {
      _drawPolygons(
        canvas,
        item,
        imgWidth,
        imgHeight,
        canvas.offsetWidth,
        canvas.offsetHeight
      );
    });
  };
};

const getList = async () => {
  return await axios({
    methods: "get",
    baseUrl: "/",
    url: "assets/images",
  });
};
const getPolygon = async (selected) =>
  await axios({
    methods: "get",
    baseUrl: "/",
    url: `assets/jsons/${selected.replace(".jpg", "")}.json`,
  });

const Polygons = (props) => {
  const canvasRef = useRef();
  const styles = useStyles();
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("");
  useEffect(() => {
    async function _get() {
      let _res = await getList();
      if (_res?.data && _res?.status === 200) {
        setList([..._res.data]);
      }
    }

    _get();
  }, []);
  useEffect(() => {
    async function _get() {
      let _res = await getPolygon(selected);
      if (_res?.data && _res?.status === 200) {
        _makeCanvas(canvasRef.current, selected, { ..._res.data });
      }
    }

    if (selected) _get();
  }, [selected]);

  return (
    <div className={styles.root}>
      <select
        value={selected ? selected : ""}
        onChange={(e) => {
          console.log(e.target.value);
          setSelected(e.target.value);
        }}
      >
        <option value={""} key={"none"}>
          {"None Select"}
        </option>
        {list.map((item) => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        })}
      </select>
      {selected && <canvas ref={canvasRef} />}
    </div>
  );
};

export default Polygons;
