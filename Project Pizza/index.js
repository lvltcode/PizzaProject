"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */

// trạng thái của server trả về, 200 = tìm thấy thành công!
const gREQUEST_STATUS_OK = 200;
const gREQUEST_READY_STATUS_FINISH_AND_OK = 4;
const gREQUEST_CREATE_SUCCESS = 201;
const gBASE_URL_DRINKS = "http://42.115.221.44:8080/devcamp-pizza365/drinks";
const gBASS_URL_VOUCHERS =
  "http://42.115.221.44:8080/devcamp-voucher-api/voucher_detail/";
const gBASE_URL_ORDER = "http://42.115.221.44:8080/devcamp-pizza365/orders";

// bạn có thể dùng để lưu trữ combo được chọn,
// mỗi khi khách chọn menu S, M, L bạn lại đổi giá trị properties của nó
var gSelectedMenuStructure = {
  // Mặc định chọn Medium
  menuName: "M", // S, M, L - Mặc định M
  duongKinhCM: 25,
  suongNuong: 4,
  saladGr: 300,
  drinkNumber: 3,
  drinkTypeCode: "TRATAC",
  drinkType: "Trà Tắc", // Thức uống mặc định
  priceVND: 200000,
};

// bạn có thể dùng để lưu loại pizza đươc chọn, mỗi khi khách chọn, bạn lại đổi giá trị cho nó
var gSelectedPizza = {
  // Mặc định chọn Bacon
  id: 2,
  code: "BC",
  name: "Bacon",
};

// Lấy thông tin Order sau khi đã làm sạch và validate dữ liệu
var gOrderInfoObject = {
  kichCo: "",
  duongKinh: "",
  suon: "",
  salad: "",
  loaiPizza: "",
  idVourcher: "",
  idLoaiNuocUong: "",
  soLuongNuoc: "",
  hoTen: "",
  thanhTien: "",
  email: "",
  soDienThoai: "",
  diaChi: "",
  loiNhan: "",
};

// Lấy thông tin của Order Id để tracking đơn hàng
var gOrderId = {
  id: "",
  orderId: "",
};

/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
onPageLoading();

/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
function onPageLoading() {
  // console.log("Drink menu load...");
  loadDrinkListAPI();
}

/*** REGION 3.1 - Pizza Combo */
// Hàm thay đổi màu và hiển thị thông tin khi Combo Small được chọn
function onChoseSmallClick() {
  "use strict";
  // console.log("Small");
  // Define pizza type structure object
  gSelectedMenuStructure.menuName = "S";
  gSelectedMenuStructure.duongKinhCM = 20;
  gSelectedMenuStructure.suongNuong = 2;
  gSelectedMenuStructure.saladGr = 200;
  gSelectedMenuStructure.drinkNumber = 2;
  gSelectedMenuStructure.priceVND = 150000;
  // console.log(gSelectedMenuStructure);
  // Đổi màu button được chọn và đưa 2 màu kia thành màu xanh
  onBtnChangeColorCombo(gSelectedMenuStructure.menuName);
}

// Hàm thay đổi màu và hiển thị thông tin khi Combo Medium được chọn
function onChoseMediumClick() {
  "use strict";
  // console.log("Medium");
  // Define pizza type structure object
  gSelectedMenuStructure.menuName = "M";
  gSelectedMenuStructure.duongKinhCM = 25;
  gSelectedMenuStructure.suongNuong = 4;
  gSelectedMenuStructure.saladGr = 300;
  gSelectedMenuStructure.drinkNumber = 3;
  gSelectedMenuStructure.priceVND = 200000;
  // console.log(gSelectedMenuStructure);
  // Đổi màu button được chọn và đưa 2 màu kia thành màu xanh
  onBtnChangeColorCombo(gSelectedMenuStructure.menuName);
}

