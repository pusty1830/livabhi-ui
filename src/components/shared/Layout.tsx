import React from "react";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import "./Layout.css";
import color from "../utils/Colors";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  //   const location = useLocation();

  //   const isAuthPage = location.pathname === "/auth";

  return (
    <div style={{background:color.secondColor}}>
      <Header />{" "}
      <main
        style={{
          // paddingTop: "110px",
          backgroundImage: "url(/assets/backgroundsvg.svg)",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100%",
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
