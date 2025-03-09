import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Setting = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  return (
    <div className='flex flex-1 justify-center items-center text-white text-center text-2xl font-be-vietnam-pro'>Tính năng này đang được phát triển.</div>
  );
};

export default Setting;
