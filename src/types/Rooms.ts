export interface Seat {
  _id?: string; // ID tự động sinh ra bởi MongoDB
  seatNumber: number; // Số ghế (duy nhất trong phòng)
  isBooked: boolean; // Ghế đã được đặt chưa
  type: "SINGLE" | "DOUBLE" | "AISLE"; // Loại ghế đơn hoặc đôi
  position: { row: number; col: number }; // Vị trí ghế trong phòng
}
export interface IRoom {
  _id?: string; // ID tự động sinh bởi MongoDB
  name: string; // Tên phòng (ví dụ: "Room A")
  cinemaId: string; // ID của rạp chiếu hoặc thông tin rạp
  seats?: Seat[]; // Danh sách ghế trong phòng
  type: "DEFAULT" | "VIP"; // Loại phòng
  createdAt?: string; // Ngày tạo
  updatedAt?: string; // Ngày cập nhật
  rows?: number;
  cols?: number;
  aisleCols?: [];
  doubleSeatRow?: [];
}
