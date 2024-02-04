<script setup>
import { FwbButton, FwbModal } from "flowbite-vue";
import { isShowModal, closeModal, confirmModal, tempSelectedBills } from "@/utils/var.js";
</script>

<template>
  <fwb-modal v-if="isShowModal" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg">Konfirmasi Bayar</div>
    </template>
    <template #body>
      <div class="text-base grid grid-cols-3 gap-x-2 leading-relaxed text-gray-500 dark:text-gray-400">
        <ul v-for="tempBill in tempSelectedBills" class="text-sm font-medium text-gray-900 bg-white border border-black rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full px-4 py-2 border-b border-black rounded-t-lg dark:border-gray-600">{{ tempBill.no_kewajiban }}</li>
          <li class="w-full px-4 py-2 rounded-b-lg dark:border-gray-600 text-wrap">{{ tempBill.status }}</li>
        </ul>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button @click="closeModal" color="alternative"> Cancel </fwb-button>
        <fwb-button @click="confirmModal" color="green"> Confirm </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>
