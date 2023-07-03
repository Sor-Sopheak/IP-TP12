<template>
    <div class="right-page">
      <div class="addnew">
        <p>Product</p>
        <button id="show-modal" class="modal-default-button-addnew" @click="showModal = true">Add new</button>
      </div>

      <div class="modal-mask" v-if="showModal">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <h3>Add New Product</h3>
              <button class="modal-close" @click="showModal = false">×</button>
            </div>

            <form @submit.prevent="addNewProduct">
              <div class="modal-body">
                <input type="text" v-model="name" placeholder="Enter name" required>
                <input type="text" v-model="description" placeholder="Enter description" required>
                <input type="text" v-model="imageUrl" placeholder="Enter imageUrl" required>
                <div>
                  <label for="categoryId">Choose a category: </label>
                  <select name="categoryId" id="categoryId" v-model="categoryId">
                    <option v-for="category in categories" :value="category._id">{{ category.name }}</option>
                  </select>
                </div>
                <div>
                  <label for="subCategoryId">Choose a item id: </label>
                  <select name="subCategoryId" id="subCategoryId" v-model="subCategoryId">
                    <option v-for="item in items" :value="item._id">{{ item.name }}</option>
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <button class="modal-default-button" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="wrap-right">
        <table>
          <tr>
              <th>Name</th>
              <th>Description</th>
              <th>imageUrl</th>
              <th>Action</th>
          </tr>
          
          <tr v-for="product in products" :key="product._id">
              <td class="product-name"> {{ product.name }} </td>
              <td class="product-description"> {{ product.description }} </td>
              <td v-if="product.imageUrl"> 
                <a :href="product.imageUrl" class="ellipsis"> {{ product.imageUrl }} </a>
              </td>
              <td v-else>No image</td>
              <td class="delete-edit">
              <div>
                <div class="deletebtn" @click="deleteProduct(product._id)">Delete</div>
                
                <div>
                  <button id="show-modal" class="modal-default-button-edit" @click="editPopUp(product)">Edit</button>
                    <div class="modal-mask" v-if="showModalEdit">
                      <div class="modal-wrapper">
                        <div class="modal-container">
                          <div class="modal-header">
                            <h3>Edit Product</h3>
                            <button class="modal-close" @click="showModalEdit = false">×</button>
                          </div>
                          
                          <form @submit.prevent="editProduct(product._id)">
                            <div class="modal-body">
                              <input type="text" v-model="name" placeholder="Enter name">
                              <input type="text" v-model="description" placeholder="Enter description">
                              <div>
                                <label for="categoryId">Choose a category: </label>
                                <select name="categoryId" id="categoryId" v-model="categoryId">
                                  <option v-for="category in categories" :value="category._id">{{ category.name }}</option>
                                </select>
                              </div>
                              <div>
                                <label for="subCategoryId">Choose a item: </label>
                                <select name="subCategoryId" id="subCategoryId" v-model="subCategoryId">
                                  <option v-for="subCategory in subCategories" :value="subCategory._id">{{ subCategory.name }}</option>
                                </select>
                              </div>
                              <label for="">Note: Image URL doesn't allow here!!</label>
                            </div>
                            <div class="modal-footer">
                              <button class="modal-default-button" type="submit">Submit</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              
              </td>
          </tr>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Product",
  
    data() {
      return {
        showModal: false,
        showModalEdit:false,
        products: [],
        items: [],
        categories: [],

        name: '',
        description: '',
        imageUrl: '',
        categoryId: '',
        subCategoryId: '',
      };
    },
  
    async mounted() {
      try {
        const productResponse = await fetch("http://127.0.0.1:3000/product/all");
        const productData = await productResponse.json();
        
        this.products = productData.data;
        
        await this.onClickCategory();
        await this.onClickItem();

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },

    methods: {
      async editPopUp(data){
        this.showModalEdit = true
        this.name = data.name
        this.description = data.description
        this.imageUrl = data.imageUrl
        this.categoryId = data.categoryId
        this.subCategoryId = data.subCategoryId

      },

        async onClickProduct() {
          try {
              let url = "http://localhost:3000/product/all";

              const response = await fetch(url);
              const data = await response.json();
              this.products = data.data;
              console.log(this.datas);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        },

        async addNewProduct() {
          const data = {
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            categoryId: this.categoryId,
            subCategoryId: this.subCategoryId,
          };

          fetch('http://localhost:3000/product/add', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
          })
          .then(async res => {
            if (res.status<200 || res.status>=300) {
              alert('Failed to add new product'); 

            } else {
              alert("Successfully added!!");
              this.name="";
              this.description="";
              this.imageUrl="";
              this.categoryId="";
              this.subCategoryId="";
              this.showModal=false;
              await this.onClickProduct()
            }
          })
          .catch(error => {
            console.error(error);
          })
        },

        deleteProduct(productId) {
          if (confirm("Are you sure you want to delete this product?")) {
            fetch(`http://localhost:3000/product/delete/${productId}`, {
              method: 'DELETE',
            })
            .then((response) => {
              if (response.ok) {
                alert("Product deleted successfully!");
                this.products = this.products.filter(product => product._id !== productId);
              } else {
                throw new Error('Failed to delete product');
              }
            })
            .catch((error) => {
              console.error(error);
            });
          } else {
            console.log('Deletion canceled');
          }
        },

        editProduct(productId) {
          const data = {
            categoryId: this.categoryId,
            subCategoryId: this.subCategoryId,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
          };

          fetch(`http://localhost:3000/product/update/${productId}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(async res => {
            if (res.status<200 || res.status>=300) {
              alert('Failed to edit this product'); 

            } else {
                alert("Successfully edited!!");
                this.subCategoryId="";
                this.categoryId="";
                this.name="";
                this.description="";
                this.imageUrl="";
                this.showModalEdit=false;
                await this.onClickProduct()
            }
          })
          .catch(error => {
            console.error(error);
          })
        },

        async onClickCategory() {
          try {
            const response = await fetch("http://localhost:3000/category/all");
            const categoryData = await response.json();
            this.categories = categoryData;
            
            } catch (error) {
              console.error("Error fetching category:", error);
          }
        },

        async onClickItem() {
          try {
              let url = "http://localhost:3000/item/all";

              const response = await fetch(url);
              const item = await response.json();
              this.items = item;

            } catch (error) {
              console.error("Error fetching item:", error);
          }
        },
      }
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

    .deletebtn:hover {
      color: red;
      text-decoration: underline;
      cursor: pointer;
    }
  
    .modal-mask {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9998;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-wrapper {
      width: 80%;
      max-width: 500px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .modal-container {
      padding: 20px;
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }

    .modal-close {
      font-size: 20px;
      font-weight: bold;
      border: none;
      background: none;
      color: #888;
      cursor: pointer;
      transition: color 0.3s ease;
    }

    .modal-close:hover {
      color: red;
    }

    .modal-body {
      padding: 10px 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: start;
    }

    .modal-body input{
      width: 100%;
      margin-bottom: 15px;
      padding: 5px;
      border-bottom: 1px solid gray;
      outline: none;
    }

    .modal-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-top: 10px;
      border-top: 1px solid #ccc;
    }

    .modal-default-button {
      margin-left: 10px;
      padding: 8px 12px;
      border-radius: 5px;
      background-color: #2691d9;
      color: #fff;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    
    .modal-default-button:hover {
      background-color: #1c7db6;
    }

    .modal-default-button-addnew {
      margin-bottom: 10px;
      padding: 4px 12px;
      border-radius: 5px;
      background-color: #eae9e9;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;

    }
    
    .modal-default-button-addnew:hover {
      background-color: #2691d9;
      color: #fff;
    }

    .modal-default-button-edit:hover {
      text-decoration: underline;
      color: #2691d9;
    }

    .ellipsis {
      display: inline-block; 
      width: 200px; 
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border: none;
    }
  </style>
  
  
  