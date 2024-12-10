import cron from 'node-cron';
import DonSuaChua from '../models/donSuaChua.model';

// Cron job chạy mỗi giờ (hoặc theo bất kỳ khoảng thời gian nào bạn muốn)
cron.schedule('*/5 * * * *', async () => {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() -  15 * 60 * 1000); // 15 phút

  try {
    const donSuaChuaList = await DonSuaChua.find({
      TrangThai: 'ChoXacNhan',
      NgayDatDon: { $lt: oneHourAgo }
    });

    // Cập nhật trạng thái cho những đơn này
    for (const donSuaChua of donSuaChuaList) {
      donSuaChua.TrangThai = 'DaHuy';
      await donSuaChua.save();
      console.log(`Đơn sửa chữa ${donSuaChua._id} đã được cập nhật trạng thái thành 'DaHuy'`);
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi cập nhật trạng thái:', error);
  }
});