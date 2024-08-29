interface Order {
    shipmentId: string;
    recipientName: string;
    recipientEmail: string;
    recipientPhone: string;
    senderAddress: string;
    sendingDate: string;
    recipientAddress: string;
    receivingDate: string;
    shipmentItems: ShipmentItem[];
    productName: string;
    charge: number;
    shipmentStatus: string;
    // driverName: string;
    trackingNumber: string;
    distance: number;
    overallWeight: number;
    overallVolume: number;
    overallCharge: number;
    paymentStatus: string;
}

interface ShipmentItem {
    id: number;
    productName: string;
    itemType: string;
    weight: string;
    volume: string;
    charge: string;
}

interface OrderFormProps {
    orderId: number | null;
}