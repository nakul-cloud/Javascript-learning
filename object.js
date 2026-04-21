const car = {
    name: "BMW",
    model: "X5",
    year: 2020, 
    color: "black",
    priceUSD:40000,

    applyDiscount:function(discount){
        const multiplier = 1-discount/100;
        this.priceUSD*=multiplier;
    },

    getSummary(){
        return `${this.year} ${this.name} ${this.model} costs $${this.priceUSD}`;   
    
    }
};

// before discount 
console.log('before discount:');
console.log(car.getSummary());

// apply discount
car.applyDiscount(10);

// after discount
console.log('\n after discount:');
console.log(car.getSummary());  