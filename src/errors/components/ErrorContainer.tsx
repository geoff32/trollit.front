import { Alert, Progress } from "reactstrap";
import { resetError, selectErrors } from "../errorSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useCallback, useEffect, useState } from "react";

import styles from './ErrorContainer.module.scss';

export default function ErrorContainer() {
  const errors = useAppSelector(selectErrors);

  return (
    <div className={styles["alert-fixed"]}>{
      errors.map((error) => <ErrorAlert key={error.id} {...error} />)
    }
    </div>
  )
}

function ErrorAlert(error: Readonly<{ id: string, title: string, detail: string }>) {
  const [remaining, setRemaining] = useState(100);
  const duration = 5000;
  const refresh = 200;

  const dispatch = useAppDispatch();
  const close = useCallback(() => {
    dispatch(resetError(error));
  }, [dispatch, error]);

  const { title, detail } = error;
  useEffect(() => {
    const interval = setInterval(() => {
      if (remaining <= 0) {
        clearInterval(interval);
        close();
      }

      setRemaining(r => r - 100 * refresh / duration);
    }, refresh);

    return () => clearInterval(interval);
  }, [close, remaining])

  return (
    <Alert toggle={close} title={title} color="danger">
      {detail}
      <Progress value={remaining} color="danger" />
    </Alert>
  )
}