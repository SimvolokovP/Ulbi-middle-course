import { Button, Form, Input, message } from "antd";
import { FC, useEffect } from "react";
import { rulesUtils } from "../utils/utils";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slices/authSlice";
import { AppDispatch } from "../store";
import { useTypedSelector } from "../hooks/useTypedSelector";
import LoaderScreen from "./LoaderScreen";

const LoginForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useTypedSelector((state) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();

  const submit = (values: { username: string; password: string }) => {
    dispatch(
      loginUser({ username: values.username, password: values.password })
    );
  };

  useEffect(() => {
    if (error) {
      messageApi.open({
        type: "error",
        content: "invalid credentials",
      });
    }
  }, [error, messageApi]);

  return (
    <>
      {contextHolder}
      {isLoading ? <LoaderScreen /> : null}
      <Form onFinish={submit}>
        <Form.Item
          label="Username"
          name={"username"}
          rules={[rulesUtils.required("Please input your username!")]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name={"password"}
          rules={[rulesUtils.required("Please input your password!")]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type={"primary"} htmlType={"submit"}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
