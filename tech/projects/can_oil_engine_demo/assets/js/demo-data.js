const demoCategories = [
  {id:"car-oil",nameAr:"زيوت سيارات",nameEn:"Car Oils"},
  {id:"tuktuk-oil",nameAr:"زيوت تكتك",nameEn:"Tuk-tuk Oils"},
  {id:"moto-oil",nameAr:"زيوت موتوسيكل",nameEn:"Motorcycle Oils"},
  {id:"fluids",nameAr:"سوائل وخدمات",nameEn:"Fluids & Service"},
  {id:"filters",nameAr:"فلاتر",nameEn:"Filters"},
  {id:"parts",nameAr:"قطع وصيانة",nameEn:"Parts & Maintenance"}
];
const demoProducts = [
  {id:1,sku:"OIL-20W50-BULK",nameAr:"زيت محرك 20W-50 سائب",nameEn:"Bulk Engine Oil 20W-50",category:"car-oil",brand:"Shell",unit:"litre",quantity:100000,min:20000,cost:14000,price:20000,active:true,viscosity:"20W-50"},
  {id:2,sku:"OIL-10W40-BULK",nameAr:"زيت محرك 10W-40 سائب",nameEn:"Bulk Engine Oil 10W-40",category:"car-oil",brand:"Mobil",unit:"litre",quantity:18750,min:20000,cost:19000,price:27000,active:true,viscosity:"10W-40"},
  {id:3,sku:"GEAR-BULK",nameAr:"زيت فتيس سائب",nameEn:"Bulk Gear Oil",category:"fluids",brand:"Total",unit:"litre",quantity:25500,min:10000,cost:17500,price:25000,active:true,viscosity:"80W-90"},
  {id:4,sku:"TUK-2T-1L",nameAr:"زيت تكتك 2T",nameEn:"Tuk-tuk 2T Oil",category:"tuktuk-oil",brand:"Misr",unit:"bottle",quantity:12,min:10,cost:8500,price:12000,active:true,size:1},
  {id:5,sku:"MOTO-4T-1L",nameAr:"زيت موتوسيكل 4T",nameEn:"Motorcycle 4T Oil",category:"moto-oil",brand:"Motul",unit:"bottle",quantity:6,min:8,cost:14500,price:19500,active:true,size:1},
  {id:6,sku:"BRAKE-500",nameAr:"زيت فرامل",nameEn:"Brake Fluid",category:"fluids",brand:"Bosch",unit:"bottle",quantity:18,min:6,cost:6500,price:9500,active:true,size:.5},
  {id:7,sku:"POWER-1L",nameAr:"زيت باور",nameEn:"Power Steering Fluid",category:"fluids",brand:"STP",unit:"bottle",quantity:4,min:6,cost:9000,price:13500,active:true,size:1},
  {id:8,sku:"COOLANT-4L",nameAr:"مياه تبريد",nameEn:"Engine Coolant",category:"fluids",brand:"ACDelco",unit:"bottle",quantity:16,min:8,cost:12500,price:17500,active:true,size:4},
  {id:9,sku:"ENGINE-1L",nameAr:"زيت محرك عبوة 1 لتر",nameEn:"Engine Oil 1 L Bottle",category:"car-oil",brand:"Shell",unit:"bottle",quantity:30,min:12,cost:18000,price:24000,active:true,size:1},
  {id:10,sku:"ENGINE-4L",nameAr:"زيت محرك عبوة 4 لتر",nameEn:"Engine Oil 4 L Bottle",category:"car-oil",brand:"Mobil",unit:"bottle",quantity:9,min:8,cost:62000,price:78000,active:true,size:4},
  {id:11,sku:"FILTER-CAR",nameAr:"فلتر زيت سيارة",nameEn:"Car Oil Filter",category:"filters",brand:"Mann",unit:"piece",quantity:22,min:10,cost:7500,price:11500,active:true},
  {id:12,sku:"FILTER-MOTO",nameAr:"فلتر زيت موتوسيكل",nameEn:"Motorcycle Oil Filter",category:"filters",brand:"K&N",unit:"piece",quantity:3,min:6,cost:5500,price:8500,active:true},
  {id:13,sku:"AIR-FILTER",nameAr:"فلتر هواء",nameEn:"Air Filter",category:"filters",brand:"Mann",unit:"piece",quantity:0,min:5,cost:11000,price:16500,active:true},
  {id:14,sku:"SPARK-PLUG",nameAr:"بوجيه",nameEn:"Spark Plug",category:"parts",brand:"NGK",unit:"piece",quantity:36,min:12,cost:4500,price:7000,active:true},
  {id:15,sku:"ENGINE-FLUSH",nameAr:"إضافة تنظيف محرك",nameEn:"Engine Flush Additive",category:"parts",brand:"Liqui Moly",unit:"bottle",quantity:2,min:5,cost:13500,price:18000,active:false,size:.3}
];
const demoSuppliers = [
  {id:1,nameAr:"المصرية للزيوت",nameEn:"Egyptian Oils Co."},
  {id:2,nameAr:"النجمة للفلاتر",nameEn:"Al Negma Filters"},
  {id:3,nameAr:"مخزن المحروسة",nameEn:"Al Mahrousa Supply"}
];
const demoInvoices = [
  {no:"INV-1048",date:"2026-07-28 14:20",vehicle:"car",customerAr:"أحمد سمير",customerEn:"Ahmed Samir",items:3,total:98500,payment:"cash",status:"confirmed",user:"محمود"},
  {no:"INV-1047",date:"2026-07-28 13:45",vehicle:"tuktuk",customerAr:"عميل نقدي",customerEn:"Walk-in customer",items:2,total:47000,payment:"wallet",status:"confirmed",user:"كريم"},
  {no:"INV-1046",date:"2026-07-28 12:10",vehicle:"motorcycle",customerAr:"محمد السيد",customerEn:"Mohamed El Sayed",items:1,total:19500,payment:"cash",status:"pending",user:"كريم"},
  {no:"INV-1045",date:"2026-07-28 10:55",vehicle:"car",customerAr:"سارة علي",customerEn:"Sara Ali",items:2,total:59000,payment:"card",status:"draft",user:"محمود"},
  {no:"INV-1044",date:"2026-07-27 18:30",vehicle:"car",customerAr:"وليد حسن",customerEn:"Waleed Hassan",items:4,total:142000,payment:"bank",status:"cancelled",user:"محمود"}
];
const demoPurchases = [
  {no:"PUR-203",supplier:1,date:"2026-07-27",count:6,total:428000,status:"confirmed",user:"محمود"},
  {no:"PUR-202",supplier:2,date:"2026-07-24",count:3,total:176500,status:"confirmed",user:"محمود"},
  {no:"PUR-201",supplier:3,date:"2026-07-20",count:5,total:315000,status:"draft",user:"كريم"}
];
const demoMovements = [
  {date:"2026-07-28 14:20",product:1,type:"sale",qty:-1750,before:100000,after:98250,ref:"INV-1048",user:"محمود",notes:"بيع سائب"},
  {date:"2026-07-28 13:45",product:4,type:"sale",qty:-2,before:14,after:12,ref:"INV-1047",user:"كريم",notes:"—"},
  {date:"2026-07-28 09:10",product:2,type:"adjustmentIn",qty:750,before:18000,after:18750,ref:"ADJ-089",user:"محمود",notes:"تصحيح قياس"},
  {date:"2026-07-27 16:00",product:11,type:"purchase",qty:12,before:10,after:22,ref:"PUR-203",user:"محمود",notes:"توريد جديد"},
  {date:"2026-07-27 11:25",product:13,type:"sale",qty:-1,before:1,after:0,ref:"INV-1036",user:"كريم",notes:"—"},
  {date:"2026-07-26 19:10",product:5,type:"invoiceCancellation",qty:1,before:5,after:6,ref:"INV-1025",user:"محمود",notes:"إلغاء الفاتورة"}
];
const demoDashboard = {todaySales:845000,todayProfit:218000,monthSales:16470000,monthProfit:4325000,litres:42750,invoices:18,lowStock:5,pending:3};
const demoReports = [
  {period:"today",factor:1},{period:"yesterday",factor:.86},{period:"thisWeek",factor:6.3},{period:"thisMonth",factor:19.49}
];
const demoUsers = [
  {id:1,nameAr:"محمود فتحي",nameEn:"Mahmoud Fathy",role:"owner",phone:"0100 123 4567",email:"owner@canoil.demo"},
  {id:2,nameAr:"كريم عادل",nameEn:"Karim Adel",role:"employee",phone:"0112 555 3344",email:"employee@canoil.demo"}
];
