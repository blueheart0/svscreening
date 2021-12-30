import React from "react";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    root: {
        display: "flex",
        flexDirection: "column",
    },
});


const App = () => {
    const styles = useStyles();
    return (
        <div className={styles.root}>
            <a href={"/Polygons"}>{"1. Polygons"}</a>
            <a href={"/BoundBox"}>{"2. BoundBox"}</a>
            <a href={"/VideoViewer"}>{"3. Video Viewer"}</a>
        </div>
    );
}

export default App;
