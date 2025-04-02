import React from "react";
import Countdown from "react-countdown";

const CountdownTimer = () => {
    // Set end date to December 3rd, 2024 at 8 AM
    const endDate = new Date("2025-04-02T18:00:00").getTime();

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span className="text-red-500 sm:font-bold">New products dropped!</span>;
        }

        const timeUnits = [
            { label: "Days", value: days },
            { label: "Hours", value: hours },
            { label: "Minutes", value: minutes },
        ];

        return (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-6 text-white">
                {timeUnits.map((unit, index) => (
                    <div key={unit.label} className="flex flex-col items-center">
                        <span className="sm:text-xl sm:font-semibold uppercase">
                            {index < (timeUnits.length) && `-`}
                            {unit.value.toString().padStart(2, "0") } {unit.label}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <Countdown date={endDate} renderer={renderer} suppressHydrationWarning />
        </div>
    );
};

export default CountdownTimer;
