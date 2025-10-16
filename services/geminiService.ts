

import { GoogleGenAI } from "@google/genai";
import { Sale, Customer, Payment, Farm } from '../types';

// Fix: Per coding guidelines, initialize directly with environment variable.
// Assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSalesInsight = async (sales: Sale[]): Promise<string> => {
  // Fix: Per coding guidelines, remove check for `ai` instance.
  if (sales.length === 0) {
    return "No sales data available to generate insights.";
  }
  
  const prompt = `
    Analyze the following chicken sales data and provide a brief, insightful summary for a business owner.
    - Highlight the total sales revenue.
    - Mention the best performing day based on revenue.
    - Identify any interesting trends (e.g., rising sales, common payment types).
    Data:
    ${JSON.stringify(sales.slice(0, 20))}
    
    Provide a concise, easy-to-read summary.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching sales insight from Gemini:", error);
    return "Could not generate AI insight at this time.";
  }
};

export const getCustomerBehaviorInsight = async (customers: Customer[], sales: Sale[], payments: Payment[]): Promise<string> => {
    // Fix: Per coding guidelines, remove check for `ai` instance.
    if (customers.length === 0) {
        return "No customer data available to generate insights.";
    }

    const customerSummary = customers.map(c => {
        const customerSales = sales.filter(s => s.customerName === c.name);
        const customerPayments = payments.filter(p => p.customerName === c.name);
        const totalSales = customerSales.reduce((sum, s) => sum + s.total, 0);
        const totalPayments = customerPayments.reduce((sum, p) => sum + p.amount, 0);
        return {
            name: c.name,
            totalSales,
            balance: totalSales - totalPayments,
            salesCount: customerSales.length
        };
    }).slice(0, 15);

    const prompt = `
        Based on the following customer summary, provide an analysis of customer behavior.
        - Identify the top customer by sales value.
        - Point out any customers with high outstanding balances.
        - Suggest a potential action, like rewarding a loyal customer or following up on a large debt.
        Data:
        ${JSON.stringify(customerSummary)}

        Provide a short, actionable insight.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching customer insight from Gemini:", error);
        return "Could not generate AI insight for customer behavior.";
    }
}

export const getFarmPerformanceInsight = async (farms: Farm[], sales: Sale[]): Promise<string> => {
    // Fix: Per coding guidelines, remove check for `ai` instance.
    if (farms.length === 0) {
        return "No farm data available for insights.";
    }

    const farmPerformance = farms.map(f => {
        const farmSales = sales.filter(s => s.farmName === f.name);
        const totalWeightSold = farmSales.reduce((sum, s) => sum + s.netWeight, 0);
        const totalRevenue = farmSales.reduce((sum, s) => sum + s.total, 0);
        return {
            name: f.name,
            initialChickens: f.chickens,
            totalWeightSold: totalWeightSold.toFixed(2),
            totalRevenue: totalRevenue.toFixed(2),
        };
    }).slice(0, 15);

    const prompt = `
        Analyze the farm performance data below.
        - Which farm generated the most revenue?
        - Is there a notable difference in performance between farms?
        - Provide a concise summary of overall farm productivity.
        Data:
        ${JSON.stringify(farmPerformance)}

        Provide a brief performance review.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching farm performance insight from Gemini:", error);
        return "Could not generate AI insight for farm performance.";
    }
}