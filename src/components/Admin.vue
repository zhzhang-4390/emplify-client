<template>
  <div>
    <div class="py-10 border-b-2 border-gray-400 flex">
      <ul class="py-10 px-5 w-64 bg-gray-300">
        <router-link
          to="/admin/users"
          class="block p-4 border-b border-gray-400 text-lg font-semibold"
        >Users</router-link>
        <router-link
          to="/admin/products"
          class="block p-4 border-b border-gray-400 text-lg font-semibold"
        >Products</router-link>
        <router-link
          to="/admin/requests"
          class="block p-4 border-b border-gray-400 text-lg font-semibold"
        >Requests</router-link>
      </ul>

      <div class="p-10 w-full bg-gray-100">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script></script>
