// Node height configuration
// Adjust these values to set the distance from each node to the next
// The value represents the height of each node type in pixels
// Spacing between nodes is always 50px (NODE_SPACING in OrderFlow.tsx)

export const nodeHeights: Record<string, number> = {
  trigger: 80,
  condition: 140,
  spritz: 200,
  base: 150,
  veggies: 130,
  proteins: 130,
  kids: 100,
  name: 100,
  submit: 115,
};

// Gap between nodes in pixels
export const NODE_GAP = 50;
