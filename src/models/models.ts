
export interface IEmployee {
    id: number;
    active: boolean;
    email: string;
    employeeCode: string;
    password: string;
    phone_no: number;
    username: string;
}
export interface ICashDrawer {
    id: number;
    currentBalance: number;
    startBalance: number;
    updatedAt: Date;
    employee_Id: number;
    date: string;
    lastUpdationTime:string;
}

export interface IProduct {
    id: number;
    description: string;
    price: number;
    productCode: string;
    productName: string;
    quantity: number;
}

export class Cart {
    cartProducts: CartProduct[];
    subtotal: number;
    total: number;
    customerId: number;
    tax: number;
    employeeId: number;
}

export class CartProduct {
    productId: number;
    productName: string;
    price: number;
    amount: number;
    quantity: number;
    constructor(productId, productName, price, amount, quantity) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.amount = amount;
        this.quantity = quantity;
    }
}
export interface ICustomer {
    id: number;
    active: boolean;
    email: string;
    phone_no: number;
    username: string;
    customerCode: string;
}

export class Order {
    id: number;
    modeId: number;
    amount: number;
    paidAmount: number;
    status: string;
    orderdetails: OrderDetail[];
    constructor(modeId: number, amount: number, paidAmount: number, status: string, orderDetails: OrderDetail[]) {
        this.modeId = modeId;
        this.amount = amount;
        this.paidAmount = paidAmount;
        this.status = status;
        this.orderdetails = orderDetails;
    }

}

export class OrderDetail {
    productId: number;
    price: number;
    quantity: number;
}

export interface ITransaction {
    orderId: number;
    date: string;
    time: string;
    amount: number;
    startBalance: number;
    endingBalance: number;
}