import { Layout, Menu, Row } from "antd";
import { FC } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { logout } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";

const NavBar: FC = () => {
  const { isAuth, user } = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();

  const menuItems = isAuth
    ? [
        {
          key: "1",
          label: "выйти",
          onClick: () => dispatch(logout()),
        },
      ]
    : [
        {
          key: "1",
          label: "логин",
          onClick: () => console.log("Login!"),
        },
      ];

  return (
    <Layout.Header>
      <Row justify={"end"}>
        {isAuth ? (
          <div style={{ color: "white" }}>{user?.username}</div>
        ) : (
          <div style={{ color: "white" }}>You are not authorized!</div>
        )}
        <Menu
          theme="dark"
          mode={"horizontal"}
          selectable={false}
          items={menuItems}
        />
      </Row>
    </Layout.Header>
  );
};

export default NavBar;
