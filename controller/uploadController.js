
const uploadMulter = require("../middleware/multer");
const path = require("path");
const Excel = require('exceljs');
const axios = require('axios')

module.exports.uploadFile = function(req, res){

    uploadMulter(req, res, async function(err){
        if (err) {
            // only allow excel file
            return res.status(406).json(err);
        }

        await excel(req.file.path);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", "attachment; filename=" + req.file.originalname);
    
        return res.sendFile(path.join(__dirname, "..", req.file.path));

    });
}


async function excel(filePath) {
    let workbook = new Excel.Workbook();
    workbook = await workbook.xlsx.readFile(filePath); 
    let worksheet = workbook.getWorksheet('Sheet1'); 
    
    for(let i=2; i<=worksheet.actualRowCount; i++){
        let price = await fetchPrice(worksheet.getRow(i).getCell(1).value);
        worksheet.getRow(i).getCell(2).value = price;
    }
    
    await workbook.xlsx.writeFile(filePath);
}


async function fetchPrice(product){
    try{

        let response = await axios(`https://api.storerestapi.com/products/${product}`)
        return response.data.data.price;

    }catch(err){
        console.log(err);
    }
}