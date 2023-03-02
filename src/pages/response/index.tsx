import styles from './page.module.css';
import { useState } from "react";
import { Divider } from 'antd';

type response = {
  verdict: string,
  us: boolean,
  fs: boolean,
  es: boolean,
  querier: string,
  responder?: string,
  responderName: string,
  values: {
    uscore?: number,
    fscore?: number,
    escore?: number
  }
}

export default function Home() {
  const [name, setName] = useState<String>("Aia Lemonsky");
  const [responses, setResponses] = useState<response[]>([
    {verdict: "accepted", us: true, fs: false, es: true, querier: "Harry Seldon", responderName: "Aia Lemonsky", values: {uscore: 68, fscore: 72, escore: 64} },
    {verdict: "pending", us: true, fs: false, es: true, querier: "Lionel Messi", responderName: "Aia Lemonsky", values: {} },
    {verdict: "rejected", us: true, fs: false, es: true, querier: "Manku", responderName: "Aia Lemonsky", values: {} }
  ])

  const options = responses.map(
    (res) =>
    {
      if(res.verdict=="accepted") {
        return(
          <div className={styles.accepted}>
            <p><b>{res.responderName}</b> has accepted your request to know their Reputation Scores!</p>
            <Divider orientation="center" plain style={{margin: "10px"}}>
              <b> Scores </b>
            </Divider>

            {res.us ? (
              <div>
                Unified Score: {res.values.uscore}
              </div> 
            ) : (
              <>  </>
            )}

            {res.fs ? (
              <div>
                Financial Score: {res.values.fscore}
              </div> 
            ) : (
              <>  </>
            )}

            {res.es ? (
              <div>
                E-commerce Score: {res.values.escore}
              </div> 
            ) : (
              <>  </>
            )}

          </div>
        )
      }
      else if(res.verdict=="pending") {
          return(
            <div className={styles.pending}>
              <p><b>{res.responderName}</b> has not yet responded to your request of knowing their Reputation Scores. Please wait for acceptance.</p>
              <Divider orientation="center" plain style={{margin: "10px"}}>
                <b> Requested Scores </b>
              </Divider>

            {res.us ? (
              <div>
                Unified Score {res.values.uscore}
              </div> 
            ) : (
              <>  </>
            )}

            {res.fs ? (
              <div>
                Financial Score {res.values.fscore}
              </div> 
            ) : (
              <>  </>
            )}

            {res.es ? (
              <div>
                E-commerce Score {res.values.escore}
              </div> 
            ) : (
              <>  </>
            )}

            </div>
            
          )
      } else {
          return(
            <div className={styles.rejected}>
              <p><b>{res.responderName}</b> has rejected yor request to know their Reputation Score.</p>
              <Divider orientation="center" plain style={{margin: "10px"}}>
                <b> Requested Scores </b>
              </Divider>

            {res.us ? (
              <div>
                Unified Score {res.values.uscore}
              </div> 
            ) : (
              <>  </>
            )}

            {res.fs ? (
              <div>
                Financial Score {res.values.fscore}
              </div> 
            ) : (
              <>  </>
            )}

            {res.es ? (
              <div>
                E-commerce Score {res.values.escore}
              </div> 
            ) : (
              <>  </>
            )}

            </div>
          )
      }
    }
  );

  return (
      <div className={styles.main}>
        {options}

      </div>
  )
}
