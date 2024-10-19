const Pane = ({ size }: { size: number }) => {
  return (
    <div
      className="pane"
      style={{
        flex: size,
      }}
    >
      Pane
    </div>
  );
};

export default Pane;
