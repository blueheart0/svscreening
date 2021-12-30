import React, {useLayoutEffect, useRef, useState} from "react";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    canvasVideo: {
        width: "30%"
    }
});
const FPS = 1000 / 33.333333333;

const VideoViewer = props => {
    const styles = useStyles();
    const videoRef = useRef();
    const canvasRef = useRef();
    const [size, setSize] = useState({width: 0, height: 0});
    const lastCalledRef = useRef();

    const draw = () => {
        if (canvasRef.current && videoRef.current) {
            let fps = 0;
            const ctx = canvasRef.current.getContext("2d");

            ctx.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth / 3, videoRef.current.videoHeight / 3)
            if (lastCalledRef.current) {
                fps = (performance.now() - lastCalledRef.current) / 1000
            }
            ctx.font = '48px serif';
            ctx.fillStyle = "red"
            ctx.fillText(parseInt(1 / fps) + " FPS", 20, 50)
            // console.log(`FPS : ${fps} fps`)
            lastCalledRef.current = performance.now();
            setTimeout(() => {
                window.requestAnimationFrame(draw)
            }, FPS)

        }
    }

    useLayoutEffect(() => {
        if (videoRef.current) {
            videoRef.current.addEventListener("canplaythrough", draw)
            videoRef.current.addEventListener("canplay", () => {
                if (canvasRef.current && videoRef.current) {
                    setSize({
                        width: videoRef.current.videoWidth / 3,
                        height: videoRef.current.videoHeight / 3
                    })
                }
            })
        }
    }, []);
    return (
        <div className={styles.root}>
            <a href={"/"}>{"Back"}</a>
            <h2>
                {"Video Tag"}
            </h2>
            <video ref={videoRef} width={500} controls autoPlay={true}>
                <source src={"http://localhost:3001/assets/videos/test_video.mp4"} type="video/mp4"/>
                {/*<source src={"http://localhost:3001/assets/videos/Sample-Video-File-For-Testing.mp4"} type="video/mp4"/>*/}
                {"Your browser does not support the video tag."}
            </video>
            <h2>
                {"Canvas Tag"}
            </h2>
            <div>
                <canvas
                    width={size.width}
                    height={size.height} ref={canvasRef}/>
            </div>

        </div>
    )
}
export default VideoViewer;