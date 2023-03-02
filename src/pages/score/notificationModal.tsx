"use client"

import { useState } from "react";
import {Button, Divider} from 'antd';
import nofiStyle from './notificationModal.module.css';
import Modal from "../../components/modal";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

//@ts-ignore
export default function NotificationModal({  open, setOpen }) {
    const [count, setCount] = useState<number>(5);

  return count? (
    <Modal
      open={open}
      title="Notifications"
      onCancel={()=>setOpen(false)}
      footer={[
        <Button key="submit" type="primary" onClick={()=>setOpen(false)}>
            Ok
        </Button>,
      ]}
    >
    <Divider style={{marginTop: "0px", marginBottom: "10px"}}/>

    <div className={nofiStyle.notification}>
      <p>Harry Seldon wants to know your Unififed Score.</p>
      <div>
        <CheckCircleOutlined className={nofiStyle.check}/>
        <CloseCircleOutlined className={nofiStyle.cross}/>
      </div>
    </div>

    <div className={nofiStyle.notification}>
      <p>Lionel Messi wants to know your Financial Score.</p>
      <div>
        <CheckCircleOutlined className={nofiStyle.check}/>
        <CloseCircleOutlined className={nofiStyle.cross}/>
      </div>
    </div>
    
    </Modal>
  ) : (
    <Modal
      open={open}
      title="Notifications"
      onCancel={()=>setOpen(false)}
      footer={[
        <Button key="submit" type="primary" onClick={()=>setOpen(false)}>
            Ok
        </Button>,
      ]}
    >
      <Divider style={{margin: "0px"}}/>
      <p>There is no notification right now!</p>
      <Divider style={{margin: "0px"}}/>
    </Modal>
  );
}