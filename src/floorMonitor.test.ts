import { generateRandomFloor, sendDropOffRequests } from './floorMonitor';
import { MIN_NUM_FLOORS, MAX_NUM_FLOORS } from './move';
import { DropOffRequest, Floor } from './types';

describe('generate random requests', () => {
    it('should generate a valid floor', () => {
        const actual = generateRandomFloor(MIN_NUM_FLOORS, MAX_NUM_FLOORS);

        expect(Object.values(Floor).includes(actual)).toBeTruthy();
    });
});

describe('send requests', () => {
    it('should send drop off requests', () => {
        const initialFloorMonitor = {
            dropOff: [],
        };
        const dropOffRequests: DropOffRequest[] = [{
            floor: Floor.Basement,
        }];
        const actual = sendDropOffRequests(dropOffRequests, initialFloorMonitor);

        expect(actual.dropOff).toEqual(dropOffRequests);
    });
});
