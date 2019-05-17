//storage controller
const StgCtrl=(function(){
    return{
        storeItem:(item)=>{
            let items=[];
            //check If any item in local storage
            if(localStorage.getItem('items')===null){
                items=[];
                items.push(item);
                //local storage keeps only string thats why we need to convert objects into string
                localStorage.setItem('items',JSON.stringify(items));
            }else{
                items = JSON.parse(localStorage.getItem('items')) ;
                items.push(item);
                //local storage keeps only string thats why we need to convert objects into string
                localStorage.setItem('items', JSON.stringify(items));
            }

        },
        getItemFormStorage:function(){
            let items = [];
            //check If any item in local storage
            if (localStorage.getItem('items') === null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateItemFormStorage:function(updatedItem){
           let items = JSON.parse(localStorage.getItem('items'));
           items.forEach(function(item,index){
               if(updatedItem.id===item.id){
                   items.splice(index,1,updatedItem);
               }
           });
           localStorage.setItem('items',JSON.stringify(items));
        },
        dltItemFromStorage: function (id){
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach(function (item, index) {
                if (id === item.id) {
                    items.splice(index, 1);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        clearDataFormStorage:function(){
            let items=[];
            localStorage.setItem('items', JSON.stringify(items));

        }
    }
})();
//item controller
const ItemCtrl=(function () {
    const Item=function(id,name,calories){
            this.id=id;
            this.name=name;
            this.calories=calories;
        }
   //data/state that will be called from DB/api etc
   const data={
    //   items:[
    //       //{id:0,name:'egg',calories:1200},
    // //    {
    // //        id: 1,
    // //        name: 'egg',
    // //        calories: 1200
    // //    },
    // //    {
    // //        id: 2,
    // //        name: 'egg',
    // //        calories: 1200
    // //    }
    // ],
    items:StgCtrl.getItemFormStorage(),
    currentItem:null,
    totalCalories:0
   }
   return {
       getTotalCalorie:function(){
           let totalCalorie=0;
           data.items.forEach((item)=>{
            totalCalorie += item.calories;
           })
           data.totalCalories=totalCalorie;
           return data.totalCalories;
       },



       addItem:function(name,calorie){

          let ID;
          // Create ID
          if (data.items.length > 0) {
              ID = data.items[data.items.length - 1].id + 1;
          } else {
              ID = 0;
          }

          // Calories to number
          calorie = parseInt(calorie);

          // Create new item
          newItem = new Item(ID, name, calorie);

          // Add to items array
          data.items.push(newItem);

          return newItem;
        
       },
       getItemById:(id)=>{
        let found=0,resultItem;
        data.items.forEach((item)=>{
            if(item.id===id){
                resultItem=item;
            }
        })
        return resultItem;
       },
       updateItem:(name,calories)=>{
        // console.log('updateItem');
         let Updatedcalories = parseInt(calories);
           let found=null;
            data.items.forEach((item)=>{
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = Updatedcalories;
                    found = item;
                }
           });
        //    console.log(found);
           return found;

       },
       deleteItem:(id)=>{
           ids=data.items.map((item)=>{
               return item.id;
           });
           const index=ids.indexOf(id);
           data.items.splice(index,1);
       },
       setCurrentItem:(item)=>{
        //    console.log('setCurrentItem')
            data.currentItem=item;
            //  console.log(data.currentItem);
       },
       getCurrentItem: () => {
        //    console.log(data.currentItem);
          return data.currentItem;
       },

        getItems: function () {
            return data.items;
        },
        deleteItemAll:()=>{
            data.items=[];
        },
       logData:function(){
           return data;
       }
   }
    
})();
//ui controller
const UICtrl = (function () {
    const UIselectors={
        itemList :'#item-list',
        uiAdd:'add',
        listItems: '#item-list li',
        itemName: "#item-name",
        itemCalorie: "#item-calories",
        output: 'output',
        uidlt:'delete',
        uiUpdate:'update',
        uiBack: 'back',
         uiClear: 'clear'
    }
    return {

        showTotalcalorie:function(tcalorie){
            // console.log(document.querySelector('#output'));
            document.getElementById(UIselectors.output).innerHTML = `Total Calories:<strong>${tcalorie}</strong>`;
          
        },
        clearInput:function(){
            document.querySelector(UIselectors.itemName).value='';
             document.querySelector(UIselectors.itemCalorie).value = '';
    },
        addListitem:function(item){
            const li=document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.id=`item-${item.id}`;
            li.innerHTML = ` <strong>${item.name} </strong>
                        ${item.calories}calories
                        <span class="badge badge-primary badge-pill">
                            <i class="edit-item fa fa-pencil"></i>
                        </span>`;
                        //insert into dom
                        document.querySelector(UIselectors.itemList).insertAdjacentElement('beforeend',li)

                UICtrl.clearInput();
                    },
    clearEditState:function(){
        UICtrl.clearInput();
        document.getElementById(UIselectors.uiAdd).style.display='inline';
        document.getElementById(UIselectors.uidlt).style.display = 'none';
        document.getElementById(UIselectors.uiUpdate).style.display = 'none';
        document.getElementById(UIselectors.uiBack).style.display = 'none';

    },
    deleteListItem:(id)=>{
        const itemId=`#item-${id}`;
        const item=document.querySelector(itemId);
        item.remove();

    },
    updateListItem:(item)=>{
       
        var listItems=document.querySelectorAll(UIselectors.listItems);
        
        var listItemsArr = Array.from(listItems);
        // console.log(listItemsArr);
        listItemsArr.forEach((listItem)=>{
            const itemId=listItem.getAttribute('id');
            // console.log(itemId);
            if(itemId===`item-${item.id}`){
                document.querySelector(`#${itemId}`).innerHTML = `<strong>${item.name} </strong>
                        ${item.calories}calories
                        <span class="badge badge-primary badge-pill">
                            <i class="edit-item fa fa-pencil"></i>
                        </span>`
                
            }

        })

    },
    addItemToForm: (item) => {
        // console.log('addItemToForm');
         document.querySelector(UIselectors.itemName).value = item.name;
         document.querySelector(UIselectors.itemCalorie).value = parseInt(item.calories);
         document.getElementById(UIselectors.uiAdd).style.display = 'none';
         document.getElementById(UIselectors.uidlt).style.display = 'inline';
         document.getElementById(UIselectors.uiUpdate).style.display = 'inline';
         document.getElementById(UIselectors.uiBack).style.display = 'inline';

    },

    getUIselectors: function() {
        return UIselectors;
    } , 
    clearItem:()=>{
        var listItems = document.querySelectorAll(UIselectors.listItems);
        listItems=Array.from(listItems);
        listItems.forEach((item)=>{
        item.remove()
        })
    },
    
    UIgetItemInput: function () {
        // console.log('UIgetItemInput')
            return {
            name:document.querySelector(UIselectors.itemName).value,
            calorie: document.querySelector(UIselectors.itemCalorie).value
            }

    },
        populateItemList:function(items){
            var html='';
            items.forEach(item => {
                html += `<li id='item-${item.id}' class = "list-group-item d-flex justify-content-between align-items-center" >
                    <strong>${item.name} </strong>
                    ${item.calories}calories
                    <span class="badge badge-primary badge-pill">
                        <i class="edit-item fa fa-pencil"></i>
                    </span>
                </li>`
                
            });
            //insert list items
            document.querySelector(UIselectors.itemList).innerHTML=html;

        }
        
    }

})();
//app controll
const App = (function (ItemCtrl, StgCtrl, UICtrl) {
    //loadevent listeners
    const loadEventListeners = function () {
        const UIselectors=UICtrl.getUIselectors();

        //add item event
        document.getElementById(UIselectors.uiAdd).addEventListener('click',itemAddSubmit);
        document.addEventListener('keypress',function(e){
            if(e.keyCode===13||e.which===13){
                return false;
            }
        })

         document.querySelector('#item-list').addEventListener('click', itemUpdateClick);
         document.getElementById(UIselectors.uiUpdate).addEventListener('click', itemUpdateSubmit);
         document.getElementById(UIselectors.uidlt).addEventListener('click', itemDltSubmit);
         document.getElementById(UIselectors.uiClear).addEventListener('click', itemClearSubmit);
          document.getElementById(UIselectors.uiBack).addEventListener('click', UICtrl.clearEditState);
        const totalCalorie = ItemCtrl.getTotalCalorie();
        UICtrl.showTotalcalorie(totalCalorie);

    }
    const itemAddSubmit=function(e){
        const input=UICtrl.UIgetItemInput();
        
        const UIselectors = UICtrl.getUIselectors();
        if(input.name!==''&&input.calorie!==""){
            const newItem = ItemCtrl.addItem(input.name, input.calorie);
            //add item to ui list
            UICtrl.addListitem(newItem);
            StgCtrl.storeItem(newItem);
            const totalCalorie=ItemCtrl.getTotalCalorie();
            UICtrl.showTotalcalorie(totalCalorie);
           
           
            UICtrl.clearEditState();
        }
      
    }
    const itemClearSubmit=(e)=>{
        if (confirm("Are you sure to do Clear all data?")){
            ItemCtrl.deleteItemAll();
            UICtrl.clearItem();
            StgCtrl.clearDataFormStorage();
            
            const totalCalorie = ItemCtrl.getTotalCalorie();
            UICtrl.showTotalcalorie(totalCalorie);


           
        }
        

         e.preventDefault();
    }
    const itemDltSubmit=(e)=>{
        const currentItem=ItemCtrl.getCurrentItem();
        // console.log(currentItem.id);
        ItemCtrl.deleteItem(currentItem.id);

        UICtrl.deleteListItem(currentItem.id);
        StgCtrl.dltItemFromStorage(currentItem.id);
        
          const totalCalorie = ItemCtrl.getTotalCalorie();
          UICtrl.showTotalcalorie(totalCalorie);


          UICtrl.clearEditState();
          ItemCtrl.setCurrentItem(null);



    e.preventDefault();
    }
  
    const itemUpdateClick = (e) => {
        if(e.target.classList.contains('edit-item')){
            // console.log(e.target);
            //get the id which is clicked
            const liId=e.target.parentNode.parentNode.id;
            const liIdArr=liId.split('-');
            const liIdArrNum = parseInt(liIdArr[1]);
            
            const ItemToEdit = ItemCtrl.getItemById(liIdArrNum);
            // console.log(ItemToEdit);
            ItemCtrl.setCurrentItem(ItemToEdit);
// add item to form
            UICtrl.addItemToForm(ItemToEdit);

           
        }
    e.preventDefault();
    }
      const itemUpdateSubmit = (e) => {
          const input = UICtrl.UIgetItemInput();
            // console.log(input);
          const updateItem = ItemCtrl.updateItem(input.name, input.calorie);
        //   console.log(updateItem);
          UICtrl.updateListItem(updateItem);
          const totalCalorie = ItemCtrl.getTotalCalorie();
          UICtrl.showTotalcalorie(totalCalorie);
          StgCtrl.updateItemFormStorage(updateItem);


          UICtrl.clearEditState();

          e.preventDefault();
      }
    return{
        
       //inidial loading the app
        init:function(){
            console.log("started app")
            //fetching data 
            UICtrl.clearEditState();
            const items=ItemCtrl.getItems();
            // console.log(items)
            //sending Uito show up on Ui
            UICtrl.populateItemList(items);
            //load event listeners
            loadEventListeners();
        }
    }
})(ItemCtrl,StgCtrl, UICtrl);


App.init();