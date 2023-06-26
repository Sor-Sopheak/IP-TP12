<template>
  <div class="wrapper">
    <div class="header">
      <h1>Admin dashboard</h1>
      <h1>លេខមួយ.com</h1>
    </div>
    <div id="page-wrap">
      <div class="grid-wrap-left">
        
        <div class="categories">
            <a href="#" @click="onClickCategory()"> Category </a>
        </div>

        <div class="sub-categories">
          <a href="#" @click="onClickItem()"> Item </a>
        </div>

        <div class="products">
          <a href="#" @click="onClickProduct()"> Product </a>
        </div>
      </div>

      <div class="right-page">

        <div>
          <div class="addnew">
            <p>Category</p>
            <button>Add new</button>
          </div>

          <div class="wrap-right">

            <table>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>imageUrl</th>
                <th>Action</th>
              </tr>
              
              <tr class="category-item" v-for="data in datas" :key="data._id">
                <td class="category-name"> {{ data.name }} </td>
                <td class="category-description"> {{ data.description }} </td>
                <td  v-if="data.imageUrl"> 
                  <a :href="data.imageUrl"> {{ data.imageUrl }} </a>
                </td>
                <td v-else>No image</td>
                <td class="delete-edit">
                  <div>
                    <a href="#">Delete</a>
                  </div>
                  <div>
                    <a href="#">Edit</a>
                  </div>
                </td>
              </tr>
            </table>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminDashboard",

  data() {
    return {
      datas: [],
    };
  },

  async mounted() {
    try {
      const categoryResponse = await fetch("http://127.0.0.1:3000/category/all");
      const categoryData = await categoryResponse.json();

      this.datas = categoryData;

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  methods: {
    async onClickCategory() {
      try {
        let url = "http://localhost:3000/category/all";
        
        const response = await fetch(url);
        const data = await response.json();
        this.datas = data;
        
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    },

    async onClickItem() {
      try {
        let url = "http://localhost:3000/item/all";

        const response = await fetch(url);
        const data = await response.json();
        this.datas = data;
        console.log(this.datas);
      } catch (error) {
        console.error("Error fetching subCategory:", error);
      }
    },

    async onClickProduct() {
      try {
        let url = "http://localhost:3000/product/all";

        const response = await fetch(url);
        const data = await response.json();
        this.datas = data.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },


  },
};
</script>
  
<style>

  body{
    margin: 0;
    padding: 0;
  }

  .wrapper {
    margin: auto;
    width: 90%;
    height: 100vh;
    overflow-y: auto;
    border: 2px solid gray;
  }

  #page-wrap {
    display: grid;
    grid-template-columns: 0.3fr 1fr;
    gap: 10px;
    padding: 10px;
  }

  .grid-wrap-left {
    background-color: #f0f0f0;
  }

  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 2px gray solid;
    height: 50px;
  }

  .addnew{
    display: flex;
    justify-content: space-between;
  }

  .addnew button{
    height: 30px;
    box-shadow: 2px 2px rgb(208, 208, 208);
  }

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  th {
    border: 1px solid #dddddd;
    background-color: #aaaaaa;
    text-align: left;
    padding: 8px;
  }

  td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #eae9e9;
  }

  
</style>


