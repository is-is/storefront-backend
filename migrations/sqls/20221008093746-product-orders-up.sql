/* Replace with your SQL commands */
CREATE TABLE product_orders(
    id SERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(id) NOT NULL,
    product_id BIGINT REFERENCES products(id) NOT NULL,
    quantity BIGINT NOT NULL

);