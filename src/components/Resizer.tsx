const Resizer = ({ moveHandler }: any) => {
  return <span className="resizer" onMouseDown={moveHandler}></span>;
};

export default Resizer;
