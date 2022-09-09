import s from './player.module.css'
import { useRef, useState } from "react";
import { IEvent } from "../store/types";
import { video_url } from '../config';

type PlayerProps = {
    eventList: IEvent[]
}

const Player: React.FC<PlayerProps> = ({ eventList }) => {
    const [blocks, setBlocks] = useState<IEvent[]>([])
    const videoRef = useRef<HTMLVideoElement>(null)

    const handlerTimeUpdate = () => {
        let ms = Math.trunc(videoRef?.current!.currentTime * 1000),
            events: IEvent[] = []

        for (let i = 0; i < eventList.length; i++) {
            if (ms >= eventList[i].timestamp && (ms < (eventList[i].timestamp + eventList[i].duration))) {
                events.push(eventList[i])
            }
        }
        setBlocks(events)
    }

    const handlerChangeTime = (event: IEvent) => {
        videoRef.current && (videoRef.current.currentTime = videoRef.current && event.timestamp / 1000)
    }

    const timestampFormat = (timeStamp: number) => {
        let minutes = Math.trunc(timeStamp / 60000)
        let seconds = Math.trunc((timeStamp % 60000) / 1000)
        let milisec = (timeStamp % 1000)

        return `
            ${String(minutes).padStart(2, '0')}:
            ${String(seconds).padStart(2, '0')}:
            ${String(milisec).padStart(3, '0')}
        `
    }

    return (
        <div className={s.container}>
            <div className={s.video}>
                <video
                    controls
                    ref={videoRef}
                    src={video_url}
                    onTimeUpdate={handlerTimeUpdate}
                ></video>

                {blocks.map((block, index) => (
                    <div
                        key={index}
                        className={s.block}
                        style={{
                            width: block.zone.width,
                            height: block.zone.height,
                            top: block.zone.top,
                            left: block.zone.left,
                        }}
                    ></div>
                ))}
            </div>

            <div className={s.tableContainer}>
                <table className={s.table}>
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventList.map((event) => (
                            <tr key={event.id} onClick={() => handlerChangeTime(event)}>
                                <td>{timestampFormat(event.timestamp)}</td>
                                <td>{timestampFormat(event.timestamp + event.duration)}</td>
                                <td>{timestampFormat(event.duration)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Player