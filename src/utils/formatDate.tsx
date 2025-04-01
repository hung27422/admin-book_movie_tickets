function formatDate(dateString: string, isShowHours: boolean = false): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0"); // Ngày
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng (tháng bắt đầu từ 0 nên cộng thêm 1)
  const year = date.getFullYear(); // Năm

  // Nếu isShowHours là true, lấy giờ và phút
  if (isShowHours) {
    const hours = String(date.getHours()).padStart(2, "0"); // Giờ
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Phút
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  // Nếu isShowHours là false, chỉ hiển thị ngày/tháng/năm
  return `${day}/${month}/${year}`;
}
export default formatDate;
