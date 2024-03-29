<template>
  <section>
    <div>
      <find-your-love-filter></find-your-love-filter>
    </div>
    <loading-message
      v-if="loadingUsers && loadingPersonalInfo"
      class="loading-message-80"
    ></loading-message>
    <div
      v-if="!loadingUsers && !loadingPersonalInfo"
      class="grid grid-cols-2 gap-4 pb-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      ref="scrollComponent"
    >
      <div
        v-for="user in usersOnScroll"
        :key="user.id"
        class="rounded-md border border-red-400 shadow-md"
      >
        <router-link :to="'/find/' + user.id">
          <div>
            <img :src="user.profileImg" alt="user photo" />
          </div>
          <div class="bg-red-400 p-2 font-bold text-white">
            <p class="inline pr-1">{{ user.firstName }},</p>
            <p class="inline">{{ user.age }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useQuestionsStore } from '@/stores/questions';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import findYourLoveFilter from '@/components/findYourLove/findYourLoveFilter/findYourLoveFilter.vue';
import LoadingMessage from '../Shared/LoadingMessage.vue';

const questionsStore = useQuestionsStore();
const loadingUsers = ref(true);

onMounted(async () => {
  try {
    await questionsStore.FETCH_USERS();
  } catch (error) {
    console.error(error);
  } finally {
    loadingUsers.value = false;
  }
});

const users = computed(() => {
  return questionsStore.FILTERED_USERS;
});

const loadingPersonalInfo = ref(true);
onMounted(async () => {
  try {
    await questionsStore.FETCH_PERSONAL_INFO();
  } catch (error) {
    console.error(error);
  } finally {
    loadingPersonalInfo.value = false;
  }
});

const personalInfo = computed(() => {
  return questionsStore.personalInfo;
});

const scrollComponent = ref<HTMLElement | null>(null);
let start = 0;
let end = 10;
const usersOnScroll = ref(users.value.slice(start, end));

const loadMoreUsers = () => {
  start += 10;
  end += 10;
  let newUsersOnScroll = users.value.slice(start, end);
  usersOnScroll.value.push(...newUsersOnScroll);
};

// during test userOnScroll didn't update, watcher fix the problem with updating
watch(users, (newUsers) => {
  usersOnScroll.value = newUsers.slice(start, end);
});

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  const element = scrollComponent.value as HTMLElement;
  if (element.getBoundingClientRect().bottom <= window.innerHeight + 10) {
    loadMoreUsers();
  }
};
</script>