// Hàm thay đổi màu và hiển thị thông tin khi Combo Large được chọn
function onChoseLargeClick() {
  "use strict";
  // console.log("Large");
  // Define pizza type structure object
  gSelectedMenuStructure.menuName = "L";
  gSelectedMenuStructure.duongKinhCM = 30;
  gSelectedMenuStructure.suongNuong = 8;
  gSelectedMenuStructure.saladGr = 500;
  gSelectedMenuStructure.drinkNumber = 4;
  gSelectedMenuStructure.priceVND = 250000;
  // console.log(gSelectedMenuStructure);
  // Đổi màu button được chọn và đưa 2 màu kia thành màu xanh
  onBtnChangeColorCombo(gSelectedMenuStructure.menuName);
}

/*** REGION 3.2 - Pizza Type */
// Hàm thay đổi màu khi nhấn vào nút ở Pizza Hawaii
function onChoseHawaiiPizza() {
  "use strict";
  gSelectedPizza.id = 0;
  gSelectedPizza.code = "HW";
  gSelectedPizza.name = "Hawaii";
  console.log("Pizza đã chọn là " + gSelectedPizza.name);
  // Change color khi nhan button
  onBtnChangeColorPizza(gSelectedPizza.code);
}

// Hàm thay đổi màu khi nhấn vào nút ở Pizza hải sản
function onChoseSeafoodPizza() {
  "use strict";
  gSelectedPizza.id = 1;
  gSelectedPizza.code = "SF";
  gSelectedPizza.name = "Seafood";
  // Change color khi nhan button
  console.log("Pizza đã chọn là " + gSelectedPizza.name);
  onBtnChangeColorPizza(gSelectedPizza.code);
}

// Hàm thay đổi màu khi nhấn vào nút ở Pizza thịt hun khói
function onChoseBaconPizza() {
  "use strict";
  gSelectedPizza.id = 2;
  gSelectedPizza.code = "BC";
  gSelectedPizza.name = "Bacon";
  // Change color khi nhan button
  console.log("Pizza đã chọn là " + gSelectedPizza.name);
  onBtnChangeColorPizza(gSelectedPizza.code);
}

// Hàm đổi màu các button của section Pizza type
function onBtnChangeColorPizza(paramBtnCode) {
  "use strict";
  var [vBtnHaiwaii, vBtnSeafood, vBtnBacon] = accessPizzaSectionById();
  // Set classname (bootstrap) cho 3 nút để đổi màu
  if (paramBtnCode == "HW") {
    vBtnHaiwaii.className = "btn btn-warning w-100";
    vBtnSeafood.className = "btn btn-info w-100";
    vBtnBacon.className = "btn btn-info w-100";
  } else if (paramBtnCode == "SF") {
    vBtnHaiwaii.className = "btn btn-info w-100";
    vBtnSeafood.className = "btn btn-warning w-100";
    vBtnBacon.className = "btn btn-info w-100";
  } else if (paramBtnCode == "BC") {
    vBtnHaiwaii.className = "btn btn-info w-100";
    vBtnSeafood.className = "btn btn-info w-100";
    vBtnBacon.className = "btn btn-warning w-100";
  }
}

/*** REGION 3.3 - Drink Selection */
function loadDrinkListAPI() {
  "use strict";
  var vXhttp = new XMLHttpRequest();
  vXhttp.onreadystatechange = function () {
    if (
      this.readyState == gREQUEST_READY_STATUS_FINISH_AND_OK &&
      this.status == gREQUEST_STATUS_OK
    ) {
      // console.log(vXhttp.responseText); //ghi response text ra console.log
      var vDrinkListObject = JSON.parse(vXhttp.responseText);
      // console.log(vDrinkListObject);
      loadAPIToDrinkList(vDrinkListObject);
    }
  };
  vXhttp.open("GET", gBASE_URL_DRINKS, true);
  vXhttp.send();
}

