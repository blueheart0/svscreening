import React from "react";

const VideoViewer = props => {

    return (
        <video width={500} controls autoPlay={true}>
            <source src={"http://localhost:3001/assets/videos/test_video.mp4"} type="video/mp4"/>
            {/*<source src={"http://localhost:3001/assets/videos/Sample-Video-File-For-Testing.mp4"} type="video/mp4"/>*/}
            Your browser does not support the video tag.
        </video>
    )
}
export default VideoViewer;