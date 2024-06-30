#! usr/bin/env node

import inquirer from "inquirer"

// Bank Account interface:

interface BankAccount {
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void;
    deposit(amount: number): void;
    checkBalance(): void
};

// Bank Account Class:

class BankAccount implements BankAccount {
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber
        this.balance = balance
    }

// Debit money:
withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount
        console.log(`Withdrawal of ${amount} succesfull. Remaining Balance is ${this.balance}`)
    }else {
        console.log("Insuficient balance")
    }
}

// Credit money:
deposit(amount: number): void {
    if(amount > 100) {
        amount -= 1 // $1 fee charged If more than 100$ deposit;
    }this.balance += amount;
    console.log(`Deposit of ${amount} succesfull. Remaining balance is ${this.balance}`)
}

// Check Balance:
checkBalance(): void {
    console.log(`Current balance: $ ${this.balance}`)
}
}

// Customer Class:

class Customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount

    constructor(firstName:string, lastName:string, gender:string, age:number, mobileNumber:number, account:BankAccount) {
        this.firstName = firstName
        this.lastName = lastName
        this.gender = gender
        this.age = age
        this.mobileNumber = mobileNumber
        this.account = account
    }
}

// Create bank accounts:

const accounts:BankAccount[] = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
]

// Create Customers:

const customers: Customer[] = [
    new Customer("Hamza", "Khan", "Male",35, 3162227564, accounts[0]),
    new Customer("Muhammad", "Usman", "Male",19, 3350386812, accounts[1]),
    new Customer("Ayesha", "Khan", "Female",40, 4162227564, accounts[2])
]

// Function to Interact with bank account:

async function service() {
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your AccountNumber"
        })

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`)
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                messgae: "Select an operation",
                choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
            }]);

            switch(ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit."
                    })

                    customer.account.deposit(depositAmount.amount)
                    break;

                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit."
                    })
    
                    customer.account.deposit(withdrawAmount.amount)
                        break;
                        
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                    
                case "Exit":
                    console.log("Exiting bank program")
                    console.log("\n Thank you for using our services. Have a great day:");
                    return;    
            
            }
        }else {
            console.log("Invalid account number. Please try agian")
        }
    } while(true)
}

service()