function loadAPIToDrinkList(paramDrinkListObject) {
  "use strict";
  // console.log(paramDrinkListObject);
  var vDrinkSelectElement = document.getElementById("select-drink");
  // vDrinkSelectElement.remove(vDrinkSelectElement.selectedIndex);
  for (
    var bIterator = 0;
    bIterator < paramDrinkListObject.length;
    bIterator++
  ) {
    var vDrinkOptionElement = document.createElement("option");
    vDrinkOptionElement.value = paramDrinkListObject[bIterator].maNuocUong;
    vDrinkOptionElement.text = paramDrinkListObject[bIterator].tenNuocUong;
    vDrinkSelectElement.appendChild(vDrinkOptionElement);
  }
  vDrinkSelectElement.addEventListener("change", function () {
    onSelectDrinksValueChange(this);
  });
}

// Change value của Drink (loại nước uống) và gán giá trị cho Menu tổng, check tính hợp lệ
function onSelectDrinksValueChange(paramDrinkSelectElement) {
  "use strict";
  // console.log("listener cho drink section");
  // console.log(
  //   paramDrinkSelectElement.options[paramDrinkSelectElement.selectedIndex].text
  // );
  var vSelectedDrinkCode =
    paramDrinkSelectElement.options[paramDrinkSelectElement.selectedIndex]
      .value;
  var vSelectedDrink =
    paramDrinkSelectElement.options[paramDrinkSelectElement.selectedIndex].text;
  gSelectedMenuStructure.drinkTypeCode = vSelectedDrinkCode;
  gSelectedMenuStructure.drinkType = vSelectedDrink;
  alert("Thức uống bạn chọn là: " + gSelectedMenuStructure.drinkType);
  console.log("Drink Code: " + gSelectedMenuStructure.drinkTypeCode);
}

/*** REGION 3.4 - Gửi order info của người đặt hàng */
// Khi user nhấn nút send - Gửi đơn sẽ validate thông tin và nhận đặt hàng
function onBtnSendOrderClick() {
  "use strict";
  // console.log("Đã nhận đơn...");
  // B1: Lấy dữ liệu nhập vào của User
  var vUserInputObject = getPersonDataFromInput();

  // B2: Kiểm tra dữ liệu
  var vCheck = validateUserInput(vUserInputObject);
  if (vCheck === true) {
    // B2.1: Kiểm tra voucher hợp lệ so sánh trong dữ liệu từ API
    checkVoucherIsValid(vUserInputObject);
    // B3: Thu thập toàn bộ dữ liệu đã được validate
    getAllOfOrderInfo(vUserInputObject);
    // B4: Hiển thị thông tin đơn hàng ở phần bị ẩn ra
    displayDataOrderToBottomSection(vUserInputObject);
    // Gửi Order lên Server và kiểm tra kết quả server đã nhận order chưa
    onBtnCreateOrderClick();
  } else {
    console.log("Dữ liệu nhập vào không hợp lệ");
  }
}

// Lấy toàn bộ thông tin đơn hàng sau khi đã được validate hoàn toàn
function getAllOfOrderInfo(paramUserInputObject) {
  var vChargeCalculate = calculatePriceWithVoucher(paramUserInputObject);

  // Thu thập Order Info
  gOrderInfoObject.kichCo = gSelectedMenuStructure.menuName;
  gOrderInfoObject.duongKinh = gSelectedMenuStructure.duongKinhCM;
  gOrderInfoObject.suon = gSelectedMenuStructure.suongNuong;
  gOrderInfoObject.salad = gSelectedMenuStructure.saladGr;

  gOrderInfoObject.loaiPizza = gSelectedPizza.name;
  gOrderInfoObject.idVourcher = vChargeCalculate.maVoucher;
  gOrderInfoObject.idLoaiNuocUong = gSelectedMenuStructure.drinkTypeCode;
  gOrderInfoObject.soLuongNuoc = gSelectedMenuStructure.drinkNumber;

  gOrderInfoObject.hoTen = paramUserInputObject.name;
  gOrderInfoObject.thanhTien = vChargeCalculate.thanhTien;
  gOrderInfoObject.email = paramUserInputObject.email;
  gOrderInfoObject.soDienThoai = paramUserInputObject.phoneNumber;
  gOrderInfoObject.diaChi = paramUserInputObject.address;
  gOrderInfoObject.loiNhan = paramUserInputObject.message;

  // console.log(gOrderInfoObject);
}

