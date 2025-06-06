import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useRouter } from "next/navigation";

const CountdownTimer = ({ onComplete }) => {
    const router = useRouter();

    const end = process.env.NEXT_PUBLIC_SCH_TIME || "2024-05-12T09:32:00";
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        const parsedDate = new Date(end).getTime();
        setEndDate(parsedDate);
        console.log("End date set to:", parsedDate);
    }, [end]);

    const handleComplete = () => {
        console.log("Countdown completed in child");
        onComplete?.(); // call parent handler
        router.replace("/"); // client-side redirect
    };

    const renderer = ({ days, hours, minutes, seconds }) => {
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
            {endDate && (
                <Countdown
                    date={endDate}
                    renderer={renderer}
                    onComplete={handleComplete}
                    suppressHydrationWarning
                />
            )}
        </div>
    );
};

export default CountdownTimer;
