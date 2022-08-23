import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { AlertComponentProps } from "../interfaces/components.interface";
import { DefaultAlertInfoStateValue } from "../interfaces/state.interface";

const Alert = (props: AlertComponentProps): JSX.Element => {
    const {alertInfoState: {alertInfo, setAlertInfo}} = props;
    const [showing, setShowing]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

    useEffect(() => {
        const show = setTimeout(() => {
            setAlertInfo(DefaultAlertInfoStateValue);
            setShowing(false);
        }, alertInfo.duration ?? 1500);

        return (): void => {
            clearTimeout(show);
        }
    }, [alertInfo]);

    return (
        <div className={`alerta ${alertInfo.msg ? 'fade' : ''} ${alertInfo.type}`}>
            {alertInfo.msg}
        </div>
    );
}

export default Alert;