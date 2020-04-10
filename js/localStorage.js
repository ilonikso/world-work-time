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

    getItemFromStorage(id) {
        let items;
        let found = null;

        if(localStorage.getItem('items') === null){
            items = [];
        } else{
            items = JSON.parse(localStorage.getItem('items'));
        }

        items.forEach(function(item){
            if(item.id === id){
                found = item;
            }
        });

        return found;
    }

    updateItemFromStorage(id, newItem){
        let items;

        if(localStorage.getItem('items') === null){
            items = [];
        } else{
            items = JSON.parse(localStorage.getItem('items'));
        }

        let old = this.getItemFromStorage(id);

        items.splice(id, 1, newItem);

        this.clearItemsFromStorage();

        items.forEach(item => {
            this.storeItem(item);
        })

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

    getNewID(){
        let ID;
        let cities = this.getItemsFromStorage();

        if(cities.length > 0){
            ID = cities[cities.length - 1].id + 1;
        } else {
            ID = 0;
        }

        return ID;
    }

    getModeFromStorage(){
        let mode;

        if(localStorage.getItem('mode') === null){
            mode = 'light';
        } else{
            mode = localStorage.getItem('mode');
        }

        return mode;
    }

    storeMode(mode){
        localStorage.setItem('mode', mode);
    }
}