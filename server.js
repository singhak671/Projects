var mongoose=require('mongoose');
var express=require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');
var Id;
var serveStatic = require('serve-static');
mongoose.connect('mongodb://localhost/adminPanel');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var Schema=mongoose.Schema;
var data=new Schema(
{   _id: Schema.Types.ObjectId,
    Name:String,
    addresss:String,
	email:String,
	password:{type:String,required:true},
	employees:[{ type: Schema.Types.ObjectId, ref: 'employeeData' }]
});

var data1=new Schema({
	companyInfo:{ type:Schema.Types.ObjectId, ref: 'companyData' },
	employeeName:String,
	age:Number,
	doj:String,
	email:String,
	address:String
})
var model=mongoose.model('companyData',data);
var model1=mongoose.model('employeeData',data1);
app.use(express.static(__dirname+'/app'));



app.post('/signup',(req,res)=>
{
	model.findOne({'email':req.body.email}).lean().select('-password').exec((err,succ)=>
	{
		if(err){
		         res.send({
			     responseCode:404,
			     responseMessage:"Error Exists",
			    }      
			)}

		else if(succ)
			res.send({
                responseCode:401,
                responseMessage:"Company Already Exists..",
			})
			
		else
		{
			var signup_data=new model(
			{	_id:new mongoose.Types.ObjectId(),
                Name:req.body.companyName,
                address:req.body.address,
				password:req.body.password,
				email:req.body.email
				
			});
			signup_data.save((err1,succ)=>
			{
				if(err){
					res.send({
					responseCode:404,
					responseMessage:"Error Exists",
				   }      
			   )}
				else if(succ)
				{     res.send({
					  responseCode:200,
					  responseMessage:"SignUp Successfully"
					})
				}
			})
		}
	})
})


app.post('/login',(req,res)=>
{
	model.findOne({'email':req.body.email ,'password':req.body.password}).lean().select('-password').exec((err,succ)=>
	{
		if(err){
			res.send({
			responseCode:404,
			responseMessage:"Error Exists",
		   }      
	   )}
		else if(succ){
			Id=succ._id;
			res.send({
                responseCode:200,
                responseMessage:"Login successfully",
                data:succ
            });
		}
		else
			res.send({
				responseCode:401,
				responseMessage:"Login Unsuccessfull"
			});
	})
})



// app.post('/companyData',(req,res)=>{
// 	// console.log(req.body.email);
// 	model.find({'Name':req.body.companyName}).lean().select('-password').exec((err,succ)=>{
// 	console.log(err+" "+succ);
// 	if(err){
// 		res.send({
// 		responseCode:404,
// 		responseMessage:"Error Exists",
// 	   }      
//    )}
// 	else
// 	{
// 		res.send({
// 			responseCode:200,
// 			responseMessage:"Employees Data",
// 			data:succ
// 		});
// 	}
// 	})
// })


  app.post('/addEmployee',(req,res)=>{
	console.log(Id);
	req.body.companyInfo= Id ;
    model1.findOne({'email':req.body.email}).exec((err,succ)=>
	{
		if(err){
		         res.send({
			     responseCode:404,
			     responseMessage:"Error Exists",
			    }      
			)}

		else if(succ)
			res.send({
                responseCode:401,
                responseMessage:"Employee Already Exists..",
			})

	else{

    var employ = new model1(req.body);

    employ.save(function (err,success) {
	if (err)
	{
		return res.send({
		responseCode:404,
		responseMessage:"Error Exists"})
	}  


	console.log("i am success>>>>>>>>>"+success);
    model1.findOne({ _id: success._id }).populate('companyInfo').exec(function (err,succ) {
	if (err)
	{
		res.send({
		responseCode:404,
		responseMessage:"Error Exists"})
	}
	else{
	res.send({
		responseCode:200,
		responseMessage:"Employee Added Successfully..",
		data:succ
		
	});
	}
	
   }
  );
});
}})
})



app.get('/employeeData',(req,res)=>{
	model1.find({'companyInfo':Id}).exec((err,succ)=>{
	if(err){
		res.send({
		responseCode:404,
		responseMessage:"Error Exists",
	   }      
   )}
	else
	{ console.log(succ);
		res.send({
			responseCode:200,
			responseMessage:"Successfull",
			data:succ
		});
	}
	})
})


app.post('/findProfile',(req,res)=>{
	model1.findOne({'_id':req.body._id}).exec((err,succ)=>{
	if(err){
		res.send({
		responseCode:404,
		responseMessage:"Error Exists",
	   }      
   )}
   else if(! succ)
   {
	   res.send({
		   responseCode:401,
		   responseMessage:"Id Doesn't Exist"
	   })
   }

	else
	{ console.log(succ);
		res.send({
			responseCode:200,
			responseMessage:"Data found successfully",
			data:succ
		});
	}
	})
})





app.post('/editEmployee',(req,res)=>{
	console.log(req.body.email);
	model1.findByIdAndUpdate({_id:req.body._id},{$set:{'employeeName':req.body.employeeName,'age':req.body.age,'doj':req.body.doj,'email':req.body.email}},{new:true}).exec((err,succ)=>{
		
		if(err)
		{
			console.log("er===>",err)
			res.send({
                responseCode:404,
                responseMessage:"Error Exists",
            })
		}
		else{
			res.send({
                responseCode:200,
                responseMessage:"updated successfully",
                data:succ
            })
		}
	})
	
})


app.post('/deleteEmployee',(req,res)=>
{ console.log(req.body._id);
model1.findByIdAndRemove({_id:req.body._id}).exec(function(err,succ){
          if(err){
              res.send({
				  responseCode:404,
				  responseMessage:"error exist.."
			  })
		  }
		  else if(!succ)
		  {
			  res.send({
				  responseCode:401,
				  responseMessage:"ID NOT FOUND"
			  })
		  }
		  else{
          succ.remove(function(err)
          {
                  if(err)
                  {
					  res.send({
						  responseCode:404,
						  responseMessage:"Error exist"
					  })
				  }
                  else
                  res.send({
                      responseCode:200,
                      responseMessage:"deleted successfully",
                      data:succ
                  })
                  
		  });
		}
      });

});







app.listen(8000,()=>
{
	console.log("Server is running at 8000")
})