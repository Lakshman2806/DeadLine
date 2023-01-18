const Progressbar = ({ progress }) => {
  console.log("lmao" + progress);
  const Parentdiv = {
    height: 10,
    width: "100%",
    backgroundColor: "whitesmoke",
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: "green",
    borderRadius: 40,
    textAlign: "right",
  };

  const progresstext = {
    padding: 10,
    color: "black",
    fontWeight: 900,
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}></div>
    </div>
  );
};

export default Progressbar;
