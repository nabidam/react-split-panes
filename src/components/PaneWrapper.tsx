import { Fragment, useRef, useState } from "react";
import Pane from "./Pane";
import Resizer from "./Resizer";

const minSize = 0.05;

const PaneWrapper = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [panes, setPanes] = useState([
    {
      id: 1,
      size: 0.5,
    },
    {
      id: 2,
      size: 0.5,
    },
  ]);

  const handleDrag = (e: React.MouseEvent, index: number) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const totalSize = containerRect.width;
    const position = e.clientX;

    const sectionA = panes[index];
    const sectionB = panes[index + 1];
    const combinedSize = sectionA.size + sectionB.size;

    const draggedPosition = (position - containerRect.left) / totalSize;

    const newSectionASize = Math.max(
      minSize,
      Math.min(draggedPosition, combinedSize - minSize)
    );
    const newSectionBSize = combinedSize - newSectionASize;

    const updatedSizes = panes.map((sec, secIndex) => {
      if (secIndex === index) {
        return { ...sec, size: newSectionASize };
      } else if (secIndex === index + 1) {
        return { ...sec, size: newSectionBSize };
      }
      return sec;
    });

    setPanes(updatedSizes);
  };

  const handleMove = (e: MouseEvent, index: number) => {
    const onMouseMove = (event: MouseEvent) =>
      handleDrag(event as unknown as React.MouseEvent, index);
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="pane-wrapper" ref={containerRef}>
      {panes.map((pane, idx) => (
        <Fragment>
          <Pane size={pane.size} />
          {idx < panes.length - 1 && (
            <Resizer moveHandler={(e: MouseEvent) => handleMove(e, idx)} />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default PaneWrapper;
