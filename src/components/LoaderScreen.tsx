import { Flex, Row, Spin } from "antd";
import { FC } from "react";

const LoaderScreen: FC = () => {
  return (
    <Flex vertical gap={"middle"}>
      <Row justify={"center"} align={"middle"} className="loader">
        <Spin />
      </Row>
    </Flex>
  );
};

export default LoaderScreen;
