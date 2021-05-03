import { useContext } from "react";
import StreamContext from "../context/StreamContext";

const useStreamContext = () => {
    return useContext(StreamContext);
};

export default useStreamContext;
