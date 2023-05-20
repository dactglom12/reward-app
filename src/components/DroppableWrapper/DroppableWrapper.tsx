import { ItemTypes } from "@typings/dragAndDrop";
import * as React from "react";
import { DropTargetHookSpec, useDrop } from "react-dnd";

interface DroppableWrapperProps {
  children: React.ReactNode;
  onDrop: DropTargetHookSpec<unknown, unknown, unknown>["drop"];
  acceptItemType: ItemTypes;
}

export const DroppableWrapper: React.FC<DroppableWrapperProps> = ({
  children,
  onDrop,
  acceptItemType,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: acceptItemType,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{ border: isOver ? "2px solid green" : "none", height: "100%" }}
    >
      {children}
    </div>
  );
};
