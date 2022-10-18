# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
  **ROUTE IS**  localhost:3000/store/products && verb is [GET] 

- Show (args: product id)
   **ROUTE IS**  localhost:3000/store/products/product_id && verb is [GET]

- Create (args: Product)[token required]
  **ROUTE IS** localhost:3000/store/products/add  && verb is [POST]

- [OPTIONAL] Top 5 most popular products
  not implemented yet

- [OPTIONAL] Products by category (args: product category)
  **ROUTE IS** localhost:3000/store/products/categories/product_cat && verb is[GET]

#### Users

- Index [token required]
**ROUTE IS**  localhost:3000/store/users        && verb is [GET]

- Show (args: id)[token required]
**ROUTE IS**  localhost:3000/store/users/id      && verb is [GET]

- Create (args: User)[token required]
**ROUTE IS**  localhost:3000/store/users/create  && verb is [POST]

#### Orders

- Current Order by user (args: user id)[token required]
**ROUTE IS**  localhost:3000/store/orders/user/user_id       && verb is [GET]

- [OPTIONAL] Completed Orders by user (args: user id)[token required]
**ROUTE IS**  localhost:3000/store/orders/completed/user_id    && verb is [GET]



## Data Shapes

#### Product

Here is printScreen of my command line query on products table 
store_dev=# SELECT * FROM products;
 id |            name             |  price   |   category
----+-----------------------------+----------+--------------
  1 | Sandisk ultra USB           |   230.00 | Data Storage
  2 | kingston 32GB USB           |    79.00 | Data Storage
  3 | ICONIX 128GB USB            |   199.00 | Data Storage
  4 | USB WIFI adaptor            |   169.00 | networking
  5 | USB Bluetooth Dongle-silver |    47.00 | networking
  6 | tp-link wifi extender       |   494.00 | networking
  
  
- id SERIAL PRIMARY KEY
- name VARCHAR(100) NOT NULL
- price NUMERIC(17,2) NOT NULL
- [OPTIONAL] category VARCHAR(60) NOT NULL

#### User
store_dev=# SELECT * FROM USERS;
 id | fname  |  lname  |                           password
----+--------+---------+--------------------------------------------------------------
 1 | user1  | name1 |     $2b$10$UxA28lqoopa1fgcCMuZ1DO0z8rL2p0/iJME/zb9HwaoD43WC2umaK
 2 | user2  | name2 |     $2b$10$Fp9EhCNgm4w8vkiWHvN5sOzCZBTjtTh3k.kWHKIqzxxctJ8Wdsk9W
 3 | user3  | name3 |     $2b$10$Lzx778.0wjOj.NUpychdLeECPnxrIKRGHvsdKTNUqQyRWKpNZI8FO
 4 | user4  | name4 |    $2b$10$0k/tMGffXbHhr.2coYeaG.6etpDXBPd57uiB741Z2CNhAMfCG706C
 5 | user5  | name5 |    $2b$10$C.3RKpJ3PluoTs68Hmt8D.f4NLjyD7.u3VzMGz.rpyRl/8TP82ccq
 6 | user6  | name6 |    $2b$10$cgHdrXz8BfChYqv7a0ZCm.biYRUoOwJwZxce1CMRVBMTKBR9pBgTi
 

- id  SERIAL PRIMARY KEY
- firstName VARCHAR(50) NOT NULL
- lastName VARCHAR(50) NOT NULL
- password VARCHAR(255) NOT NULL

#### Orders

store_dev=# SELECT * FROM ORDERS;
 id |  status   | user_id
----+-----------+---------
  1 | completed |      22
  2 | active    |      22
  3 | completed |      26
  4 | active    |      26
  5 | completed |      26
(5 rows)

- id SERIAL PRIMARY KEY
- user_id  BIGINT REFERENCES users(id) NOT NULL
- status of order (active or complete) VARCHAR(60)


#### product_orders

    -id SERIAL PRIMARY KEY,
    -order_id BIGINT REFERENCES orders(id) NOT NULL,
    -product_id BIGINT REFERENCES products(id) NOT NULL,
    -quantity BIGINT NOT NULL
