<script setup>
import { onBeforeMount, onBeforeUnmount } from "vue";

const overflow_nodes = document.querySelectorAll("html, body, .main-container");

const emits = defineEmits(["closeModal"]);

const props = defineProps({
  header: {
    type: String,
    default: "",
  },
  close: {
    type: Boolean,
    default: false,
  },
});

function closeModal() {
  emits("closeModal");
}

function closeSelectIfOpen() {
  if (!props.close) {
    const container = document.querySelector(".modal__container");
    container.style.transform = "scale(1.05)";
    container.style.transition = "transform 0.4s ease-in-out";

    container.addEventListener(
      "transitionend",
      () => {
        container.style.transform = "scale(1)";
      },
      { once: true }
    );
  } else {
    emits("closeModal");
  }
}

function toggle_page_overflow(display) {
  overflow_nodes.forEach((node) => {
    node.style.overflowY = display ? "initial" : "hidden";
    node.style.overflowX = "clip";
  });
}

onBeforeMount(() => {
  toggle_page_overflow(false);
});

onBeforeUnmount(() => {
  toggle_page_overflow(true);
});
</script>

<template>
  <perfect-scrollbar
    class="modal__overlay"
    :options="{
      suppressScrollX: true,
    }"
    @click.self="closeSelectIfOpen"
  >
    <div class="modal__container">
      <div class="modal-header">
        <p v-if="header?.length" class="modal-header__title">
          <slot name="header-value" :value="header">
            {{ header }}
          </slot>
        </p>
        <svg-icon
          name="close-modal"
          class="modal-header__close"
          @click="closeModal"
        />
      </div>
      <div class="modal__content">
        <slot></slot>
      </div>
    </div>
  </perfect-scrollbar>
</template>

<style scoped lang="scss">
.modal__overlay {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(64, 64, 64, 0.4);
  display: flex;
  overflow-y: auto;
}

.modal__container {
  width: 90%;
  margin: 78px auto 78px;
  height: fit-content;
  background: #fff;
  border-radius: 30px;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
  position: relative;
  transform: scale(1);
  animation-name: modalOpen;
  animation-duration: 0.3s;
}

.modal__content {
  padding: 24px 16px;
}

.modal-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 24px 24px;
  background: #f3f3f3;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  &__title {
    color: #404040;
    font-family: Nunito Sans;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  &__close {
    top: 15px;
    right: 15px;
    cursor: pointer;
  }
  svg {
    color: #d9d9d9;
    width: 19px;
    height: 19px;
  }
}

@media (min-width: 769px) {
  .modal__overlay {
    padding-block: 78px;
  }

  .modal__container {
    width: 70%;
    margin: auto;
    height: fit-content;
  }

  .modal-header {
    align-items: flex-start;
    padding: 32px 32px;

    &__title {
      font-size: 24px;
    }

    &__close {
      top: 25px;
      right: 25px;
    }

    svg {
      color: #d9d9d9;
      width: 16px;
      height: 15px;
    }
  }

  .modal__content {
    padding: 40px 40px;
  }
}

@keyframes modalOpen {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
