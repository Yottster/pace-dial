import { curry } from 'ramda'
export const PaceCalculator = {};

PaceCalculator.distance = curry((minutes, pace) => minutes / pace);

PaceCalculator.pace = curry((distance, minutes) => {
    let pace = minutes / distance;
    return {
        pace: pace,
        minutes: pace | 0,
        seconds: Math.round(PaceCalculator.remainingSeconds(pace))
    }
});

PaceCalculator.time = curry((distance, pace) => distance * pace);

PaceCalculator.remainingSeconds = minutes => minutes * 60 % 60;

PaceCalculator.prettyMinutes = minutes => ({
    minutes: minutes | 0,
    seconds: Math.round(PaceCalculator.remainingSeconds(minutes))
})

PaceCalculator.combineToMinutes = curry((minutes, seconds) => minutes + seconds / 60);