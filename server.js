var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/inventory');

var Inventory = mongoose.model('invent', mongoose.Schema({
	code:String,
	name:String,
	weight:String,
	price:String,
	quantity:String,
	delievered:String,
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

app.get('/api/inventory', function(req, res){
	Inventory.find(function(err, inventorys){
		if(err)
			res.send(err);
		res.json(inventorys);
	});
});

app.get('/api/inventory/:id', function(req, res){
	Inventory.findOne({_id:req.params.id}, function(err, inventory){
		if(err)
			res.send(err);
		res.json(inventory);
	});
});

app.post('/api/inventory', function(req, res){
	Inventory.create( req.body, function(err, inventory){
		if(err)
			res.send(err);
		res.json(inventory);
	});
});

app.delete('/api/inventory/:id', function(req, res){
	Inventory.findOneAndRemove({_id:req.params.id}, function(err, inventory){
		if(err)
			res.send(err);
		res.json(inventory);
	});
});

app.put('/api/inventory/:id', function(req, res){
	var query = {
		code:req.body.code,
		name:req.body.name,
		weight:req.body.weight,
		price:req.body.price,
		quantity:req.body.quantity,
		delievered:req.body.delievered,
	};
	Inventory.findOneAndUpdate({_id:req.params.id}, query, function(err, inventory){
		if(err)
			res.send(err);
		res.json(inventory);
	});
});

app.listen(3001, function(){
	console.log('server is running on port 3001..');
});
