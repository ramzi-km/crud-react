/* eslint-disable react/prop-types */
import { hatch } from 'ldrs'
hatch.register()

const Loading = ({
    size = '70',
    stroke = '9',
    speed = '3.5',
    color = 'oklch(var(--a))',
    round = 'rounded-lg',
}) => {
    return (
        <>
            <div
                className={
                    'absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-accent ' +
                    round
                }
            >
                <l-hatch
                    size={size}
                    stroke={stroke}
                    speed={speed}
                    color={color}
                ></l-hatch>
            </div>
        </>
    )
}

export default Loading
