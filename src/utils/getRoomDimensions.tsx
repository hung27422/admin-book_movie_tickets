interface SeatPosition {
    row: number;
    col: number;
}

interface Seat {
    position: SeatPosition;
}

interface RoomDimensions {
    rows: number;
    cols: number;
}

const getRoomDimensions = (seats: Seat[]): RoomDimensions => {
    if (!seats || seats.length === 0) return { rows: 0, cols: 0 };

    const rows = new Set<number>(); // Dùng Set để lấy giá trị `row` duy nhất
    let maxCol = 0;

    seats.forEach((seat) => {
        rows.add(seat.position.row);
        if (seat.position.col > maxCol) {
            maxCol = seat.position.col;
        }
    });

    return { rows: rows.size, cols: maxCol };
};

export default getRoomDimensions;
