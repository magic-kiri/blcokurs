"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Page from "@/components/pagewrap";
import { Input, Badge } from "antd";
import { LogoutOutlined, NotificationOutlined } from "@ant-design/icons";
import { AutoComplete } from "antd";
import RequestModal from "./requestModal";
import NotificationModal from "./notificationModal";
import Cookies from "js-cookie";

const { Search } = Input;
const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

export default function Score() {
  const [name, setName] = useState<string>("Aia Lemonsky");
  const [identifier, setIdentifier] = useState<string>("Loading...");
  const [uniScore, setUniScore] = useState<number>(75);
  const [finScore, setFinScore] = useState<number>(88);
  const [ecomScore, setEcomScore] = useState<number>(64);

  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [value, setValue] = useState("");

  const [openRequest, setOpenRequest] = useState<boolean>(false);
  const [openNotification, setOpenNotification] = useState<boolean>(false);

  useEffect(() => {
    //@ts-ignore
    const { identifier, name } = JSON.parse(Cookies.get("loginCookie"));
    setIdentifier(identifier);
    setName(name);
    console.log("Check 0");
    const getScore = async () => {
      const domain = process.env.NEXT_PUBLIC_BC_URL;
      const response = await fetch(domain + "/getReputationScore", {
        method: "get",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Check 1");
      const data = await response.json();
      console.log(data);
      const { eCommerceScore, financialScore, unifiedScore } = data;
      console.log("Check 2");
      setFinScore(financialScore);
      setEcomScore(eCommerceScore);
      setUniScore(unifiedScore);
    };
    getScore();
  }, []);

  const onSearch = (searchText: string) => {
    setOptions(
      !searchText
        ? []
        : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
    );
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  const onSelect = () => {
    setOpenRequest(true);
  };

  return (
    <Page title="BlockURS">
      <div className={styles.main}>
        <div className={styles.top}>
          <AutoComplete
            value={value}
            options={options}
            className={styles.searchbar}
            onSearch={onSearch}
            onChange={onChange}
            onSelect={onSelect}
          >
            <Input.Search size="large" placeholder="search here" />
          </AutoComplete>

          <Badge dot count={5}>
            <NotificationOutlined
              className={styles.icon}
              onClick={() => setOpenNotification(true)}
            />
          </Badge>
          <LogoutOutlined className={styles.icon} />
        </div>

        <div className={styles.info}>
          <p style={{ fontSize: "20px" }}> {name} </p>
          <p> {identifier} </p>
        </div>

        <div className={styles.info}>
          <b style={{ fontSize: "20px", marginBottom: "0px" }}>
            {" "}
            Unified Score{" "}
          </b>
          <h1 style={{ fontSize: "50px" }}> {uniScore} </h1>
        </div>

        <div className={styles.domscore}>
          <div className={styles.score}>
            <b> Financial Score</b>
            <b style={{ fontSize: "25px" }}> {finScore} </b>
          </div>
          <div className={styles.score}>
            <b> E-commerce Score</b>
            <b style={{ fontSize: "25px" }}>{ecomScore} </b>
          </div>
        </div>

        <RequestModal open={openRequest} setOpen={setOpenRequest} />
        <NotificationModal
          open={openNotification}
          setOpen={setOpenNotification}
        />
      </div>
    </Page>
  );
}
