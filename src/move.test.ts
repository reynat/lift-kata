import { moveUpAFloor, moveDownAFloor, moveLift } from './move';
import { Floor, Lift } from './types';

describe('should move up one floor', () => {
    it('should move to First floor from G floor', () => {
        const lift: Lift = {
            floor: Floor.Ground,
        };
        const expected: Lift = {
            floor: Floor.First,
        };
        const actual = moveUpAFloor(lift);

        expect(actual).toEqual(expected);
    });
    it('should not move beyond the top floor', () => {
        const lift: Lift = {
            floor: Floor.Second,
        };
        const expected: Lift = {
            floor: Floor.Second,
        };
        const actual = moveUpAFloor(lift);

        expect(actual).toEqual(expected);
    });
});

describe('should move down one floor', () => {
    it('should move to First floor from Second floor', () => {
        const lift: Lift = {
            floor: Floor.Second,
        };
        const expected: Lift = {
            floor: Floor.First,
        };
        const actual = moveDownAFloor(lift);

        expect(actual).toEqual(expected);
    });
    it('should not move beyond the bottom floor', () => {
        const lift: Lift = {
            floor: Floor.Ground,
        };
        const expected: Lift = {
            floor: Floor.Basement,
        };
        const actual = moveDownAFloor(lift);

        expect(actual).toEqual(expected);
    });
});

describe('should move in the correct direction', () => {
    it('should move up a floor when the direction is up', () => {
        const lift: Lift = {
            floor: Floor.Ground,
        };
        const expected: Lift = {
            floor: Floor.First,
        };
        const actual = moveLift(lift, 'up');

        expect(actual).toEqual(expected);
    });
    it('should move down a floor when the direction is down', () => {
        const lift: Lift = {
            floor: Floor.First,
        };
        const expected: Lift = {
            floor: Floor.Ground,
        };
        const actual = moveLift(lift, 'down');

        expect(actual).toEqual(expected);
    });
});
