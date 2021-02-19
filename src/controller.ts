import { Direction, Floor, FloorMonitor, State } from './types';

const decideNextMove = (currentState: State): Direction => {
    if (isAtDestinationFloor(currentState)) {
        const newDestination = findNewDestinationFloor(currentState.monitor);
        return determineLiftDirection(currentState.lift.floor, newDestination);
    }
    return determineLiftDirection(
        currentState.lift.floor,
        currentState.destinationFloor
    );
};

const isAtDestinationFloor = (currentState: State) => {
    return currentState.lift.floor === currentState.destinationFloor;
};

const findNewDestinationFloor = (monitor: FloorMonitor): Floor | undefined => {
    return monitor.dropOff.shift()?.floor;
};

const determineLiftDirection = (
    currentFloor: Floor,
    destinationFloor: Floor | undefined
): Direction => {
    if (destinationFloor) {
        if (currentFloor < destinationFloor) {
            return 'up';
        } else if (currentFloor > destinationFloor) {
            return 'down';
        }
    }
    return 'none';
};

export {
    isAtDestinationFloor,
    findNewDestinationFloor,
    determineLiftDirection,
    decideNextMove,
};
