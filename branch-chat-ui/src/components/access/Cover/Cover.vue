<script setup lang="ts">
import useChatStore from "../../../stores/chat";
import Typography from "../../reusables/Typography.vue";


const chat = useChatStore();
</script>

<template>
    <div class="flex flex-col  "
        :class="chat.settings[2].settings[0].value ? ['bg-gray-900'] : ['animate-gradient bg-[length:200%_200%] bg-gradient-to-b from-[#4eccff] to-[#28395b]']">
        <img src="../../../assets/branch-logo.png" class="w-[230px] h-[auto] opacity-70" />

        <Typography variant="display" :no-color="true" class="text-white opacity-70">Branch Messaging</Typography>
    </div>
</template>
