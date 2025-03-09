import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Logo from "../../assets/bestlogo.png";
import { IoIosLogOut } from "react-icons/io";

import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import sidebarBg from "../../assets/bg2.jpg";
import { MdAdminPanelSettings } from "react-icons/md";
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";

import "./SideBarChat.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../../redux/action/userAction";

const SideBarChat = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const account = useSelector((state) => state.user.account);
  console.log("account:", account);
  const { image, collapsed, toggled, handleToggleSidebar } = props;
  return (
    <>
      <Sidebar
        // image={sidebarBg}
        collapsed={collapsed}
        backgroundColor="#f5f5f5"
        toggled={toggled}
        breakPoint="xs"
        onToggle={handleToggleSidebar}
      >
        <div>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <img
              className="border border-white rounded-circle"
              width={40}
              height={40}
              src={Logo}
              alt="logo"
            />
            <span className="px-6">BankGPT</span>
          </div>
        </div>

        <div>
          <Menu iconShape="circle">
            <MenuItem icon={<MdDashboard />}>
              Dashboard
              <Link to="/admins" />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu icon={<FaGem />} title="Features">
              <MenuItem>
                Quản lý Users
                <Link to="/admins/manage-users" />
              </MenuItem>
              <MenuItem>
                {" "}
                Quản lý Bài Quiz <Link to="/admins/manage-quizzes" />
              </MenuItem>
              <MenuItem> Quản lý Câu Hỏi</MenuItem>
            </SubMenu>
          </Menu>
        </div>

        <div style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <img
                width={30}
                height={30}
                className="border border-white rounded-circle"
                src={account.avatar}
                alt="avatar"
                referrerPolicy="no-referrer"
              />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {account.name}
              </span>
              <div
                onClick={() => {
                  dispatch(doLogout());
                  navigate("/");
                }}
              >
                <IoIosLogOut size={22} />
              </div>
            </a>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default SideBarChat;
