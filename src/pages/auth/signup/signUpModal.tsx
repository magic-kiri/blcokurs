"use client";

import { useState } from "react";
import { Button, Divider, Input } from "antd";
import Modal from "../../../components/modal";
import sha256 from "crypto-js/sha256";

//@ts-ignore
export default function SignUpModal({ open, setOpen }) {
  const [name, setName] = useState<String>();
  const [identifier, setIdentifier] = useState<String>();
  const [password, setPassword] = useState<String>();
  const [confirmPassword, setConfirmPassword] = useState<String>();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (
      password === confirmPassword &&
      identifier &&
      identifier !== "" &&
      name &&
      name !== ""
    ) {
      const domain = process.env.NEXT_PUBLIC_BC_URL;
      setLoading(true);
      const body = {
        identifier,
        metadata: password,
        passHash: sha256(password).toString(),
      };
      try {
        const response = await fetch(domain + "/registration", {
          method: "post",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { publicKey } = await response.json();
        if (publicKey) {
          alert("Registered Successfully!");
        }
      } catch (err) {
        alert("Registered Failed :(!");
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Invalid Fields");
    }
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      title="Sign Up Process"
      onCancel={() => setOpen(false)}
      footer={[
        <Button key="back" onClick={() => setOpen(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>,
      ]}
    >
      <Divider style={{ margin: "0px" }} />
      <p style={{ padding: "5px" }}> Please enter your name.</p>
      <Input
        placeholder="Full Name"
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: "5px" }}
      />
      <p style={{ padding: "5px" }}> Please enter your identifier.</p>
      <Input
        placeholder="Unique Identifier"
        onChange={(e) => setIdentifier(e.target.value)}
      />
      <p style={{ padding: "5px" }}> Please enter a new password.</p>
      <Input.Password
        placeholder="New Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <p style={{ padding: "5px" }}> Please confirm your password.</p>
      <Input.Password
        placeholder="Confir Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </Modal>
  );
}
