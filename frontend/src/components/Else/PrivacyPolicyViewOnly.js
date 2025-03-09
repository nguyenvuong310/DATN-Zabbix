import React, { useState } from 'react';

const PrivacyPolicyModalViewOnly = ({ onClose }) => {
    return (
      <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 font-be-vietnam-pro z-50 transition-opacity duration-300 ease-in-out opacity-100`}>
          <div className={`bg-white p-6 rounded-lg shadow-lg w-11/12 max-sm:h-[70%] max-sm:overflow-auto md:w-[50%] lg:w-[70%] transform transition-transform duration-300 ease-in-out scale-100`}>
              <h2 className="text-2xl font-bold mb-4">Chính sách Bảo mật và Quyền riêng tư của Quý Khách hàng</h2>
              <p>Kính gửi Quý Khách Hàng,</p>
              <p>Chúng tôi xin chân thành cảm ơn Quý Khách đã tin tưởng và sử dụng ứng dụng của chúng tôi. Chúng tôi hiểu rằng bảo mật thông tin cá nhân của Quý Khách là vô cùng quan trọng. Vì vậy, chúng tôi cam kết:</p>
              <ul className="list-disc pl-11">
                  <p className='font-semibold text-green-700 -ml-10'>1. Bảo Vệ Dữ Liệu Cá Nhân:</p>
                  <li>Chúng tôi sử dụng các biện pháp bảo mật hàng đầu để bảo vệ thông tin cá nhân của Quý Khách khỏi mọi hình thức truy cập trái phép, lạm dụng hoặc tiết lộ không đúng mục đích.</li>
                  <p className='font-semibold text-green-700 -ml-10'>2. Cam Kết Không Sử Dụng Dữ Liệu:</p>
                  <li>Chúng tôi cam kết không sử dụng dữ liệu của bạn với bất kỳ mục đích gì. Dữ liệu tài chính rất nhạy cảm và chúng tôi đã hạn chế tối đa quyền truy cập database.</li>
                  <p className='font-semibold text-green-700 -ml-10'>3. Quyền Kiểm Soát Thông Tin:</p>
                  <li>Quý Khách có quyền truy cập, chỉnh sửa và yêu cầu xóa bỏ thông tin cá nhân của mình bất kỳ lúc nào thông qua các công cụ và dịch vụ mà chúng tôi cung cấp.</li>
                  <p className='font-semibold text-green-700 -ml-10'>4. Chính Sách Xóa Dữ Liệu:</p>
                  <li>Những tài khoản không hoạt động sẽ chỉ tồn tại tối đa 7 ngày. Sau 7 ngày không hoạt động, mọi dữ liệu của tài khoản sẽ bị xoá sạch sẽ như chưa hề tồn tại.</li>
                  <p className='font-semibold text-green-700 -ml-10'>5. Chính Sách Bảo Mật Cập Nhật:</p>
                  <li>Chúng tôi thường xuyên cập nhật chính sách bảo mật để phản ánh những thay đổi trong luật pháp và các tiêu chuẩn bảo mật trong nước, đảm bảo rằng quyền lợi của Quý Khách luôn được bảo vệ tối đa.</li>
              </ul>
              <p>Chúng tôi cam kết nỗ lực hết mình để mang lại cho Quý Khách một trải nghiệm an toàn và tin cậy.</p>
              <p>Trân trọng,</p>
              <div className='flex mt-4 justify-center'>
                  <button
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={onClose}
                  >
                      Đóng
                  </button>
              </div>
          </div>
      </div>
  )
};

export default PrivacyPolicyModalViewOnly;
