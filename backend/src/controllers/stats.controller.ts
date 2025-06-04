import { TryCatch } from "../middlewares/error";
import { Orders } from "../models/order.model";
import { Product } from "../models/product.model";
import { User } from "../models/user.model";
import { calculatePercentage, getChartData } from "../utils/features";

export const getDashboardStats = TryCatch(async (req, res, next) => {
  let stats = {};

  //revenue

  const today = new Date();

  const thisMonth = {
    start: new Date(today.getFullYear(), today.getMonth(), 1),
    end: today,
  };

  const lastMonth = {
    start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
    end: new Date(today.getFullYear(), today.getMonth(), 0),
  };
  // const startOfThisMonth = new Date(today.getFullYear(),today.getMonth()-1,1);
  //const endOfLastMonth = new Date(today.getFullYear(),today.getMonth(),1);

  const thisMonthProductsPromise = Product.find({
    createdAt: {
      $gte: thisMonth.start,
      $lte: thisMonth.end,
    },
  });

  const lastMonthProductsPromise = Product.find({
    createdAt: {
      $gte: lastMonth.start,
      $lte: lastMonth.end,
    },
  });

  const thisMonthUserPromise = User.find({
    createdAt: {
      $gte: thisMonth.start,
      $lte: thisMonth.end,
    },
  });

  const lastMonthUserPromise = User.find({
    createdAt: {
      $gte: lastMonth.start,
      $lte: lastMonth.end,
    },
  });

  const thisMonthOrdersPromise = Orders.find({
    createdAt: {
      $gte: thisMonth.start,
      $lte: thisMonth.end,
    },
  });

  const lastMonthOrdersPromise = Orders.find({
    createdAt: {
      $gte: lastMonth.start,
      $lte: lastMonth.end,
    },
  });

  const sixMonthAgo = new Date();
  sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);

  const lastSixMonthOrdersPromise = Orders.find({
    createdAt: {
      $gte: sixMonthAgo,
      $lte: today,
    },
  });

  const latestTransactionPromise = Orders.find({})
    .select(["orderItems", "discount", "total", "status"])
    .limit(4);

  const [
    thisMonthProducts,
    lastMonthProducts,
    thisMonthUser,
    lastMonthUser,
    thisMonthOrders,
    lastMonthOrders,
    productCount,
    usersCount,
    allOrder,
    lastSixMonthOrders,
    categories,
    femaleUserCounts,
    latestTransaction,
  ] = await Promise.all([
    thisMonthProductsPromise,
    lastMonthProductsPromise,
    thisMonthUserPromise,
    lastMonthUserPromise,
    thisMonthOrdersPromise,
    lastMonthOrdersPromise,
    Product.countDocuments(),
    User.countDocuments(),
    Orders.find({}).select("total"),
    lastSixMonthOrdersPromise,
    Product.distinct("category"),
    User.countDocuments({ gender: "female" }),
    latestTransactionPromise,
  ]);

  const userChangePercentage = calculatePercentage(
    thisMonthUser.length,
    lastMonthUser.length
  );
  console.log(thisMonthOrders.length, lastMonthOrders.length);

  const productChangePercentage = calculatePercentage(
    thisMonthProducts.length,
    lastMonthProducts.length
  );

  const orderChangePercentage = calculatePercentage(
    thisMonthOrders.length,
    lastMonthOrders.length
  );

  const changePercent = {
    revenue: calculatePercentage(
      thisMonthOrders.reduce((total, order) => total + (order.total || 0), 0),
      lastMonthOrders.reduce((total, order) => total + (order.total || 0), 0)
    ),
    product: productChangePercentage,
    user: userChangePercentage,
    order: orderChangePercentage,
  };

  const revenue = allOrder.reduce(
    (total, order) => total + (order.total || 0),
    0
  );

  const count = {
    user: usersCount,
    product: productCount,
    order: allOrder.length,
  };

  const orderMonthlyCounts = new Array(6).fill(0);
  const orderMonthlyRevenue = new Array(6).fill(0);

  lastSixMonthOrders.forEach((order) => {
    const creationDate = order.createdAt;
    const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;

    if (monthDiff < 6) {
      orderMonthlyCounts[6 - monthDiff - 1] += 1;
      orderMonthlyRevenue[6 - monthDiff - 1] += order.total;
    }
  });

  const categoriesCountPromise = categories.map((category) => {
    return Product.countDocuments({ category: category });
  });
  const categoriesCount = await Promise.all(categoriesCountPromise);

  const categoryCount: Record<string, number>[] = [];
  categories.forEach((category, i) => {
    categoryCount.push({
      [category]: categoriesCount[i],
    });
  });

  const genderRatio = {
    male: usersCount - femaleUserCounts,
    female: femaleUserCounts,
  };

  const modifiedLatestTransaction = latestTransaction.map((i) => {
    return {
      _id: i._id,
      discount: i.discount,
      amount: i.total,
      quantity: i.orderItems.length,
      status: i.status,
    };
  });

  return res.status(201).json({
    success: true,
    message: "Order fetched Successfully",
    changepercent: changePercent,
    count: count,
    chart: {
      order: orderMonthlyCounts,
      revenue: orderMonthlyRevenue,
    },
    categoryCount,
    genderRatio,
    latestTransaction: modifiedLatestTransaction,
  });
});

