import React from 'react';
import styles from './index.module.css';

const Header: React.FC = () => {
  return (
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <img src="src/assets/datamind_logo.svg" alt="Logo" />
        </div>
      </header>
  );
};

export default Header;