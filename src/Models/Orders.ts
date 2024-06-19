interface Order {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    pickUpAddress: string;
    pickUpTime: string;
    deliveryAddress: string;
    deliveryTime: string;
    items: Item[];
    itemName: string;
    total: number;
    orderStatus: string;
    driver: string;
    distance: number;
    overallWeight: number;
    overallVolume: number;
    overallCharge: number;
    paymentStatus: string;
}

interface Item {
    id: number;
    itemName: string;
    itemType: string;
    weight: string;
    volume: string;
    total: string;
}

interface OrderFormProps {
    orderId: number | null;
}