// Hàm hiển thị thông tin TOÀN BỘ của đơn hàng (order) ra vùng được ẩn ở sau form
// và chờ xác nhận lần cuối của user
function displayDataOrderToBottomSection(paramUserInputObject) {
  "use strict";

  // Truy cập và hiển thị section Order Confirm
  var vContainerOrderBlock = document.getElementById("div-container-order");
  vContainerOrderBlock.style.display = "block";

  // Hien thi noi dung - ghi du lieu order vao the div
  var vShowOrderInfo = document.getElementById("div-order-info");
  // Phần nội dung hiển thị personal info - người đặt hàng
  vShowOrderInfo.innerHTML = "Họ và tên: " + gOrderInfoObject.hoTen + "</br>";
  vShowOrderInfo.innerHTML += "Email: " + gOrderInfoObject.email + "</br>";
  vShowOrderInfo.innerHTML +=
    "Điện thoại: " + gOrderInfoObject.soDienThoai + "</br>";
  vShowOrderInfo.innerHTML += "Địa chỉ: " + gOrderInfoObject.diaChi + "</br>";
  vShowOrderInfo.innerHTML += "Lời nhắn " + gOrderInfoObject.loiNhan + "</br>";
  vShowOrderInfo.innerHTML += "--------------------------------" + "</br>";

  // Phần nội dung hiển thị các thông tin Combo
  vShowOrderInfo.innerHTML += "Kích cỡ: " + gOrderInfoObject.kichCo + "</br>";
  vShowOrderInfo.innerHTML +=
    "Đường kính: " + gOrderInfoObject.duongKinh + "</br>";
  vShowOrderInfo.innerHTML += "Sườn nướng: " + gOrderInfoObject.suon + "</br>";
  vShowOrderInfo.innerHTML += "Salad: " + gOrderInfoObject.salad + "</br>";
  vShowOrderInfo.innerHTML +=
    "Số lượng nước ngọt: " + gOrderInfoObject.soLuongNuoc + "</br>";
  vShowOrderInfo.innerHTML += "--------------------------------" + "</br>";

  var vChargeCalculate = calculatePriceWithVoucher(paramUserInputObject);

  // Phần nội dung hiển thị Pizza type và discount
  vShowOrderInfo.innerHTML +=
    "Loại Pizza: " + gOrderInfoObject.loaiPizza + "</br>";
  vShowOrderInfo.innerHTML +=
    "Loại thức uống: " + gOrderInfoObject.idLoaiNuocUong + "</br>";
  vShowOrderInfo.innerHTML +=
    "Mã voucher: " + vChargeCalculate.maVoucher + "</br>";
  vShowOrderInfo.innerHTML +=
    "Giá vnd: " + gSelectedMenuStructure.priceVND + "</br>";
  vShowOrderInfo.innerHTML +=
    "Discount % " + vChargeCalculate.giamGia + "</br>";
  vShowOrderInfo.innerHTML +=
    "Phải thanh toán: " + vChargeCalculate.thanhTien + "</br>";
}

/*** REGION 3.5 - Tạo Order mới từ Order info ở phía trên */
//gọi tạo một order mới
function onBtnCreateOrderClick() {
  "use strict";
  var vXmlHttpCreateOrder = new XMLHttpRequest();
  vXmlHttpCreateOrder.open("POST", gBASE_URL_ORDER, true);
  vXmlHttpCreateOrder.setRequestHeader(
    "Content-Type",
    "application/json;charset=UTF-8"
  );
  vXmlHttpCreateOrder.send(JSON.stringify(gOrderInfoObject));
  vXmlHttpCreateOrder.onreadystatechange = function () {
    if (
      this.readyState == gREQUEST_READY_STATUS_FINISH_AND_OK &&
      this.status == gREQUEST_CREATE_SUCCESS
    ) {
      // status 201 tao thanh cong
      var vCreatedOrder = vXmlHttpCreateOrder.responseText;
      // console.log(vCreatedOrder);
      getOrderId(vCreatedOrder);
    }
  };
}

