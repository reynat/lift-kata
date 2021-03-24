import { moveUpAFloor, moveDownAFloor, moveLift } from './move';
import { Floor, Lift } from './types';

describe('should move up one floor', () => {
    it('should move to First floor from G floor', () => {
        const lift: Lift = {
            floor: Floor.Ground,
            dropOffRequests: []
        };
        const expected: Lift = {
            floor: Floor.First,
            dropOffRequests: []
        };
        const actual = moveUpAFloor(lift);

        expect(actual).toEqual(expected);
    });
    it('should not move beyond the top floor', () => {
        const lift: Lift = {
            floor: Floor.Second,
            dropOffRequests: []
        };
        const expected: Lift = {
            floor: Floor.Second,
            dropOffRequests: []
        };
        const actual = moveUpAFloor(lift);

        expect(actual).toEqual(expected);
    });
});

describe('should move down one floor', () => {
    it('should move to First floor from Second floor', () => {
        const lift: Lift = {
            floor: Floor.Second,
            dropOffRequests: []
        };
        const expected: Lift = {
            floor: Floor.First,
            dropOffRequests: []
        };
        const actual = moveDownAFloor(lift);

        expect(actual).toEqual(expected);
    });
    it('should not move beyond the bottom floor', () => {
        const lift: Lift = {
            floor: Floor.Ground,
            dropOffRequests: []
        };
        const expected: Lift = {
            floor: Floor.Basement,
            dropOffRequests: []
        };
        const actual = moveDownAFloor(lift);

        expect(actual).toEqual(expected);
    });
});

describe('should move in the correct direction', () => {
    it('should move up a floor when the direction is up', () => {
        const lift: Lift = {
            floor: Floor.Ground,
            dropOffRequests: []
        };
        const expected: Lift = {
            floor: Floor.First,
            dropOffRequests: []
        };
        const actual = moveLift(lift, 'up');

        expect(actual).toEqual(expected);
    });
    it('should move down a floor when the direction is down', () => {
        const lift: Lift = {
            floor: Floor.First,
            dropOffRequests: []
        };
        const expected: Lift = {
            floor: Floor.Ground,
            dropOffRequests: []
        };
        const actual = moveLift(lift, 'down');

        expect(actual).toEqual(expected);
    });
});
