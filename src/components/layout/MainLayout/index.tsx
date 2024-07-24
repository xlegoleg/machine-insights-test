import React from 'react';
import styles from './index.module.css';
import { LeftMenu } from "../LeftMenu";
import Header from "../Header";

export const MainLayout: React.FC = ({ children }) => {
  return (
      <div className={styles.layout}>
        <LeftMenu />
        <div className={styles.main}>
          <Header />
          <main className={styles.content}>
            {children}
          </main>
        </div>
      </div>
  );
};
