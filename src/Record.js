// CREATED A CLASS TO MAKE SURE THE TYPE AND OBJECTS ARE POPULATED CORRECTLY
export default class Record {
    constructor(scriptName='',price=0,lastUpdated,cellColour='WHITE',lastPrice=0){
        this.scriptName = scriptName;
        this.price = price;
        this.lastUpdated = lastUpdated || new Date();
        this.cellColour = cellColour;
        this.lastPrice = lastPrice;

//  UPDATE PRICE TO BE CALLED WHEN PRICE OF SCRIPT WILL CHANGE, IT WILL CHANGE OTHER VALUES BASED ON IT.
        this.updatePrice = (newPrice)=>{
            this.lastPrice = this.price;
            this.price = newPrice;
            this.lastUpdated = new Date()
            if (this.price && this.lastPrice && this.price !== this.lastPrice) {
                this.cellColour = this.price > this.lastPrice ? 'GREEN' : 'RED'
            } 
            else {
                this.cellColour = 'WHITE'
            }
        }
    }
}