import { MAX_NUM_FLOORS, MIN_NUM_FLOORS } from './move';
import { DropOffRequest, Floor, FloorMonitor, Lift, State } from './types';

const MAX_DROPOFF_REQUESTS = 3;

const sendDropOffRequests = (
    dropOffRequests: DropOffRequest[],
    floorMonitor: FloorMonitor
): FloorMonitor => {
    return {
        ...floorMonitor,
        dropOff: [...floorMonitor.dropOff, ...dropOffRequests],
    };
};

const generateRandomFloor = (
    lowestFloor: number,
    highestFloor: number
): Floor =>
    Math.floor(Math.random() * (highestFloor - lowestFloor + 1)) + lowestFloor;


const generateDropOffRequests = (): DropOffRequest[] => {
    const numRequests = Math.floor(Math.random() * MAX_DROPOFF_REQUESTS + 1)
    return Array.from(Array(numRequests), () => ({floor: generateRandomFloor(MIN_NUM_FLOORS, MAX_NUM_FLOORS)}))
}

const updateFloorMonitor = (currentState: State, floorMonitor: FloorMonitor): State => {
    return {
        ... currentState,
        monitor: floorMonitor
    }
}

const visitFloor = (lift: Lift, floorMonitor: FloorMonitor): FloorMonitor => {
    const currentFloor = lift.floor;
    const remainingRequests = floorMonitor.dropOff.filter((request) => request.floor !== currentFloor)
    return {
        ... floorMonitor,
        dropOff: remainingRequests
    }
}

export { generateRandomFloor, sendDropOffRequests, generateDropOffRequests, updateFloorMonitor, visitFloor };
