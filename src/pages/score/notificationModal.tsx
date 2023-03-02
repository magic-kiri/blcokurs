"use client";

import { useState } from "react";
import { Button, Divider } from "antd";
import nofiStyle from "./notificationModal.module.css";
import Modal from "../../components/modal";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

//@ts-ignore
export default function NotificationModal({ open, setOpen, scoreRequests }) {
  const [count, setCount] = useState<number>(5);
  console.log(scoreRequests);
  const options = scoreRequests.map(
    (req: {
      index: number;
      querier: string;
      responder: string;
      us: boolean;
      fs: boolean;
      es: boolean;
      User: {
        name: string;
        index: number;
        identifier: string;
      };
    }) => {
      const { us, fs, es } = req;
      const list = [];
      if (us) {
        list.push("Unified Score");
      }
      if (fs) {
        list.push("Financial Score");
      }
      if (es) {
        list.push("E-Commerce Score");
      }
      console.log(list, list.length);
      let displayScore = "";
      if (list.length == 1) {
        displayScore = list[0];
      } else if (list.length == 2) {
        displayScore = list[0] + " and " + list[1];
      } else {
        console.log("Seripusly?");
        displayScore = list[0] + ", " + list[1] + " and " + list[2];
      }

      return (
        <div key={req.index} className={nofiStyle.notification}>
          <p>
            {req.User.name} wants to know your {displayScore}.
          </p>
          <div>
            <CheckCircleOutlined className={nofiStyle.check} />
            <CloseCircleOutlined className={nofiStyle.cross} />
          </div>
        </div>
      );
    }
  );

  return count ? (
    <Modal
      open={open}
      title="Notifications"
      onCancel={() => setOpen(false)}
      footer={[
        <Button key="submit" type="primary" onClick={() => setOpen(false)}>
          Ok
        </Button>,
      ]}
    >
      <Divider style={{ marginTop: "0px", marginBottom: "10px" }} />

      {options}
    </Modal>
  ) : (
    <Modal
      open={open}
      title="Notifications"
      onCancel={() => setOpen(false)}
      footer={[
        <Button key="submit" type="primary" onClick={() => setOpen(false)}>
          Ok
        </Button>,
      ]}
    >
      <Divider style={{ margin: "0px" }} />
      <p>There is no notification right now!</p>
      <Divider style={{ margin: "0px" }} />
    </Modal>
  );
}
