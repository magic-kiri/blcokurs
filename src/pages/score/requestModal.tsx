"use client"

import { useState } from "react";
import {Button, Divider, Checkbox} from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

import Modal from "../../components/modal";

const plainOptions = ['Unified Score', 'Financial Score', 'E-commerce Score'];
const defaultCheckedList = ['Unified Score'];

//@ts-ignore
export default function RequestModal({  open, setOpen }) {
  const [name, setName] = useState<String>("Aia Lemonsky");
  const [identifier, setIdentifier] = useState<String>("Kaaktaal");
  const [loading, setLoading] = useState(false);

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const handleRequest = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <Modal
      open={open}
      title="Request for User Reputation"
      onCancel={()=>setOpen(false)}
      footer={[
        <Button key="back" onClick={()=>setOpen(false)}>
            Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleRequest}>
            Request
        </Button>,
      ]}
    >
    <Divider style={{marginTop: "0px", marginBottom: "10px"}}/>
    <p>User Name: <b>{name}</b></p>
    <p>User Identifier: <b>{identifier}</b></p>
    <p style={{marginTop: "10px"}}>(Please, check the preferred options.)</p>
    
    <Checkbox.Group options={plainOptions} value={checkedList} onChange={onChange} />
    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Check all
    </Checkbox>
    
    </Modal>
  );
}