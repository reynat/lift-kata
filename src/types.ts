type Direction = 'up' | 'down' | 'none';

enum Floor {
    Basement = 1,
    Ground = 2,
    First = 3,
    Second = 4,
}

interface Lift {
    floor: Floor;
}

interface PickupRequest {
    floor: Floor;
    direction: Direction;
}

interface DropOffRequest {
    floor: Floor;
}

type Request = PickupRequest | DropOffRequest;

interface FloorMonitor {
    dropOff: DropOffRequest[];
}

interface State {
    lift: Lift;
    monitor: FloorMonitor;
    destinationFloor: Floor;
}

type MoveLiftFunction = (lift: Lift) => Lift;
// type UpdateFloorMonitorFunction = (monitor: FloorMonitor) => FloorMonitor;

export {
    Direction,
    Floor,
    Lift,
    Request,
    PickupRequest,
    DropOffRequest,
    State,
    FloorMonitor,
    MoveLiftFunction,
};
