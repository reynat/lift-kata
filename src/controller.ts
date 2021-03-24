import { visitFloor } from './floorMonitor';
import { moveLift } from './move';
import { Direction, Floor, FloorMonitor, LiftCommand, State } from './types';

const execute = (currentState: State, nextMove: LiftCommand): State => {
    // Move lift
    const newLiftState = moveLift(currentState.lift, nextMove.direction);

    // Update floor monitor
    const newMonitor = visitFloor(newLiftState, currentState.monitor);

    return {
        lift: newLiftState,
        monitor: newMonitor,
        destinationFloor: nextMove.destinationFloor
    }
}

const decideNextMove = (currentState: State): LiftCommand => {
    if (isAtDestinationFloor(currentState)) {
        const newDestination = findNewDestinationFloor(currentState);
        const newDirection = determineLiftDirection(currentState.lift.floor, newDestination);
        return {
            direction: newDirection,
            destinationFloor: newDestination ?? currentState.destinationFloor
        }
    }
    return {
        direction: determineLiftDirection(
        currentState.lift.floor,
        currentState.destinationFloor
    ),
        destinationFloor: currentState.destinationFloor
    }
};

const isAtDestinationFloor = (currentState: State) => {
    return currentState.lift.floor === currentState.destinationFloor;
};

const findNewDestinationFloor = (state: State): Floor | undefined => {
    // Priority to drop off requests
    return state.lift.dropOffRequests.shift()?.floor ?? state.monitor.pickUpRequests.shift()?.floor;
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
    execute
};
