import Head from "next/head";
import styles from '@/styles/Layout.module.css';
import Footer from "./Footer";
import Header from "./Header";
import Showcase from "./Showcase";
import { useRouter } from "next/router";
const Layout = ({ title, keywords, description, children }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header/>
      { router.pathname === '/' && <Showcase/>}
      <div className={styles.container}>{children}</div>
      <Footer></Footer>
    </>
  );
};

Layout.defaultProps = {
  title: "DJ Events",
  description: "Find the latest DJ and other musical events",
  keywords: "music, dj, edm, events",
};

export default Layout;
