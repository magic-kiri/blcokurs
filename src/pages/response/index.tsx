import styles from './page.module.css';
import { useState } from "react";
import { Button } from 'antd';

let response: {verdict: string, us: number, fs: number, es: number}[]=[
  {verdict: "accepted", us: 68, fs: 72, es: 64},
  {verdict: "pending", us: 68, fs: 72, es: 64},
  {verdict: "rejected", us: 68, fs: 72, es: 64}
]

export default function Home() {
  const [name, setName] = useState<String>("Aia Lemonsky");

  return (
      <div className={styles.main}>
        <div className={styles.info}>
          <p style={{fontSize: "20px", marginBottom: "5px"}}>{name} accepted your request.</p>
          <p>Unified Score: <b>{response[0].us}</b></p>
          <p>Financial Score: <b>{response[0].fs}</b></p>
          <p>E-commerce Score: <b>{response[0].es}</b></p>
        </div>
        <div className={styles.info}>
          <p>{name} has not accepted your request yet.</p>
        </div>
        <div className={styles.info}>
          <p>{name} has not accepted your request yet.</p>
        </div>
        <div className={styles.info}>
          <p style={{fontSize: "20px", marginBottom: "5px"}}>{name} accepted your request.</p>
          <p>Unified Score: <b>{response[0].us}</b></p>
          <p>Financial Score: <b>{response[0].fs}</b></p>
          <p>E-commerce Score: <b>{response[0].es}</b></p>
        </div>

      </div>
  )
}
