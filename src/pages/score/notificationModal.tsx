"use client";
import React from "react";
import { useState } from "react";
import { Button, Divider } from "antd";
import nofiStyle from "./notificationModal.module.css";
import Modal from "../../components/modal";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

//@ts-ignore
export default function NotificationModal({ open, setOpen, scoreRequests }) {
  const handleReqResponse = async (req: any, verdict: boolean) => {
    try {
      const { us, fs, es, index, querier, responder, userByResponder } = req;
      const domain = process.env.NEXT_PUBLIC_BC_URL;
      const response = await fetch(domain + "/responseScoreRequest", {
        method: "post",
        credentials: "include",
        body: JSON.stringify({
          index,
          verdict,
          us,
          fs,
          es,
          querier,
          responder,
          responderName: userByResponder.name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = await response.json();
      console.log(body);
    } catch (err) {
      console.log(err);
      alert("Error Occured");
    }
  };

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
      userByResponder: {
        name: string;
        index: number;
        identifier: string;
      };
    }) => {
      const { us, fs, es } = req;
      const list: string[] = [];
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
          <div className={nofiStyle.icons}>
            <CheckCircleOutlined
              onClick={() => handleReqResponse(req, true)}
              className={nofiStyle.check}
            />
            <CloseCircleOutlined
              onClick={() => handleReqResponse(req, false)}
              className={nofiStyle.cross}
            />
          </div>
        </div>
      );
    }
  );

  return scoreRequests.length ? (
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
      <p style={{marginTop: "5px", marginBottom: "5px"}}>There is no notification right now!</p>
      <Divider style={{ margin: "0px" }} />
    </Modal>
  );
}
