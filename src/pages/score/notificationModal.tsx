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
        scoreRequests={scoreRequests}
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
  setScoreRequests,
  scoreRequests
}: {
  req: ReqType;
  idx: number;
  name: string;
  displayScore: string;
  setScoreRequests: any;
  scoreRequests: ReqType[];
}) => {
  const [show, setShow] = useState(true);
  const nodeRef = useRef(null);
  console.log({show, idx, value: req.index})
  return (
      <CSSTransition
        in={show}
        nodeRef={nodeRef}
        timeout={800}
        classNames="cancel"
        onExited={()=>{ 
          setScoreRequests((scoreReqs:ReqType[])=>{
          const newState =  scoreReqs.filter((reqs)=>reqs.index!==req.index)
          return newState;
        })
          setShow(true);
      }}
        
      >
        <div ref={nodeRef} key={idx} className={nofiStyle.notification}>
          <p>
            {name} wants to know your {displayScore}.
          </p>
          <div className={nofiStyle.icons}>
            <CheckCircleOutlined
              onClick={() =>{setShow(false); handleReqResponse(req, true)}}
              className={nofiStyle.check}
              />
            <CloseCircleOutlined
              onClick={() =>{setShow(false); handleReqResponse(req, false)}}
              className={nofiStyle.cross}
            />
          </div>
        </div>
      </CSSTransition>
  );
};
