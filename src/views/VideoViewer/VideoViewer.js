import React from "react";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    root: {
        display: "flex",
        flexDirection: "column",
    },
});


const VideoViewer = props => {
    const styles = useStyles();
    return (
        <div className={styles.root}>
            <a href={"/"}>{"Back"}</a>
            <video width={500} controls autoPlay={true}>
                <source src={"http://localhost:3001/assets/videos/test_video.mp4"} type="video/mp4"/>
                {/*<source src={"http://localhost:3001/assets/videos/Sample-Video-File-For-Testing.mp4"} type="video/mp4"/>*/}
                {"Your browser does not support the video tag."}
            </video>
        </div>
    )
}
export default VideoViewer;