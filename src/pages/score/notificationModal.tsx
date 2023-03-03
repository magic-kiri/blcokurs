"use client";
import React from "react";
import { useState, useRef } from "react";
import { Button, Divider } from "antd";
import nofiStyle from "./notificationModal.module.css";
import Modal from "../../components/modal";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
//@ts-ignore
import { CSSTransition } from "react-transition-group";

type ReqType = {
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
};

//@ts-ignore
export default function NotificationModal({ open, setOpen, scoreRequests, setScoreRequests }) {
  const options = scoreRequests.map((req: ReqType, idx: number) => {
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
      displayScore = list[0] + ", " + list[1] + " and " + list[2];
    }
    return (
      <SingleRequest
        req={req}
        name={req.User.name}
        idx={idx}
        displayScore={displayScore}
        setScoreRequests={setScoreRequests}
      />
    );
  });

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
      <p style={{ marginTop: "5px", marginBottom: "5px" }}>
        There is no notification right now!
      </p>
      <Divider style={{ margin: "0px" }} />
    </Modal>
  );
}


const handleReqResponse = async (req: any, verdict: boolean, setScoreRequests: any) => {
  try {
    const { us, fs, es, index, querier, responder, userByResponder } = req;
    console.log({ querier, responder });
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
    if(body)
    {
      setScoreRequests((scoreRequests:ReqType[])=>{
        return scoreRequests.filter((req)=>req.index!==index)
      })
    }
  } catch (err) {
    console.log(err);
    alert("Error Occured");
  }
};

const SingleRequest = ({
  req,
  idx,
  name,
  displayScore,
  setScoreRequests
}: {
  req: ReqType;
  idx: number;
  name: string;
  displayScore: string;
  setScoreRequests: any;
}) => {
  const [show, setShow] = useState(true);
  const nodeRef = useRef(null);
  return (
      <CSSTransition
        in={show}
        nodeRef={nodeRef}
        timeout={600}
        classNames="cancel"
        unmountOnExit
      >
        <div ref={nodeRef} key={idx} className={nofiStyle.notification}>
          <p>
            {name} wants to know your {displayScore}.
          </p>
          <div className={nofiStyle.icons}>
            <CheckCircleOutlined
              onClick={() =>{setShow(false); handleReqResponse(req, true, setScoreRequests)}}
              className={nofiStyle.check}
              />
            <CloseCircleOutlined
              onClick={() =>{setShow(false); handleReqResponse(req, false, setScoreRequests)}}
              className={nofiStyle.cross}
            />
          </div>
        </div>
      </CSSTransition>
  );
};
