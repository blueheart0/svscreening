import clsx from "clsx";
import {debounce} from "lodash";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {DndProvider, useDrag, useDragLayer, useDrop} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles(props => {

    return {
        canvas: {
            width: 400,
            height: 400,
            backgroundColor: "gray",
        },
        dragLayer: {
            position: "relative",
            width: 400,
            height: 400,
        },
        dragButton: {
            position: "absolute",
            width: 10,
            height: 10,
            backgroundColor: "red"
        },
        displayNone: {
            display: "none"
        }
    }
});

function draw(canvas, coordinates) {
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < coordinates.length; i++) {
            if (i === 0) {
                ctx.beginPath();
                ctx.moveTo(...coordinates[i]);
            }
            ctx.lineTo(...coordinates[i]);
            if (i >= coordinates.length - 1) {
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}


const DragItem = props => {
    const {item, index} = props;

    const [{isDragging}, drag] = useDrag({
        type: "event",
        item: {
            name: index,
            source: item,
        },
        end: (item, monitor) => {
        },
        collect: monitor => ({isDragging: !!monitor.isDragging()})
    });
    const styles = useStyles();
    return <div ref={drag} key={index} className={clsx(styles.dragButton, {[styles.displayNone]: isDragging})}
                style={{left: item[0] - 5, top: item[1] - 5}}/>
}

const RawBoundBox = (props) => {
    const styles = useStyles();
    const canvasRef = useRef();
    const frameRef = useRef();
    const [coordinates, setCoordinates] = useState([
        [0, 0],
        [0, 100],
        [100, 100],
        [100, 0],
    ]);
    const [{isOver}, drop] = useDrop({
        accept: "event",
        options: {
            dropEffect: "move"
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });

    useDragLayer(debounce(monitor => {
        if (monitor.getItem()) {
            const delta = monitor.getDifferenceFromInitialOffset();
            let left = Math.round(monitor.getItem().source[0] + delta.x);
            let top = Math.round(monitor.getItem().source[1] + delta.y);
            if (left >= 400) {
                left = 400;
            }
            if (top >= 400) {
                top = 400;
            }
            if (left <= 0) {
                left = 0;
            }
            if (top <= 0) {
                top = 0;
            }
            setCoordinates(prev => {
                let _cord = [...prev];
                _cord.splice(monitor.getItem().name, 1, [left, top])
                return _cord
            })
        }

    }, 5, {leading: false, trailing: true}))


    const drawing = useCallback(() => {
        draw(canvasRef.current, coordinates);
    }, [coordinates]);

    useEffect(() => {
        frameRef.current = window.requestAnimationFrame(drawing);
        return () => {
            if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
        };
    }, [drawing]);
    return (

        <div style={{marginLeft: 30, marginTop: 30}}>
            <div ref={drop} className={styles.dragLayer}>
                {
                    coordinates.map((item, index) => {
                        return <DragItem item={item} index={index} key={index}/>
                    })
                }
                <canvas width={400} height={400} className={styles.canvas} ref={canvasRef}/>
            </div>
            <div>
                {coordinates.map((item, index) => {
                    return (
                        <div key={index}>
                            <input
                                type={"number"}
                                value={item[0]}
                                onChange={(e) => {
                                    let modify = [...coordinates];
                                    modify[index][0] = Number(e.target.value);
                                    setCoordinates(modify);
                                }}
                            />
                            <input
                                type={"number"}
                                value={item[1]}
                                onChange={(e) => {
                                    let modify = [...coordinates];
                                    modify[index][1] = Number(e.target.value)
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
const BoundBox = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <RawBoundBox/>
        </DndProvider>
    )
}

export default BoundBox;
