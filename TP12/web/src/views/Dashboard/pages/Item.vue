<template>
    <div class="right-page">
      <div class="addnew">
        <p>Item</p>
        <button id="show-modal" class="modal-default-button-addnew" @click="showModal = true">Add new</button>
      </div>

      <div class="modal-mask" v-if="showModal">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <h3>Add New Item</h3>
              <button class="modal-close" @click="showModal = false">×</button>
            </div>

            <form @submit.prevent="addNewItem">
              <div class="modal-body">
                <div>
                  <label for="categoryId">Choose a category id: </label>
                  <select name="categoryId" id="categoryId" v-model="categoryId">
                    <option v-for="category in categories" :value="category._id">{{ category.name }}</option>
                  </select>
                </div>
                <input type="text" v-model="name" placeholder="Enter name" required>
                <input type="text" v-model="description" placeholder="Enter description" required>
                <label for="">Note: Image URL doesn't allow here!!</label>
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
          
          <tr v-for="item in items" :key="item._id">
              <td class="item-name"> {{ item.name }} </td>
              <td class="item-description"> {{ item.description }} </td>
              <td v-if="item.imageUrl"> 
              <a :href="item.imageUrl"> {{ item.imageUrl }} </a>
              </td>
              <td v-else>No image</td>
              <td class="delete-edit">
                <div>
                  <div class="deletebtn" @click="deleteItem(item._id)">Delete</div>
                  <div>
                    <button id="show-modal" class="modal-default-button-edit" @click="editPopUp(item)">Edit</button>
                    <div class="modal-mask" v-if="showModalEdit">
                      <div class="modal-wrapper">
                        <div class="modal-container">
                          <div class="modal-header">
                            <h3>Edit Item</h3>
                            <button class="modal-close" @click="showModalEdit = false">×</button>
                          </div>
                          
                          <form @submit.prevent="editItem(item._id)">
                            <div class="modal-body">
                              <div>
                                <label for="categoryId">Choose a category id</label>
                                <select name="categoryId" id="categoryId" v-model="categoryId">
                                  <option v-for="category in categories" :value="category._id">{{ category.name }}</option>
                                </select>
                              </div>
                              <input type="text" v-model="name" placeholder="Enter name">
                              <input type="text" v-model="description" placeholder="Enter description">
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
    name: "Item",
  
    data() {
      return {
        showModal: false,
        showModalEdit:false,
        items: [],
        categories: [],

        categoryId: '',
        name: '',
        description: '',
      };
    },
  
    async mounted() {
      try {
        const itemResponse = await fetch("http://127.0.0.1:3000/item/all");
        const itemData = await itemResponse.json();
        this.items = itemData;

        await this.onClickCategory();
  
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    },

    methods: {
      async editPopUp(data){
        this.showModalEdit = true
        this.name=data.name
        this.description=data.description

      },

      async onClickItem() {
        try {
            let url = "http://localhost:3000/item/all";

            const response = await fetch(url);
            const data = await response.json();

            this.items = data;

          } catch (error) {
            console.error("Error fetching item:", error);
        }
      },

      addNewItem() {
        const data = {
          categoryId: this.categoryId,
          name: this.name,
          description: this.description,
        };

        fetch('http://localhost:3000/item/add', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(async res => {
          if (res.status<200 || res.status>=300) {
            alert('Failed to add new item'); 

          } else {
            alert("Successfully added!!");
            this.name="";
            this.description=""
            this.showModal=false;
            await this.onClickItem()
          }
        })
        .catch(error => {
          console.error(error);
        })
      },

      editItem(itemId) {
        const data = {
          categoryId: this.categoryId,
          name: this.name,
          description: this.description,
        };

        fetch(`http://localhost:3000/item/update/${itemId}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(async res => {
          if (res.status<200 || res.status>=300) {
            alert('Failed to edit item'); 

          } else {
            alert("Successfully edited!!");
            this.categoryId="";
            this.name="";
            this.description=""
            this.showModal=false;
            this.showModalEdit=false;
            await this.onClickItem()
          }
        })
        .catch(error => {
          console.error(error);
        })
      },

      deleteItem(itemId) {
        if (confirm("Are you sure you want to delete this item?")) {
          fetch(`http://localhost:3000/item/delete/${itemId}`, {
            method: 'DELETE',
          })
          .then((response) => {
            if (response.ok) {
              alert("Item deleted successfully!");
              this.items = this.items.filter(item => item._id !== itemId);
            } else {
              throw new Error('Failed to delete this item!');
            }
          })
          .catch((error) => {
            console.error(error);
          });
        } else {
          console.log('Deletion canceled');
        }
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

    .deletebtn:hover {
      color: red;
      text-decoration: underline;
      cursor: pointer;
    }
  </style>
  
  
  