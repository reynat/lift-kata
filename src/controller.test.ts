import {
    determineLiftDirection,
    findNewDestinationFloor,
    isAtDestinationFloor,
} from './controller';
import { Floor, FloorMonitor, Lift, State } from './types';

describe('isAtDestinationFloor', () => {
    it('should return true if lift is at destination floor', () => {
        const monitor: FloorMonitor = {
            dropOff: [],
        };
        const lift: Lift = {
            floor: Floor.First,
        };
        const currentState: State = {
            lift,
            monitor,
            destinationFloor: Floor.First,
        };
        const actual = isAtDestinationFloor(currentState);

        expect(actual).toBeTruthy();
    });
    it('should return false if lift is not at destination floor', () => {
        const monitor: FloorMonitor = {
            dropOff: [],
        };
        const lift: Lift = {
            floor: Floor.Second,
        };
        const currentState: State = {
            lift,
            monitor,
            destinationFloor: Floor.First,
        };
        const actual = isAtDestinationFloor(currentState);

        expect(actual).toBeFalsy();
    });
});

describe('findNewDestinationFloor', () => {
    it('should return the first request in the floor monitor', () => {
        const monitor: FloorMonitor = {
            dropOff: [
                {
                    floor: Floor.Ground,
                },
                {
                    floor: Floor.Basement,
                },
            ],
        };
        const actual = findNewDestinationFloor(monitor);

        expect(actual).toEqual(Floor.Ground);
    });
    it('should return undefined if there are no requests', () => {
        const monitor: FloorMonitor = {
            dropOff: [],
        };
        const actual = findNewDestinationFloor(monitor);

        expect(actual).toEqual(undefined);
    });
});

describe('determineLiftDirection', () => {
    it('should direct the lift to go up when destinationFloor is above currentFloor', () => {
        const currentFloor = Floor.Basement;
        const destinationFloor = Floor.Second;
        const actual = determineLiftDirection(currentFloor, destinationFloor);

        expect(actual).toEqual('up');
    });
    it('should direct the lift to go down when destinationFloor is below current floor', () => {
        const currentFloor = Floor.Second;
        const destinationFloor = Floor.Basement;
        const actual = determineLiftDirection(currentFloor, destinationFloor);

        expect(actual).toEqual('down');
    });
    it('should direct the lift to stay still when destinationFloor is the same as the current floor', () => {
        const currentFloor = Floor.Second;
        const destinationFloor = Floor.Second;
        const actual = determineLiftDirection(currentFloor, destinationFloor);

        expect(actual).toEqual('none');
    });
    it('should direct the lift to stay still when destinationFloor is undefined', () => {
        const currentFloor = Floor.Second;
        const destinationFloor = Floor.Second;
        const actual = determineLiftDirection(currentFloor, destinationFloor);

        expect(actual).toEqual('none');
    });
});
