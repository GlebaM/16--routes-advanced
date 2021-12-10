import React from "react";

const calculateBoundingBoxes = (children) => {
  const boundingBoxes = {};

  React.Children.forEach(children, (child) => {
    const domNode = child.ref.current;
    const nodeBoundingBox = domNode.getBoundingClientRect();
    boundingBoxes[child.key] = nodeBoundingBox;
  });
  console.log(boundingBoxes);

  return boundingBoxes;
};

export default calculateBoundingBoxes;
