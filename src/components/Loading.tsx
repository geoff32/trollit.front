import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import styles from './Loading.module.scss';

interface LoadingProps {
}

export function Loading(props: LoadingProps) {
  return (
    <div className={styles.spinner}>
      <FontAwesomeIcon icon={faCircleNotch} spin />
    </div>
  )
}