/*** REGION 3.6 - Tạo nav/button tracking đơn hàng */
// Lấy Order Id và Id để tracking đơn hàng
function getOrderId(paramCreatedOrder) {
  "use strict";
  var vOrderObject = JSON.parse(paramCreatedOrder);
  gOrderId.id = vOrderObject.id;
  gOrderId.orderId = vOrderObject.orderId;
  // console.log(gOrderId);

  // Lấy data cho Button Tracking đơn hàng;
  getOrderDataToTrackingButton();
}

// Nhấn nút "Xác Nhận" sẽ ẩn phần xác nhận đơn hàng, hiển thị phần cảm ơn kèm Mã đơn hàng bên dưới
function onBtnConfirmClick() {
  "use strict";
  // var vBtnOrderConfirmElement = document.getElementById("btn-confirm");
  var vShowOrderIdDiv = document.getElementById("div-container-confirm");
  var vShowOrderIdText = document.getElementById("show-order-id");
  vShowOrderIdText.innerHTML = "<h5>" + gOrderId.orderId + "</h5>";
  vShowOrderIdDiv.style.display = "block";

  // Ẩn phần Order Info
  hiddenDataOrderToBottomSection();

  // Show phần menu Theo Dõi Đơn Hàng ở top-right
  displayOrderTrackingMenuById();
}

function hiddenDataOrderToBottomSection() {
  "use strict";
  // Truy cập và ẩn section Order Confirm
  var vContainerOrderBlock = document.getElementById("div-container-order");
  vContainerOrderBlock.style.display = "none";
}

function displayOrderTrackingMenuById() {
  "use strict";
  var vNavOrderTrackingElement = document.getElementById("nav-order-tracking");
  vNavOrderTrackingElement.style.display = "block";
}

/*** REGION 3.7 - Link Button Order Tracking đến trang View Order */
function getOrderDataToTrackingButton() {
  "use strict";
  var vBtnOrderTrackingElement = document.getElementById("btn-order-tracking");
  vBtnOrderTrackingElement.setAttribute("data-id", gOrderId.id);
  vBtnOrderTrackingElement.setAttribute("data-orderid", gOrderId.orderId);
}

// Click vào button sẽ gửi id và orderid, mở ra viewOrder.html
function onBtnOrderTrackingClick() {
  "use strict";

  // Gọi View Order HTML
  const vViewOrderURL = "viewOrder.html";
  var vUrlSiteToOpen =
    vViewOrderURL + "?id=" + gOrderId.id + "&orderid=" + gOrderId.orderId;
  window.location.href = vUrlSiteToOpen;
}

/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/

/*** REGION 4.1 - Pizza Combo */
// Access các button ở Combo Section
function accessComboSectionById() {
  // Truy cập các phần từ từ id của các nút combo pizza (small, medium, large)
  var vOnBtnChooseSmallElement = document.getElementById("btn-chose-small");
  var vOnBtnChooseMediumElement = document.getElementById("btn-chose-medium");
  var vOnBtnChooseLargeElement = document.getElementById("btn-chose-large");
  return [
    vOnBtnChooseSmallElement,
    vOnBtnChooseMediumElement,
    vOnBtnChooseLargeElement,
  ];
}

// Hàm thực thi để đổi màu khi nút S/M/L lần lược được chọn (click)
function onBtnChangeColorCombo(paramBtnName) {
  "use strict";
  // Lấy id để access các Buttons
  var [vSmallBtn, vMediumBtn, vLargeBtn] = accessComboSectionById();
  // Set classname (bootstrap) cho 3 nút để đổi màu
  if (paramBtnName == "S") {
    vSmallBtn.className = "btn btn-warning w-25";
    vMediumBtn.className = "btn btn-success w-25";
    vLargeBtn.className = "btn btn-success w-25";
  } else if (paramBtnName == "M") {
    vSmallBtn.className = "btn btn-success w-25";
    vMediumBtn.className = "btn btn-warning w-25";
    vLargeBtn.className = "btn btn-success w-25";
  } else if (paramBtnName == "L") {
    vSmallBtn.className = "btn btn-success w-25";
    vMediumBtn.className = "btn btn-success w-25";
    vLargeBtn.className = "btn btn-warning w-25";
  }
}

