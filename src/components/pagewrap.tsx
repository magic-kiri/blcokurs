import React from "react";
import Footer from "./footer";
import Head from "next/head";
import Navbar from "./navbar";

interface PageProps {
  title: string;
  children: any;
}

const Page: React.FC<PageProps> = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {/* <Navbar /> */}
      {children}
      <Footer />
    </div>
  );
};

export default Page;