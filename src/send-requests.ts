import { DropOffRequest, PickUpRequest, LiftRequest, Floor, Direction, direction, FloorMonitor, Lift, State } from "./types"

const sendPickUpRequests = (
    pickupRequests: PickUpRequest[],
    floorMonitor: FloorMonitor
): FloorMonitor => {
    return {
        ...floorMonitor,
        pickUpRequests: [...floorMonitor.pickUpRequests, ...pickupRequests],
    };
};

const sendDropOffRequests = (
    dropOffRequests: DropOffRequest[],
    lift: Lift
): Lift => {
    return {
        ...lift,
        dropOffRequests: [...lift.dropOffRequests, ...dropOffRequests],
    };
};

const sendRequests = (requests: LiftRequest[], state: State): State => {
    const [pickUpRequests, dropOffRequests] = requests.reduce(([pickUp, dropOff], request) => (
        isPickUpRequest(request) ? [[...pickUp, request], dropOff] : [pickUp, [...dropOff, request]]
    ), [[], []]);

    return {
        ...state,
        lift: sendDropOffRequests(dropOffRequests, state.lift),
        monitor: sendPickUpRequests(pickUpRequests, state.monitor)
    }
}

const isPickUpRequest = (request: LiftRequest): request is PickUpRequest => {
    return (request as PickUpRequest).direction !== undefined;
}


export { sendRequests, sendPickUpRequests, sendDropOffRequests }