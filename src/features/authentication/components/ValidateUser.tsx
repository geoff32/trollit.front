import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { validateAsync } from "../authenticationSlice";

export function ValidateUser() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(validateAsync());
    }, [dispatch]);

    return <></>
}