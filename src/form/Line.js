export const ColoredLine = ({ color = "#fff", height = 1, margin = 0 }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: height,
      margin: margin,
      border: "none"
    }}
  />
);