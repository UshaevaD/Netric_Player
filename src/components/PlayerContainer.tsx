import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useAppDispatch } from "../hooks/useAppDispatch";
import { eventListRequest } from "../store/actions";
import { RootState } from "../store/store";
import { IState } from "../store/types";

import Player from "./Player"

const PlayerContainer: React.FC = () => {
    const { eventList } = useSelector<RootState, IState>((state) => state.eventReducer)
    const dispatch = useAppDispatch()

    useEffect(() => { dispatch(eventListRequest()) }, []);

    return (
        <Player eventList={eventList} />
    )
}

export default PlayerContainer