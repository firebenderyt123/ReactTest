import PuffLoader  from "react-spinners/ClipLoader";

const Loader = () => (
  <div className="loader">
    <PuffLoader
      color="#36d7b7"
      cssOverride={{}}
      loading
      size={60}
      speedMultiplier={1}
    />
  </div>
);

export default Loader;
