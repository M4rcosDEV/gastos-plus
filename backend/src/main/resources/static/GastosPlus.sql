CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY NOT NULL ,
    email VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    photo_url VARCHAR(255)
);

CREATE TABLE categories(
    id BIGSERIAL PRIMARY KEY NOT NULL ,
    name VARCHAR(50) NOT NULL,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE accounts(
    id BIGSERIAL PRIMARY KEY NOT NULL ,
    account_name VARCHAR(50) NOT NULL,
    balance DOUBLE PRECISION NOT NULL,
    user_id BIGINT NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE movements(
    id BIGSERIAL PRIMARY KEY NOT NULL ,
    value_mov DOUBLE PRECISION NOT NULL,
    date_mov DATE NOT NULL,
    category_id BIGINT NOT NULL,
    account_id BIGINT NOT NULL,
    payment_methods VARCHAR(50) NOT NULL,
    type_mov VARCHAR(50) CHECK (type_mov IN('INCOME', 'EXPENSE')) NOT NULL,

    FOREIGN KEY (account_id) REFERENCES accounts(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);


