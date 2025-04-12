## Markdown Content

The count is: {{ count }}

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<button :class="$style.button" @click="count++">啦啦啦啦啦啦</button>

<style module>
.button {
  /* color: red; */
  font-weight: bold;
}
</style>