export const getPieCharts = TryCatch(async (req, res, next) => {
  let charts;

  const [processingOrder, shippedOrder, deliveredOrder] = await Promise.all([
    Orders.countDocuments({ status: "Processing" }),
    Orders.countDocuments({ status: "Shipped" }),
    Orders.countDocuments({ status: "Delivered" }),
  ]);

  const categories = await Product.distinct("category");

  const categoriesCountPromise = categories.map((category) => {
    return Product.countDocuments({ category: category });
  });
  const categoriesCount = await Promise.all(categoriesCountPromise);

  const categoryCount: Record<string, number>[] = [];
  categories.forEach((category, i) => {
    categoryCount.push({
      [category]: categoriesCount[i],
    });
  });
  const productCount = await Product.countDocuments();
  const productOutOfStock = await Product.countDocuments({ stock: 0 });
  const stockAvailability = {
    inStock: productCount - productOutOfStock,
    outOfStock: productOutOfStock,
  };

  const allOrders = await Orders.find({}).select([
    "total",
    "discount",
    "subtotal",
    "tax",
    "shippingCharges",
  ]);

  const totalGrossIncome = allOrders.reduce(
    (prev, order) => prev + (order.total || 0),
    0
  );
  const totaldiscount = allOrders.reduce(
    (prev, order) => prev + (order.discount || 0),
    0
  );
  const productionCost = allOrders.reduce(
    (prev, order) => prev + (order.shippingCharges || 0),
    0
  );
  const burn = allOrders.reduce((prev, order) => prev + (order.tax || 0), 0);
  const marketingCost = totalGrossIncome * (30 / 100);
  const netMargin = totalGrossIncome - totaldiscount - burn - marketingCost;

  const revenueDistribution = {
    netMargin,
    discount: totaldiscount,
    productionCost,
    marketingCost,
    burn,
  };
  const [allUsers, adminUser, customerUser] = await Promise.all([
    User.find({}).select(["dob"]),
    User.countDocuments({ role: "admin" }),
    User.countDocuments({ role: "user" }),
  ]);
  const adminCustomer = {
    admin: adminUser,
    customer: customerUser,
  };

  const usersAgeGroup = {
    teen: allUsers.filter((i) => i.age < 20).length,
    adult: allUsers.filter((i) => i.age > 20 && i.age < 60).length,
    old: allUsers.filter((i) => i.age > 60).length,
  };

  charts = {
    processing: processingOrder,
    shipped: shippedOrder,
    delivered: deliveredOrder,
    productCategories: categoriesCount,
    stockAvailability,
    revenueDistribution,
    adminCustomer,
    usersAgeGroup,
  };

  return res.status(201).json({
    success: true,
    message: "Order fetched Successfully",
    charts,
    categoriesCount,
  });
});

export const getBarCharts = TryCatch(async (req, res, next) => {
  let chart;

  const today = new Date();
  const sixMonthAgo = new Date();
  sixMonthAgo.setDate(sixMonthAgo.getMonth() - 6);

  const twelveMonthAgo = new Date();
  sixMonthAgo.setDate(sixMonthAgo.getMonth() - 12);

  const lastSixMonthsOrdersPromise = Orders.find({
    createdAt: {
      $gte: sixMonthAgo,
      $lte: today,
    },
  });

  const lastSixMonthsProductsPromise = Product.find({
    createdAt: {
      $gte: sixMonthAgo,
      $lte: today,
    },
  });

  const lastSixMonthsUsersPromise = User.find({
    createdAt: {
      $gte: sixMonthAgo,
      $lte: today,
    },
  });

  const [orders, products, users] = await Promise.all([
    lastSixMonthsOrdersPromise,
    lastSixMonthsProductsPromise,
    lastSixMonthsUsersPromise,
  ]);

  const productCount = getChartData({ length: 6, today, docArr: products });
  const usersCount = getChartData({ length: 6, today, docArr: users });
  const ordersCount = getChartData({ length: 6, today, docArr: orders });

  chart = {
    users: usersCount,
    products: productCount,
    orders: ordersCount,
  };

  return res.status(201).json({
    success: true,
    message: " fetched Successfully",
    chart,
  });
});

export const getLineCharts = TryCatch(async (req, res, next) => {
  let chart;

  const today = new Date();
 

  const twelveMonthAgo = new Date();
  twelveMonthAgo.setDate(twelveMonthAgo.getMonth() - 12);

  const twelveMonthsOrdersPromise = Orders.find({
    createdAt: {
      $gte: twelveMonthAgo,
      $lte: today,
    },
  });

  const twelveMonthsProductsPromise = Product.find({
    createdAt: {
      $gte: twelveMonthAgo,
      $lte: today,
    },
  });

  const twelveMonthsUsersPromise = User.find({
    createdAt: {
      $gte: twelveMonthAgo,
      $lte: today,
    },
  });

  const [orders, products, users] = await Promise.all([
    twelveMonthsOrdersPromise,
    twelveMonthsProductsPromise,
    twelveMonthsUsersPromise,
  ]);

  const productCount = getChartData({ length: 12, today, docArr: products });
  const usersCount = getChartData({ length: 12, today, docArr: users });
  const discount = getChartData({ length: 12, today, docArr: orders,property:'discount' });
  const revenue = getChartData({ length: 12, today, docArr: orders,property:'total' });

  chart = {
    users: usersCount,
    products: productCount,
    discount,
    revenue
  };

  return res.status(201).json({
    success: true,
    message: " fetched Successfully",
    chart,
  });
});