/*** REGION 4.2 - Pizza Type */
// Access các button ở Pizza Type Section
function accessPizzaSectionById() {
  // Truy cập các phần tử từ id của các nút chọn loại Pizza (Hawaii, Hải sản, Thịt hun khói)
  var vBtnHaiwaiiPizza = document.getElementById("btn-chose-hawaii-pizza");
  var vBtnSeafoodPizza = document.getElementById("btn-chose-seafood-pizza");
  var vBtnBaconPizza = document.getElementById("btn-chose-bacon-pizza");
  return [vBtnHaiwaiiPizza, vBtnSeafoodPizza, vBtnBaconPizza];
}

// Hàm đổi màu các button của section Pizza type
function onBtnChangeColorPizza(paramBtnCode) {
  "use strict";
  var [vBtnHaiwaii, vBtnSeafood, vBtnBacon] = accessPizzaSectionById();
  // Set classname (bootstrap) cho 3 nút để đổi màu
  if (paramBtnCode == "HW") {
    vBtnHaiwaii.className = "btn btn-warning w-25";
    vBtnSeafood.className = "btn btn-success w-25";
    vBtnBacon.className = "btn btn-success w-25";
  } else if (paramBtnCode == "SF") {
    vBtnHaiwaii.className = "btn btn-success w-25";
    vBtnSeafood.className = "btn btn-warning w-25";
    vBtnBacon.className = "btn btn-success w-25";
  } else if (paramBtnCode == "BC") {
    vBtnHaiwaii.className = "btn btn-success w-25";
    vBtnSeafood.className = "btn btn-success w-25";
    vBtnBacon.className = "btn btn-warning w-25";
  }
}

/*** REGION 4.3 - Drink Choice */

/*** REGION 4.4 - Order Form */
// Lấy data của person trong phần Orderform
function getPersonDataFromInput() {
  "use strict";
  var vUserInputInfo = {
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    message: "",
    voucher: 0,
  };

  // Truy cap cac phan tu tu id input cua form
  var vInputNameElement = document.getElementById("inp-fullname");
  var vInputEmailElement = document.getElementById("inp-email");
  var vInputDienthoaiElement = document.getElementById("inp-dien-thoai");
  var vInputDiachiElement = document.getElementById("inp-dia-chi");
  var vInputMessageElement = document.getElementById("inp-message");
  var vInputVoucherElement = document.getElementById("inp-voucher");

  //Gán dữ liệu của các phần tử input vào đối tượng Order, xử lý cắt khoảng trắng
  vUserInputInfo.name = vInputNameElement.value.trim();
  vUserInputInfo.email = vInputEmailElement.value.trim();
  vUserInputInfo.phoneNumber = vInputDienthoaiElement.value.trim();
  vUserInputInfo.address = vInputDiachiElement.value.trim();
  vUserInputInfo.message = vInputMessageElement.value.trim();
  vUserInputInfo.voucher = vInputVoucherElement.value.trim();

  return vUserInputInfo;
}

