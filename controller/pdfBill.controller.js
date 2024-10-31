const pdfDoc = require("pdfkit")
const asyncHandler = require("express-async-handler")
const sendEmail = require("../utils/email")

// exports.BillMail = asyncHandler(async(req,res)=>{
//     const { totalBillData, customerData } = req.body
//     console.log(totalBillData);
//     console.log(customerData);
//     await sendEmail({
//         to: email, subject: `Your Istimated Bill`, message: `<!DOCTYPE html>
// <html lang="en">
// <head>
// </head>
// <style>
//     .quick {
//         display: flex;
//         justify-content: center;
//         align-items: center;
//     }

//     .cName {
//         font-weight: bold;
//         font-style: inherit;
//     }

//     .contact {
//         display: flex;
//         flex-direction: row;
//         justify-content: space-around;
//         /* gap: 500px; */
//     }

//     .table {
//         display: flex;
//         justify-content: center;
//         /* margin-left: 100px; */
//         padding-top: 60px;
//         padding: 40px;
//     }

//     .total {
//         display: flex;
//         flex-direction: row;
//         padding-left: 830px;
//         gap: 20px;
//         padding-top: 10px;
//     }
// </style>
// <body>
//     <div>
//         <div id="pdf-content"></div>
//         <div class="quick">
//             <h1 className="font-bold text-2xl">QUICK BILL</h1>
//         </div>
//         <div class="contact">
//             <span class="">
//                 Customer Name: <span class="cName">${customerName}</span>
//             </span>
//             <span class="">
//                 Mobile: <span class="cName">${customermobile}</span>
//             </span>
//         </div>
//         <div className="p-10  ">
//             <div class="table">
//                 <table border="1">
//                     <thead>
//                         <tr>
//                             <th>
//                                 Product Name
//                             </th>
//                             <th>
//                                 Price/Unit
//                             </th>
//                             <th>
//                                 QTY
//                             </th>
//                             <th>
//                                 Amount
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr key={index}>
//                             <td>
//                                 ${name}
//                             </td>
//                             <td>
//                                 ${price}
//                             </td>
//                             <td>
//                                 ${qty}
//                             </td>
//                             <td>
//                                  ${amount}
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//             <div>
//                 <div>
//                     <div class="total" >
//                         <p>Total : </p>
//                         <p>
//                             ${totalAmount}
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     </div>
// </body>

// </html> `,
//     })
//     res.json({message:"Bill Send to Mail"})
// })

exports.BillMail = asyncHandler(async (req, res) => {
    const { totalBillData, customerData } = req.body;
    const { products, totalAmount } = totalBillData;
    const { name, mobile, email } = customerData;

    // Generate table rows for each product
    const productRows = products.map(product => `
        <tr>
            <td>${product.itemName}</td>
            <td>${product.pricePerUnit}</td>
            <td>${product.qty}</td>
            <td>${product.amount}</td>
        </tr>
    `).join('');

    // Email HTML template
    const emailHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head></head>
        <style>
            .quick { display: flex; justify-content: center; align-items: center; }
            .cName { font-weight: bold; font-style: inherit; }
            .contact { display: flex; flex-direction: row; justify-content: space-around; }
            .table { display: flex; justify-content: center; padding-top: 60px; padding: 40px; }
            .total { display: flex; flex-direction: row; padding-left: 830px; gap: 20px; padding-top: 10px; }
        </style>
        <body>
            <div>
                <div class="quick">
                    <h1 class="font-bold text-2xl">QUICK BILL</h1>
                </div>
                <div class="contact">
                    <span>Customer Name: <span class="cName">${name}</span></span>
                    <span>Mobile: <span class="cName">${mobile}</span></span>
                </div>
                <div class="p-10">
                    <div class="table">
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Price/Unit</th>
                                    <th>QTY</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${productRows}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div class="total">
                            <p>Total:</p>
                            <p>${totalAmount}</p>
                        </div>
                    </div>
                    <img src="" />
                    <div style={{marginTop:30,}}>
                        <h1>Thank You For Shopping</h1>
                        <p>visite Again..!</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;

    // Send email
    await sendEmail({
        to: email,
        subject: `Your Estimated Bill`,
        message: emailHtml,
    });

    res.json({ message: "Bill sent to mail" });
});
