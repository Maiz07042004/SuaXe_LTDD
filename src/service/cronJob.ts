import cron from 'node-cron';
import DonSuaChua from '../models/donSuaChua.model';

// Cron job chạy mỗi giờ (hoặc theo bất kỳ khoảng thời gian nào bạn muốn)
cron.schedule('0 * * * *', async () => {
  const now = new Date();
  const threeHoursAgo = new Date(now.getTime() - 1* 60 * 60 * 1000); // 3 giờ trước

  try {
    // Tìm các đơn sửa chữa có `NgayDatDon` nhỏ hơn 3 giờ và trạng thái khác "DaHuy"
    const donSuaChuaList = await DonSuaChua.find({
      NgayDatDon: { $lt: threeHoursAgo },
      TrangThai: { $ne: 'DaHuy' }
    });

    // Cập nhật trạng thái cho những đơn này
    donSuaChuaList.forEach(async (donSuaChua) => {
      donSuaChua.TrangThai = 'DaHuy';
      await donSuaChua.save();
      console.log(`Đơn sửa chữa ${donSuaChua._id} đã được cập nhật trạng thái thành 'DaHuy'`);
    });
  } catch (error) {
    console.error('Có lỗi xảy ra khi cập nhật trạng thái:', error);
  }
});