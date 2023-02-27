import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './Home.module.scss'

export function Home() {
  return (
    <div>
      <FontAwesomeIcon className={styles["home-logo"]} icon={faScrewdriverWrench} />
    </div>
  )
}