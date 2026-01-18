export const data = {
    nodes: [
        { name: "Salary", category: "Source" },
        { name: "Bonus", category: "Source" },
        { name: "Investments", category: "Source" },
        { name: "Total Income", category: "Hub" },
        { name: "Housing", category: "Expense" },
        { name: "Food", category: "Expense" },
        { name: "Transportation", category: "Expense" },
        { name: "Utilities", category: "Expense" },
        { name: "Entertainment", category: "Expense" },
        { name: "Savings", category: "Savings" },
        { name: "Investments (Out)", category: "Savings" },
        { name: "Rent", category: "Sub-Expense" },
        { name: "Maintenance", category: "Sub-Expense" }
    ],
    links: [
        { source: 0, target: 3, value: 5000 }, // Salary -> Income
        { source: 1, target: 3, value: 1000 }, // Bonus -> Income
        { source: 2, target: 3, value: 500 },  // Investments -> Income

        { source: 3, target: 4, value: 2000 }, // Income -> Housing
        { source: 3, target: 5, value: 800 },  // Income -> Food
        { source: 3, target: 6, value: 400 },  // Income -> Transport
        { source: 3, target: 7, value: 300 },  // Income -> Utilities
        { source: 3, target: 8, value: 500 },  // Income -> Entertainment
        { source: 3, target: 9, value: 1500 }, // Income -> Savings
        { source: 3, target: 10, value: 1000 }, // Income -> Inv Out

        { source: 4, target: 11, value: 1800 }, // Housing -> Rent
        { source: 4, target: 12, value: 200 },  // Housing -> Maintenance
    ]
};
