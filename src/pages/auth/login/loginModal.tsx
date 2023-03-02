"use client";

import { useState } from "react";
import { Button, Divider, Input } from "antd";
import sha256 from "crypto-js/sha256";
import Modal from "../../../components/modal";
import Router from "next/router";

//@ts-ignore
export default function LoginModal({ open, setOpen }) {
  const [identifier, setIdentifier] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const passHash = sha256(password.toString()).toString();
    try {
      const domain = process.env.NEXT_PUBLIC_BC_URL;
      const response = await fetch(domain + "/login", {
        method: "post",
        credentials: "include",
        body: JSON.stringify({
          passHash,
          identifier,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { status } = await response.json();
      if (status) {
        Router.push("/score")
      }
    } catch (err) {
      alert("Login Failed :(!");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      title="Login Process"
      onCancel={() => setOpen(false)}
      footer={[
        <Button key="back" onClick={() => setOpen(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleLogin}
        >
          Login
        </Button>,
      ]}
    >
      <Divider style={{ margin: "0px" }} />
      <p style={{ padding: "5px" }}> Please enter your identifier.</p>
      <Input
        placeholder="Identifier"
        onChange={(e) => setIdentifier(e.target.value)}
      />
      <p style={{ padding: "5px" }}> Please enter your password.</p>
      <Input.Password
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </Modal>
  );
}
