import { ref } from "vue";
import db from "../assets/db.js";
import _ from "lodash";
import moment from "moment";
moment.locale("id");

export const bills = ref();
export const isShowModal = ref(false);
export const tempSelectedBills = ref(); // menampung data unpaid yang akan ditampilkan ke modal
export const searchKeyword = ref("");

export function closeModal() {
  isShowModal.value = false;
}

export function confirmModal() {
  isShowModal.value = false;
  const updatedDb = db.value.map((item) => {
    const tempBill = tempSelectedBills.value.find((tempBill) => tempBill.id === item.id);
    if (tempBill) {
      // Jika ditemukan, lakukan penggantian nilai
      return { ...tempBill, tanggal_lunas: moment().format("DD/MM/YYYY"), status: "LUNAS" };
    } else {
      // Jika tidak ditemukan, kembalikan nilai item asli
      return item;
    }
  });
  db.value = updatedDb;
  refresh();
}

export function showModal(bills) {
  isShowModal.value = true;
  tempSelectedBills.value = bills.filter((bill) => {
    if (bill.checked === true && bill.status !== "LUNAS") {
      return bill;
    }
    return;
  });
}

export function getBills() {
  // if not set in sessionStorage
  if (!sessionStorage.getItem("bills")) {
    const result = db.value;
    const newResult = result.map((item) => {
      return { ...item, checked: false };
    });
    sessionStorage.setItem("bills", JSON.stringify(newResult));
    bills.value = newResult;
  } else {
    // if already set in sessionStorage
    const resultBills = sessionStorage.getItem("bills");
    bills.value = JSON.parse(resultBills);
  }
}

export const refresh = () => {
  sessionStorage.removeItem("bills");
  getBills();
};
