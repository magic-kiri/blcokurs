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
import Router from "next/router";
import { scoreRequestQuery, userInfoQuery } from "../../../public/query";
import { apiCall } from "../../../public/apiCall";

type User = {
  identifier: string;
  publicKey: string;
};

type scoreRequest = {
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
  }
};

const filter = (searchText: string, registeredUsers: User[]) => {
  const filteredUser = registeredUsers.filter((user) =>
    user.identifier.includes(searchText)
  );
  return filteredUser.map((user) => {
    return { value: user.identifier };
  });
};

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
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
  const [reqInfo, setReqInfo] = useState<{ identifier: string; name: string }>({
    identifier: "Loading...",
    name: "Loading...",
  });

  const [scoreRequests, setScoreRequests] = useState<scoreRequest[]>([]);

  useEffect(() => {
    try{
      //@ts-ignore
      const { identifier, name } = JSON.parse(Cookies.get("loginCookie"));
      setIdentifier(identifier);
      setName(name);
      const domain = process.env.NEXT_PUBLIC_BC_URL;
  
      const fetchAndUpdateUsers = async () => {
        const response = await fetch(domain + "/getUserList", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const users = await response.json();
        setRegisteredUsers(users);
      };
      fetchAndUpdateUsers();
      const fetchAndUpdateScore = async () => {
        const response = await fetch(domain + "/getReputationScore", {
          method: "get",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const { eCommerceScore, financialScore, unifiedScore } = data;
        setFinScore(financialScore);
        setEcomScore(eCommerceScore);
        setUniScore(unifiedScore);
      };
      fetchAndUpdateScore();
  
      const fetchScoreReq = async () => {
        const {data} = await apiCall(scoreRequestQuery, { _eq: identifier });
        setScoreRequests(data.Request)
      };
      fetchScoreReq()
    }catch(err)
    {
      console.log(err);
    }
  }, []);
  const onSearch = (searchText: string) => {
    setOptions(!searchText ? [] : filter(searchText, registeredUsers));
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  const onSelect = (value: string) => {
    setOpenRequest(true);
    console.log(value);
    apiCall(userInfoQuery, { identifier: value }).then((res) => {
      const nameFromDB = res.data.User[0].name;
      console.log(res.data.User[0]);
      setReqInfo({ identifier: value, name: nameFromDB });
    });
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

          <Badge dot count={scoreRequests.length}>
            <NotificationOutlined
              className={styles.icon}
              onClick={() => setOpenNotification(true)}
            />
          </Badge>
          <LogoutOutlined
            className={styles.icon}
            onClick={() => Router.push("/")}
          />
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

        <RequestModal
          open={openRequest}
          setOpen={setOpenRequest}
          identifier={reqInfo.identifier}
          name={reqInfo.name}
          querier={identifier}
        />
        <NotificationModal
          open={openNotification}
          setOpen={setOpenNotification}
          scoreRequests = {scoreRequests}
        />
      </div>
    </Page>
  );
}
