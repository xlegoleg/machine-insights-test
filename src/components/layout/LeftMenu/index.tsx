import React from 'react';
import styles from './index.module.css';
import {faGear, faInfoCircle, faBell, faFile, faArrowRightFromBracket, faIndustry} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const LeftMenuComponent: React.FC = () => {
  const menuItems = [
    {
      name: 'info',
      icon: faInfoCircle,
    },
    {
      name: 'bell',
      icon: faBell,
    },
    {
      name: 'file',
      icon: faFile
    },
    {
      name: 'gear',
      icon: faGear,
    },
  ]
  return (
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <FontAwesomeIcon size={'lg'} icon={faIndustry}/>
        </div>
        <ul>
          {menuItems.map((v) => {
            return (
              <li key={v.name} className={styles.sidebarIcon}>
                <FontAwesomeIcon size={'sm'} icon={v.icon}/>
              </li>
            )
          })}
        </ul>
        <ul className={styles.sidebarBottomActions}>
          <li className={styles.sidebarIcon}>
            <FontAwesomeIcon icon={faArrowRightFromBracket}/>
          </li>
          <li className={`${styles.sidebarIcon} ${styles.sidebarProfile}`}>
            <span>EG</span>
          </li>
        </ul>
      </aside>
  );
};

export const LeftMenu = React.memo(LeftMenuComponent);
