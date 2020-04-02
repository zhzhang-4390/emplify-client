<template>
  <div class="py-10 border-b-2 border-gray-600">
    <div class="flex">
      <section class="w-1/3 rounded-lg">
        <div class="flex items-center justify-center relative">
          <img :src="frontImagePreview" class="h-64 w-full object-cover rounded-t-lg opacity-50" />
          <input
            type="file"
            ref="frontImage"
            accept="image/*"
            @change="addPreviewImage()"
            class="absolute"
          />
        </div>

        <div class="p-6 h-96 bg-white flex flex-col justify-between rounded-b-lg leading-loose">
          <div class="flex justify-between">
            <input
              v-model="name"
              type="text"
              placeholder="Product Name"
              class="w-40 text-xl font-semibold text-gray-700 outline-none"
            />
            <div>
              <span class="text-xl font-semibold text-gray-600">$</span>
              <input
                v-model="price"
                type="number"
                placeholder="Price"
                class="ml-2 w-12 text-xl font-semibold text-gray-600 outline-none"
              />
              <span class="ml-2 text-gray-600">/pax</span>
            </div>
          </div>

          <select
            v-model="category"
            class="mt-4 pl-2 text-sm text-gray-600 font-semibold border-l-4 border-teal-400 outline-none"
          >
            <option
              v-for="category in $store.getters.getCategories"
              :key="category"
              :value="category"
            >{{ category }}</option>
          </select>

          <textarea
            v-model="description"
            placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut dolores quasi est rem ullam. Consequuntur dolor quas aliquam, doloremque iusto quidem officia cum nisi quam asperiores repellat, laborum, id minima."
            class="mt-4 h-full text-gray-600 text-justify overflow-y-auto outline-none"
          />

          <div class="mt-8 flex items-center justify-end">
            <div
              @click="uploadProduct()"
              class="py-1 px-4 rounded-lg bg-teal-400 hover:bg-teal-300 cursor-pointer flex justify-center font-semibold text-white"
            >Upload Product</div>
          </div>
        </div>
      </section>

      <section class="ml-16 w-2/3">
        <div class="flex items-center justify-center">
          <div
            class="h-124 w-full rounded-lg border-gray-400 flex overflow-x-hidden relative"
            :class="{ border: previews.length === 0 }"
          >
            <img
              v-for="preview in previews"
              :key="preview"
              :src="preview"
              class="flex-shrink-0 h-124 w-full rounded-lg object-cover opacity-50 transform transition-transform duration-300"
              :style="{
                '--transform-translate-x': `-${selectedImageIndex * 100}%`
              }"
            />
            <div
              v-if="previews.length !== 0"
              class="absolute bottom-0 right-0 p-4 rounded-tl-lg bg-black opacity-50"
            >
              <svg
                @click="removeImage()"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                class="h-6 w-6 fill-current text-white hover:text-teal-400 transition-colors duration-300 cursor-pointer"
              >
                <path
                  d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"
                />
              </svg>
            </div>
          </div>
          <input
            type="file"
            ref="images"
            accept="image/*"
            class="absolute"
            multiple
            @change="addImages()"
          />
        </div>
        <div
          class="mt-4 h-32 w-full rounded-lg border-gray-400 flex overflow-x-auto"
          :class="{ border: previews.length === 0 }"
        >
          <img
            v-for="(preview, index) in previews"
            :key="preview"
            :src="preview"
            class="mr-4 h-full w-48 object-cover rounded-lg cursor-pointer transition-opacity duration-500"
            :class="{ 'opacity-50': selectedImageIndex !== index }"
            @click="selectedImageIndex = index"
          />
        </div>
      </section>
    </div>

    <textarea
      v-model="details"
      placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique architecto distinctio rerum tempore at vel ipsa consequatur omnis. Exercitationem sapiente culpa eligendi deleniti eaque quaerat sequi perferendis amet expedita voluptatem."
      class="mt-10 p-8 w-full bg-white rounded-lg outline-none leading-loose text-gray-600 font-semibold"
      :style="{ height: `${calculateHeightOfDetails()}rem` }"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      frontImagePreview: null,
      previews: [],
      selectedImageIndex: 0,
      existingImagesCount: 0,

      _id: null,
      name: null,
      description: null,
      category: this.$store.getters.getCategories[0],
      price: null,
      location: {},
      details: "",
      frontImage: null,
      images: [],
      imagesToRemove: []
    };
  },

  created() {
    if (this.$route.query.name) {
      axios
        .get(`/productService/getProductByName?name=${this.$route.query.name}`)
        .then(res => {
          this._id = res.data._id;
          this.name = res.data.name;
          this.description = res.data.description;
          this.category = res.data.category;
          this.price = res.data.price;
          this.location = res.data.location;
          this.details = res.data.details.join("\n");
          this.frontImagePreview = res.data.frontImage;
          this.previews = res.data.images;
          this.existingImagesCount = res.data.images.length;
        });
    }
  },

  methods: {
    addPreviewImage() {
      this.frontImage = this.$refs.frontImage.files[0];
      this.frontImagePreview = this.previewImage(this.frontImage, true);
    },

    addImages() {
      this.$refs.images.files.forEach(image => {
        if (
          this.images.find(existingImage => existingImage.name === image.name)
        ) {
          alert(`${image.name} has already been uploaded`);
          return;
        } else {
          this.images.push(image);
        }
        this.previewImage(image, false);
      });
    },

    previewImage(image, isFrontImage) {
      const fileReader = new FileReader();
      fileReader.addEventListener(
        "load",
        function() {
          if (isFrontImage) {
            this.frontImagePreview = fileReader.result;
          } else {
            this.previews.push(fileReader.result);
            this.selectedImageIndex = this.previews.length - 1;
          }
        }.bind(this),
        false
      );
      fileReader.readAsDataURL(image);
    },

    removeImage() {
      if (this.selectedImageIndex < this.existingImagesCount) {
        this.imagesToRemove.push(this.previews[this.selectedImageIndex]);
      } else {
        this.images.splice(
          this.selectedImageIndex - this.existingImagesCount,
          1
        );
      }
      this.previews.splice(this.selectedImageIndex, 1);
      if (this.selectedImageIndex > 0) {
        this.selectedImageIndex--;
      }
    },

    uploadProduct() {
      const formData = new FormData();
      formData.append("_id", this._id);
      formData.append("name", this.name);
      formData.append("category", this.category);
      formData.append("description", this.description);
      formData.append("price", this.price);
      formData.append("details", JSON.stringify(this.details.split("\n")));
      formData.append("imagesToRemove", JSON.stringify(this.imagesToRemove));
      formData.append("frontImage", this.frontImage);
      this.images.forEach(image => formData.append("images", image));

      axios.post("/productService/addOrUpdateProduct", formData).then(res => {
        if (res && res.status === 201) {
          this.$store.dispatch(
            "pushGoodNews",
            `${this.name} uploaded successfully!`
          );
        } else {
          this.$store.dispatch("pushBadNews", `${this.name} failed to upload`);
        }
      });
    },

    calculateHeightOfDetails() {
      return (
        10 +
        2 *
          (Math.floor(this.details.length / 145) +
            (this.details.match(/\n/g) || []).length -
            1)
      );
    }
  }
};
</script>