/*** REGION 4.5 - Validate Info from Order input*/
// Hàm này dùng để kiểm tra các thông tin nhập vào đều đúng hết chưa, nếu chưa thì nhập lại, nếu đúng rồi thì mới in ra web
function validateUserInput(paramUserInput) {
  "use strict";
  // Có 4 loại dữ liệu cần phải hợp lệ là Name, Email, Phone Number và Address

  // console.log(paramUserInput);
  // Kiểm tra tính hợp lệ của tên
  if (paramUserInput.name === "") {
    alert("Bạn cần nhập Họ và Tên");
    return false;
  }

  // Kiểm tra tính hợp lệ của email
  var checkEmail = validateEmail(paramUserInput.email);
  if (checkEmail === false) {
    alert(paramUserInput.email + " Không phải là email");
    return false;
  }

  // Kiểm tra tính hợp lệ của sdt
  var vCheckPhone = validatePhoneNumber(paramUserInput.phoneNumber);
  if (vCheckPhone === false) {
    console.log("Số điện thoại không hợp lệ");
    return false;
  } else {
    paramUserInput.phoneNumber = vCheckPhone;
  }

  // Kiểm tra tính hợp lệ của địa chỉ không được để trống
  if (paramUserInput.address === "") {
    alert("Địa chỉ không được để trống");
    return false;
  }
  return true;
}

// Hàm để kiểm tra email đúng cú pháp
function validateEmail(paramEmail) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(paramEmail).toLowerCase());
}

// Hàm để kiểm tra số điện thoại có phải là một số
function validatePhoneNumber(paramphoneNumber) {
  "use strict";
  var vPhoneNumber = "";
  // Kiểm tra giá trị đầu vào: nếu KHÔNG phải là số thì sẽ assert cảnh báo và return giá trị false
  if (paramphoneNumber === "" || isNaN(paramphoneNumber)) {
    alert("Số điện thoại không phải là một số");
    vPhoneNumber = false;
  } else {
    // chuyển giá trị phone number sang dạng số, hệ cơ số 10
    vPhoneNumber = parseInt(paramphoneNumber, 10);
  }
  return vPhoneNumber;
}

// Validate thông tin Voucher
function checkVoucherIsValid(paramUserInputObject) {
  var vCheck = true;
  var vVoucher = paramUserInputObject.voucher;
  if (vVoucher === "") {
    vCheck = false;
    alert("Bạn không có voucher");
    paramUserInputObject.voucher = 0;
  }
  if (vCheck === true) {
    checkVoucherFromAPI(paramUserInputObject);
  }
}

// Kiểm tra xem Voucher có tồn tại trong hệ thống hay không
// Một số mã giảm giá để test:  12354, 46253, 96462, 44306
function checkVoucherFromAPI(paramUserInputObject) {
  "use strict";
  var vVoucher = paramUserInputObject.voucher;
  var vXmlHttp = new XMLHttpRequest();
  vXmlHttp.open("GET", gBASS_URL_VOUCHERS + vVoucher, false);
  vXmlHttp.send();
  var vStatusCode = vXmlHttp.status;
  var vVoucherResponseText = vXmlHttp.responseText;
  // console.log(vVoucherResponseText);
  // console.log(vXmlHttp);
  // nếu trạng thái trả về thành công!
  if (vStatusCode == gREQUEST_STATUS_OK) {
    // nhận lại response dạng JSON ở xmlHttp.responseText và chuyển thành object
    var bVoucherResponse = JSON.parse(vVoucherResponseText);
    paramUserInputObject.voucher = bVoucherResponse;
  } else {
    alert("Khong tim thay voucher");
    paramUserInputObject.voucher = 0;
  }
  // console.log(paramUserInputObject.voucher);
}

/// Hàm này để nhận voucher vào và tính ra đơn total
function calculatePriceWithVoucher(paramUserInputObject) {
  var vChargeCalculate = {
    giamGia: 0,
    maVoucher: "",
    thanhTien: "",
  };

  var vPrice = gSelectedMenuStructure.priceVND;

  if (paramUserInputObject.voucher === 0) {
    vChargeCalculate.giamGia = 0;
  } else {
    vChargeCalculate.giamGia = paramUserInputObject.voucher["phanTramGiamGia"];
    vChargeCalculate.maVoucher = paramUserInputObject.voucher["maVoucher"];
  }
  vChargeCalculate.thanhTien =
    vPrice - (vPrice * vChargeCalculate.giamGia) / 100;

  return vChargeCalculate;
}
