import { FloorMonitor, Lift, } from './types';

const visitFloor = (lift: Lift, floorMonitor: FloorMonitor): FloorMonitor => {
    const currentFloor = lift.floor;
    const remainingRequests = floorMonitor.pickUpRequests.filter((request) => request.floor !== currentFloor)
    return {
        ... floorMonitor,
        pickUpRequests: remainingRequests
    }
}

export { visitFloor };
