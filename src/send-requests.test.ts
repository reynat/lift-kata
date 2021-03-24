import { sendDropOffRequests, sendPickUpRequests, sendRequests } from "./send-requests";
import { DropOffRequest, Floor, FloorMonitor, Lift, PickUpRequest, State } from "./types"

describe('sendPickUpRequests', () => {
    it('should append new pick up requests to the floor monitor', () => {
        const newPickUpRequests: PickUpRequest[] = [{
                direction: 'up',
                floor: Floor.Basement
        }]
        const floorMonitor: FloorMonitor = {
            pickUpRequests: []
        };
        const expected: FloorMonitor = {
            pickUpRequests: [{
                direction: 'up',
                floor: Floor.Basement
            }]
        }
        const actual = sendPickUpRequests(newPickUpRequests, floorMonitor);
        
        expect(actual).toEqual(expected);
    });
    it('should make no changes to the floor monitor if no requests were sent', () => {
        const newPickUpRequests: PickUpRequest[] = [];
        const floorMonitor: FloorMonitor = {
            pickUpRequests: []
        };
        const expected: FloorMonitor = {
            pickUpRequests: []
        }
        const actual = sendPickUpRequests(newPickUpRequests, floorMonitor);
        
        expect(actual).toEqual(expected);
    });
})

describe('sendDropOffRequests', () => {
    it('should append new drop off requests to the lift', () => {
        const newDropOffRequests: DropOffRequest[] = [{
                floor: Floor.Basement
        }]
        const lift: Lift = {
            floor: Floor.First,
            dropOffRequests: []
        };
        const expected: Lift = {
            floor: Floor.First,
            dropOffRequests: [{
                floor: Floor.Basement
            }]
        }
        const actual = sendDropOffRequests(newDropOffRequests, lift);
        
        expect(actual).toEqual(expected);
    });
})

describe('sendRequests', () => {
    it('should append new pick up requests to the floor monitor', () => {
        const newPickUpRequests: PickUpRequest[] = [{
            direction: 'up',
            floor: Floor.Basement
        }]
        const initialState: State = {
            destinationFloor: Floor.Basement,
            lift: {
                floor: Floor.Ground,
                dropOffRequests: []
            },
            monitor: {
                pickUpRequests: []
            }
        };
        const expected: State = {
            destinationFloor: Floor.Basement,
            lift: {
                floor: Floor.Ground,
                dropOffRequests: []
            },
            monitor: {
                pickUpRequests: [{
                    direction: 'up',
                    floor: Floor.Basement
                }]
            }
        }
        const actual = sendRequests(newPickUpRequests, initialState);
        
        expect(actual).toEqual(expected);
    });
    it('should append new drop off requests to the lift', () => {
        const newDropOffRequests: DropOffRequest[] = [{
            floor: Floor.Basement
        }];
        const initialState: State = {
            destinationFloor: Floor.Basement,
            lift: {
                floor: Floor.Ground,
                dropOffRequests: []
            },
            monitor: {
                pickUpRequests: []
            }
        };
        const expected: State = {
            destinationFloor: Floor.Basement,
            lift: {
                floor: Floor.Ground,
                dropOffRequests: [{
                    floor: Floor.Basement
                }]
            },
            monitor: {
                pickUpRequests: []
            }
        }
        const actual = sendRequests(newDropOffRequests, initialState);
        
        expect(actual).toEqual(expected);
    });
})