import styles from './page.module.css';
import { useState, useEffect } from "react";
import { Divider } from 'antd';
import { apiCall } from "../../../public/apiCall";
import Cookies from "js-cookie";
import { scoreResponseQuery } from "../../../public/query";

type response = {
  index: number;
  verdict: string,
  us: boolean,
  fs: boolean,
  es: boolean,
  querier: string,
  responder?: string,
  responderName: string,
  values: {
    verdict: string,
    uscore?: number,
    fscore?: number,
    escore?: number
  }
}


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
  };
  userByResponder: {
    name: string;
    index: number;
    identifier: string;
  }
  response:string
};

export default function Home() {
  // const [name, setName] = useState<String>("Aia Lemonsky");
  const [responses, setResponses] = useState<response[]>([
    // {verdict: "accepted", us: true, fs: false, es: true, querier: "Harry Seldon", responderName: "Aia Lemonsky", values: {uscore: 68, fscore: 72, escore: 64} },
    // {verdict: "pending", us: true, fs: false, es: true, querier: "Lionel Messi", responderName: "Aia Lemonsky", values: {} },
    // {verdict: "rejected", us: true, fs: false, es: true, querier: "Manku", responderName: "Aia Lemonsky", values: {} }
  ])

  useEffect(()=>{
    //@ts-ignore
    const { identifier } = JSON.parse(Cookies.get("loginCookie"));
    const fetchScoreResponses = async () => {
      const { data } = await apiCall(scoreResponseQuery, { _eq: identifier });
      const requests: scoreRequest[] = data.Request
      const filteredRequests = requests.map((req)=>{
        const obj:response = JSON.parse(JSON.stringify(req));
        obj.responderName = req.userByResponder.name
        console.log(typeof req.response);
        obj.values = JSON.parse(req.response)
        obj.verdict = obj.values.verdict
        return obj
      })
      console.log(filteredRequests);
      setResponses(filteredRequests);
    };
    fetchScoreResponses();
  },[]);

  const options = responses.map(
    (res) =>
    {
      if(res.verdict=="Accepted") {
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
      else if(res.verdict=="Pending") {
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
