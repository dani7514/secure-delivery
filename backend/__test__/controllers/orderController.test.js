const asyncHandler = require('express-async-handler');
const orderService = require('../../services/orderService');

const {
    createOrder,
    getOrders,
    getUserRecentOrder,
    postPay,
} = require('../../controllers/orderController');

jest.mock('../../services/orderService');

describe('Order Controller', () => {
    const req = {
        body: {
            items: [{name: 'Product 1', price: 10}, {name: 'Product 2', price: 20}],
        },
        user: {
            id: 'user_id',
        },
    };

    const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createOrder', () => {
        it('should create a new order', async () => {
            const createdOrder = {_id: 'order_id', ...req.body};
            orderService.createOrder.mockResolvedValue(createdOrder);

            await createOrder(req, res);

            expect(orderService.deleteNewOrderByUser).toHaveBeenCalledWith(req.user.id);
            expect(orderService.createOrder).toHaveBeenCalledWith(req.body, req.user.id);
            expect(res.send).toHaveBeenCalledWith(createdOrder);
        });

        it('should return 400 if cart is empty', async () => {
            req.body.items = [];

            await createOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('Cart is empty');
            expect(orderService.createOrder).not.toHaveBeenCalled();
        });

        it('should return 500 if an error occurs', async () => {
            const errorMessage = 'Internal Server Error';
            orderService.createOrder.mockRejectedValue(new Error(errorMessage));

            await createOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send);
        });
    });

    describe('getOrders', () => {
        it('should get orders by user', async () => {
            const orders = [{_id: 'order_id', userId: req.user.id}];
            orderService.getOrdersByUser.mockResolvedValue(orders);

            await getOrders(req, res);

            expect(orderService.getOrdersByUser).toHaveBeenCalledWith(req.user.id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(orders);
        });

        it('should return 400 if an error occurs', async () => {
            const errorMessage = 'Bad Request';
            orderService.getOrdersByUser.mockRejectedValue(new Error(errorMessage));

            await getOrders(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send);
        });
    });

    describe('getUserRecentOrder', () => {
        it('should get the most recent order by user', async () => {
            const order = {_id: 'order_id', userId: req.user.id};
            orderService.getNewOrderByUser.mockResolvedValue(order);

            await getUserRecentOrder(req, res);

            expect(orderService.getNewOrderByUser).toHaveBeenCalledWith(req.user.id);
            expect(res.send).toHaveBeenCalledWith(order);
        });

        it('should return 400 if order is not found', async () => {
            orderService.getNewOrderByUser.mockResolvedValue(null);

            await getUserRecentOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith();
        });

        it('should return 400 if an error occurs', async () => {
            const errorMessage = 'Bad Request';
            orderService.getNewOrderByUser.mockRejectedValue(new Error(errorMessage));

            await getUserRecentOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send);
        });
    });

    describe('postPay', () => {
        const paymentId = 'payment_id';

        it('should update the order payment and status', async () => {
            const order = {_id: 'order_id', userId: req.user.id, save: jest.fn()};
            orderService.getNewOrderByUser.mockResolvedValue(order);
            orderService.getOrderStatusPaid.mockReturnValue('Paid');

            await postPay(req, res);

            expect(orderService.getNewOrderByUser).toHaveBeenCalledWith(req.user.id);
            expect(order.save);
            expect(res.send);
        });

        it('should return 400 if order is not found', async () => {
            orderService.getNewOrderByUser.mockResolvedValue(null);

            await postPay(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('Order not found');
        });

        it('should return 500 if an error occurs', async () => {
            const errorMessage = 'Internal Server Error';
            orderService.getNewOrderByUser.mockRejectedValue(new Error(errorMessage));

            await postPay(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send);
        });
    });
});
