const express=require('express');
const Router=express.Router();
const connection = require('../database');


Router.post('/register',(req,res)=>{
    // console.log(req.body.email_address)
    // res.send("working")
    const user=req.body
    
    let query="INSERT INTO ecom.site_user (email_address, phone_number, password) VALUES (?,?,?);"

    connection.query(query,[user.email_address,user.phone_number,user.password],
            (err,result)=>{
                if(!err){
                    return res.json({massage:result})
                }
                else{
                    return res.json({err})
                }
            }
        )
})
Router.post('/login',(req,res)=>{
    const user=req.body;
    let query="select id,email_address from ecom.site_user where phone_number=? and password=?;"
    connection.query(query,[user.phone_number,user.password],(err,result)=>{
        if(!err){
                if(result.length>0){
                    res.status(200).json({
                        user_id:result[0].id,
                        email_address:result[0].email_address
                    })
                    
                }else{
                    res.status(404).json({massage:"wrong id or password"})
                }
            
        }
        else{
            return res.json({err})
        }
        
    })
   
})

// address field--------------------------------------------
Router.post('/address',(req,res)=>{
    const user=req.body;
    let address_query='INSERT INTO ecom.address(unit_number, street_number, address_line1, address_line2, city, region, postal_code, country_id)VALUES (?, ?, ?, ?, ?, ?, ?, ?);'
    connection.query(address_query,
        [user.unit_number,user.street_number,user.address_line1,user.address_line2,user.city,user.region,user.postal_code,user.country_id],
        (error,result)=>{
            console.log(result);
            if(!error){
                connection.query(`INSERT INTO ecom.user_address(user_id,address_id,is_default)VALUES('${user.user_id}','${result.insertId}','${user.is_default}')`,
                (error,result)=>{
                    console.log(result);
                    res.status(200).json({massage:'address added successfully'})
                });
            }else{
                res.json({massage:error})
            }
        }
        )
})
Router.get('/address/:id',(req,res)=>{
    // console.log(req.params.id);
    const user_id=req.params.id;
    let query=`select * from ecom.user_address where user_id=${user_id};`
    connection.query(query,(error,result)=>{
        // res.status(200).json({massage:result})
        // console.log(result[0]);
        let address_query=`select * from ecom.address where id=${result[0].address_id};`
        connection.query(address_query,(error,result)=>{
            if(!error){
                res.status(200).json({massage:result})
            }
            else{
                console.log(error);
            }
            
        })
    })
})

module.exports=Router;