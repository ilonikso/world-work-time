class Storage {
    constructor(){

    }

    storeItem(item) {
        let items;

        // Check if any items in local storage
        if(localStorage.getItem('items') === null){
            items = [];

            // Push new item
            items.push(item);

            // Set local storage
            localStorage.setItem('items', JSON.stringify(items));
        } else {

            // Get what is alreafy in local storage 
            items = JSON.parse(localStorage.getItem('items'));

            // Push new item
            items.push(item);

            // Reset localStorage
            localStorage.setItem('items', JSON.stringify(items));
        }
    }

    getItemsFromStorage() {
        let items;

        if(localStorage.getItem('items') === null){
            items = [];
        } else{
            items = JSON.parse(localStorage.getItem('items'));
        }

        return items;
    }

    deleteItemFromStorage(id){
        let items = JSON.parse(localStorage.getItem('items'));

        items.forEach(function(item, index){
            if(id === item.id){
                items.splice(index, 1);
            }
        });

        // Reset localStorage
        localStorage.setItem('items', JSON.stringify(items));
    }

    clearItemsFromStorage (){
        localStorage.removeItem('items');
    }
}