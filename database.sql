CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL,
    name varchar(250) NOT NULL,
    email varchar(250)  not null UNIQUE,
    role varchar(250) not null,
    password varchar(250) not null,
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS observation(
    id SERIAL,
    lat varchar(250) not null,
    long varchar(250) not null,
    type varchar(250) not null,
    description TEXT,
    user_id int not null,
    created TIMESTAMP not null DEFAULT NOW(),
    admin_time TIMESTAMP,
    status varchar(250) not null,
    PRIMARY KEY(id),
    CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES users(user_id)
);

INSERT INTO users(name,email,password,role)
VALUES('Ehad','ehadkraja@gmail.com','ehadi123!','admin');

INSERT INTO users(name,email,password,role)
VALUES('User','user@gmail.com','test','user');


INSERT INTO observation(lat,long,type,user_id,status)
VALUES('6.123456','9.123456','pothole',1,'pending');

INSERT INTO observation(lat,long,type,user_id,status)
VALUES('6.123456','9.123456','road closure',2,'pending');

INSERT INTO observation(lat,long,type,user_id,status)
VALUES('6.123456','9.123456','road closure',1,'approved');

INSERT INTO observation(lat,long,type,user_id,status)
VALUES('6.123456','9.123456','road closure',2,'rejected');
