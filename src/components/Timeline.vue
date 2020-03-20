<template>
  <div class="timeline mt-20">
    <ul>
      <li class="py-12 flex">
        <div class="w-1/3 flex justify-end">
          <div
            class="mr-8 h-12 w-24 rounded-lg bg-teal-400 border-4 border-teal-200 flex items-center justify-center text-white"
          >
            <h4 class="text-xl font-bold">Day 1</h4>
          </div>
        </div>
        <div class="timeblock pl-24 w-2/3">
          <h3 class="text-xl font-bold">What is Lorem Ipsum?</h3>
          <p class="mt-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
            distinctio dolores perferendis placeat aliquam quia fugiat eius
            possimus corporis aspernatur! Facere pariatur mollitia est soluta.
            Ad velit minima quidem eaque.
          </p>
          <img
            src="https://images.unsplash.com/photo-1527142879-95b61a0b8226?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            class="mt-8"
          />
        </div>
      </li>
      <li class="py-12 flex">
        <div class="w-1/3 flex justify-end">
          <div
            class="mr-8 h-12 w-24 rounded-lg bg-teal-400 border-4 border-teal-200 flex items-center justify-center text-white"
          >
            <h4 class="text-xl font-bold">Day 2</h4>
          </div>
        </div>
        <div class="timeblock pl-24 w-2/3">
          <h3 class="text-xl font-bold">What is Lorem Ipsum?</h3>
          <p class="mt-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
            distinctio dolores perferendis placeat aliquam quia fugiat eius
            possimus corporis aspernatur! Facere pariatur mollitia est soluta.
            Ad velit minima quidem eaque.
          </p>
          <img
            src="https://images.unsplash.com/photo-1576801582643-c4e3d33efd2e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            class="mt-8"
          />
        </div>
      </li>
      <li class="py-12 flex">
        <div class="w-1/3 flex justify-end">
          <div
            class="mr-8 h-12 w-24 rounded-lg bg-teal-400 border-4 border-teal-200 flex items-center justify-center text-white"
          >
            <h4 class="text-xl font-bold">Day 3</h4>
          </div>
        </div>
        <div class="timeblock pl-24 w-2/3">
          <h3 class="text-xl font-bold">What is Lorem Ipsum?</h3>
          <p class="mt-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
            distinctio dolores perferendis placeat aliquam quia fugiat eius
            possimus corporis aspernatur! Facere pariatur mollitia est soluta.
            Ad velit minima quidem eaque.
          </p>
          <img
            src="https://images.unsplash.com/photo-1562805791-dbca2a22bba2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            class="mt-8"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.timeline {
  position: relative;
}
.timeline:before {
  content: "";
  position: absolute;
  left: 34.5%;
  width: 2px;
  height: 100%;
  background: #c5c5c5;
}

.timeblock {
  position: relative;
}
.timeblock:before {
  content: "";
  position: absolute;
  left: 6px;
  top: 14px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4fd1c5;
  box-shadow: 0 0 0 6px #b2f5ea;
}
</style>
