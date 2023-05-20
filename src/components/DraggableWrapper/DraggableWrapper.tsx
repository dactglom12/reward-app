import { ItemTypes } from "@typings/dragAndDrop";
import * as React from "react";
import { useDrag } from "react-dnd";

interface DraggableWrapperProps {
  children: React.ReactNode;
  itemType: ItemTypes;
  item: any;
}

export const DraggableWrapper: React.FC<DraggableWrapperProps> = ({
  children,
  itemType,
  item,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: itemType,
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
    item,
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}>
      {children}
    </div>
  );
};
