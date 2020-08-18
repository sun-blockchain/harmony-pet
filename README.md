<h1 align="center">Welcome to ecopet 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
</p>

## Install

```sh
npm install
```

## Author

👤 **tmc**

## Description

- Mục đích: Tiết kiệm tiền
- Cấu trúc :
  Mỗi con thú nhận nuôi sẽ tương đương với 1 smart contract
  Đặc điểm để xác định hình dạng của con thú ảo gồm có : Số tiền + Số ngày tiết kiệm
  Số tiền quy định kích thước
  Số ngày tiết kiệm quy định màu sắc
- Tương tác với con thú :
  - Tiết kiệm :
    Mua thức ăn tương ứng với lượng tiền muốn tiết kiệm

* Rút tiền:
  Số ngày tiết kiệm sẽ tạm thời đóng băng lại
  Kích cỡ bị thay đổi vì lượng tiền thay đổi

* Tiếp tục tiết kiệm:
  Kích cỡ sẽ tăng theo lượng tiền
  Số thời gian tiết kiệm sẽ bắt đầu được tính lại khi số tiền tiết kiệm đã = số tiền maximum đã gửi vào

- Cách tính thời gian tiết kiệm :
  Sử dụng firebase và smart contract để lưu các trường để tính:
  - Firebase :
    Mốc thời gian đóng băng gần nhất
    Lượng thời gian đã bị đóng băng
  - Smart contract:
    Thời gian bắt đầu gửi
    Mốc thời gian gửi tiếp theo mới nhất

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_

# harmony-pet

Crypto pet Harmony version
